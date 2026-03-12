import type { Metadata } from "next";

import { RichText } from "@/components/content/rich-text";
import { Container } from "@/components/layout/container";
import { LeaderGrid } from "@/components/sections/leader-grid";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPageSections, getPublishedLeaders } from "@/lib/data/queries";
import { buildPageMetadata } from "@/lib/metadata";
import { getSectionMap } from "@/lib/page-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "about",
    "About AKCC",
    "Learn about Australian Kachin Christian Church, our mission, leadership, and church family in Sydney.",
  );
}

export default async function AboutPage() {
  const [leaders, sections] = await Promise.all([getPublishedLeaders(), getPageSections("about")]);
  const sectionMap = getSectionMap(sections);
  const hero = sectionMap.hero;
  const mission = sectionMap.mission;
  const heart = sectionMap.heart;
  const future = sectionMap.future;
  const leadershipIntro = sectionMap.leadership_intro;

  return (
    <div>
      <PageHero
        eyebrow={hero?.subtitle ?? "About AKCC"}
        title={hero?.title ?? "A church home shaped by worship, scripture, and loving community."}
        description={hero?.body ?? "AKCC exists to glorify God, nurture Kachin believers in Australia, and warmly welcome new people into the life of Christ-centered community."}
      />
      <section className="page-shell py-20">
        <Container className="relative space-y-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {[mission, heart, future].filter(Boolean).map((item) => (
              <Card key={item?.section_key}>
                <CardHeader>
                  <CardTitle>{item?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RichText value={item?.body} paragraphClassName="text-sm leading-7 text-slate-600" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-8">
            <SectionHeading
              eyebrow={leadershipIntro?.subtitle ?? "Leadership Team"}
              title={leadershipIntro?.title ?? "People serving with faithfulness and care."}
              description={leadershipIntro?.body ?? "AKCC's leaders help guide worship, discipleship, community support, and church-wide ministry rhythms."}
            />
            <LeaderGrid leaders={leaders} />
          </div>
        </Container>
      </section>
    </div>
  );
}
