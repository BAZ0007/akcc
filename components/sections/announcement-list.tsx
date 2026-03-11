import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDisplayDate } from "@/lib/format";
import type { Announcement } from "@/types/cms";

export function AnnouncementList({ announcements }: { announcements: Announcement[] }) {
  return (
    <div className="grid gap-5">
      {announcements.map((announcement) => (
        <Card key={announcement.id} className="border-slate-200 bg-white">
          <CardHeader className="gap-3 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <Badge variant="outline" className="w-fit">
                {formatDisplayDate(announcement.publish_date)}
              </Badge>
              <CardTitle>{announcement.title}</CardTitle>
            </div>
            {announcement.cta_href && announcement.cta_label ? (
              <Link href={announcement.cta_href} className="text-sm font-semibold text-primary hover:text-primary/80">
                {announcement.cta_label}
              </Link>
            ) : null}
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-slate-600">{announcement.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

