import type { ReactNode } from "react";

import { logoutAction } from "@/lib/actions/auth";
import { requireAdmin } from "@/lib/auth";
import { Container } from "@/components/layout/container";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { isPreviewMode } = await requireAdmin();

  return (
    <section className="page-shell py-10">
      <Container className="relative space-y-6">
        <div className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-white/60 bg-white/90 px-6 py-5 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-700">AKCC Admin</p>
            <h1 className="text-2xl font-semibold text-slate-950">Website CMS</h1>
          </div>
          <div className="flex items-center gap-3">
            {isPreviewMode ? <p className="text-sm text-amber-600">Preview mode without Supabase auth</p> : null}
            <form action={logoutAction}>
              <Button variant="outline" type="submit">Sign Out</Button>
            </form>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
          <AdminSidebar />
          <div>{children}</div>
        </div>
      </Container>
    </section>
  );
}

