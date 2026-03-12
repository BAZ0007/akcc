create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default timezone('utc'::text, now()),
  unique (user_id, role)
);

create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.roles
    where roles.user_id = user_id
      and roles.role = 'admin'
  );
$$;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  value text not null,
  "group" text not null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  location text not null check (location in ('header', 'footer')),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  title text not null,
  subtitle text,
  body text,
  cta_label text,
  cta_href text,
  secondary_cta_label text,
  secondary_cta_href text,
  image_url text,
  sort_order integer not null default 0,
  is_enabled boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  section_key text not null,
  title text not null,
  subtitle text,
  body text,
  cta_label text,
  cta_href text,
  secondary_cta_label text,
  secondary_cta_href text,
  image_url text,
  sort_order integer not null default 0,
  is_enabled boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (page_key, section_key)
);

create table if not exists public.sermons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  speaker text not null,
  date date not null,
  scripture text,
  summary text,
  thumbnail_url text,
  youtube_url text not null,
  is_published boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  date date not null,
  time text not null,
  location text not null,
  image_url text,
  rsvp_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  cta_label text,
  cta_href text,
  publish_date date not null,
  expires_at date,
  is_published boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.leaders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_title text not null,
  bio text,
  image_url text,
  email text,
  phone text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.new_here_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  household_size integer,
  prayer_request text,
  interested_in text[] not null default '{}',
  created_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_path text not null,
  public_url text,
  mime_type text,
  bucket text not null default 'site-media',
  alt_text text,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists sermons_published_date_idx on public.sermons (is_published, date desc);
create index if not exists events_published_date_idx on public.events (is_published, date asc);
create index if not exists announcements_published_date_idx on public.announcements (is_published, publish_date desc);
create index if not exists navigation_location_sort_idx on public.navigation_items (location, sort_order);
create index if not exists homepage_sort_idx on public.homepage_sections (sort_order);
create index if not exists page_sections_page_sort_idx on public.page_sections (page_key, sort_order);

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute procedure public.set_updated_at();

create trigger set_site_settings_updated_at
before update on public.site_settings
for each row
execute procedure public.set_updated_at();

create trigger set_navigation_items_updated_at
before update on public.navigation_items
for each row
execute procedure public.set_updated_at();

create trigger set_homepage_sections_updated_at
before update on public.homepage_sections
for each row
execute procedure public.set_updated_at();

create trigger set_page_sections_updated_at
before update on public.page_sections
for each row
execute procedure public.set_updated_at();

create trigger set_sermons_updated_at
before update on public.sermons
for each row
execute procedure public.set_updated_at();

create trigger set_events_updated_at
before update on public.events
for each row
execute procedure public.set_updated_at();

create trigger set_announcements_updated_at
before update on public.announcements
for each row
execute procedure public.set_updated_at();

create trigger set_leaders_updated_at
before update on public.leaders
for each row
execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.site_settings enable row level security;
alter table public.navigation_items enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.page_sections enable row level security;
alter table public.sermons enable row level security;
alter table public.events enable row level security;
alter table public.announcements enable row level security;
alter table public.leaders enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.new_here_submissions enable row level security;
alter table public.media_assets enable row level security;

create policy "Profiles are viewable by owner or admins"
on public.profiles
for select
using (auth.uid() = id or public.is_admin(auth.uid()));

create policy "Profiles are editable by owner or admins"
on public.profiles
for update
using (auth.uid() = id or public.is_admin(auth.uid()))
with check (auth.uid() = id or public.is_admin(auth.uid()));

create policy "Roles are admin readable"
on public.roles
for select
using (public.is_admin(auth.uid()));

create policy "Roles are admin manageable"
on public.roles
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Public can read site settings"
on public.site_settings
for select
using (true);

create policy "Admins manage site settings"
on public.site_settings
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Public can read visible navigation"
on public.navigation_items
for select
using (is_visible = true);

create policy "Admins manage navigation"
on public.navigation_items
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Public can read enabled homepage sections"
on public.homepage_sections
for select
using (is_enabled = true);

create policy "Admins manage homepage sections"
on public.homepage_sections
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Public can read enabled page sections"
on public.page_sections
for select
using (is_enabled = true);

create policy "Admins manage page sections"
on public.page_sections
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Public can read published sermons"
on public.sermons
for select
using (is_published = true);

create policy "Admins manage sermons"
on public.sermons
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Public can read published events"
on public.events
for select
using (is_published = true);

create policy "Admins manage events"
on public.events
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Public can read published announcements"
on public.announcements
for select
using (is_published = true and (expires_at is null or expires_at >= current_date));

create policy "Admins manage announcements"
on public.announcements
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Public can read leaders"
on public.leaders
for select
using (is_published = true);

create policy "Admins manage leaders"
on public.leaders
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Anyone can submit contact forms"
on public.contact_submissions
for insert
with check (true);

create policy "Admins read contact submissions"
on public.contact_submissions
for select
using (public.is_admin(auth.uid()));

create policy "Anyone can submit new here forms"
on public.new_here_submissions
for insert
with check (true);

create policy "Admins read new here submissions"
on public.new_here_submissions
for select
using (public.is_admin(auth.uid()));

create policy "Public can read media metadata"
on public.media_assets
for select
using (true);

create policy "Admins manage media metadata"
on public.media_assets
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into storage.buckets (id, name, public)
values
  ('site-media', 'site-media', true),
  ('documents', 'documents', true)
on conflict (id) do nothing;

create policy "Public can read media objects"
on storage.objects
for select
using (bucket_id in ('site-media', 'documents'));

create policy "Admins can upload media objects"
on storage.objects
for insert
with check (bucket_id in ('site-media', 'documents') and public.is_admin(auth.uid()));

create policy "Admins can update media objects"
on storage.objects
for update
using (bucket_id in ('site-media', 'documents') and public.is_admin(auth.uid()))
with check (bucket_id in ('site-media', 'documents') and public.is_admin(auth.uid()));

create policy "Admins can delete media objects"
on storage.objects
for delete
using (bucket_id in ('site-media', 'documents') and public.is_admin(auth.uid()));



