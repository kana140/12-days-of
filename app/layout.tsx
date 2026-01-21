import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "./ui/nav-bar";
import "./globals.css";
import { Nav } from "react-bootstrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calendar",
  description: "A customisable gifting calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="min-h-screen  w-full items-center justify-center bg-background font-sans">
          <NavBar />
          <main className="flex min-h-screen flex-col items-center justify-between bg-white dark:bg-background sm:items-start flex-wrap content-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
