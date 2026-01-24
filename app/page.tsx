// import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import ChristmasTree from "./ui/christmas-tree";

export default function Home() {
  return (
    <div
      className={`w-full flex flex-col items-center m-5 gap-5 text-grey-200 dark:text-primary`}
    >
      <div>
        <ChristmasTree />
      </div>
      <div className="w-full bg-primary m-5 p-5 text-black">
        <h2 className="text-2xl text-header text-center m-2">How It Works</h2>
        <div className="flex flex-row gap-5">
          <div className="hero w-1/3 bg-white rounded-3xl shadow-md">
            <div className="hero-content block text-center">
              <h1 className="text-2xl font-bold">Create a Calendar</h1>
              blurbblurbblurbb blurbblurbblurbblurb
              blurbblurbblurblurbblurbblurbblurb
            </div>
          </div>
          <div className="hero w-1/3 bg-white rounded-3xl shadow-md">
            <div className="hero-content block text-center">
              <h1 className="text-2xl font-bold">Gift Calendar</h1>
              blurbblurbblurbb blurbblurbblurbblurb
              blurbblurbblurblurbblurbblurbblurb
            </div>
          </div>
          <div className="hero w-1/3 bg-white rounded-3xl shadow-md">
            <div className="hero-content block text-center">
              <h1 className="text-2xl font-bold">Daily Unlocks</h1>
              blurbblurbblurbb blurbblurbblurbblurb
              blurbblurbblurblurbblurbblurbblurb
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-2xl text-header text-center">Get Started</h2>
        <div className="flex gap-4">
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
      </div>
    </div>
  );
}
