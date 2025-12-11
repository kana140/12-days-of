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
  const daysTillStart = getDateDiff(new Date(calendar.start_date)) + 1;

  return (
    <div className="pt-10 px-16 text-center">
      {daysTillStart > 0 ? (
        <h1> Day {daysTillStart} </h1>
      ) : (
        <h3 className="pb-10">Better finish it soon...</h3>
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
    </div>
  );
}
