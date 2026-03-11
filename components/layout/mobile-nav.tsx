"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { NavigationItem } from "@/types/cms";

export function MobileNav({ items }: { items: NavigationItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      {open ? (
        <div className="absolute inset-x-4 top-20 rounded-[1.5rem] border border-white/50 bg-white p-4 shadow-xl">
          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/admin">Admin</Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

