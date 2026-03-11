import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Leader } from "@/types/cms";

export function LeaderGrid({ leaders }: { leaders: Leader[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {leaders.map((leader) => (
        <Card key={leader.id} className="border-slate-200 bg-white">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Leadership</p>
            <CardTitle>{leader.name}</CardTitle>
            <p className="text-sm text-slate-500">{leader.role_title}</p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
            <p>{leader.bio}</p>
            {leader.email ? <a href={`mailto:${leader.email}`} className="font-medium text-primary">{leader.email}</a> : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

