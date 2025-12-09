import { NextResponse } from "next/server";
import { getGiftForDay, getCalendarById } from "@/app/lib/data";

export async function GET(
  req: Request,
  context: { params: Promise<{ calendarId: string; day: string }> }
) {
  const { calendarId, day } = await context.params;
  const dayNum = Number(day);

  if (Number.isNaN(dayNum)) {
    return NextResponse.json({ error: "Invalid day" }, { status: 400 });
  }

  const { calendar } = await getCalendarById(calendarId);
  if (!calendar) {
    return NextResponse.json({ error: "Calendar not found" }, { status: 404 });
  }

  // assume calendar.start_date is a Date
  const start = new Date(calendar.start_date);
  const today = new Date();
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - start.getTime();
  const daysSinceStart = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1; // +1 so day 1 unlocks on start day

  if (dayNum > daysSinceStart) {
    return NextResponse.json({ error: "Gift locked" }, { status: 403 });
  }

  const gift = await getGiftForDay(calendarId, dayNum);

  if (!gift) {
    return NextResponse.json({ error: "Gift not found" }, { status: 404 });
  }

  return NextResponse.json(gift);
}
