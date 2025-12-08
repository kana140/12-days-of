import Link from "next/link";
import { getCalendarForUser } from "../lib/data";
import ChristmasTree from "../ui/christmas-tree";
import GiftBox from "../ui/gift";
import { Button } from "../ui/button";

export default async function Page() {
  const { calendar, gifts } = await getCalendarForUser();
  console.log(calendar);
  console.log(gifts);

  return (
    <>
      {!calendar ? (
        <Link href="./calendar/create">
          <span> Create calendar </span>
        </Link>
      ) : (
        <div className="pt-10 px-16 text-center">
          <h1 className="pb-10">Calendar starts in </h1>
          <ChristmasTree />
          <div className="flex flex-wrap justify-center">
            {gifts.map((gift, index) => (
              <GiftBox key={index} gift={gift} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href={`/dashboard/edit`}>
              <Button>Edit Calendar</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
