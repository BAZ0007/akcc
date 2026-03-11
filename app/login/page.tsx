import Link from "next/link";

import { LoginForm } from "@/components/forms/login-form";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/env";

export default function LoginPage() {
  return (
    <section className="bg-hero-gradient py-24 text-white">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr,0.9fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold-300">AKCC Admin</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Secure access for site administrators.</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-200">Admins sign in through Supabase Auth, then role-based access controls determine who can enter the AKCC CMS.</p>
          {!isSupabaseConfigured ? (
            <Button asChild variant="gold" size="lg">
              <Link href="/admin">Open Local Preview</Link>
            </Button>
          ) : null}
        </div>
        <Card className="border-white/10 bg-white/95 text-slate-900">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}

