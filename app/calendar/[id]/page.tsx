import ChristmasTree from "@/app/ui/christmas-tree";
import GiftBox from "@/app/ui/gift";
import { getCalendarById } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";
export const metadata: Metadata = { title: "Calendar" };

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const { calendar, gifts, calendarMessage } = await getCalendarById(id);

  return (
    <div className="py-10 px-16">
      <div className="pb-5 m-auto text-center text-5xl">
        <h1 className={`${lusitana.className}`}>{calendarMessage}</h1>
      </div>
      <ChristmasTree />
      <div className="flex flex-wrap justify-center">
        {gifts.map((gift, index) => (
          <GiftBox key={index} gift={gift} />
        ))}
      </div>
      <h2 className="pt-5 pb-5 m-auto text-center text-2xl">
        Welcome {calendar.receiver_name}! 💝
      </h2>
    </div>
  );
}
