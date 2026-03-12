import { notFound } from "next/navigation";

import { ContentTable } from "@/components/admin/content-table";
import { EntityForm } from "@/components/admin/entity-form";
import { MediaManager } from "@/components/admin/media-manager";
import { StatusBanner } from "@/components/admin/status-banner";
import { adminSectionsBySlug } from "@/lib/admin-config";
import { requireAdmin } from "@/lib/auth";
import { getAdminCollection } from "@/lib/data/queries";
import {
  demoAnnouncements,
  demoContactSubmissions,
  demoEvents,
  demoHomepageSections,
  demoMediaAssets,
  demoNavigation,
  demoNewHereSubmissions,
  demoSermons,
  demoSiteSettings,
} from "@/lib/demo-content";
import type { MediaAsset } from "@/types/cms";

function toRecordArray<T extends object>(items: T[]) {
  return items as unknown as Record<string, unknown>[];
}

const fallbacks: Record<string, Record<string, unknown>[]> = {
  settings: toRecordArray(demoSiteSettings),
  navigation: toRecordArray(demoNavigation),
  homepage: toRecordArray(demoHomepageSections),
  sermons: toRecordArray(demoSermons),
  events: toRecordArray(demoEvents),
  announcements: toRecordArray(demoAnnouncements),
  "contact-submissions": toRecordArray(demoContactSubmissions),
  "new-here-submissions": toRecordArray(demoNewHereSubmissions),
  media: toRecordArray(demoMediaAssets),
};

export default async function AdminSectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams?: Promise<{ edit?: string; status?: string; error?: string }>;
}) {
  await requireAdmin();

  const { section: slug } = await params;
  const resolvedSearch = searchParams ? await searchParams : undefined;
  const section = adminSectionsBySlug[slug];

  if (!section) {
    notFound();
  }

  const rows = await getAdminCollection(section.table, fallbacks[slug] ?? [], section.orderColumn, section.ascending ?? false);
  const editRecord = resolvedSearch?.edit
    ? rows.find((row) => String(row.id ?? row.key ?? row.slug ?? row.title) === resolvedSearch.edit)
    : undefined;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold text-slate-950">{section.title}</h2>
        <p className="text-sm leading-7 text-slate-600">{section.description}</p>
      </div>
      <StatusBanner status={resolvedSearch?.status} error={resolvedSearch?.error} />
      {slug === "media" ? <MediaManager assets={rows as unknown as MediaAsset[]} /> : null}
      {!section.readOnly && slug !== "media" ? <EntityForm section={section} record={editRecord} /> : null}
      <ContentTable
        title={section.title}
        section={slug}
        rows={rows}
        columns={section.listColumns}
        supportsDelete={section.supportsDelete}
        allowEdit={!section.readOnly && slug !== "media"}
      />
    </div>
  );
}
