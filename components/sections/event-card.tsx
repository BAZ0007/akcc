import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDisplayDate } from "@/lib/format";
import type { EventItem } from "@/types/cms";

export function EventCard({ eventItem }: { eventItem: EventItem }) {
  return (
    <Card className="overflow-hidden border-slate-200 bg-white">
      {eventItem.image_url ? (
        <div className="relative aspect-[4/3] bg-slate-100">
          <Image src={eventItem.image_url} alt={eventItem.title} fill className="object-cover" />
        </div>
      ) : null}
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">{formatDisplayDate(eventItem.date)} • {eventItem.time}</p>
        <CardTitle className="text-2xl">{eventItem.title}</CardTitle>
        <p className="text-sm text-slate-500">{eventItem.location}</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm leading-7 text-slate-600">{eventItem.description}</p>
        {eventItem.rsvp_url ? (
          <Button asChild variant="outline">
            <Link href={eventItem.rsvp_url} target="_blank" rel="noreferrer">
              RSVP
            </Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}

