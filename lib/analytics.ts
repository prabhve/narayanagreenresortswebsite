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

export function trackConversionEvent(
  eventName: ConversionEventName,
  params: Record<string, string | number | boolean | undefined> = {}
) {
  if (typeof window === 'undefined') return;

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        ...params,
        send_to: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || undefined,
      });
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...params,
      });
    }
  } catch {
    // Fail silently so analytics never interrupts user interactions
  }
}
