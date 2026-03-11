"use client";

import { useActionState } from "react";

import { FieldError } from "@/components/forms/field-error";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/lib/actions/auth";
import { initialActionState } from "@/types/actions";

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initialActionState);

  return (
    <form action={action} className="space-y-5 rounded-[1.5rem] border border-white/60 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="login-email">Admin Email</Label>
        <Input id="login-email" name="email" type="email" placeholder="admin@akcc.org.au" />
        <FieldError errors={state.errors?.email} />
      </div>
      {state.message ? (
        <p className={state.success ? "text-sm text-emerald-600" : "text-sm text-red-600"}>{state.message}</p>
      ) : null}
      <SubmitButton label="Send Magic Link" pendingLabel="Sending..." className="w-full" />
    </form>
  );
}

