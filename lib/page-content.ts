import type { PageSection } from "@/types/cms";

export function getSectionMap(sections: PageSection[]) {
  return Object.fromEntries(sections.map((section) => [section.section_key, section])) as Record<string, PageSection>;
}

export function splitContent(value?: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
