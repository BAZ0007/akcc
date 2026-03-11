import { Container } from "@/components/layout/container";
import { LeaderGrid } from "@/components/sections/leader-grid";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublishedLeaders } from "@/lib/data/queries";

export default async function AboutPage() {
  const leaders = await getPublishedLeaders();

  return (
    <div>
      <PageHero
        eyebrow="About AKCC"
        title="A church home shaped by worship, scripture, and loving community."
        description="AKCC exists to glorify God, nurture Kachin believers in Australia, and warmly welcome new people into the life of Christ-centered community."
      />
      <section className="page-shell py-20">
        <Container className="relative space-y-16">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card><CardHeader><CardTitle>Our Mission</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-slate-600">To make disciples of Jesus Christ through worship, biblical teaching, prayer, pastoral care, and service.</CardContent></Card>
            <Card><CardHeader><CardTitle>Our Heart</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-slate-600">We want every person who walks through our doors to feel seen, welcomed, and invited into genuine community.</CardContent></Card>
            <Card><CardHeader><CardTitle>Our Future</CardTitle></CardHeader><CardContent className="text-sm leading-7 text-slate-600">We are building a sustainable ministry foundation for the next generation, with strong pastoral care and digital reach.</CardContent></Card>
          </div>
          <div className="space-y-8">
            <SectionHeading eyebrow="Leadership Team" title="People serving with faithfulness and care." description="AKCC’s leaders help guide worship, discipleship, community support, and church-wide ministry rhythms." />
            <LeaderGrid leaders={leaders} />
          </div>
        </Container>
      </section>
    </div>
  );
}

