"use client";

import { GiftsTableV2 } from "@/app/ui/gifts-table";
import { Button } from "@/app/ui/button";
import { updateCalendar, State } from "@/app/lib/actions";
import { useActionState } from "react";
import { lusitana } from "./fonts";
import { CalendarForm, GiftField } from "@/app/lib/definitions";
import { Input } from "./input-fields";

export default function Form({
  calendar,
  gifts,
}: {
  calendar: CalendarForm;
  gifts: GiftField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateCalendarWithId = updateCalendar.bind(null, calendar.id);
  const [state, formAction] = useActionState(
    updateCalendarWithId,
    initialState
  );
  return (
    <form action={formAction}>
      <div
        className="rounded-md p-4 md:p-6 bg-foreground"
        aria-describedby="all-fields-missing-error"
      >
        <h1
          className={`${lusitana.className} mb-3 text-2xl text-center text-gray-800`}
        >
          Edit Calendar
        </h1>
        {/* Receiver's Name */}
        <div className="mb-4">
          <label
            htmlFor="receivers-name"
            className="mb-3 mt-5 block text-sm font-medium text-gray-900 "
          >
            What is the name of the person you would like to make this for?
          </label>
          <div className="relative">
            <Input
              type="text"
              id="receivers-name"
              name="receiversName"
              defaultValue={calendar.receiver_name}
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
              defaultValue={calendar.receiver_email}
              placeholder="Enter email"
              className="peer block w-50% rounded-md border border-gray-100 py-1 pl-5 text-sm outline-2 placeholder:text-gray-500"
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
            <Input
              type="date"
              id="start-date"
              name="startDate"
              defaultValue={
                calendar.start_date
                  ? new Date(calendar.start_date).toISOString().split("T")[0]
                  : ""
              }
            />
          </div>
        </div>

        {/* Set Gifts */}
        <div className="mb-4 relative overflow-x-scrolls">
          <label
            htmlFor="Gifts"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Create a gift for each day
          </label>
          <GiftsTableV2 gifts={gifts} />
        </div>
        <div className="mt-6 flex justify-end gap-4 ">
          <Button type="submit">Update Calendar</Button>
        </div>
      </div>
    </form>
  );
}
