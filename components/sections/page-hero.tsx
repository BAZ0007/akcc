import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-hero-gradient py-20 text-white sm:py-24">
      <Container>
        <div className="max-w-3xl space-y-6">
          <Badge variant="gold" className="w-fit bg-gold-300/90 text-navy-950">
            {eyebrow}
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-200">{description}</p>
        </div>
      </Container>
    </section>
  );
}

