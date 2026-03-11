"use server";

import { isSupabaseConfigured } from "@/lib/env";
import { notifyContactSubmission, notifyNewHereSubmission } from "@/lib/integrations/hooks";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { contactFormSchema, newHereFormSchema } from "@/lib/validation/forms";
import type { ActionState } from "@/types/actions";

export async function submitContactForm(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("contact_submissions").insert(parsed.data);
    if (error) {
      return { success: false, message: error.message };
    }
  }

  await notifyContactSubmission(parsed.data);

  return {
    success: true,
    message: "Thanks for reaching out. Our team will follow up soon.",
  };
}

export async function submitNewHereForm(_: ActionState, formData: FormData): Promise<ActionState> {
  const interestedIn = formData.getAll("interested_in").map((value) => String(value));
  const parsed = newHereFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    household_size: formData.get("household_size") || undefined,
    prayer_request: formData.get("prayer_request") || undefined,
    interested_in: interestedIn,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("new_here_submissions").insert(parsed.data);
    if (error) {
      return { success: false, message: error.message };
    }
  }

  await notifyNewHereSubmission(parsed.data);

  return {
    success: true,
    message: "Thank you for introducing yourself. We would love to welcome you personally.",
  };
}
