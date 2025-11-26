// import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
export const metadata: Metadata = { title: "Edit Invoice" };

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const isActive = false;
  //   const [invoice, customers] = await Promise.all([
  //     fetchInvoiceById(id),
  //     fetchCustomers(),
  //   ]);

  //   if (!invoice) {
  //     notFound();
  //   }

  //   let getFakeData = function () {};

  const fakeData = {
    sendersName: "Kei",
    receiversName: "Poopey",
    dateStarted: "26/11/2025",
    numberOfDays: 5,
  };

  let convertStringToDate = function (dateString: string) {
    let actualDate = new Date(dateString);
    return actualDate;
  };

  let todaysDate = new Date();
  let dateStarted = new Date(fakeData.dateStarted);
  //   let currentDay = dateStarted - todaysDate;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start flex-wrap content-center">
        <div className="christmas-tree h-128 w-64 bg-green-300"></div>
        <Link
          href="/dashboard/gift/1"
          id="gift-1"
          className={clsx(
            isActive
              ? "bg-red-200 size-16 hover:cursor-grab"
              : "bg-gray-500 size-16 hover:disabled:"
          )}
        >
          {" "}
        </Link>
      </main>
    </div>
  );
}
