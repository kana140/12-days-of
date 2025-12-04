"use client";

// import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import GiftsTable from "@/app/ui/gifts-table";
import { Button } from "@/app/ui/button";
import { createCalendar, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCalendar, initialState);
  return (
    <form action={formAction}>
      <div
        className="rounded-md bg-gray-50 p-4 md:p-6"
        aria-describedby="all-fields-missing-error"
      >
        {/* Receiver's Name */}
        <div className="mb-4">
          <label
            htmlFor="receivers-name"
            className="mb-2 block text-sm font-medium"
          >
            What is the name of the person you would like to make this for?
          </label>
          <div className="relative">
            <input type="text" id="receivers-name" name="receiversName"></input>
          </div>
        </div>

        {/* Receiver's Email */}
        <div className="mb-4">
          <label
            htmlFor="receivers-email"
            className="mb-2 block text-sm font-medium"
          >
            What's their email
          </label>
          <div className="relative">
            <input
              type="text"
              id="receivers-email"
              name="receiversEmail"
            ></input>
          </div>
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label
            htmlFor="start-date"
            className="mb-2 block text-sm font-medium"
          >
            What day would you like to start?
          </label>
          <div className="relative">
            <input type="date" id="start-date" name="startDate"></input>
          </div>
        </div>

        {/* Days set Amount */}
        {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            How many days? Maximum is 12
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter number of days (Maximum is 12)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
            </div>
          </div>
        </div> */}

        {/* Set Gifts */}
        <div className="mb-4">
          <label htmlFor="Gifts" className="mb-2 block text-sm font-medium">
            Create a gift for each day
          </label>
          <GiftsTable />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        {/* <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Create
        </Link> */}
        <Button type="submit">Create Calendar</Button>
      </div>
    </form>
  );
}
