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

export async function getAdminAccess() {
  const user = await getCurrentUser();

  if (!isSupabaseConfigured) {
    return {
      user: null,
      role: "admin" as const,
      isPreviewMode: true,
      isAuthenticated: true,
      isAdmin: true,
    };
  }

  if (!user) {
    return {
      user: null,
      role: null,
      isPreviewMode: false,
      isAuthenticated: false,
      isAdmin: false,
    };
  }

  const role = await getCurrentUserRole(user.id);

  return {
    user,
    role,
    isPreviewMode: false,
    isAuthenticated: true,
    isAdmin: role === "admin",
  };
}

export async function requireAdmin() {
  const access = await getAdminAccess();

  if (!access.isAuthenticated || !access.isAdmin) {
    redirect("/admin");
  }

  return access;
}
