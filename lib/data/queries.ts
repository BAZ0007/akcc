import "server-only";

import {
  demoAnnouncements,
  demoEvents,
  demoHomepageSections,
  demoLeaders,
  demoNavigation,
  demoSermons,
  demoSiteSettings,
} from "@/lib/demo-content";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Announcement,
  EventItem,
  HomepageSection,
  Leader,
  NavigationItem,
  Sermon,
  SiteSetting,
} from "@/types/cms";

async function selectRows<T>(table: string, orderColumn: string, ascending = true): Promise<T[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from(table).select("*").order(orderColumn, { ascending });

  if (error) {
    console.error(`Failed to query ${table}`, error);
    return [];
  }

  return (data ?? []) as T[];
}

export async function getSiteSettings(): Promise<SiteSetting[]> {
  if (!isSupabaseConfigured) {
    return demoSiteSettings;
  }

  const settings = await selectRows<SiteSetting>("site_settings", "label");
  return settings.length ? settings : demoSiteSettings;
}

export async function getNavigation(location?: "header" | "footer"): Promise<NavigationItem[]> {
  if (!isSupabaseConfigured) {
    return demoNavigation.filter((item) => (location ? item.location === location : true)).sort((a, b) => a.sort_order - b.sort_order);
  }

  const supabase = await createSupabaseServerClient();
  let query = supabase.from("navigation_items").select("*").eq("is_visible", true).order("sort_order", { ascending: true });

  if (location) {
    query = query.eq("location", location);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Failed to query navigation_items", error);
    return demoNavigation.filter((item) => (location ? item.location === location : true)).sort((a, b) => a.sort_order - b.sort_order);
  }

  return ((data ?? []) as NavigationItem[]).filter((item) => item.is_visible);
}

export async function getHomepageSections(): Promise<HomepageSection[]> {
  if (!isSupabaseConfigured) {
    return demoHomepageSections.sort((a, b) => a.sort_order - b.sort_order);
  }

  const sections = await selectRows<HomepageSection>("homepage_sections", "sort_order");
  return (sections.length ? sections : demoHomepageSections).filter((section) => section.is_enabled);
}

export async function getPublishedSermons(): Promise<Sermon[]> {
  if (!isSupabaseConfigured) {
    return demoSermons.filter((sermon) => sermon.is_published);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("sermons")
    .select("*")
    .eq("is_published", true)
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to query sermons", error);
    return demoSermons.filter((sermon) => sermon.is_published);
  }

  return (data ?? []) as Sermon[];
}

export async function getPublishedEvents(): Promise<EventItem[]> {
  if (!isSupabaseConfigured) {
    return demoEvents.filter((eventItem) => eventItem.is_published).sort((a, b) => a.date.localeCompare(b.date));
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("date", { ascending: true });

  if (error) {
    console.error("Failed to query events", error);
    return demoEvents.filter((eventItem) => eventItem.is_published);
  }

  return (data ?? []) as EventItem[];
}

export async function getPublishedAnnouncements(): Promise<Announcement[]> {
  if (!isSupabaseConfigured) {
    return demoAnnouncements.filter((announcement) => announcement.is_published);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_published", true)
    .order("publish_date", { ascending: false });

  if (error) {
    console.error("Failed to query announcements", error);
    return demoAnnouncements.filter((announcement) => announcement.is_published);
  }

  return (data ?? []) as Announcement[];
}

export async function getPublishedLeaders(): Promise<Leader[]> {
  if (!isSupabaseConfigured) {
    return demoLeaders.filter((leader) => leader.is_published).sort((a, b) => a.sort_order - b.sort_order);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leaders")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to query leaders", error);
    return demoLeaders.filter((leader) => leader.is_published);
  }

  return (data ?? []) as Leader[];
}

export async function getHomePageData() {
  const [settings, navigation, footerNavigation, homepageSections, sermons, events, announcements, leaders] = await Promise.all([
    getSiteSettings(),
    getNavigation("header"),
    getNavigation("footer"),
    getHomepageSections(),
    getPublishedSermons(),
    getPublishedEvents(),
    getPublishedAnnouncements(),
    getPublishedLeaders(),
  ]);

  return {
    settings,
    navigation,
    footerNavigation,
    homepageSections,
    sermons,
    events,
    announcements,
    leaders,
  };
}

export async function getAdminCollection<T>(table: string, fallback: T[], orderColumn = "created_at", ascending = false): Promise<T[]> {
  if (!isSupabaseConfigured) {
    return fallback;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from(table).select("*").order(orderColumn, { ascending });

  if (error) {
    console.error(`Failed to query ${table}`, error);
    return fallback;
  }

  return (data ?? []) as T[];
}

