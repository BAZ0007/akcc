import Image from "next/image";
import Link from "next/link";

import { RichText } from "@/components/content/rich-text";
import { Container } from "@/components/layout/container";
import { AnnouncementList } from "@/components/sections/announcement-list";
import { EventCard } from "@/components/sections/event-card";
import { LeaderGrid } from "@/components/sections/leader-grid";
import { SectionHeading } from "@/components/sections/section-heading";
import { SermonCard } from "@/components/sections/sermon-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getHomePageData } from "@/lib/data/queries";
import { getSetting } from "@/lib/data/helpers";
import { getSectionMap } from "@/lib/page-content";

export default async function HomePage() {
  const { settings, homepageSections, pageSections, sermons, events, announcements, leaders } = await getHomePageData();
  const hero = homepageSections.find((section) => section.section_key === "hero") ?? homepageSections[0];
  const communitySection = homepageSections.find((section) => section.section_key === "community");
  const nextStepsSection = homepageSections.find((section) => section.section_key === "next_steps");
  const sectionMap = getSectionMap(pageSections);
  const welcomeExpect = sectionMap.welcome_card_expect;
  const welcomeBelong = sectionMap.welcome_card_belong;
  const sermonsIntro = sectionMap.sermons_intro;
  const eventsIntro = sectionMap.events_intro;
  const leadersIntro = sectionMap.leaders_intro;

  return (
    <div>
      <section className="bg-hero-gradient py-20 text-white sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-300">{hero?.subtitle ?? "Welcome to AKCC"}</p>
            <div className="space-y-6">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">{hero?.title}</h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">{hero?.body}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {hero?.cta_label && hero.cta_href ? (
                <Button asChild size="lg" variant="gold">
                  <Link href={hero.cta_href}>{hero.cta_label}</Link>
                </Button>
              ) : null}
              {hero?.secondary_cta_label && hero.secondary_cta_href ? (
                <Button asChild size="lg" variant="secondary">
                  <Link href={hero.secondary_cta_href}>{hero.secondary_cta_label}</Link>
                </Button>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-white/15 bg-white/10 text-white backdrop-blur">
                <CardContent className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">{getSetting(settings, "hero_service_time_label", "Service Time")}</p>
                  <p className="mt-3 text-2xl font-semibold">{getSetting(settings, "hero_service_time")}</p>
                </CardContent>
              </Card>
              <Card className="border-white/15 bg-white/10 text-white backdrop-blur">
                <CardContent className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">{getSetting(settings, "hero_location_label", "Location")}</p>
                  <p className="mt-3 text-2xl font-semibold">{getSetting(settings, "hero_location")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-gold-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-glow">
              {hero?.image_url ? (
                <Image src={hero.image_url} alt={hero.title} width={900} height={1000} className="h-full w-full object-cover" />
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="page-shell py-20">
        <Container className="relative space-y-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6">
              <SectionHeading eyebrow={communitySection?.subtitle ?? "Life Together"} title={communitySection?.title ?? "Life Together"} description={communitySection?.body} />
              <Button asChild variant="outline">
                <Link href={communitySection?.cta_href ?? "/about"}>{communitySection?.cta_label ?? "Learn More"}</Link>
              </Button>
            </div>
            <Card className="overflow-hidden border-slate-200 bg-white">
              <CardContent className="grid gap-6 p-8 text-sm leading-7 text-slate-600">
                {welcomeExpect ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">{welcomeExpect.title}</p>
                    <RichText value={welcomeExpect.body} className="mt-3" paragraphClassName="text-sm leading-7 text-slate-600" />
                  </div>
                ) : null}
                {welcomeBelong ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">{welcomeBelong.title}</p>
                    <RichText value={welcomeBelong.body} className="mt-3" paragraphClassName="text-sm leading-7 text-slate-600" />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <SectionHeading
              eyebrow={sermonsIntro?.subtitle ?? "Latest Sermons"}
              title={sermonsIntro?.title ?? "Recent teaching to encourage your faith."}
              description={sermonsIntro?.body ?? "Watch recent messages, revisit Sunday teaching, and share sermons with family and friends."}
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {sermons.slice(0, 3).map((sermon) => (
                <SermonCard key={sermon.id} sermon={sermon} />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <SectionHeading
              eyebrow={eventsIntro?.subtitle ?? "Upcoming Events"}
              title={eventsIntro?.title ?? "Gather, grow, and serve together."}
              description={eventsIntro?.body ?? "Church life extends beyond Sunday. Stay connected through prayer gatherings, fellowship, and ministry events."}
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {events.slice(0, 3).map((eventItem) => (
                <EventCard key={eventItem.id} eventItem={eventItem} />
              ))}
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
            <div className="space-y-6">
              <SectionHeading eyebrow={nextStepsSection?.subtitle ?? "New Here"} title={nextStepsSection?.title ?? "Take your next step"} description={nextStepsSection?.body} />
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href={nextStepsSection?.cta_href ?? "/new-here"}>{nextStepsSection?.cta_label ?? "I'm New Here"}</Link>
                </Button>
                {nextStepsSection?.secondary_cta_label && nextStepsSection.secondary_cta_href ? (
                  <Button asChild variant="outline">
                    <Link href={nextStepsSection.secondary_cta_href}>{nextStepsSection.secondary_cta_label}</Link>
                  </Button>
                ) : null}
              </div>
            </div>
            <AnnouncementList announcements={announcements} />
          </div>

          <div className="space-y-8">
            <SectionHeading
              eyebrow={leadersIntro?.subtitle ?? "Leadership"}
              title={leadersIntro?.title ?? "Meet the people who help shepherd AKCC."}
              description={leadersIntro?.body ?? "Our leaders are committed to pastoral care, prayer, discipleship, and building a church family centered on Christ."}
            />
            <LeaderGrid leaders={leaders} />
          </div>
        </Container>
      </section>
    </div>
  );
}
