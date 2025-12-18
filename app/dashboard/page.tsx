export const dynamic = "force-dynamic";
import Link from "next/link";
import { getCalendarsForUser } from "../lib/data";
import { notFound } from "next/navigation";
import { EditCalendar } from "@/app/ui/calendar/buttons";
import { lusitana } from "../ui/fonts";

export default async function Page() {
  const { calendars } = await getCalendarsForUser();
  if (!calendars) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center m-auto">
      {calendars.length === 0 ? (
        <h1
          className={`${lusitana.className} text-2xl text-gray-800 bg-foreground`}
        >
          No Calendars yet. Get Started
        </h1>
      ) : (
        <div>
          {calendars.map((calendar, index) => {
            let day = index + 1;
            const startDate = new Date(
              calendar.start_date
            ).toLocaleDateString();
            return (
              <div className="flex flex-col" key={index}>
                <Link
                  className="cursor-pointer"
                  href={`./dashboard/${calendar.id}`}
                >
                  <div className="bg-foreground p-5 w-full flex flex-col rounded-sm text-gray-800 dark:text-accent">
                    <h2 className={`${lusitana.className} text-xl`}>
                      Calendar {day}
                    </h2>

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
        className={`${lusitana.className} text-2xl p-5 m-5 rounded-sm absolute bottom-0 bg-accent text-gray-800 dark:text-foreground`}
      >
        <span> Create Calendar </span>
      </Link>
    </div>
  );
}
