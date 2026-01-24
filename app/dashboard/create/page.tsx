import Form from "@/app/ui/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Create Invoice" };

export default async function Page() {
  return (
    <div className="w-1/2">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/" },
          {
            label: "Create Calendar",
            href: "/dashboard/create",
            active: true,
          },
        ]}
      />
      <Form />
    </div>
  );
}
