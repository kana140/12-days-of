"use client";
import { signup } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { Button } from "./button";
import { lusitana } from "./fonts";
import { Input } from "./input-fields";

export function SignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [state, formAction, isPending] = useActionState(signup, undefined);
  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 dark:bg-foreground">
        <h1 className={`${lusitana.className} mb-3 text-2xl dark:text-accent`}>
          Please sign up to continue.
        </h1>
        <div className="w-full">
          <div className="">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <Input id="name" name="name" placeholder="Name" />
            </div>
          </div>
          {state?.errors?.name && <p>{state.errors.name}</p>}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <Input id="email" name="email" type="email" placeholder="Email" />
            </div>
          </div>
          {state?.errors?.email && <p>{state.errors.email}</p>}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                placeholder="Enter password"
                type="password"
              />
            </div>
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Sign Up
        </Button>
      </div>
    </form>
  );
}
