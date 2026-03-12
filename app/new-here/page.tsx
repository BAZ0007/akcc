import type { Metadata } from "next";

import { RichText } from "@/components/content/rich-text";
import { NewHereForm } from "@/components/forms/new-here-form";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageSections } from "@/lib/data/queries";
import { buildPageMetadata } from "@/lib/metadata";
import { getSectionMap } from "@/lib/page-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "new-here",
    "New Here",
    "Plan your first visit to AKCC, ask questions, and let our church family welcome you well.",
  );
}

export default async function NewHerePage() {
  const sections = await getPageSections("new-here");
  const sectionMap = getSectionMap(sections);
  const hero = sectionMap.hero;
  const visitCard = sectionMap.visit_card;

  return (
    <div>
      <PageHero
        eyebrow={hero?.subtitle ?? "New Here"}
        title={hero?.title ?? "Planning your first visit? We would love to welcome you."}
        description={hero?.body ?? "Whether you're exploring faith or looking for a church family, AKCC is a warm place to worship, connect, and belong."}
      />
      <section className="page-shell py-20">
        <Container className="relative grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>{visitCard?.title ?? "What to Expect"}</CardTitle>
            </CardHeader>
            <CardContent>
              <RichText value={visitCard?.body} paragraphClassName="text-sm leading-7 text-slate-600" />
            </CardContent>
          </Card>
          <NewHereForm />
        </Container>
      </section>
    </div>
  );
}
