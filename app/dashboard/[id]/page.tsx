import ChristmasTree from "@/app/ui/christmas-tree";
import { getCalendarForOwner } from "@/app/lib/data";
import { getDateDiff } from "@/app/lib/util";
import { notFound } from "next/navigation";
import GiftBox from "@/app/ui/gift";
import Link from "next/link";
import CopyLink from "@/app/ui/copy-link";
import { Button } from "@/app/ui/button";
import { ToastContainer, toast } from "react-toastify";

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
    <div className="m-auto md:m-2 text-center text-black dark:text-primary">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start">
        <div aria-hidden="true" />
        <div id="main">
          <div className="pixel-corners bg-primary p-2">
            {todaysDate > calendarCompleteDate ? (
              <h3 className="">
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
          </div>

          <ChristmasTree />
          <div className="flex flex-wrap justify-center">
            {gifts.map((gift, index) => (
              <GiftBox key={index} gift={gift} currentDay={false} />
            ))}
          </div>
        </div>
        <div id="buttons" className="flex flex-col items-start h-full">
          <div className="m-auto md:mt-auto flex flex-col gap-1">
            <Link href={`/dashboard/${calendar.id}/edit`}>
              <Button>Edit Calendar</Button>
            </Link>
            <CopyLink id={calendar.id} />
            <Link
              href={`/calendar/${id}`}
              className="text-black dark:text-primary"
            >
              <Button>Open Calendar</Button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
