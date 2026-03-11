import type { SiteSetting } from "@/types/cms";

export function getSetting(settings: SiteSetting[], key: string, fallback = "") {
  return settings.find((setting) => setting.key === key)?.value ?? fallback;
}

