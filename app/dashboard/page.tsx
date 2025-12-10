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
          {calendars.map((calendar, index) => {
            let day = index + 1;
            const startDate = new Date(
              calendar.start_date
            ).toLocaleDateString();
            return (
              <div className="flex flex-col">
                <Link
                  key={index}
                  className="cursor-pointer"
                  href={`./dashboard/${calendar.id}`}
                >
                  <div className="bg-sky-100 hover:bg-sky-200 p-5 m-2 w-full flex flex-col text-center border-2 border-gray-300">
                    <h2>Calendar {day}</h2>

                    <h4>Start Date: {startDate}</h4>
                  </div>
                </Link>
                <EditCalendar id={calendar.id} />
              </div>
            );
          })}
        </div>
      )}
      <Link
        href="./dashboard/create"
        className="bg-sky-200 p-5 m-5 rounded-2xl absolute bottom-0"
      >
        <span> Create Calendar </span>
      </Link>
    </div>
  );
}
