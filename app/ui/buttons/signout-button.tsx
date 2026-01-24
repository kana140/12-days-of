"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/" })}
      className="btn btn-ghost btn-circle"
    >
      Sign out
    </button>
  );
}
