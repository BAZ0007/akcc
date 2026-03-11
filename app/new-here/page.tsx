import { NewHereForm } from "@/components/forms/new-here-form";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewHerePage() {
  return (
    <div>
      <PageHero
        eyebrow="New Here"
        title="Planning your first visit? We would love to welcome you."
        description="Whether you’re exploring faith or looking for a church family, AKCC is a warm place to worship, connect, and belong."
      />
      <section className="page-shell py-20">
        <Container className="relative grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
              <p>Expect heartfelt worship, clear Bible teaching, prayer, and a friendly church family ready to help you settle in.</p>
              <p>You can use this form to let us know you’re coming, ask questions, or share how we can help make your first visit comfortable.</p>
              <p>Our leaders can also connect you to small groups, children’s ministry, youth gatherings, and serving opportunities.</p>
            </CardContent>
          </Card>
          <NewHereForm />
        </Container>
      </section>
    </div>
  );
}

