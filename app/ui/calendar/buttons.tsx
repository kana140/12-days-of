import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export function EditCalendar({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/edit`}
      className="rounded-md border hover:bg-gray-100 w-5 dark:bg-foreground text-gray-800 dark:text-accent"
    >
      <div>
        <h2> Edit </h2>
      </div>
      <div>
        <PencilIcon />
      </div>
    </Link>
  );
}

export function ViewCalendar({ id }: { id: string }) {
  return (
    <Link
      href={`./dashboard/${id}`}
      className="cursor-pointer rounded-md border hover:bg-gray-100 w-5 dark:bg-foreground text-gray-800 dark:text-accent"
    >
      <div>
        <h2> View </h2>
      </div>
      <div>
        <PencilIcon />
      </div>
    </Link>
  );
}
