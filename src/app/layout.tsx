import type { Metadata } from "next";

import { Toaster as Sonner } from "@/components/ui/sonner";

import { inter } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "wapa",
  description:
    "Web application designed to provide users with comprehensive information about various wall paint products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Sonner />
      </body>
    </html>
  );
}
