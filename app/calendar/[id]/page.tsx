import { Metadata } from "next";
// import Link from "next/link";
// import clsx from "clsx";
export const metadata: Metadata = { title: "Edit Invoice" };
import ChristmasTree from "@/app/ui/christmas-tree";
import GiftBox from "@/app/ui/gift";
import { getCalendarById } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  // const isActive = false;
  const { numberOfGifts, calendar, gifts } = await getCalendarById(id);
  console.log(numberOfGifts);
  console.log(calendar);

  //   const [invoice, customers] = await Promise.all([
  //     fetchInvoiceById(id),
  //     fetchCustomers(),
  //   ]);

  //   if (!calendar) {
  //     notFound();
  //   }

  // let convertStringToDate = function (dateString: string) {
  //   let actualDate = new Date(dateString);
  //   return actualDate;
  // };

  // let todaysDate = new Date();
  // let dateStarted = new Date(fakeData.dateStarted);
  // //   let currentDay = dateStarted - todaysDate;

  return (
    <div className="py-10 px-16">
      <div className="pb-5 m-auto text-center text-5xl">
        <h1 className={`${lusitana.className}`}>Day</h1>
      </div>
      <ChristmasTree />
      <div className="flex flex-wrap justify-center">
        {gifts.map((gift) => (
          <GiftBox gift={gift} />
        ))}
      </div>
      <h2 className="pt-5 pb-5 m-auto text-center text-2xl">
        Welcome {calendar.receiver_name}! 💝
      </h2>
    </div>
  );
}
