import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  if (!isSupabaseConfigured) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Failed to load current user", error);
    return null;
  }

  return data.user;
}

export async function getCurrentUserRole(userId: string) {
  if (!isSupabaseConfigured) {
    return "admin" as const;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("roles").select("role").eq("user_id", userId).maybeSingle();

  if (error) {
    console.error("Failed to load user role", error);
    return null;
  }

  return data?.role ?? null;
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!isSupabaseConfigured) {
    return { user: null, role: "admin" as const, isPreviewMode: true };
  }

  if (!user) {
    redirect("/login?next=/admin");
  }

  const role = await getCurrentUserRole(user.id);
  if (role !== "admin") {
    redirect("/login?error=not-authorized");
  }

  return { user, role, isPreviewMode: false };
}

