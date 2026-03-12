import { LoginForm } from "@/components/forms/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminSections } from "@/lib/admin-config";
import { getAdminAccess } from "@/lib/auth";
import { getAdminCollection } from "@/lib/data/queries";
import {
  demoAnnouncements,
  demoContactSubmissions,
  demoEvents,
  demoHomepageSections,
  demoLeaders,
  demoMediaAssets,
  demoNavigation,
  demoNewHereSubmissions,
  demoPageSections,
  demoSermons,
  demoSiteSettings,
} from "@/lib/demo-content";

export default async function AdminDashboardPage() {
  const access = await getAdminAccess();

  if (!access.isAuthenticated || !access.isAdmin) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-700">AKCC Admin</p>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Admin access lives here.</h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-200">
            Sign in here with your admin email and password, then manage the live AKCC website from this same URL.
          </p>
        </div>
        <Card className="border-white/10 bg-white/95 text-slate-900">
          <CardHeader>
            <CardTitle>{access.isAuthenticated ? "Admin access required" : "Sign in to AKCC admin"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {access.isAuthenticated && !access.isAdmin ? (
              <p className="text-sm text-red-600">This signed-in account does not have the admin role.</p>
            ) : null}
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    );
  }

  const [settings, navigation, homepageSections, pageSections, sermons, events, announcements, leaders, contactSubmissions, newHereSubmissions, mediaAssets] = await Promise.all([
    getAdminCollection("site_settings", demoSiteSettings, "label", true),
    getAdminCollection("navigation_items", demoNavigation, "sort_order", true),
    getAdminCollection("homepage_sections", demoHomepageSections, "sort_order", true),
    getAdminCollection("page_sections", demoPageSections, "sort_order", true),
    getAdminCollection("sermons", demoSermons, "date", false),
    getAdminCollection("events", demoEvents, "date", true),
    getAdminCollection("announcements", demoAnnouncements, "publish_date", false),
    getAdminCollection("leaders", demoLeaders, "sort_order", true),
    getAdminCollection("contact_submissions", demoContactSubmissions, "created_at", false),
    getAdminCollection("new_here_submissions", demoNewHereSubmissions, "created_at", false),
    getAdminCollection("media_assets", demoMediaAssets, "created_at", false),
  ]);

  const cards = [
    ["Settings", settings.length],
    ["Navigation Items", navigation.length],
    ["Homepage Blocks", homepageSections.length],
    ["Page Sections", pageSections.length],
    ["Published Sermons", sermons.length],
    ["Events", events.length],
    ["Announcements", announcements.length],
    ["Leaders", leaders.length],
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
