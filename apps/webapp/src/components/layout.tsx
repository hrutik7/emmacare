/** @format */

import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
import { cn } from "../lib/utils";
import SideNavbar from "~/components/sidenav";
import TopNav from "./top-nav";
import Footer from "./footer";
import { Toaster } from "~/components/ui/toaster";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emma",
  description: "Stop wandering around the internet, and start using emma",
  openGraph: {
    title: "Emma",
    description: "Stop wandering around the internet, and start using emma",
    url: "https://emmacare.vercel.app/",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "og.jpg",
        width: 800,
        height: 600,
        alt: "Emma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emma",
    description: "Stop wandering around the internet, and start using emma",

    creator: "@bushido_hk",

    images: [
      {
        url: "og.jpg",

        width: 1200,
        height: 630,
        alt: "Your alt text",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <div
        className={cn(
          " w-full   bg-white text-black  ",
          // inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development",
          },
        )}
      >
        <TopNav />

        <div className="flex bg-[#F8FAFA]">
          <SideNavbar />

          <div
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="scrollbar-width-0 h-[100vh] max-h-[562px] w-full overflow-y-auto bg-[#F8FAFA] p-8"
          >
            {children}
          </div>
        </div>
        <Toaster />
        <Footer />
      </div>
    </div>
  );
}
