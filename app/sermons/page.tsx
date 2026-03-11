import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { SermonCard } from "@/components/sections/sermon-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDisplayDate } from "@/lib/format";
import { getPublishedSermons } from "@/lib/data/queries";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

export default async function SermonsPage() {
  const sermons = await getPublishedSermons();
  const featured = sermons[0];
  const remaining = sermons.slice(1);

  return (
    <div>
      <PageHero
        eyebrow="Sermons"
        title="Watch recent preaching and revisit messages anytime."
        description="AKCC sermons are published with YouTube embeds so members and visitors can stay connected throughout the week."
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
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Featured Sermon • {formatDisplayDate(featured.date)}</p>
                <CardTitle className="text-3xl">{featured.title}</CardTitle>
                <p className="text-sm text-slate-500">{featured.speaker}{featured.scripture ? ` • ${featured.scripture}` : ""}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-slate-600">{featured.summary}</p>
              </CardContent>
            </Card>
          ) : null}
          <div className="space-y-8">
            <SectionHeading eyebrow="Sermon Library" title="Browse the latest messages." />
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

