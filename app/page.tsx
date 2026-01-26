// import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import ChristmasTree from "./ui/christmas-tree";
import calendarCreationImage from "../public/create-calendar.png";
import openGiftImage from "../public/open-gift.png";

export default function Home() {
  return (
    <div
      className={`w-full flex flex-col items-center mt-5 gap-5 text-grey-200`}
    >
      <div>
        <ChristmasTree />
      </div>
      <div className="w-full bg-primary p-5">
        <h2 className="text-3xl text-header text-center m-2">
          <b>How It Works</b>
        </h2>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="hero w-full md:w-1/3 bg-white shadow-md pixel-corners">
            <div className="hero-content block text-center">
              <h1 className="text-2xl font-bold">Create a Calendar</h1>
              <img
                src={calendarCreationImage.src}
                alt="Image of the calendar creation form"
              ></img>
            </div>
          </div>
          <div className="hero w-full md:w-1/3 bg-white pixel-corners shadow-md">
            <div className="hero-content block text-center">
              <h1 className="text-2xl font-bold">Gift Calendar</h1>
              <img
                src={calendarCreationImage.src}
                alt="Image of the calendar creation form"
              ></img>
            </div>
          </div>
          <div className="hero w-full md:w-1/3 bg-white pixel-corners shadow-md">
            <div className="hero-content block text-center">
              <h1 className="text-2xl font-bold">Daily Unlocks</h1>
              <img
                src={openGiftImage.src}
                alt="Image of the calendar creation form"
              ></img>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full flex flex-col gap-4">
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
      </div> */}
    </div>
  );
}
