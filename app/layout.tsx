import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/app/globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "AKCC | Australian Kachin Christian Church",
    template: "%s | AKCC",
  },
  description:
    "Australian Kachin Christian Church welcomes people of all ages to worship, grow in faith, and find community.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

