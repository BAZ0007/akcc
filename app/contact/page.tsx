import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteSettings } from "@/lib/data/queries";
import { getSetting } from "@/lib/data/helpers";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you."
        description="Reach out with questions, prayer needs, pastoral care requests, or anything else you’d like to share with AKCC."
      />
      <section className="page-shell py-20">
        <Container className="relative grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Visit or Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
              <p><strong>Address:</strong> {getSetting(settings, "footer_address")}</p>
              <p><strong>Email:</strong> {getSetting(settings, "footer_email")}</p>
              <p><strong>Phone:</strong> {getSetting(settings, "footer_phone")}</p>
              <p><strong>Sunday Service:</strong> {getSetting(settings, "hero_service_time")}</p>
            </CardContent>
          </Card>
          <ContactForm />
        </Container>
      </section>
    </div>
  );
}

