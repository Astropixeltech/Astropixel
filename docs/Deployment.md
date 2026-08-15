# Deployment

## Architecture
Decoupled: static React SPA + Supabase backend. Frontend can be redeployed on any static host without touching backend.

## Frontend
Build:
```bash
bun run build      # outputs dist/
```
Deploy `dist/` to:
- **Vercel (primary)**: `astropixel.tech`
- **Lovable Publish** (fallback / asset origin): `alphazero00.lovable.app`
- **Netlify** / **Cloudflare Pages** as further fallback (persistence beyond Lovable subscription).

SPA fallback route is handled by `vercel.json` (`/(.*) → /index.html`).

## Environment Variables (frontend)
Provided by Lovable Cloud, must exist at build time:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

If any is missing the built site fails silently — never blank them.

## Backend
Managed by Lovable Cloud (Supabase). Migrations applied through the platform migration tool. Edge Functions in `supabase/functions/` deploy automatically.

## Secrets (server-only)
Configured in Supabase Vault (do not commit): `CLOUDINARY_*`, `RESEND_API_KEY`, `UDDOKTAPAY_*`, `TELEGRAM_*`, `LOVABLE_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

## Domains
- Primary: `https://astropixel.tech` (Vercel + custom domain)
- Lovable Preview: `id-preview--<id>.lovable.app`
- Lovable Published: `alphazero00.lovable.app` (used as `__l5e` asset origin proxy)
- Custom: DNS via A + CNAME records (see `mem://technical/dns-configuration-v1`)
- Sub-brand: `learn.<domain>` triggers Learn variant of `/`, `/about`, `/contact` and swaps favicons.

## Vercel Custom Domain Setup
1. Import this Git repo into Vercel (or use `vercel --prod` CLI).
2. In Vercel Project Settings → Domains, add `astropixel.tech`.
3. Add DNS records at your registrar:
   - Type A, Name `@`, Value `76.76.21.21`
   - Type CNAME, Name `www`, Value `cname.vercel-dns.com`
4. Wait for Vercel to validate (usually seconds to minutes).
5. Enable HTTPS auto-redirect in Vercel.

## Asset Origin Note
`vercel.json` proxies `/__l5e/*` requests to `alphazero00.lovable.app` so Lovable-managed assets referenced in `src/assets/*.asset.json` continue to load. Long-term, migrate these assets to Cloudinary or the local `public/` folder to remove this dependency.

## Security Headers
Applied via Cloudflare Transform Rules (CSP, HSTS, etc.). See `mem://technical/security-headers-server-config-v1`.

## Analytics
GA4 (`G-TKCXDY69Q9`) embedded in `index.html`.

## Post-deploy Checklist
1. Verify login flows for all three roles.
2. Verify UddoktaPay checkout succeeds end-to-end.
3. Trigger a test enrollment → Telegram + Resend welcome.
4. Confirm certificate PDF generates.
5. Run Lighthouse on `/` and `/courses`.
6. Confirm SEO tags render (not placeholder).
7. Verify `astropixel.tech` redirects to HTTPS and `www` redirects to non-www.
