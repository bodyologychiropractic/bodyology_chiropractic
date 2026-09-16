# Editing content

Content used to live in `tina/` + `content/*.json` (TinaCMS). It now lives in
Postgres and is edited through Payload CMS at `/admin`.

## Local setup

1. Start Postgres:
   ```bash
   docker compose up -d
   ```
2. Copy `.env.example` to `.env.local` and fill in `DATABASE_URL` /
   `PAYLOAD_SECRET` (already done for local dev; only needed again on a fresh
   clone).
3. Install dependencies and run the app:
   ```bash
   npm install
   npm run dev
   ```
4. Visit `http://localhost:3000/admin`. On first run Payload prompts you to
   create the first admin user (email + password) — that becomes your login
   for future visits.
5. Edit Settings / Fees / About / Home / Page Heroes (globals) and Services
   (a normal collection, one document per service) from the admin sidebar.
   Changes are read live by the site's Server Components on the next
   request/build (no redeploy needed for `next dev`; a production deploy
   picks up new content on the next request too, since pages read from
   Payload's local API at request/build time).

## One-time migration

`scripts/seed-payload.ts` was a one-off script used to migrate the old
`content/**/*.json` Tina files into Payload/Postgres. It has already been run
against this database and the `content/` directory has been deleted. You do
not need to run it again unless restoring from the original Tina export.

## Adding tracking / head scripts

This is unchanged from before and is a deliberate choice: there is **no CMS
field for injecting arbitrary `<head>`/`<body>` scripts**, to avoid turning
the CMS into a code-execution vector. To add or change a tracking script
(GA, Meta Pixel, GTM, etc.), edit the relevant component under
`src/components/seo/` (e.g. `GoogleAnalytics.tsx`, `GoogleTagManager.tsx`,
`MetaPixel.tsx`) and/or `src/app/layout.tsx`, then deploy normally.

## SEO fields

Services and the page-level globals (Home, Fees, About, PageHero's
fees/contact/services groups) each have an optional `seo.title` /
`seo.description` group in the admin UI. When filled in, these override the
hardcoded fallback title/description used by `generateMetadata()`. Leave them
blank to keep the sensible defaults baked into the page components.
