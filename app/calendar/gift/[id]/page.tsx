"use client";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="fixed w-1/2 h-1/2 inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      popupwindow
      <Link
        href="/dashboard/1"
        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
      >
        Accept Gift
      </Link>
    </div>
  );
}
