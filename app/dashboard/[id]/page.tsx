import ChristmasTree from "@/app/ui/christmas-tree";
import { getCalendarForOwner } from "@/app/lib/data";
import { getDateDiff } from "@/app/lib/util";
import { notFound } from "next/navigation";
import GiftBox from "@/app/ui/gift";
import Link from "next/link";
import CopyLink from "@/app/ui/copy-link";
import { Button } from "@/app/ui/button";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const { calendar, gifts } = await getCalendarForOwner(id);
  if (!calendar) {
    notFound();
  }
  const startDate = new Date(calendar.start_date);
  const todaysDate = new Date();
  const calendarCompleteDate = new Date(startDate + calendar.number_of_days);

  const daysTillStart = getDateDiff(todaysDate, startDate) + 1;

  return (
    <div className={`pt-10 px-16 text-center text-black dark:text-primary`}>
      {/* {daysTillStart > 0 ? (
        <h1 className="text-xl"> Day {daysTillStart} </h1>
      ) : (

      )} */}
      {todaysDate > calendarCompleteDate ? (
        <h3 className="pb-10">
          Calendar completed on{" "}
          {calendarCompleteDate.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
      ) : (
        <h1 className="text-xl"> Day {daysTillStart} </h1>
      )}

      <ChristmasTree />
      <div className="flex flex-wrap justify-center">
        {gifts.map((gift, index) => (
          <GiftBox key={index} gift={gift} currentDay={false} />
        ))}
      </div>
      <div className="flex justify-center mt-8 flex-col">
        <Link href={`/dashboard/${calendar.id}/edit`}>
          <Button>Edit Calendar</Button>
        </Link>
      </div>
      <CopyLink id={calendar.id} />
      <Link href={`/calendar/${id}`} className="text-black dark:text-primary">
        {" "}
        Open Calendar
      </Link>
    </div>
  );
}
