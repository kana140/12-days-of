import postgres from "postgres";
import bcrypt from "bcrypt";
import { calendars, gifts, users } from "@/app/lib/example-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function ensureExtensions() {
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;
}

async function seedCalendars(client: postgres.Sql) {
  await client`
    CREATE TABLE IF NOT EXISTS calendars (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      receiver_name TEXT NOT NULL,
      receiver_email TEXT NOT NULL, 
      start_date DATE NOT NULL,
      number_of_days INT NOT NULL CHECK (number_of_days > 0),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  const insertedCalendars = await Promise.all(
    calendars.map((calendar) => {
      return client`
        INSERT INTO calendars (id, user_id, receiver_name, receiver_email, start_date, number_of_days)
        VALUES (${calendar.id}, ${calendar.user_id}, ${calendar.receiver_name}, ${calendar.receiver_email}, ${calendar.start_date}, ${calendar.number_of_days})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedCalendars;
}

async function seedUsers(client: postgres.Sql) {
  await client`
    CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client`
            INSERT INTO users (id, name, email, password)
            VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
        `;
    })
  );

  return insertedUsers;
}

async function seedGifts(client: postgres.Sql) {
  await client`
    CREATE TABLE IF NOT EXISTS gifts (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      calendar_id UUID NOT NULL REFERENCES calendars(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT,
      link VARCHAR(255),
      opened BOOLEAN NOT NULL DEFAULT FALSE,
      day INT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        
      CONSTRAINT unique_day_per_calendar UNIQUE (calendar_id, day),
      CONSTRAINT valid_day CHECK (day > 0)
    );
  `;

  const insertedGifts = await Promise.all(
    gifts.map((gift) => {
      return client`
          INSERT INTO gifts (id, calendar_id, name, description, image, link, opened, day)
          VALUES (${gift.id}, ${gift.calendar_id}, ${gift.name}, ${gift.description}, ${gift.image}, ${gift.link}, ${gift.opened}, ${gift.day})
          ON CONFLICT (id) DO NOTHING;
        `;
    })
  );

  return insertedGifts;
}

export async function GET() {
  try {
    await ensureExtensions();
    await sql.begin(async (tx) => {
      await seedUsers(tx);
      await seedCalendars(tx);
      await seedGifts(tx);
    });

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
