import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDisplayDate } from "@/lib/format";
import type { Sermon } from "@/types/cms";

export function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Card className="overflow-hidden border-slate-200 bg-white">
      <div className="relative aspect-video bg-slate-100">
        {sermon.thumbnail_url ? (
          <Image src={sermon.thumbnail_url} alt={sermon.title} fill className="object-cover" />
        ) : null}
      </div>
      <CardHeader className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">{formatDisplayDate(sermon.date)}</p>
        <CardTitle className="text-2xl">{sermon.title}</CardTitle>
        <p className="text-sm text-slate-500">{sermon.speaker}{sermon.scripture ? ` • ${sermon.scripture}` : ""}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-slate-600">{sermon.summary}</p>
      </CardContent>
    </Card>
  );
}

