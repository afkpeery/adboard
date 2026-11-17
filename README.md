# AdBoard™

An interactive advertising-marketplace demo built with Next.js 15, React, TypeScript, Tailwind CSS, Three.js, GSAP, and Framer Motion. The homepage is an explorable neon city with digital billboard inventory. The expanded skyline contains 13 architectural prisms and 18 selectable ad surfaces: front façades, side screens, portrait towers, rooftop ribbons, and street kiosks. Roof planes, setbacks, window grids, structural edges, grounded shadows, and a lit street canyon give the buildings volume. City and map views share the same inventory and selection actions.

## Run locally

Use Node.js 22.6 or later (Node.js 24 recommended).

```sh
npm install
npm run dev
```

Visit the URL printed by Next.js. `npm run typecheck` checks TypeScript, `npm test` runs the domain tests, and `npm run build` generates the static site in `out/`. Because this project uses Next.js static export, `npm start` / `next start` is not the production serving command; serve the `out/` directory with a static host. Sites is configured to publish that output.

## What this version does

The app demonstrates interactive city exploration, billboard discovery, inventory pricing, campaign planning, sample bidding, advertiser discovery, saved campaigns, and watchlists. Demo campaign and preference state uses this browser's localStorage. It is device-local, can be cleared, and is not a shared marketplace database. Seed campaigns and their performance figures are illustrative. Campaigns can be followed, saved, and voted on, and campaign drafts preserve their selected billboard placement. Bids do not compete with real advertisers, and no funds are transferred or payment details collected.

The five industry guides are statically generated with individual metadata and canonical URLs. The build also generates `sitemap.xml` and `robots.txt`, and the layout provides WebSite and Organization structured data. These are technical foundations; they do not imply search rankings or indexing. The Site is private by default, so search engines cannot crawl it unless its owner changes audience access.

This deployment uses static generation rather than Next.js server-side rendering. No autonomous AI agents, external trend feeds, live traffic measurements, payment processing, shared auction engine, production analytics pipeline, or background content publication are connected. Dashboard examples and automation concepts should be treated as demo information.

## Production requirements

The original platform brief spans infrastructure that must be provisioned and connected before commercial use:

- Deploy Next.js SSR to a compatible runtime, with cache policy and CDN behavior appropriate to public inventory and user-specific data. Replace localStorage business records with authenticated, authorized server APIs.
- Implement a NestJS API backed by PostgreSQL, with transactional inventory reservation, ownership checks, overlapping-placement validation, auction deadlines, bid increments, atomic winner selection, campaign moderation, and a complete audit trail. Use Redis for ephemeral state and jobs; database transactions remain authoritative.
- Add Stripe and/or PayPal through server-created checkouts and verified, idempotent webhooks. Keep payment secrets server-side. Handle refunds, taxes, invoicing, expired reservations, and failed recurring payments before enabling real purchases.
- Define advertiser accounts and access control. Validate uploaded creative and outbound URLs, enforce content rules, and store media using an approved object store/CDN. Build a privacy and retention policy for visitor analytics and account data.
- Connect a real event pipeline for impressions, clicks, conversions, and campaign reports. Protect it against duplicate and automated events, and establish the meaning of a billable impression.
- Provision Elasticsearch if search volume warrants it; retain the database as the source of truth. Configure AWS and Cloudflare infrastructure with secure secrets, backups, deployment controls, and recovery procedures.
- Connect Sentry, Datadog, and/or Grafana with actual telemetry, alert routing, and operational ownership. Test accessibility, reduced-motion behavior, small screens, Core Web Vitals, and failure states.
- Add authorized trend-data providers and a scheduled content pipeline before enabling AI traffic agents. Review factual quality, originality, source permissions, SEO value, and publication policy. Human approval or a documented publishing policy must govern automated changes.
- Add consent-aware analytics, abuse prevention, moderation, support, billing terms, and legal review before accepting public advertiser funds.

Update canonical origins in the SEO files if the production domain changes. No API keys or credentials belong in source control.
