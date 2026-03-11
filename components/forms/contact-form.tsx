"use client";

import { useActionState } from "react";

import { submitContactForm } from "@/lib/actions/contact";
import { initialActionState } from "@/types/actions";
import { FieldError } from "@/components/forms/field-error";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [state, action] = useActionState(submitContactForm, initialActionState);

  return (
    <form action={action} className="space-y-5 rounded-[1.5rem] border border-white/60 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" name="name" placeholder="Your name" />
          <FieldError errors={state.errors?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" name="email" type="email" placeholder="you@example.com" />
          <FieldError errors={state.errors?.email} />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input id="contact-phone" name="phone" placeholder="Optional" />
          <FieldError errors={state.errors?.phone} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-subject">Subject</Label>
          <Input id="contact-subject" name="subject" placeholder="How can we help?" />
          <FieldError errors={state.errors?.subject} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" name="message" placeholder="Tell us how we can pray for you or help you connect." />
        <FieldError errors={state.errors?.message} />
      </div>
      {state.message ? (
        <p className={state.success ? "text-sm text-emerald-600" : "text-sm text-red-600"}>{state.message}</p>
      ) : null}
      <SubmitButton label="Send Message" pendingLabel="Sending..." className="w-full md:w-auto" />
    </form>
  );
}

