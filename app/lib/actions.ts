"use server";
import { signIn, signUp } from "@/auth";
import { AuthError } from "next-auth";
import { SignupFormSchema, FormState } from "./definitions";
import bcrypt from "bcrypt";
import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { put } from "@vercel/blob";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  receiversName: z.string(),
  receiversEmail: z.string(),
  startDate: z.string(),
});

const CreateCalendar = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    receiversName?: string[];
    receiversEmail?: string[];
    startDate?: string[];
  };
  message?: string | null;
};

type GiftInput = {
  day: number;
  name: string;
  link: string;
  description: string;
  image: File | null;
  existingImageUrl?: string;
};

function parseGifts(formData: FormData) {
  const giftsByDay: Record<string, Partial<GiftInput>> = {};

  for (const [key, value] of formData.entries()) {
    const match = key.match(
      /^gifts\[(\d+)\]\[(day|name|link|description|image|existingImageUrl)\]$/
    );
    if (!match) continue;

    const [, dayKey, field] = match;
    const stringValue = String(value);

    if (!giftsByDay[dayKey]) {
      giftsByDay[dayKey] = {};
    }

    if (field === "day") {
      giftsByDay[dayKey].day = Number(stringValue);
    } else if (field === "name") {
      giftsByDay[dayKey].name = stringValue;
    } else if (field === "link") {
      giftsByDay[dayKey].link = stringValue;
    } else if (field === "description") {
      giftsByDay[dayKey].description = stringValue;
    } else if (field === "image") {
      giftsByDay[dayKey].image = value instanceof File ? value : null;
    } else if (field === "existingImageUrl") {
      giftsByDay[dayKey].existingImageUrl = stringValue;
    }
  }

  return Object.entries(giftsByDay)
    .map(([dayKey, data]) => ({
      day: data.day ?? Number(dayKey),
      title: data.name ?? "",
      link: data.link ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
      existingImageUrl: data.existingImageUrl ?? "",
    }))
    .sort((a, b) => a.day - b.day);
}

export async function createCalendar(preState: State, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not logged in.");
  }

  const userEmail = session.user.email;
  console.log(session);
  if (!userEmail) {
    throw new Error("Not authenticated");
  }

  const user = await sql`SELECT id FROM users WHERE email = ${userEmail}`;

  if (!user) {
    throw new Error("User not found in DB");
  }

  const userId: number = user[0].id;

  const validatedFields = CreateCalendar.safeParse({
    receiversName: formData.get("receiversName"),
    receiversEmail: formData.get("receiversEmail"),
    startDate: formData.get("startDate"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Calendar.",
    };
  }

  const { receiversName, receiversEmail, startDate } = validatedFields.data;
  const gifts = parseGifts(formData);

  try {
    const calendarResult = await sql`
    INSERT INTO calendars (user_id, receiver_name, receiver_email, start_date, number_of_days)
    VALUES (${userId}, ${receiversName}, ${receiversEmail}, ${startDate}, ${gifts.length})
    RETURNING id;
    `;

    const calendarId: number = calendarResult[0].id;

    for (const gift of gifts) {
      const file = gift.image;
      let imageUrl = "";
      if (file && file.size > 0) {
        imageUrl = await uploadGiftImage(calendarId.toString(), gift.day, file);
      }

      await sql`
      INSERT INTO gifts (calendar_id, day, name, link, description, image)
      VALUES (${calendarId}, ${gift.day}, ${gift.title}, ${gift.link}, ${gift.description}, ${imageUrl});
    `;
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Calendar.",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

const UpdateCalendar = FormSchema.omit({ id: true });

export async function updateCalendar(
  id: string,
  prevState: State,
  formData: FormData
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not logged in.");
  }

  const userEmail = session.user.email;
  console.log(session);
  if (!userEmail) {
    throw new Error("Not authenticated");
  }

  const user = await sql`SELECT id FROM users WHERE email = ${userEmail}`;

  if (!user) {
    throw new Error("User not found in DB");
  }

  //   const userId: number = user[0].id;

  const validatedFields = UpdateCalendar.safeParse({
    receiversName: formData.get("receiversName"),
    receiversEmail: formData.get("receiversEmail"),
    startDate: formData.get("startDate"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Calendar.",
    };
  }

  const { receiversName, receiversEmail, startDate } = validatedFields.data;
  const gifts = parseGifts(formData);

  try {
    await sql`
    UPDATE calendars
    SET receiver_name = ${receiversName}, receiver_email = ${receiversEmail}, start_date = ${startDate}, number_of_days = ${gifts.length}
    WHERE id = ${id};
    `;

    await sql`DELETE FROM gifts WHERE calendar_id = ${id};`;

    console.log("deleted rows");

    for (const gift of gifts) {
      const file = gift.image;
      let imageUrl = gift.existingImageUrl || "";
      if (file && file.size > 0) {
        imageUrl = await uploadGiftImage(id, gift.day, file);
      }

      await sql`
      INSERT INTO gifts (calendar_id, day, name, link, description, image)
      VALUES (${id}, ${gift.day}, ${gift.title}, ${gift.link}, ${gift.description}, ${imageUrl});
    `;
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Update Calendar.",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// Authentication and Sign up
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await signUp(name, email, hashedPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }

  revalidatePath("/login");
  redirect("/login");
}

async function uploadGiftImage(calendarId: string, day: number, file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { url } = await put(
    `calendar/${calendarId}/day-${day}-${file.name}`,
    buffer,
    { access: "public", allowOverwrite: true }
  );

  return url;
}
