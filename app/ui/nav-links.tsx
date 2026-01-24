import { auth } from "@/auth";
import SignOutButton from "./buttons/signout-button";
import CalendarsButton from "./buttons/calendars-button";
import SignInButton from "./buttons/signin-button";

export default async function NavLinks() {
  const session = await auth();

  //   if (!session?.user) {
  //     return null;
  //   }
  return (
    <div>
      {session?.user ? (
        <div>
          Welcome, {session.user.name}! <CalendarsButton />
          <SignOutButton />
        </div>
      ) : (
        <div>
          <SignInButton />
        </div>
      )}
    </div>
  );
}
