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
          <span> Create a calendar </span>
        </Link>
      ) : (
        <div className="pt-8 px-16">
          <ChristmasTree />
          <div className="flex flex-wrap justify-center">
            {gifts.map((gift) => (
              <GiftBox gift={gift} />
            ))}
          </div>
          <div className="flex justify-center m-8">
            <Button> Edit Calendar</Button>
          </div>
        </div>
      )}
    </>
  );
}
