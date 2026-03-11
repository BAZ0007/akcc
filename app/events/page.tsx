import { Container } from "@/components/layout/container";
import { EventCard } from "@/components/sections/event-card";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { getPublishedEvents } from "@/lib/data/queries";

export default async function EventsPage() {
  const events = await getPublishedEvents();

  return (
    <div>
      <PageHero
        eyebrow="Events"
        title="Stay connected through worship, fellowship, and ministry life."
        description="From family gatherings to prayer nights, our events help church life feel relational, intentional, and full of welcome."
      />
      <section className="page-shell py-20">
        <Container className="relative space-y-8">
          <SectionHeading eyebrow="Upcoming" title="What’s happening soon at AKCC." description="Browse upcoming gatherings and RSVP where needed." />
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

