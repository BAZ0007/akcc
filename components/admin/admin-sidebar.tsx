"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminSections } from "@/lib/admin-config";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-[1.75rem] border border-white/60 bg-white/90 p-4 shadow-sm">
      <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold-700">Admin CMS</p>
      <nav className="grid gap-1">
        <Link
          href="/admin"
          className={cn(
            "rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100",
            pathname === "/admin" && "bg-navy-950 text-white hover:bg-navy-900",
          )}
        >
          Overview
        </Link>
        {adminSections.map((section) => {
          const href = `/admin/${section.slug}`;
          return (
            <Link
              key={section.slug}
              href={href}
              className={cn(
                "rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100",
                pathname === href && "bg-navy-950 text-white hover:bg-navy-900",
              )}
            >
              {section.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

