import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export function EditCalendar({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/edit`}
      className="rounded-md border hover:bg-gray-100 w-5 dark:bg-foreground text-gray-800 dark:text-accent"
    >
      <PencilIcon />
    </Link>
  );
}
