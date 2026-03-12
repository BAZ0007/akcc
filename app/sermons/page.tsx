import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { SermonCard } from "@/components/sections/sermon-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublishedSermons, getPageSections } from "@/lib/data/queries";
import { formatDisplayDate } from "@/lib/format";
import { buildPageMetadata } from "@/lib/metadata";
import { getSectionMap } from "@/lib/page-content";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "sermons",
    "Sermons",
    "Watch recent AKCC sermons, replay Sunday messages, and share YouTube-based preaching with family and friends.",
  );
}

export default async function SermonsPage() {
  const [sermons, sections] = await Promise.all([getPublishedSermons(), getPageSections("sermons")]);
  const sectionMap = getSectionMap(sections);
  const hero = sectionMap.hero;
  const featuredIntro = sectionMap.featured;
  const libraryIntro = sectionMap.library;
  const featured = sermons[0];
  const remaining = sermons.slice(1);

  return (
    <div>
      <PageHero
        eyebrow={hero?.subtitle ?? "Sermons"}
        title={hero?.title ?? "Watch recent preaching and revisit messages anytime."}
        description={hero?.body ?? "AKCC sermons are published with YouTube embeds so members and visitors can stay connected throughout the week."}
      />
      <section className="page-shell py-20">
        <Container className="relative space-y-12">
          {featured ? (
            <Card className="overflow-hidden border-slate-200 bg-white">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={getYouTubeEmbedUrl(featured.youtube_url)}
                  title={featured.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <CardHeader>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">
                  {(featuredIntro?.title ?? "Featured Sermon")} - {formatDisplayDate(featured.date)}
                </p>
                <CardTitle className="text-3xl">{featured.title}</CardTitle>
                <p className="text-sm text-slate-500">{featured.speaker}{featured.scripture ? ` - ${featured.scripture}` : ""}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-slate-600">{featured.summary}</p>
              </CardContent>
            </Card>
          ) : null}
          <div className="space-y-8">
            <SectionHeading
              eyebrow={libraryIntro?.subtitle ?? "Sermon Library"}
              title={libraryIntro?.title ?? "Browse the latest messages."}
              description={libraryIntro?.body}
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {remaining.map((sermon) => (
                <SermonCard key={sermon.id} sermon={sermon} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
