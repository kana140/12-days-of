import postgres from "postgres";
import { Calendar, FullGift, GiftSummary } from "./definitions";
import { auth } from "@/auth";
import { getDateDiff } from "./util";
import { convertTimezone } from "./util";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getCalendarById(calendarId: string) {
  try {
    const calendarDataPromise = sql`SELECT receiver_name, start_date, number_of_days, timezone FROM calendars WHERE id = ${calendarId}`;
    const giftCountPromise = sql`SELECT COUNT(*) FROM gifts WHERE calendar_id = ${calendarId}`;
    const allGiftsPromise = sql<
      GiftSummary[]
    >`SELECT calendar_id, day, opened FROM gifts WHERE calendar_id = ${calendarId} ORDER BY day`;

    const data = await Promise.all([
      giftCountPromise,
      calendarDataPromise,
      allGiftsPromise,
    ]);

    const calendar = data[1][0];
    const giftData = data[2];
    const todaysDate = new Date();
    console.log("current time", convertTimezone(todaysDate, calendar.timezone));
    const calendarStartDate = new Date(calendar.start_date);
    let calendarMessage = "";

    todaysDate.setHours(0, 0, 0, 0);
    calendarStartDate.setHours(0, 0, 0, 0);
    const dateDiff = getDateDiff(todaysDate, new Date(calendar.start_date));

    const gifts: GiftSummary[] = giftData.map((gift) => {
      const day = gift.day;
      const unlockDate = new Date(calendarStartDate);
      unlockDate.setDate(calendarStartDate.getDate() + (day - 1));
      return {
        ...gift,
        disabled: unlockDate > todaysDate,
      };
    });
    let currentDay = 0;
    if (calendarStartDate <= todaysDate) {
      console.log("calendar started");
      currentDay = Math.abs(dateDiff) + 1;
      calendarMessage = `Day ${currentDay}`;
    } else if (todaysDate >= calendar.start_date + calendar.number_of_days) {
      console.log(`calendar finished!`);
      calendarMessage = "Calendar finished";
    } else if (todaysDate < calendar.start_date) {
      console.log(calendar.start_date);
      console.log(
        `calendar starts in ${dateDiff} ${dateDiff === 1 ? "day" : "days"}`
      );
      calendarMessage = `Calendar starts in ${dateDiff} days`;
    }

    return {
      calendar,
      gifts,
      calendarMessage,
      currentDay,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch calendar data.");
  }
}

export async function getGiftForDay(calendarId: string, day: number) {
  try {
    const calendarRows = await sql<
      Calendar[]
    >`SELECT start_date FROM calendars WHERE id = ${calendarId}`;

    const startDate = calendarRows[0].start_date;

    const currentDay =
      Math.floor(
        (new Date().getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    if (day > currentDay) {
      throw new Error("Nice try");
    }
    const giftRows = await sql<FullGift[]>`
    SELECT * FROM gifts where calendar_id=${calendarId} AND day=${day} LIMIT 1;`;

    const gift: FullGift = giftRows[0];
    try {
      await sql`UPDATE gifts SET opened = TRUE where id = ${gift.id}`;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to set the gift to opened");
    }

    return gift;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch gift data.");
  }
}

export async function getCalendarsForUser() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { calendars: [] as Calendar[] };
    }

    const userEmail = session.user.email;

    if (!userEmail) {
      throw new Error("Not authenticated");
    }

    const users = await sql`SELECT id FROM users WHERE email = ${userEmail}`;
    const user = users[0];

    if (!user) {
      return { calendars: [] as Calendar[] };
    }
    const userId: number = user.id;

    const calendarRows = await sql<
      Calendar[]
    >`SELECT * FROM calendars WHERE user_id = ${userId}`;

    if (calendarRows.length === 0) {
      return { calendars: [] as Calendar[] };
    }

    const calendars = calendarRows.map((calendar) => ({
      ...calendar,
    }));
    return { calendars };
  } catch (error) {
    console.error("Unable to retrieve calendars for users", error);
    return { calendars: [] as Calendar[] };
  }
}

export async function getCalendarForOwner(id: string) {
  try {
    const calendarRows = await sql<
      Calendar[]
    >`SELECT * FROM calendars WHERE id = ${id}`;

    if (calendarRows.length === 0) {
      return { calendar: null, gifts: [] as FullGift[] };
    }

    const calendarId = calendarRows[0].id;

    const giftsRows = await sql<
      FullGift[]
    >`SELECT * FROM gifts WHERE calendar_id = ${calendarId} ORDER BY day`;

    const calendar: Calendar = calendarRows[0];

    const gifts = giftsRows.map((gift) => ({
      ...gift,
      disabled: false,
    }));

    return { calendar, gifts };
  } catch (error) {
    console.error(error);
    return { calendar: null, gifts: [] as FullGift[] };
  }
}
