// import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { lusitana } from "./ui/fonts";

export default function Home() {
  return (
    <div
      className={`${lusitana.className} flex flex-col items-center m-auto gap-5 dark:text-primary`}
    >
      <h2 className="text-2xl">Get Started</h2>
      <Link href="/login">
        <Button>
          <span>Log In</span>
        </Button>
      </Link>
      <Link href="/signup">
        <Button>
          <span>Sign Up</span>
        </Button>
      </Link>
    </div>
  );
}
