import { clsx } from "clsx";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <div className="breadcrumbs text-sm">
      <ol className={"flex text-md md:text-l"}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active
                ? "text-gray-900 dark:text-primary"
                : "text-gray-500",
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
