export const dynamic = "force-dynamic";
import Link from "next/link";
import { getCalendarsForUser } from "../lib/data";
import { notFound } from "next/navigation";
import { EditCalendar, ViewCalendar } from "@/app/ui/calendar/buttons";
import calendarImage from "../../public/calendar-image.png";

export default async function Page() {
  const { calendars } = await getCalendarsForUser();
  if (!calendars) {
    notFound();
  }

  return (
    <div className="w-full m-auto text-center flex flex-col items-center">
      {calendars.length === 0 ? (
        <h1 className={`text-2xl text-gray-800 bg-foreground`}>
          No Calendars yet. Get Started
        </h1>
      ) : (
        <div className="m-5 flex flex-col md:flex-row gap-10">
          {calendars.map((calendar, index) => {
            index += 1;
            const startDate = new Date(
              calendar.start_date,
            ).toLocaleDateString();
            return (
              <div className="text-black w-full md:w-1/3" key={index}>
                <div className="card bg-base-100 shadow-sm">
                  <figure>
                    <img src={calendarImage.src}></img>
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {calendar.name ?? `Calendar ${index}`}
                    </h2>
                    <p>Start Date: {startDate}</p>
                    <div className="card-actions justify-end">
                      <a href={`./dashboard/${calendar.id}`}>
                        <button className="btn bg-primary">View</button>
                      </a>
                      <a href={`/dashboard/${calendar.id}/edit`}>
                        <button className="btn bg-primary">Edit</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Link
        href="./dashboard/create"
        className={`text-2xl p-5 m-5 md:w-1/3 rounded-sm bg-accent text-gray-800 dark:text-foreground`}
      >
        <span> Create Calendar </span>
      </Link>
    </div>
  );
}
