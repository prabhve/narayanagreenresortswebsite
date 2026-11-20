import Script from 'next/script';

const VALID_GTM_REGEX = /^GTM-[A-Z0-9]{4,12}$/i;
const VALID_GA4_REGEX = /^G-[A-Z0-9]{6,15}$/i;
const DUMMY_ID_REGEX = /^(G-X+|G-0+|G-123456|G-EXAMPLE|G-TEST|GTM-X+|GTM-0+|GTM-123456|GTM-EXAMPLE|GTM-TEST)$/i;

function resolveValidId(raw: string | undefined, pattern: RegExp): string {
  const trimmed = raw?.trim() || '';
  if (!trimmed) return '';
  if (DUMMY_ID_REGEX.test(trimmed)) return '';
  return pattern.test(trimmed) ? trimmed : '';
}

/**
 * Optional Analytics & Tag Manager Loader (Server Component).
 *
 * Rules enforced:
 * 1. Both GA4 and GTM are 100% optional. If neither is configured with a real ID, nothing is rendered.
 * 2. Never loads dummy/placeholder IDs (e.g., G-XXXXXXXXXX or GTM-XXXXXXX).
 * 3. Supports both server-side env vars (GA4_MEASUREMENT_ID, GTM_ID) and NEXT_PUBLIC_* equivalents.
 * 4. Prevents duplicate GA4 pageviews & duplicate script loading:
 *    - If GTM is configured (`GTM_ID` / `NEXT_PUBLIC_GTM_ID`), ONLY the GTM container is loaded,
 *      allowing GA4 to be managed inside GTM without loading a second standalone gtag.js instance
 *      or firing duplicate pageviews.
 *    - If GTM is NOT configured and GA4 IS configured (`GA4_MEASUREMENT_ID` / `NEXT_PUBLIC_GA4_MEASUREMENT_ID`),
 *      the standalone GA4 gtag.js script is loaded.
 */
export function AnalyticsScripts() {
  const gtmId = resolveValidId(
    process.env.GTM_ID || process.env.NEXT_PUBLIC_GTM_ID,
    VALID_GTM_REGEX
  );

  const ga4Id = resolveValidId(
    process.env.GA4_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    VALID_GA4_REGEX
  );

  if (!gtmId && !ga4Id) {
    return null;
  }

  // Case 1: GTM is configured -> Load GTM container only (prevents duplicate GA4 installation & duplicate pageviews)
  if (gtmId) {
    return (
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
        }}
      />
    );
  }

  // Case 2: Only standalone GA4 is configured (no GTM container)
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${ga4Id}', { anonymize_ip: true });`,
        }}
      />
    </>
  );
}
