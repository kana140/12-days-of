import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "./ui/nav-bar";
import "./globals.css";
import { pixelify } from "./ui/fonts";
import { Nav } from "react-bootstrap";
import Footer from "./ui/footer";

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
        className={`${pixelify.className} ${pixelify.className} antialiased `}
      >
        <NavBar />
        <div className="min-h-screen w-full items-center justify-center bg-background font-sans">
          <main className="flex min-h-screen flex-col items-center justify-between bg-white dark:bg-background sm:items-start flex-wrap content-center">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
