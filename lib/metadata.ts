import type { Metadata } from "next";

import { getSetting } from "@/lib/data/helpers";
import { getPageSections, getSiteSettings } from "@/lib/data/queries";
import { getSectionMap } from "@/lib/page-content";

export async function buildPageMetadata(pageKey: string, fallbackTitle: string, fallbackDescription: string): Promise<Metadata> {
  const [settings, sections] = await Promise.all([getSiteSettings(), getPageSections(pageKey)]);
  const sectionMap = getSectionMap(sections);
  const metaSection = sectionMap.meta;

  return {
    title: metaSection?.title ?? fallbackTitle,
    description: metaSection?.body ?? fallbackDescription ?? getSetting(settings, "meta_default_description"),
  };
}
