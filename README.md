## Little Calendars

I made this project because I liked the idea of gettig my partner an advent calendar. But because of long distance, physical gifts did not seem feasible. So I decided to make an online alternative that would allow him to unlock a small surprise each day leading up to Christmas. And then I thought, what if I could help my other friends create and gift their own calendars too? That led to building a configurable experience where users can create and share their own personalised calendars for partners or friends.

# Features:
* Create a fully custom, shareable calendar
* Configure key calendar settings:
  * Custom start date
  * Number of days
  * Gift/message for each day
* Daily content that can only be unlocked on certain days

Link to live demo: https://merry-poopey.dev/

# Tech Stack:
Frontend: TypeScript, 
Frameworks: React, Next.js,
Styling: Tailwind CSS, DaisyUI
Storage: PostgreSQL, Neon Blob Storage

# How to run the application:

Prerequisites: 
* pnpm

Installation:

git clone https://github.com/kana140/12-days-of.git
cd 12-days-till
pnpm install 

Run Locally:
Navigate to the root directory and run: pnpm run dev

The app should now be running on:
http://localhost:3000

# Future Improvements:
* Implement different timezones
* Implement more UIs for different themes/events (e.g. Valentines, Birthdays, etc..)
* Mobile-first optimisations
* Enhanced UI improvements and animations

