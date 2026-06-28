# Linaw Dinig Hearing Aid Center

Marketing website for **Linaw Dinig Hearing Aid Center** — a trusted provider of
hearing healthcare in the Philippines, with branches in Tanay (Rizal), Cebu,
Dasmariñas (Cavite) and Rosario (La Union).

> *"Linaw Dinig"* translates to **Clear Hearing**. Tagline: *Clear Hearing. Better Living.*

## Features

- Service pages for hearing evaluation, hearing aid fittings, repairs,
  assistive listening devices and follow-up care
- About section (clinic, audiologists, why-choose-us) and patient resources
  (FAQs, new-patient info, what-to-expect)
- Interactive **hearing quiz**, testimonials, branch directory and an ambient
  music player
- Appointment **booking form** (client-side validation) and a lightweight
  **admin CMS** backed by `localStorage`
- SEO-ready: per-page `metadata`, Open Graph tags and a generated
  `sitemap.xml`

## Tech stack

- **Next.js 15** — App Router, React 19, Server Components
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) + `tw-animate-css`
- **shadcn/ui** components on Radix primitives (`src/components/ui`)
- **TanStack Query** provider in the app shell (`src/app/providers.tsx`)
- **react-hook-form** + **zod** for forms, **lucide-react** icons,
  **recharts** for charts
- **TypeScript**

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

### Environment

Set `NEXT_PUBLIC_SITE_URL` to your production origin so `metadataBase` and the
sitemap emit absolute URLs. Defaults to `http://localhost:3000`.

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Project structure

```
src/
├─ app/                    # App Router pages
│  ├─ about/               # clinic, audiologists, why-choose-us
│  ├─ services/            # evaluation, fittings, repairs, ALDs, follow-up care
│  ├─ patients/            # faqs, new-patient-info, what-to-expect
│  ├─ book/                # booking form (page.tsx + "use client" BookPage)
│  ├─ admin/               # localStorage-backed CMS
│  ├─ sitemap.xml/route.ts # generated sitemap
│  ├─ layout.tsx           # root shell: header, footer, music player, providers
│  ├─ not-found.tsx / error.tsx
│  └─ providers.tsx        # TanStack Query provider
├─ components/
│  ├─ site/                # header, footer, hero, quiz, testimonials, etc.
│  └─ ui/                  # shadcn/ui primitives
├─ hooks/                  # use-mobile
└─ lib/
   ├─ company.ts           # single source of truth: name, contact, branches, hours
   └─ utils.ts
```

Pages with client-side interactivity (`/book`, `/admin`) split into a server
`page.tsx` (which exports `metadata`) and a sibling `"use client"` component.

## Company data

All company details — name, contact info, social links and the four branch
listings (address, phone, hours, Facebook) — live in a single source of truth at
[`src/lib/company.ts`](src/lib/company.ts). Update content there rather than in
individual components.

## Notes

- The booking form and admin CMS are intentionally front-end only (client-side
  validation and `localStorage` persistence). Wiring them to a real backend
  (server action / database) is left for future work.
