// import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
export const metadata: Metadata = { title: "Edit Invoice" };
import ChristmasTree from "@/app/ui/christmas-tree";
import GiftBox from "@/app/ui/gift";
import { getCalendarById } from "@/app/lib/data";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const isActive = false;
  const { numberOfGifts, calendar, gifts } = await getCalendarById(id);
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
    <div className="flex justify-centerpy-32 px-16">
      <h2>Day</h2>
      <ChristmasTree />
      <div className="flex flex-wrap">
        {gifts.map((gift) => (
          <GiftBox gift={gift} />
        ))}
      </div>
    </div>
  );
}
