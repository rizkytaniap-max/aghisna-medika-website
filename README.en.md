# RSU Aghisna Medika Sidareja — Hospital Profile Website

Next.js 14 (App Router) + TypeScript + TailwindCSS. A full 8-page website:
Home, About Us, Services & Facilities, Doctors & Medical Staff, Doctor
Schedule, Treatment Information, Health News & Articles, Careers, and
Contact.

> This is the English reference version of `README.md`, which is the primary
> document (in Indonesian) for the hospital's staff maintaining this site.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

> Note: `next/font/google` (Inter & Plus Jakarta Sans) needs network access
> to fonts.googleapis.com the first time you run `npm run build` / `npm run dev`.
> This works out of the box on any machine with normal internet access
> (local dev, Vercel, etc.).

## Project structure

```
app/
  layout.tsx                 → root layout: fonts, SEO metadata, Navbar/Footer/WA button
  page.tsx                   → Homepage (Hero, stats, services, today's schedule, rooms, articles, CTA+map)
  globals.css                 → design tokens (colors, buttons, cards) via Tailwind @layer
  robots.ts / sitemap.ts      → auto-generated robots.txt / sitemap.xml
  not-found.tsx                → custom 404 page
  icon.svg                     → favicon (RS monogram)
  tentang-kami/               → About Us
  layanan/                     → Services & Facilities
  dokter/                       → Doctors & Medical Staff
  jadwal-dokter/                 → Doctor Schedule (filterable)
  informasi-berobat/             → Treatment Information
  berita/, berita/[slug]/          → Health News listing + detail pages
  karir/                          → Careers
  kontak/                          → Contact

components/                    → Navbar, Footer, WhatsAppButton, Button, Section,
                                  PageHeader, DoctorCard, AccreditationSeal, Reveal
                                  (scroll animations), beranda/ (homepage sections),
                                  jadwal/ (schedule filter)

data/                          → ALL structured content, editable without touching
                                  components (hospital profile, services, bed capacity,
                                  medical staff stats, doctor schedules, articles, group
                                  affiliation)

public/images/                 → hero, fasilitas, kamar, dokter, berita, logo
                                  (replace Unsplash placeholders with real photos)
```

## Design

- Palette: navy (`navy-800/900`) as primary, teal (`teal-500`) as CTA/active
  accent, gold (`gold-400`) for premium accents & the accreditation badge,
  soft mist grays for backgrounds/dividers.
- Typography: **Plus Jakarta Sans** (headings) + **Inter** (body).
- Signature element: a circular gold "Terakreditasi Paripurna" seal
  (`AccreditationSeal`), used on the Hero and About Us page.
- Subtle scroll-reveal animations (Framer Motion) throughout, respecting
  `prefers-reduced-motion`.

## Deployment

See `README.md` for the full Indonesian step-by-step guide (GitHub + Vercel,
custom domain, DNS setup). In short:

```bash
git remote add origin https://github.com/USERNAME/aghisna-medika.git
git push -u origin main
```

Then import the repo on https://vercel.com/new — zero config needed, Next.js
is auto-detected.

## Still to be completed by the hospital's team

- Replace placeholder Unsplash photos in `public/images/` with real photos.
- Replace the Muhammadiyah Gombong Group placeholder logos
  (`data/group.ts`, `logo` field) with real logo files.
- Confirm and fill in BPJS/insurance information on the Treatment
  Information page.
- Fill in active job openings on the Careers page.
- Replace the 3 sample articles in `data/artikel.ts` with real content.
