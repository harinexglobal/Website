# HariNext Global — Corporate Website

Official website for **HariNext Global Co., Ltd. (瀚瑞國際股份有限公司)** — cross-border technology
transfer, corporate trade advisory and specialised technical localisation between Taiwan, India and
global markets.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Images | `next/image`, pre-optimised WebP |

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on **http://localhost:3210**.

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

---

## Project layout

```
app/
  layout.tsx            root layout, fonts, metadata, providers
  page.tsx              home
  about/                About Us
  capabilities/         Capabilities (7 practices)
  industries/           Industry verticals
  why-taiwan-india/     The bilateral case
  insights/             Case studies & insights + careers
  contact/              Project inquiry
  api/inquiry/route.ts  form endpoint (validates; delivery not yet wired)
  sitemap.ts robots.ts not-found.tsx

components/
  providers/            LanguageProvider (EN / 繁體中文)
  site/                 page sections (Navbar, Hero, CapabilitiesTabs, …)
  pages/                per-route client compositions
  ui/                   Button, field primitives, Reveal, SectionHeading, icons

lib/
  content.ts            EVERY string on the site, in both languages
  blur.ts               generated blur placeholders
  inquiry-schema.ts     Zod schema shared by client + server
  utils.ts              cn() helper

scripts/                one-off asset preparation (see below)
public/brand/           optimised logo + photography
```

---

## Editing content

**All copy lives in `lib/content.ts`.** Nothing is hard-coded in components.

The file exports two trees, `en` and `zh`. `en` defines the shape and `zh` is typed as
`Dict`, so if you add a key to one language and forget the other, `npm run typecheck`
fails. That is deliberate — it stops the Chinese site drifting out of sync.

To change a heading, find it in `en` and change the matching key in `zh`.

### Contact details

Email, phone and office locations are in the `CONTACT` constant at the bottom of
`lib/content.ts`.

> ⚠️ **The phone number `+886 987 654 321` was taken from the supplied design mockup and
> looks like a placeholder.** Replace it with the real company number before launch.
> The email `info@harinextglobal.com` came from the same mockup — confirm it is live.

---

## Bilingual behaviour

- Toggle in the navbar: **EN | 繁中**
- Choice persists in `localStorage` under `harinext.lang`
- `<html lang>` updates to `en` / `zh-Hant-TW` for screen readers and search engines

This is a client-side dictionary swap, not route-based i18n. If you later want
`/zh/...` URLs for separate indexing in Chinese, that is a migration to Next.js
route-based i18n — the content layer is already structured for it.

---

## Assets

Source artwork lives in `Images/`. Optimised web versions are generated into
`public/brand/` by two scripts:

```bash
node scripts/prepare-logo.mjs     # knocks the white background out of logo.png,
                                  # emits logo-full.png + logo-mark.png
node scripts/prepare-images.mjs   # photographs -> WebP + writes lib/blur.ts
```

Re-run these only if the source images change. Output is committed, so a fresh
clone does not need to run them.

| Generated file | Used by |
|---|---|
| `logo-mark.png` | navbar, footer |
| `hero.webp` | home hero |
| `about.webp` | About page hero |
| `capabilities.webp` | Capabilities page hero |
| `industries.webp` | Industries page hero |
| `bridge.webp` | Why Taiwan & India hero, Industries banner |
| `india-growth.webp` | home + bridge page banners |

---

## Wiring up the contact form

`POST /api/inquiry` **validates** every submission server-side against the same Zod
schema the browser uses, and has a honeypot field for bots. It does **not** yet send
email.

Until a provider is configured the route returns `{ ok: true, delivered: false }`, and
the success modal shows the visitor a `mailto:` fallback so no inquiry is silently
lost.

To enable real delivery:

1. Set `RESEND_API_KEY` (or `SMTP_URL`) and `INQUIRY_TO` in your environment —
   in Netlify: **Site configuration → Environment variables**.
2. In `app/api/inquiry/route.ts`, replace the `TODO` with the provider call and
   return `delivered: true`.

The detection logic is already in place; only the send call is missing.

---

## Deploying

### 1. Push to GitHub

```bash
git remote add origin https://github.com/ganechem002-commits/harinext-global.git
git push -u origin main
```

Create the repository first at <https://github.com/new> (owner
`ganechem002-commits`, name `harinext-global`). A private repo is recommended to
start; flip it public whenever you like.

### 2. Deploy to Netlify

Easiest route — connect the repo:

1. <https://app.netlify.com/teams/ganechem002/projects> → **Add new project → Import an existing project**
2. Pick the GitHub repo. Netlify reads `netlify.toml`, so build command and publish
   directory are already correct.
3. Add environment variable `NEXT_PUBLIC_SITE_URL` = your final domain.

Or from the CLI:

```bash
npx netlify-cli login
npx netlify-cli init      # links this folder to a Netlify project
npx netlify-cli deploy --build --prod
```

`netlify.toml` already sets Node 22, the Next.js runtime plugin, security headers and
immutable caching for `/brand/*`.

---

## Accessibility & performance notes

- Skip-to-content link, breadcrumbs, and `aria-*` wiring on tabs, dropdown and dialog
- `prefers-reduced-motion` is honoured globally in `globals.css` and per-component via
  Framer Motion's `useReducedMotion`
- Photographs sit behind navy scrims so headline contrast never depends on the artwork
- Every hero image is a pre-sized WebP under 110 KB with a blur placeholder
- Home page first-load JS: ~188 KB

---

## Known gaps

These are deliberate and need a decision from the business, not a code change:

1. **Contact phone number** is a mockup placeholder — see above.
2. **Insight articles** are titles and excerpts only; each card shows
   "Article coming soon". Article bodies need writing.
3. **LinkedIn URL** in `CONTACT.linkedin` is `#` — set the real profile.
4. **Privacy Policy / Terms / Disclaimer** are footer labels without pages behind
   them. They need real content before launch, particularly for a firm handling
   client technical documents.
5. **Chennai office** is described as "opening soon" — update when it is real.
