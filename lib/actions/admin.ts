"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { adminSectionsBySlug } from "@/lib/admin-config";
import { isSupabaseConfigured } from "@/lib/env";
import { queueSermonEnrichment } from "@/lib/integrations/hooks";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function coerceFieldValue(type: string, rawValue: FormDataEntryValue | null) {
  if (type === "checkbox") {
    return rawValue === "on";
  }

  if (type === "number") {
    return rawValue ? Number(rawValue) : null;
  }

  if (!rawValue) {
    return null;
  }

  return String(rawValue);
}

function revalidateCmsRoutes(sectionSlug: string) {
  const routes = [
    "/",
    "/about",
    "/sermons",
    "/events",
    "/contact",
    "/new-here",
    "/admin",
    `/admin/${sectionSlug}`,
  ];

  routes.forEach((route) => revalidatePath(route));
}

export async function saveCmsRecordAction(formData: FormData) {
  const sectionSlug = String(formData.get("section") ?? "");
  const id = String(formData.get("id") ?? "").trim();
  const section = adminSectionsBySlug[sectionSlug];

  if (!section || section.readOnly) {
    redirect("/admin?error=invalid-section");
  }

  await requireAdmin();

  if (!isSupabaseConfigured) {
    redirect(`/admin/${section.slug}?status=preview`);
  }

  const payload = Object.fromEntries(
    section.fields.map((field) => [field.name, coerceFieldValue(field.type, formData.get(field.name))]),
  );

  const supabase = await createSupabaseServerClient();
  const query = id ? supabase.from(section.table).update(payload).eq("id", id) : supabase.from(section.table).insert(payload);
  const { error } = await query;

  if (error) {
    redirect(`/admin/${section.slug}?error=${encodeURIComponent(error.message)}`);
  }

  if (section.slug === "sermons") {
    await queueSermonEnrichment(payload);
  }

  revalidateCmsRoutes(section.slug);
  redirect(`/admin/${section.slug}?status=saved`);
}

export async function deleteCmsRecordAction(formData: FormData) {
  const sectionSlug = String(formData.get("section") ?? "");
  const id = String(formData.get("id") ?? "").trim();
  const section = adminSectionsBySlug[sectionSlug];

  if (!section || !section.supportsDelete) {
    redirect("/admin?error=invalid-delete");
  }

  await requireAdmin();

  if (!isSupabaseConfigured) {
    redirect(`/admin/${section.slug}?status=preview`);
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from(section.table).delete().eq("id", id);

  if (error) {
    redirect(`/admin/${section.slug}?error=${encodeURIComponent(error.message)}`);
  }

  revalidateCmsRoutes(section.slug);
  redirect(`/admin/${section.slug}?status=deleted`);
}
