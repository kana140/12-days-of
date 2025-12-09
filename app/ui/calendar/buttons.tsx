import Link from "next/link";

export function EditCalendar({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      Edit Calendar
    </Link>
  );
}
