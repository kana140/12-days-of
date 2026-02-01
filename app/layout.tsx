import type { Metadata } from "next";
import NavBar from "./ui/nav-bar";
import "./globals.css";
import { pixelify } from "./ui/fonts";
import Footer from "./ui/footer";

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
      <body className={`${pixelify.className} antialiased `}>
        <NavBar />
        <div className="min-h-screen w-full items-center justify-center bg-background font-sans">
          <main className="flex min-h-screen py-2 flex-col items-center justify-between bg-white dark:bg-background sm:items-start flex-wrap content-center">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
