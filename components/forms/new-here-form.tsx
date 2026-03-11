"use client";

import { useActionState } from "react";

import { FieldError } from "@/components/forms/field-error";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitNewHereForm } from "@/lib/actions/contact";
import { initialActionState } from "@/types/actions";

const interests = ["Sunday worship", "Small groups", "Youth ministry", "Children’s ministry", "Serving", "Prayer"];

export function NewHereForm() {
  const [state, action] = useActionState(submitNewHereForm, initialActionState);

  return (
    <form action={action} className="space-y-5 rounded-[1.5rem] border border-white/60 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-name">Name</Label>
          <Input id="new-name" name="name" placeholder="Your name" />
          <FieldError errors={state.errors?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-email">Email</Label>
          <Input id="new-email" name="email" type="email" placeholder="you@example.com" />
          <FieldError errors={state.errors?.email} />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-phone">Phone</Label>
          <Input id="new-phone" name="phone" placeholder="Optional" />
          <FieldError errors={state.errors?.phone} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="household-size">Household Size</Label>
          <Input id="household-size" name="household_size" type="number" min="1" max="20" placeholder="Optional" />
          <FieldError errors={state.errors?.household_size} />
        </div>
      </div>
      <div className="space-y-3">
        <Label>Interested In</Label>
        <div className="grid gap-3 md:grid-cols-2">
          {interests.map((interest) => (
            <label key={interest} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
              <input type="checkbox" name="interested_in" value={interest} className="h-4 w-4 rounded border-slate-300" />
              <span>{interest}</span>
            </label>
          ))}
        </div>
        <FieldError errors={state.errors?.interested_in} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="prayer-request">Prayer Request</Label>
        <Textarea id="prayer-request" name="prayer_request" placeholder="Optional prayer request or note for our team." />
        <FieldError errors={state.errors?.prayer_request} />
      </div>
      {state.message ? (
        <p className={state.success ? "text-sm text-emerald-600" : "text-sm text-red-600"}>{state.message}</p>
      ) : null}
      <SubmitButton label="Connect With AKCC" pendingLabel="Submitting..." className="w-full md:w-auto" />
    </form>
  );
}

