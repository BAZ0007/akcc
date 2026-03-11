import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminSections } from "@/lib/admin-config";
import { getAdminCollection } from "@/lib/data/queries";
import {
  demoAnnouncements,
  demoContactSubmissions,
  demoEvents,
  demoMediaAssets,
  demoNavigation,
  demoNewHereSubmissions,
  demoSermons,
  demoSiteSettings,
} from "@/lib/demo-content";

export default async function AdminDashboardPage() {
  const [settings, navigation, sermons, events, announcements, contactSubmissions, newHereSubmissions, mediaAssets] = await Promise.all([
    getAdminCollection("site_settings", demoSiteSettings, "label", true),
    getAdminCollection("navigation_items", demoNavigation, "sort_order", true),
    getAdminCollection("sermons", demoSermons, "date", false),
    getAdminCollection("events", demoEvents, "date", true),
    getAdminCollection("announcements", demoAnnouncements, "publish_date", false),
    getAdminCollection("contact_submissions", demoContactSubmissions, "created_at", false),
    getAdminCollection("new_here_submissions", demoNewHereSubmissions, "created_at", false),
    getAdminCollection("media_assets", demoMediaAssets, "created_at", false),
  ]);

  const cards = [
    ["Settings", settings.length],
    ["Navigation Items", navigation.length],
    ["Published Sermons", sermons.length],
    ["Events", events.length],
    ["Announcements", announcements.length],
    ["Contact Messages", contactSubmissions.length],
    ["New Here Leads", newHereSubmissions.length],
    ["Media Assets", mediaAssets.length],
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle className="text-base">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold text-navy-950">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Sections</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-slate-600">
          {adminSections.map((section) => (
            <div key={section.slug} className="rounded-2xl border border-slate-200 px-4 py-3">
              <p className="font-medium text-slate-900">{section.title}</p>
              <p>{section.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

