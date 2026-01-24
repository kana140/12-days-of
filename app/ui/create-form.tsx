"use client";
import { GiftsTableV2 } from "@/app/ui/gifts-table";
import { Button } from "@/app/ui/button";
import { createCalendar, State } from "@/app/lib/actions";
import { useActionState } from "react";
import { Input } from "./input-fields";

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCalendar, initialState);
  return (
    <form action={formAction}>
      <div
        className="rounded-md p-4 md:p-6"
        aria-describedby="all-fields-missing-error"
      >
        <h1 className={`mb-3 text-2xl text-center text-gray-800`}>
          Create Calendar
        </h1>
        {/* Receiver's Name */}
        <div className="mb-4">
          <label
            htmlFor="receivers-name"
            className="mb-3 mt-5 block text-sm font-medium text-gray-900"
          >
            What is the name of the person you would like to make this for?
          </label>
          <div className="relative">
            <Input
              type="text"
              id="receivers-name"
              name="receiversName"
              placeholder="Enter name"
              required
            />
          </div>
        </div>

        {/* Receiver's Email */}
        <div className="mb-4">
          <label
            htmlFor="receivers-email"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Whats their email
          </label>
          <div className="relative">
            <Input
              type="text"
              id="receivers-email"
              name="receiversEmail"
              placeholder="Enter email"
              required
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label
            htmlFor="start-date"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            What day would you like to start?
          </label>
          <div className="relative border-gray-900">
            <Input type="date" id="start-date" name="startDate" required />
          </div>
        </div>

        {/* Set Gifts */}
        <div className="mb-4">
          <label
            htmlFor="Gifts"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Create a gift for each day
          </label>
          <GiftsTableV2 gifts={[]} />
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
      </div>
    </form>
  );
}
