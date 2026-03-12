import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { EventCard } from "@/components/sections/event-card";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { getPageSections, getPublishedEvents } from "@/lib/data/queries";
import { buildPageMetadata } from "@/lib/metadata";
import { getSectionMap } from "@/lib/page-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    "events",
    "Events",
    "See upcoming AKCC events, church gatherings, ministry moments, and RSVP opportunities.",
  );
}

export default async function EventsPage() {
  const [events, sections] = await Promise.all([getPublishedEvents(), getPageSections("events")]);
  const sectionMap = getSectionMap(sections);
  const hero = sectionMap.hero;
  const listingIntro = sectionMap.listing_intro;

  return (
    <div>
      <PageHero
        eyebrow={hero?.subtitle ?? "Events"}
        title={hero?.title ?? "Stay connected through worship, fellowship, and ministry life."}
        description={hero?.body ?? "From family gatherings to prayer nights, our events help church life feel relational, intentional, and full of welcome."}
      />
      <section className="page-shell py-20">
        <Container className="relative space-y-8">
          <SectionHeading
            eyebrow={listingIntro?.subtitle ?? "Upcoming"}
            title={listingIntro?.title ?? "What's happening soon at AKCC."}
            description={listingIntro?.body ?? "Browse upcoming gatherings and RSVP where needed."}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {events.map((eventItem) => (
              <EventCard key={eventItem.id} eventItem={eventItem} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
