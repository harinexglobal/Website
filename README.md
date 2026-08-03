# HariNex Global — Corporate Website

Official website for **HariNex Global Co., Ltd. (瀚瑞國際股份有限公司)** — cross-border technology
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

Current values, confirmed by the company on 2026-08-03:

| Field | Value |
|---|---|
| Email | `harinexglobal@gmail.com` |
| Mobile | `+886 974 025 045` |
| WhatsApp | same number — `https://wa.me/886974025045` |

`whatsapp` / `whatsappUrl` are stored separately from `phone` because `wa.me` requires
the number with no `+`, spaces or dashes, while `tel:` and the display string want the
formatted version.

---

## Bilingual behaviour

- Toggle in the navbar: **EN | 繁中**
- Choice persists in `localStorage` under `harinex.lang`
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

Both are already set up.

| | |
|---|---|
| Repository | <https://github.com/harinexglobal/Website> — branch `main`, public |
| Netlify project | `harinexglobal` (id `41881161-5805-4db3-870a-7a7f26875abe`) |
| Live site | <https://harinexglobal.netlify.app> |

### Deploying a change

```bash
npx netlify-cli deploy --build --prod
```

The folder is already linked (`.netlify/`, gitignored) and `NEXT_PUBLIC_SITE_URL`
is set in the Netlify environment.

`netlify.toml` sets Node 22, the Next.js runtime plugin and immutable caching for
`/brand/*`. Security headers are set in `next.config.mjs`, **not** `netlify.toml` —
HTML is served by the Next server handler function, which does not inherit
`netlify.toml` headers. Static assets still take their caching from `netlify.toml`.

### Continuous deployment

Not yet connected. To make every push to `main` deploy automatically, link the repo
in the Netlify UI — it requires installing the Netlify GitHub App, which cannot be
done from the CLI:

1. <https://app.netlify.com/projects/harinexglobal/configuration/deploys>
2. **Continuous deployment → Link repository → GitHub**, authorise, pick
   `harinexglobal/Website`, branch `main`
3. Leave build command and publish directory alone — `netlify.toml` supplies them

### Site visibility

New Netlify accounts default to SSO protection, which makes the site return **401**
to the public. It was turned off on 2026-08-03 (`sso_login: false`). If the site ever
starts returning 401 again, check **Site configuration → Access & security → Visitor
access**.

---

## Accessibility & performance notes

- Skip-to-content link, breadcrumbs, and `aria-*` wiring on tabs, dropdown and dialog
- `prefers-reduced-motion` is honoured globally in `globals.css` and per-component via
  Framer Motion's `useReducedMotion`
- Photographs sit behind navy scrims so headline contrast never depends on the artwork
- Every hero image is a pre-sized WebP under 110 KB with a blur placeholder
- Home page first-load JS: ~188 KB

---

## Legal pages

`/privacy`, `/terms` and `/disclaimer` are served from `lib/legal.ts` (kept separate
from `content.ts` because they are long and change on their own schedule). Both
languages, same type-safety rule: a key added to one must exist in the other.

They were written to describe **what this website actually does** — the exact contact
form fields, the `harinex.lang` value in localStorage, the absence of tracking cookies
or analytics, the hosting arrangement. That accuracy is the point; a generic template
would misdescribe the site.

> ⚠️ **These are drafts, not vetted legal documents.** Have them reviewed by a
> qualified lawyer in Taiwan before the company relies on them. Points that most
> need a professional eye:
> - the governing-law and jurisdiction clause (currently ROC law, Taipei District Court)
> - whether the PDPA rights wording matches your actual data-handling practice
> - whether the limitation of liability is enforceable as drafted
> - the disclaimer's regulatory paragraph, which states plainly that referring to
>   TFDA / CDSCO / ISO 13485 / REACH / ZDHC is **not** a claim to hold any
>   certification under them — confirm that reflects your position

If any factual detail changes — analytics added, a mail provider configured, a real
India office opened — the privacy policy needs updating to match.

## Known gaps

These are deliberate and need a decision from the business, not a code change:

1. **Insight articles** are titles and excerpts only; each card shows
   "Article coming soon". Article bodies need writing.
3. **LinkedIn URL** in `CONTACT.linkedin` is `#` — set the real profile.
4. ~~Privacy Policy / Terms / Disclaimer~~ — done, see above. Still needs a lawyer's
   them. They need real content before launch, particularly for a firm handling
   client technical documents.
5. **Chennai office** is described as "opening soon" — update when it is real.
6. **The logo artwork still spells the old name.** `Images/logo.png` (and the
   `public/brand/logo-full.png` generated from it) contain a raster wordmark reading
   "HariNext Global". The site is unaffected — the navbar and footer use
   `logo-mark.png`, which is the squirrel symbol only, and render the wordmark as live
   text — but `logo-full.png` is stale and should not be used until the logo is
   redrawn. Once you have a new logo file, drop it in as `Images/logo.png` and re-run
   `node scripts/prepare-logo.mjs`.

## Naming decisions taken without confirmation

The rename from "HariNext" to "HariNex" was applied as a straight token change, which
made these two calls. Both are one-line reversals:

- **Full name is "HariNex Global"**, and the legal entity "HariNex Global Co., Ltd.".
  To drop "Global" entirely, edit `site.name` / `site.legalName` in `lib/content.ts`
  and the three wordmarks in `navbar.tsx` / `footer.tsx`.
- **The canonical URL defaults to `harinexglobal.com`**, matching the new spelling.
  This is still unverified — it came from the design mockup. Set `NEXT_PUBLIC_SITE_URL`
  to whatever domain is actually registered. (The contact *email* is now settled:
  `harinexglobal@gmail.com`, confirmed by the company.)
- The Chinese registered name **瀚瑞國際股份有限公司 is unchanged** — the Latin
  spelling does not affect it.
