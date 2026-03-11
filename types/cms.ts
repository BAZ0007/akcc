export type RoleName = "admin" | "editor" | "viewer";

export interface SiteSetting {
  key: string;
  label: string;
  value: string;
  group: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  sort_order: number;
  is_visible: boolean;
  location: "header" | "footer";
}

export interface HomepageSection {
  id: string;
  section_key: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  cta_label: string | null;
  cta_href: string | null;
  secondary_cta_label: string | null;
  secondary_cta_href: string | null;
  image_url: string | null;
  sort_order: number;
  is_enabled: boolean;
}

export interface Sermon {
  id: string;
  title: string;
  slug: string;
  speaker: string;
  date: string;
  scripture: string | null;
  summary: string | null;
  thumbnail_url: string | null;
  youtube_url: string;
  is_published: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string | null;
  rsvp_url: string | null;
  is_published: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  cta_label: string | null;
  cta_href: string | null;
  publish_date: string;
  expires_at: string | null;
  is_published: boolean;
}

export interface Leader {
  id: string;
  name: string;
  role_title: string;
  bio: string | null;
  image_url: string | null;
  email: string | null;
  phone: string | null;
  sort_order: number;
  is_published: boolean;
}

export interface MediaAsset {
  id: string;
  title: string;
  file_path: string;
  public_url: string | null;
  mime_type: string | null;
  bucket: string;
  alt_text: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}

export interface NewHereSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  household_size: number | null;
  prayer_request: string | null;
  interested_in: string[];
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface PublicSiteData {
  navigation: NavigationItem[];
  footerNavigation: NavigationItem[];
  siteSettings: SiteSetting[];
  homepageSections: HomepageSection[];
  sermons: Sermon[];
  events: EventItem[];
  announcements: Announcement[];
  leaders: Leader[];
}

