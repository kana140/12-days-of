export const dynamic = "force-dynamic";
import Link from "next/link";
import { getCalendarsForUser } from "../lib/data";
import { notFound } from "next/navigation";
import { EditCalendar } from "@/app/ui/calendar/buttons";

export default async function Page() {
  const { calendars } = await getCalendarsForUser();
  if (!calendars) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center m-auto">
      {calendars.length === 0 ? (
        <h2> No Calendars yet. Get Started</h2>
      ) : (
        <div>
          {calendars.map((calendar, index) => (
            <Link key={index} href={`./dashboard/${calendar.id}`}>
              <div key={index} className="bg-sky-100 h-50 w-full">
                {calendar.receiver_name}
                <EditCalendar id={calendar.id} />
              </div>
            </Link>
          ))}
        </div>
      )}
      <Link href="./dashboard/create" className="bg-sky-200 p-5 rounded-2xl">
        <span> Create calendar </span>
      </Link>
    </div>
  );
}
