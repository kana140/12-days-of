import postgres from "postgres";
import { Calendar, Gift, User } from "./definitions";
import { auth } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getCalendarById(calendarId: string) {
  try {
    const calendarDataPromise = sql`SELECT receiver_name, start_date, number_of_days FROM calendars WHERE id = ${calendarId}`;
    const giftCountPromise = sql`SELECT COUNT(*) FROM gifts WHERE calendar_id = ${calendarId}`;
    const allGiftsPromise = sql<
      Gift[]
    >`SELECT day, opened FROM gifts WHERE calendar_id = ${calendarId} ORDER BY day`;

    const data = await Promise.all([
      giftCountPromise,
      calendarDataPromise,
      allGiftsPromise,
    ]);
    console.log(data);

    const numberOfGifts = Number(data[0][0].count ?? "0");
    const calendar = data[1][0];
    console.log(calendar);
    const gifts = data[2];

    return {
      numberOfGifts,
      calendar,
      gifts,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch calendar data.");
  }
}

export async function getGiftsForCalendar() {}

export async function getGiftForDay(
  calendarId: string,
  startDate: string,
  day: number
) {
  try {
    const currentDay =
      Math.floor(
        (new Date().getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    if (day > currentDay) {
      throw new Error("Nice try");
    }
    const gift = await sql<Gift[]>`
    SELECT * FROM gifts where dashboard_id=${calendarId} AND day=${day};`;

    console.log(gift);

    return {
      gift,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch gift data.");
  }
}

export async function getCalendarForUser() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { calendar: null, gifts: [] as any[] };
    }

    const userEmail = session.user.email;

    if (!userEmail) {
      throw new Error("Not authenticated");
    }

    const users = await sql`SELECT id FROM users WHERE email = ${userEmail}`;
    const user = users[0];

    if (!user) {
      return { calendar: null, gifts: [] as any[] };
    }
    console.log(user);
    const userId: number = user.id;

    // we got the user id now get the calendar

    let calendarRows = await sql<
      Calendar[]
    >`SELECT * FROM calendars WHERE user_id = ${userId}`;

    if (calendarRows.length === 0) {
      return { calendar: null, gifts: [] as any[] };
    }

    console.log(calendarRows);
    const calendarId = calendarRows[0].id;

    // now get gifts

    const giftsRows = await sql<
      Gift[]
    >`SELECT * FROM gifts WHERE calendar_id = ${calendarId}`;

    const calendar = calendarRows.map((calendar) => ({
      ...calendar,
    }));

    const gifts = giftsRows.map((gift) => ({
      ...gift,
    }));

    return { calendar, gifts };
  } catch (error) {
    console.log(error);
    return { calendar: null, gifts: [] as any[] };
  }
}
