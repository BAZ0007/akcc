"use server";

import { redirect } from "next/navigation";

import { env, isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validation/forms";
import type { ActionState } from "@/types/actions";

export async function loginAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted field.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!isSupabaseConfigured) {
    return {
      success: true,
      message: "Supabase is not configured locally, so admin preview mode is available without sign-in.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${env.siteUrl}/auth/callback`,
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Magic link sent. Check your inbox to continue.",
  };
}

export async function logoutAction() {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect("/login");
}
