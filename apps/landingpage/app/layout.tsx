import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "ui/styles.css";
import "tailwindcss/tailwind.css";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

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
}): JSX.Element {
  const publicKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider publishableKey={publicKey}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
