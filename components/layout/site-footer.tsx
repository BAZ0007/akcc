import Link from "next/link";

import { Container } from "@/components/layout/container";
import { getNavigation, getSiteSettings } from "@/lib/data/queries";
import { getSetting } from "@/lib/data/helpers";

export async function SiteFooter() {
  const [navigation, settings] = await Promise.all([getNavigation("footer"), getSiteSettings()]);

  const churchName = getSetting(settings, "church_name", "AKCC");
  const brandLabel = getSetting(settings, "footer_brand_label", "AKCC");
  const navigationHeading = getSetting(settings, "footer_navigation_heading", "Navigate");
  const contactHeading = getSetting(settings, "footer_contact_heading", "Contact");
  const tagline = getSetting(settings, "footer_tagline");
  const address = getSetting(settings, "footer_address");
  const email = getSetting(settings, "footer_email");
  const phone = getSetting(settings, "footer_phone");

  return (
    <footer className="border-t border-slate-200/80 bg-navy-950 text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr,1fr,1fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">{brandLabel}</p>
          <h2 className="max-w-sm text-2xl font-semibold leading-tight">{churchName}</h2>
          <p className="max-w-md text-sm leading-7 text-slate-300">{tagline}</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">{navigationHeading}</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-200">
            {navigation.map((item) => (
              <Link key={item.id} href={item.href} className="hover:text-gold-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4 text-sm text-slate-200">
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">{contactHeading}</h3>
          <p>{address}</p>
          <a href={`mailto:${email}`} className="block hover:text-gold-300">
            {email}
          </a>
          <a href={`tel:${phone.replace(/\s+/g, "")}`} className="block hover:text-gold-300">
            {phone}
          </a>
        </div>
      </Container>
    </footer>
  );
}
