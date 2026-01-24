import { Calendars, LogOut } from "lucide-react";

export default function CalendarsButton() {
  return (
    <a href="/dashboard">
      <button className="btn btn-ghost btn-circle">
        <Calendars />
      </button>
    </a>
  );
}
