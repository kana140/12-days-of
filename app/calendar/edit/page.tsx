import Form from "@/app/ui/create-form";
// import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { getCalendarById } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Create Invoice" };

export default async function Page(props: { params: Promise<{ id: string }> }) {
  //   const customers = await fetchCustomers();
  const params = await props.params;
  const id = params.id;
  const calendar = getCalendarById(id);

  return (
    <main>
      {/* <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      /> */}
      {/* <Form customers={customers} /> */}
      <Form />
    </main>
  );
}
