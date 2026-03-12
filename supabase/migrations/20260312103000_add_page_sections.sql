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

create index if not exists page_sections_page_sort_idx on public.page_sections (page_key, sort_order);

create trigger set_page_sections_updated_at
before update on public.page_sections
for each row
execute procedure public.set_updated_at();

alter table public.page_sections enable row level security;

create policy "Public can read enabled page sections"
on public.page_sections
for select
using (is_enabled = true);

create policy "Admins manage page sections"
on public.page_sections
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));
