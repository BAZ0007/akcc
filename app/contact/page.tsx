import type { Metadata } from "next";

import { RichText } from "@/components/content/rich-text";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageSections, getSiteSettings } from "@/lib/data/queries";
import { getSetting } from "@/lib/data/helpers";
import { buildPageMetadata } from "@/lib/metadata";
import { getSectionMap } from "@/lib/page-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "contact",
    "Contact",
    "Contact AKCC for prayer, pastoral care, visit questions, or general church enquiries.",
  );
}

export default async function ContactPage() {
  const [settings, sections] = await Promise.all([getSiteSettings(), getPageSections("contact")]);
  const sectionMap = getSectionMap(sections);
  const hero = sectionMap.hero;
  const contactCard = sectionMap.contact_card;

  return (
    <div>
      <PageHero
        eyebrow={hero?.subtitle ?? "Contact"}
        title={hero?.title ?? "We would love to hear from you."}
        description={hero?.body ?? "Reach out with questions, prayer needs, pastoral care requests, or anything else you'd like to share with AKCC."}
      />
      <section className="page-shell py-20">
        <Container className="relative grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>{contactCard?.title ?? "Visit or Contact"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
              <RichText value={contactCard?.body} paragraphClassName="text-sm leading-7 text-slate-600" />
              <p><strong>{getSetting(settings, "contact_address_label", "Address")}:</strong> {getSetting(settings, "footer_address")}</p>
              <p><strong>{getSetting(settings, "contact_email_label", "Email")}:</strong> {getSetting(settings, "footer_email")}</p>
              <p><strong>{getSetting(settings, "contact_phone_label", "Phone")}:</strong> {getSetting(settings, "footer_phone")}</p>
              <p><strong>{getSetting(settings, "contact_service_label", "Sunday Service")}:</strong> {getSetting(settings, "hero_service_time")}</p>
            </CardContent>
          </Card>
          <ContactForm />
        </Container>
      </section>
    </div>
  );
}
