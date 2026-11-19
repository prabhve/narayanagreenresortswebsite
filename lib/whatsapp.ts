import { RESORT_CONFIG } from '@/data/resort';
import { calculateNights } from '@/lib/validation';
import {
  DiningEnquiryPayload,
  EventEnquiryPayload,
  StayEnquiryPayload,
} from '@/types/resort';

export function formatReadableDate(isoDate: string): string {
  if (!isoDate) return 'Flexible / To be confirmed';
  const d = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function buildStayWhatsAppMessage(payload: StayEnquiryPayload): string {
  const nights = calculateNights(payload.checkIn, payload.checkOut);
  const nightsText = nights > 0 ? ` (${nights} ${nights === 1 ? 'Night' : 'Nights'})` : '';

  const lines = [
    `*STAY ENQUIRY — ${RESORT_CONFIG.name.toUpperCase()}*`,
    `Hello Narayana Green Resorts Front Desk, I would like to request availability and rates for a stay:`,
    ``,
    `• *Guest Name:* ${payload.guestName.trim()}`,
    `• *Phone:* ${payload.phone.trim()}`,
    payload.email.trim() ? `• *Email:* ${payload.email.trim()}` : null,
    `• *Room Preference:* ${payload.roomCategory || 'Any Available Category'}`,
    `• *Check-In:* ${formatReadableDate(payload.checkIn)}`,
    `• *Check-Out:* ${formatReadableDate(payload.checkOut)}${nightsText}`,
    `• *Guests:* ${payload.adults} ${payload.adults === 1 ? 'Adult' : 'Adults'}${
      payload.children > 0
        ? `, ${payload.children} ${payload.children === 1 ? 'Child' : 'Children'}`
        : ''
    }`,
    payload.specialRequirements.trim()
      ? `• *Additional Notes:* ${payload.specialRequirements.trim()}`
      : null,
    ``,
    `Please share current availability and package tariffs. Thank you.`,
  ].filter(Boolean);

  return lines.join('\n');
}

export function buildDiningWhatsAppMessage(payload: DiningEnquiryPayload): string {
  const lines = [
    `*AURIC 24×7 RESTAURANT ENQUIRY — ${RESORT_CONFIG.name.toUpperCase()}*`,
    `Hello Auric 24×7 Restaurant Team, I would like to request a table reservation / dining enquiry:`,
    ``,
    `• *Guest Name:* ${payload.guestName.trim()}`,
    `• *Phone:* ${payload.phone.trim()}`,
    `• *Preferred Date:* ${formatReadableDate(payload.date)}`,
    `• *Preferred Time:* ${payload.time}`,
    `• *Number of Guests:* ${payload.guests}`,
    `• *Experience / Preference:* ${payload.diningPreference || 'Multi-Cuisine Dining'}`,
    payload.specialRequirements.trim()
      ? `• *Special Requests:* ${payload.specialRequirements.trim()}`
      : null,
    ``,
    `Please confirm table availability. Thank you.`,
  ].filter(Boolean);

  return lines.join('\n');
}

export function buildEventWhatsAppMessage(payload: EventEnquiryPayload): string {
  const lines = [
    `*WEDDING & EVENT ENQUIRY — ${RESORT_CONFIG.name.toUpperCase()}*`,
    `Hello Narayana Green Resorts Events Desk, I would like to enquire about hosting an event:`,
    ``,
    `• *Contact Name:* ${payload.guestName.trim()}`,
    `• *Phone:* ${payload.phone.trim()}`,
    payload.email.trim() ? `• *Email:* ${payload.email.trim()}` : null,
    `• *Event Category:* ${payload.eventCategory}`,
    `• *Expected Guest Count:* ${payload.expectedGuests}`,
    `• *Preferred Event Date:* ${formatReadableDate(payload.eventDate)}`,
    payload.requirements.trim()
      ? `• *Venue & Catering Requirements:* ${payload.requirements.trim()}`
      : null,
    ``,
    `Please share lawn availability and custom event proposal details. Thank you.`,
  ].filter(Boolean);

  return lines.join('\n');
}

export function createWhatsAppUrl(message: string): string {
  return `${RESORT_CONFIG.contact.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function createMailtoUrl(subject: string, body: string): string {
  return `mailto:${RESORT_CONFIG.contact.reservationEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
