import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { z } from "zod";
import Credentials from "next-auth/providers/credentials";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

async function createUser(name: string, email: string, password: string) {
  try {
    await sql`INSERT INTO users (email, name, password)
        VALUES (${email}, ${name}, ${password})`;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user.");
  }
}

export async function signUp(email: string, name: string, password: string) {
  const user = await getUser(email);
  if (!user) await createUser(email, name, password);
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log(email);
          console.log(password);
          const user = await getUser(email);
          console.log(user);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log(passwordsMatch);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});
