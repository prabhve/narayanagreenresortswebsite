import {
  DiningEnquiryPayload,
  EventEnquiryPayload,
  StayEnquiryPayload,
} from '@/types/resort';

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s-]{7,18}$/;

export function getTodayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTomorrowIsoDate(fromIso?: string): string {
  const base = fromIso ? new Date(`${fromIso}T00:00:00`) : new Date();
  if (Number.isNaN(base.getTime())) {
    return getTodayIsoDate();
  }
  base.setDate(base.getDate() + 1);
  const year = base.getFullYear();
  const month = String(base.getMonth() + 1).padStart(2, '0');
  const day = String(base.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export function validateStayEnquiry(payload: StayEnquiryPayload): ValidationResult {
  const errors: Record<string, string> = {};

  if (!payload.guestName || payload.guestName.trim().length < 2) {
    errors.guestName = 'Please enter your full name.';
  }
  if (!payload.phone || !PHONE_REGEX.test(payload.phone.trim())) {
    errors.phone = 'Please enter a valid contact phone number.';
  }
  if (payload.email && !EMAIL_REGEX.test(payload.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!payload.checkIn) {
    errors.checkIn = 'Please select a check-in date.';
  }
  if (!payload.checkOut) {
    errors.checkOut = 'Please select a check-out date.';
  }
  if (payload.checkIn && payload.checkOut) {
    const start = new Date(`${payload.checkIn}T00:00:00`);
    const end = new Date(`${payload.checkOut}T00:00:00`);
    if (end <= start) {
      errors.checkOut = 'Check-out date must be later than check-in date.';
    }
  }
  if (!payload.adults || payload.adults < 1) {
    errors.adults = 'At least 1 adult guest is required.';
  }
  if (payload.children < 0) {
    errors.children = 'Children count cannot be negative.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateDiningEnquiry(payload: DiningEnquiryPayload): ValidationResult {
  const errors: Record<string, string> = {};

  if (!payload.guestName || payload.guestName.trim().length < 2) {
    errors.guestName = 'Please enter your name.';
  }
  if (!payload.phone || !PHONE_REGEX.test(payload.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!payload.date) {
    errors.date = 'Please select a dining date.';
  }
  if (!payload.time) {
    errors.time = 'Please select a preferred time.';
  }
  if (!payload.guests || payload.guests < 1) {
    errors.guests = 'Please specify at least 1 guest.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateEventEnquiry(payload: EventEnquiryPayload): ValidationResult {
  const errors: Record<string, string> = {};

  if (!payload.guestName || payload.guestName.trim().length < 2) {
    errors.guestName = 'Please enter the contact person name.';
  }
  if (!payload.phone || !PHONE_REGEX.test(payload.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (payload.email && !EMAIL_REGEX.test(payload.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!payload.eventCategory) {
    errors.eventCategory = 'Please select an event category.';
  }
  if (!payload.expectedGuests || payload.expectedGuests.trim().length < 1) {
    errors.expectedGuests = 'Please estimate your expected guest count.';
  }
  if (!payload.eventDate) {
    errors.eventDate = 'Please select a preferred event date.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
