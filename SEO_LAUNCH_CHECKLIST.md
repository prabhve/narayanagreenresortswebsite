# SEO, Search Console & Analytics Launch Checklist
**Official Production Domain:** `https://narayanaresorts.com`  
**Staging / Preview Reference:** `https://narayanagreenresortswebsite.vercel.app/`

---

## 1. Environment Variables Reference (Local & Production Deployment)

All search engine verification and analytics integrations are **strictly optional**. The website compiles, runs, and passes all SEO checks even when every optional variable is left empty (`""`) or omitted.

> **Security & Hygiene Rules:**
> - **Never** enter fake verification tokens or dummy analytics IDs (such as `G-XXXXXXXXXX` or `GTM-XXXXXXX`). Leave optional variables empty (`""`) until you have real production values.
> - **Never** prefix private server credentials or API keys with `NEXT_PUBLIC_`.

| Variable Name | Required / Optional | Scope | Purpose & Behavior When Empty |Format Example (Do Not Use Dummy Values) |
| :--- | :---: | :---: | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public / Build | Sets the canonical production URL for `<link rel="canonical">`, Open Graph tags, `sitemap.xml`, `robots.txt`, and JSON-LD `@id` URIs. Defaults safely to `https://narayanaresorts.com`. | `https://narayanaresorts.com` |
| `GOOGLE_SITE_VERIFICATION` *(or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`)* | **Optional** | Server `<head>` | Injects `<meta name="google-site-verification" content="..." />` in the root layout. **Omitted completely when empty.** | `abc123XYZ_token_from_gsc` |
| `BING_SITE_VERIFICATION` *(or `NEXT_PUBLIC_BING_SITE_VERIFICATION`)* | **Optional** | Server `<head>` | Injects `<meta name="msvalidate.01" content="..." />` in the root layout. **Omitted completely when empty.** | `1234567890ABCDEF1234567890ABCDEF` |
| `GTM_ID` *(or `NEXT_PUBLIC_GTM_ID`)* | **Optional** | Script Loader | Loads the Google Tag Manager container script. **Not loaded when empty.** If configured, standalone `gtag.js` is automatically skipped to prevent duplicate GA4 pageviews. | `GTM-A1B2C3D` |
| `GA4_MEASUREMENT_ID` *(or `NEXT_PUBLIC_GA4_MEASUREMENT_ID`)* | **Optional** | Script Loader | Loads standalone Google Analytics 4 (`gtag.js`) **only** when `GTM_ID` is not set. **Not loaded when empty.** | `G-1A2B3C4D5E` |

---

## 2. How to Configure Locally (`.env.local`)

1. Copy `.env.example` to `.env.local` in the project root:
   ```bash
   cp .env.example .env.local
   ```
2. Keep `NEXT_PUBLIC_SITE_URL="https://narayanaresorts.com"`.
3. Leave `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `GA4_MEASUREMENT_ID`, and `GTM_ID` empty (`""`) during local development so local pageviews do not pollute production analytics.
4. Run `npm run dev` (uses `next dev --turbopack`) or `npm run build` (`next build`).

---

## 3. How to Configure in Production (Vercel / Cloud Hosting)

1. **Custom Domain Setup:**
   - In Vercel Project Settings → **Domains**, attach `narayanaresorts.com` and `www.narayanaresorts.com`.
   - Set `https://narayanaresorts.com` as the primary domain and configure a permanent `308`/`301` redirect from `www.narayanaresorts.com` → `https://narayanaresorts.com`.
2. **Environment Variables Setup (Vercel Project Settings → Environment Variables):**
   - Set `NEXT_PUBLIC_SITE_URL` = `https://narayanaresorts.com` (for **Production**).
   - *(Optional)* Once you have your real Google Search Console HTML verification token, add `GOOGLE_SITE_VERIFICATION` for **Production**.
   - *(Optional)* Once you have your real Bing Webmaster verification token, add `BING_SITE_VERIFICATION` for **Production**.
   - *(Optional — Choose Either GTM or Standalone GA4)*:
     - **If you manage GA4 inside Google Tag Manager:** Set `GTM_ID` (or `NEXT_PUBLIC_GTM_ID`) to your real `GTM-...` container ID. Do **not** need a second standalone GA4 script—`AnalyticsScripts.tsx` automatically loads only the GTM container when `GTM_ID` is present, preventing duplicate GA4 pageviews.
     - **If you use standalone GA4 without GTM:** Leave `GTM_ID` unset and set `GA4_MEASUREMENT_ID` (or `NEXT_PUBLIC_GA4_MEASUREMENT_ID`) to your real `G-...` Measurement ID.
3. **Preview Deployment Protection:**
   - On Vercel Preview deployments (`VERCEL_ENV=preview`), `/lib/seo.ts` and `/app/robots.ts` automatically output `noindex, nofollow` while keeping canonical URLs pointed to `https://narayanaresorts.com`.

---

## 4. Google Search Console & Bing Webmaster Submission Steps
- [ ] **Submit XML Sitemap:** In Google Search Console and Bing Webmaster Tools, submit:
  - `https://narayanaresorts.com/sitemap.xml`
- [ ] **Verify `robots.txt` & `llms.txt`:**
  - Confirm `https://narayanaresorts.com/robots.txt` allows `Googlebot`, `Bingbot`, `OAI-SearchBot`, `Applebot`, and `PerplexityBot`.
  - Confirm `https://narayanaresorts.com/llms.txt` returns HTTP `200 OK`.
- [ ] **Mark First-Party Conversion Events in GA4 Admin → Events (Once Analytics Is Enabled):**
  - `booking_enquiry_submitted`
  - `wedding_proposal_enquiry`
  - `corporate_event_enquiry`
  - `whatsapp_enquiry_clicked`
  - `phone_number_clicked`
  - `email_enquiry_clicked`
