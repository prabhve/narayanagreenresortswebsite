export type ConversionEventName =
  | 'booking_enquiry_submitted'
  | 'whatsapp_enquiry_clicked'
  | 'phone_number_clicked'
  | 'email_enquiry_clicked'
  | 'wedding_proposal_enquiry'
  | 'corporate_event_enquiry';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Safely dispatches a first-party conversion event when either standalone GA4 (`window.gtag`)
 * or Google Tag Manager (`window.dataLayer`) is active.
 *
 * - If neither GA4 nor GTM is configured, this function is a safe no-op.
 * - Prevents duplicate event firing: if `window.gtag` is defined (standalone GA4 mode),
 *   it dispatches via `window.gtag('event', ...)` (which internally pushes to `dataLayer`).
 *   Otherwise, if `window.dataLayer` is present (GTM mode), it pushes a structured GTM event object once.
 */
export function trackConversionEvent(
  eventName: ConversionEventName,
  params: Record<string, string | number | boolean | undefined> = {}
) {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
      return;
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...params,
      });
    }
  } catch {
    // Fail silently so optional analytics never interrupts user interactions
  }
}
