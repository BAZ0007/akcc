# AKCC Website

A production-oriented full-stack church website for Australian Kachin Christian Church, built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui patterns, and Supabase.

## Architecture Summary

- `Next.js App Router` powers the public site, auth flows, and protected admin CMS routes.
- `Supabase Auth` handles sign-in, sessions, and admin identity.
- `Supabase Postgres` stores editable CMS content, form submissions, profiles, and roles.
- `Supabase Storage` holds site images, sermon thumbnails, and downloadable files.
- `Server components` fetch content for the public site and admin dashboards.
- `Client components` handle forms, upload workflows, and interactive admin controls.
- `Server actions` validate mutations and centralize writes.
- `RLS policies` enforce public-read/admin-write access patterns at the database layer.
- Integration hooks are prepared for `n8n`, admin notifications, welcome flows, and future AI enrichment.

## Folder Structure

```text
app/
  about/
  admin/
  auth/callback/
  contact/
  events/
  login/
  new-here/
  sermons/
components/
  admin/
  forms/
  layout/
  sections/
  ui/
lib/
  actions/
  data/
  integrations/
  supabase/
  validation/
db/
  schema.sql
  seed.sql
types/
```

## Route Map

### Public
- `/`
- `/about`
- `/sermons`
- `/events`
- `/contact`
- `/new-here`
- `/login`
- `/auth/callback`

### Admin
- `/admin`
- `/admin/settings`
- `/admin/navigation`
- `/admin/homepage`
- `/admin/sermons`
- `/admin/events`
- `/admin/announcements`
- `/admin/contact-submissions`
- `/admin/new-here-submissions`
- `/admin/media`

## Content Model

Editable content is database-driven for:
- navigation items
- homepage hero and supporting sections
- CTA labels and links
- service time and location
- footer content
- sermons
- events
- announcements

Core tables:
- `profiles`
- `roles`
- `site_settings`
- `navigation_items`
- `homepage_sections`
- `sermons`
- `events`
- `announcements`
- `leaders`
- `contact_submissions`
- `new_here_submissions`
- `media_assets`

## Admin Permission Model

- Admins authenticate through Supabase Auth.
- New users are mirrored into `profiles` via trigger.
- Admin access is granted by inserting an `admin` role into `public.roles`.
- Middleware protects `/admin` from unauthenticated visitors.
- Server-side `requireAdmin()` guards sensitive routes and mutations.
- Postgres RLS policies enforce public-read and admin-write rules.

Example role assignment after creating an auth user:

```sql
insert into public.roles (user_id, role)
values ('YOUR_AUTH_USER_UUID', 'admin');
```

## Setup

1. Install dependencies.

```bash
npm install
```

2. Copy env vars.

```bash
cp .env.example .env.local
```

3. Fill in the required values:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (preferred) or `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (optional until you add privileged server-side workflows)
- `NEXT_PUBLIC_SITE_URL`
- Optional webhook and AI keys for integrations

4. Apply the database schema in Supabase SQL editor.
- Run [`db/schema.sql`](./db/schema.sql)
- Run [`db/seed.sql`](./db/seed.sql)

5. Start the development server.

```bash
npm run dev
```

## Supabase Notes

### Auth
- The login screen uses magic-link sign-in.
- `NEXT_PUBLIC_SITE_URL` should match your local or deployed site URL.
- In Supabase Auth settings, add the callback URL:
  - `http://localhost:3000/auth/callback`
  - your production Vercel URL equivalent

### Storage
- Buckets created by schema:
  - `site-media`
  - `documents`
- Admin uploads in `/admin/media` go to Supabase Storage and then create a `media_assets` record.

### RLS
- Public visitors can read published or enabled content.
- Anonymous visitors can submit `contact_submissions` and `new_here_submissions`.
- Only admins can manage CMS tables and media metadata.

## Deployment on Vercel

1. Push the project to GitHub.
2. Import the repo into Vercel.
3. Add the same environment variables from `.env.local`.
4. Confirm the production site URL in `NEXT_PUBLIC_SITE_URL`.
5. Add the production callback URL to Supabase Auth.
6. Redeploy after any schema or env change.

This project uses no platform-specific Node APIs, so it is compatible with standard Vercel deployment for Next.js.

## Automation and AI Extension Points

Prepared integration points live in [`lib/integrations/hooks.ts`](./lib/integrations/hooks.ts).

Examples:
- n8n workflow trigger after contact form submission
- admin notifications after new visitor submissions
- sermon enrichment pipeline after sermon saves
- future welcome-email orchestration
- future AI classification or summary generation

## Implementation Phases Covered

1. Base app shell and reusable UI primitives
2. Public pages with responsive layouts
3. Supabase schema, seed content, and data layer
4. Auth flow and admin route protection
5. Admin CMS screens and media management foundation
6. Contact and new-here persistence flows
7. Setup and deployment documentation

## Local Preview Mode

If Supabase env vars are not set, the site falls back to a typed demo dataset so the UI remains previewable. Production behavior expects Supabase to be configured.


## Supabase CLI Workflow

This repo now includes a local Supabase project in [`supabase/config.toml`](./supabase/config.toml), a migration in [`supabase/migrations/20260311233500_initial_schema.sql`](./supabase/migrations/20260311233500_initial_schema.sql), and a seed file in [`supabase/seed.sql`](./supabase/seed.sql).

Useful commands:

```bash
npm run supabase:start
npm run supabase:status
npm run supabase:db:reset
npm run supabase:link
npm run supabase:db:push
npm run supabase:types
```

Notes:
- `npm run supabase:start` boots a full local Supabase stack with Studio.
- `npm run supabase:db:reset` replays the migration and seed locally.
- `npm run supabase:link` links this repo to your hosted Supabase project.
- `npm run supabase:db:push` applies the repo migration to the linked remote project.
- `npm run supabase:types` generates typed database definitions into `types/supabase.ts` after linking.

## Admin Bootstrap

After you create your first admin user in Supabase Auth, run [`db/bootstrap-admin.sql`](./db/bootstrap-admin.sql) with that user UUID to grant the `admin` role.

## What�s Still Needed For Live Connection

To finish wiring this app to your real Supabase project, I still need these actual values:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- your Supabase project ref, if you want me to run `supabase link`
- a Supabase personal access token, if you want me to run `supabase link` from this machine

Once you share those, I can populate `.env.local`, link the project, and complete the hosted Supabase setup flow.

## Git and Vercel Prep

This repo is now initialized as a Git repository and includes Vercel helper files:
- [vercel.json](./vercel.json)
- [.vercelignore](./.vercelignore)

Useful commands:

```bash
npm run vercel:pull
npm run vercel:build
npm run vercel:deploy
npm run vercel:deploy:prod
```

Before deploying to Vercel:
- push this repo to GitHub
- import the repo into Vercel
- add these environment variables in Vercel Project Settings
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SITE_URL` set to your production domain
  - optional webhook and OpenAI keys if used
- in Supabase Auth, add your production callback URL
  - `https://YOUR-DOMAIN/auth/callback`

Recommended first deployment flow:
1. Commit and push the repo to GitHub.
2. Import the GitHub repo into Vercel.
3. Copy the environment variables from `.env.local` into Vercel.
4. Deploy.
5. Update `NEXT_PUBLIC_SITE_URL` locally and in Vercel to the final production URL.
6. Add the same production URL to Supabase redirect settings.
