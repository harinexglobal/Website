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

Current values. The address changed on 2026-08-10: `harinexglobal@gmail.com` was
suspended by Google and started bouncing with "the address couldn't be found or is
unable to receive email", while it was the published contact point in seven places
across the site, the legal pages and the structured data. It was swapped for the
working account rather than left advertising a dead mailbox. Change it back, or to
company mail, in `CONTACT.email` — everything else follows from there.

| Field | Value |
|---|---|
| Email | `harinex.india@gmail.com` |
| Mobile | `+886 974 025 045` |
| WhatsApp | same number — `https://wa.me/886974025045` |
| Head office | 3F, No. 10, Wenhua 7th Rd., Guishan Dist., Taoyuan City 333004, Taiwan (R.O.C.) |
| India branch | No 6, 3rd Floor, 5th Main, 1st Cross, Tata Nagar, Bengaluru 560092, Karnataka |

> The head office is in **Taoyuan City**, not Taipei. Early drafts said "Taipei"
> because that is what the supplied design mockup showed; it was never a real
> address. Corrected across the site, the legal pages and the jurisdiction clause
> on 2026-08-04. The two leadership profiles still say "New Taipei City" — that is
> where those individuals are based and is unrelated to the office.

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

`POST /api/inquiry` validates every submission server-side against the same Zod schema
the browser uses, screens bots with a honeypot, and delivers by email. Delivery lives
in `lib/mail.ts`; the route only decides what to do with the result.

With no provider configured the route still returns `{ ok: true, delivered: false }`
and the success modal shows a `mailto:` fallback — so an inquiry is never silently
lost, whether the cause is missing configuration or a provider outage.

### Gmail (works today, no domain needed)

1. Turn on 2-Step Verification on the Google account.
2. Create an App Password at <https://myaccount.google.com/apppasswords>. A normal
   account password will **not** authenticate.
3. Set one variable, removing the spaces Google puts in the 16-character password and
   URL-encoding the `@` in the address as `%40`:

   ```
   SMTP_URL=smtps://harinex.india%40gmail.com:abcdefghijklmnop@smtp.gmail.com:465
   ```

In Netlify that goes in **Site configuration → Environment variables**. Nothing else is
required: `INQUIRY_TO` defaults to `CONTACT.email` in `lib/content.ts`, and the From
address defaults to the authenticated mailbox because Gmail rewrites it to that anyway.

### Moving to company mail later

Set `INQUIRY_TO` to the new address. That is the whole change — no code edit.

Once a domain is verified with Resend, set `RESEND_API_KEY` and `INQUIRY_FROM` and
remove `SMTP_URL`. `SMTP_URL` takes precedence while both are present.

### Testing delivery locally

```bash
npx maildev --smtp 1025 --web 1080
```

Point `SMTP_URL` at `smtp://user:pass@127.0.0.1:1025`, submit the form, and read the
message at <http://localhost:1080>. Any SMTP server works — but a hand-rolled socket
listener is not worth the afternoon it costs, as this repo's history records.

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

> ⚠️ **Deploys are metered.** The account is on a credit plan (300 per billing
> cycle). Batch your changes and deploy **once** when they are settled — not
> after every edit. `npm run build`, `npm run typecheck`, `npm run lint` and
> `git push` are all free; only the deploy costs.
>
> For the same reason, continuous deployment is deliberately **not** connected:
> every push to `main` would trigger a build, and pushes are frequent.

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
> - the governing-law and jurisdiction clause (currently ROC law, Taoyuan District Court)
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
  `harinex.india@gmail.com`, confirmed by the company.)
- The Chinese registered name **瀚瑞國際股份有限公司 is unchanged** — the Latin
  spelling does not affect it.
