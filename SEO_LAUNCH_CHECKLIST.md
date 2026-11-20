# SEO & AI Search Production Launch Checklist
**Official Production Domain:** `https://narayanaresorts.com`  
**Staging / Preview Reference:** `https://narayanagreenresortswebsite.vercel.app/`

---

## 1. Custom Domain & Canonical Configuration (Vercel / Hosting)
- [ ] **Attach Primary Domain:** In Vercel Project Settings → Domains, add `narayanaresorts.com` and `www.narayanaresorts.com`.
- [ ] **Enforce Single Canonical Host:** Set `https://narayanaresorts.com` (non-www, HTTPS) as the primary domain and configure a permanent `308`/`301` redirect from `www.narayanaresorts.com` → `https://narayanaresorts.com`.
- [ ] **Set Production Environment Variable:**
  ```env
  NEXT_PUBLIC_SITE_URL="https://narayanaresorts.com"
  ```
- [ ] **Protect Staging / Preview URLs from Indexing:**
  - The codebase automatically checks `VERCEL_ENV !== 'production'` in `/lib/seo.ts` and `/app/robots.ts` to serve `noindex, nofollow` on preview builds while keeping canonical tags pointed to `https://narayanaresorts.com`.
  - Confirm in Vercel Settings → Deployment Protection that preview URLs are not submitted to search engines.

---

## 2. Google Search Console Setup & Verification
- [ ] **Create Domain Property:** Open [Google Search Console](https://search.google.com/search-console) and add `narayanaresorts.com` (Domain property via DNS TXT record or URL-prefix property `https://narayanaresorts.com`).
- [ ] **HTML Tag Verification (Optional):** Copy the Google verification token and set it in your production environment variables:
  ```env
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="your_google_verification_token"
  ```
- [ ] **Submit XML Sitemap:** In Google Search Console → Sitemaps, submit:
  - `https://narayanaresorts.com/sitemap.xml`
- [ ] **Request Priority Indexing via URL Inspection:**
  1. `https://narayanaresorts.com/`
  2. `https://narayanaresorts.com/stay`
  3. `https://narayanaresorts.com/stay/suites`
  4. `https://narayanaresorts.com/stay/cottages`
  5. `https://narayanaresorts.com/stay/pool-view`
  6. `https://narayanaresorts.com/stay/garden-view`
  7. `https://narayanaresorts.com/weddings-events`
  8. `https://narayanaresorts.com/dining`
  9. `https://narayanaresorts.com/experiences`
  10. `https://narayanaresorts.com/bodh-gaya-guide`
  11. `https://narayanaresorts.com/contact`

---

## 3. Bing Webmaster Tools & ChatGPT Search Readiness
- [ ] **Import from Google Search Console:** Open [Bing Webmaster Tools](https://www.bing.com/webmasters) and import your verified `https://narayanaresorts.com` property directly from GSC (or verify via `NEXT_PUBLIC_BING_SITE_VERIFICATION`).
- [ ] **Submit Sitemap to Bing:** Submit `https://narayanaresorts.com/sitemap.xml` (Bing index powers both Microsoft Copilot and major discovery signals used by ChatGPT Search).
- [ ] **Verify `robots.txt` AI Search Rules:** Visit `https://narayanaresorts.com/robots.txt` after deployment and confirm:
  - `Googlebot`, `Bingbot`, `OAI-SearchBot`, `Applebot`, and `PerplexityBot` have `Allow: /`.
  - `GPTBot` has `Disallow: /` (unless the resort owner chooses to allow open training scraping in the future).
- [ ] **Verify `llms.txt` Accessibility:** Visit `https://narayanaresorts.com/llms.txt` and confirm it returns HTTP 200 `text/plain`.

---

## 4. Google Analytics 4 (GA4) & Conversion Tracking Activation
- [ ] **Configure GA4 / GTM Environment Variables:**
  ```env
  NEXT_PUBLIC_GA4_MEASUREMENT_ID="G-XXXXXXXXXX"
  NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
  ```
- [ ] **Mark Key Events as Conversions in GA4 Admin → Events:**
  - `booking_enquiry_submitted` (Fires when a guest validates and submits a Stay or Dining enquiry form)
  - `wedding_proposal_enquiry` (Fires when a guest submits a Destination Wedding or family celebration enquiry)
  - `corporate_event_enquiry` (Fires when a guest submits a Corporate Conference or group retreat enquiry)
  - `whatsapp_enquiry_clicked` (Fires when a guest clicks to send the formatted WhatsApp transcript)
  - `phone_number_clicked` (Fires on direct front-desk phone calls)
  - `email_enquiry_clicked` (Fires on reservation email fallback clicks)

---

## 5. Rich Results & Schema Validation Post-Deploy
- [ ] Test the live production URLs in [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/):
  - Homepage (`/`) → Verify `WebSite`, `Resort`, `LodgingBusiness`, `Restaurant`, `EventVenue`, and `FAQPage`.
  - Room Pages (`/stay/suites`, `/stay/cottages`, `/stay/pool-view`, `/stay/garden-view`) → Verify `Suite` / `HotelRoom`, `BreadcrumbList`, and `FAQPage`.
  - Weddings & Events (`/weddings-events`) → Verify `EventVenue`, `BreadcrumbList`, and `FAQPage`.
  - Dining (`/dining`) → Verify `Restaurant`, `MenuSection` (`Maharaj Magadh Thali`), `BreadcrumbList`, and `FAQPage`.
