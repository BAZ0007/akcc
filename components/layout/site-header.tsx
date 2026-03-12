import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { getNavigation, getSiteSettings } from "@/lib/data/queries";
import { getSetting } from "@/lib/data/helpers";

export async function SiteHeader() {
  const [navigation, settings] = await Promise.all([getNavigation("header"), getSiteSettings()]);
  const churchName = getSetting(settings, "church_name", "AKCC");
  const brandLabel = getSetting(settings, "header_brand_label", "Australian Kachin");
  const secondaryCtaLabel = getSetting(settings, "header_secondary_cta_label", "Latest Message");
  const secondaryCtaHref = getSetting(settings, "header_secondary_cta_href", "/sermons");
  const primaryCtaLabel = getSetting(settings, "header_primary_cta_label", "Plan a Visit");
  const primaryCtaHref = getSetting(settings, "header_primary_cta_href", "/new-here");

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/85 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-700">{brandLabel}</span>
          <span className="text-lg font-semibold text-navy-950">{churchName}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" asChild>
            <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
          </Button>
          <Button asChild>
            <Link href={primaryCtaHref}>{primaryCtaLabel}</Link>
          </Button>
        </div>
        <MobileNav items={navigation} />
      </Container>
    </header>
  );
}
