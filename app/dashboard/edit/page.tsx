import Form from "@/app/ui/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { getCalendarForUser } from "@/app/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Create Invoice" };

export default async function Page(props: { params: Promise<{ id: string }> }) {
  //   const customers = await fetchCustomers();
  const params = await props.params;
  const id = params.id;
  const { calendar, gifts } = await getCalendarForUser();
  if (!calendar) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Calendar", href: "/dashboard" },
          {
            label: "Edit Calendar",
            href: "/dashboard/edit",
            active: true,
          },
        ]}
      />
      <Form calendar={calendar} gifts={gifts} />
    </main>
  );
}
