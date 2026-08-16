# AstroPixel — Complete SEO & Brand Visibility Strategy

**Scope:** Branded search, Bangladesh local SEO, international expansion, entity/GEO (AI search) authority  
**Canonical Domain:** `https://astropixel.tech` (non-www)  
**Founder:** Sofiullah Ahammad (Rajshahi, Bangladesh)

---

## 0. Primary Directives & Indexing Requirements
- **SPA Indexing Priority (#0):** Ensure crawler-readable prerendering/SSR metadata so Googlebot and Bingbot render rich page content.
- **Keyword Hygiene:** Meta-keywords trimmed from 200+ stuffed tags to 5–8 targeted keywords: `AstroPixel, creative agency Rajshahi, logo design Bangladesh, branding agency Bangladesh, UI UX design agency, web design agency, Sofiullah Ahammad`.

---

## 1. Targeted Keyword Priorities (P1 / P2 / P3)
- **P1 (Immediate - High Intent / Low Competition):**
  - Branded terms (`AstroPixel`, `AstroPixel Rajshahi`, `AstroPixel Bangladesh`, `Sofiullah Ahammad AstroPixel`)
  - Local city commercial queries (`creative agency Rajshahi`, `logo design Rajshahi`, `UI UX designer Rajshahi`)
  - Bangla-language queries (`লোগো ডিজাইন রাজশাহী`, `গ্রাফিক ডিজাইন এজেন্সি বাংলাদেশ`)
- **P2 (Medium Term):**
  - National commercial terms (`branding agency Bangladesh`, `web design agency Bangladesh`)
  - Value/offshore international terms (`affordable branding agency for startups`, `remote UI UX design agency`)
- **P3 (Long Term - Requires Authority):**
  - Generic global terms (`branding agency UK`, `UI UX design agency USA`)

---

## 2. Website SEO Structure & Routes

```
Home                              (/)
About                             (/about)
Services                          (/services)
├─ Logo & Brand Identity Design   (/services/logo-brand-identity)
├─ Branding & Brand Strategy      (/services/branding)
├─ UI/UX Design                   (/services/ui-ux-design)
├─ Web Design & Development       (/services/web-design-development)
└─ Social Media Design            (/services/social-media-design)
Work / Portfolio                  (/work)
Contact                           (/contact)
```

---

## 3. Structured Data (JSON-LD Schemas)
- `Organization` (Name: AstroPixel, Founder: Sofiullah Ahammad, sameAs profiles)
- `LocalBusiness` (Rajshahi, BD, geo coordinates, NAP match)
- `ProfessionalService` (Service catalog for Logo, Branding, UI/UX, Web Design, Social Media)
- `WebSite` & `BreadcrumbList`
- `FAQPage` with Generative Engine Optimization (GEO) answers for AI Search (ChatGPT, Perplexity, Gemini, Google SGE).

---

## 4. Technical & Local SEO Guidelines
- **NAP Consistency:** Exact match across footer, GBP, Behance, Dribbble, Facebook, LinkedIn.
- **Sitemap & Robots:** Clean XML sitemap (`/sitemap.xml`) submitted to GSC & Bing Webmaster.
- **Preloader & Performance:** Preloaded critical logo/fonts for fast LCP (< 2.5s).
- **Helmet Component (`src/components/SEO.tsx`):** Handles per-route titles (<60 chars), descriptions (<160 chars), canonicals, Open Graph, and Twitter Cards dynamically.
