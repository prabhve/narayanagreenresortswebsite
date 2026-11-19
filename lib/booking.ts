import { ROOM_CATEGORIES } from '@/data/rooms';

export function buildBookingQueryUrl(params: {
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  room?: string;
  type?: 'stay' | 'dining' | 'event';
}): string {
  const searchParams = new URLSearchParams();
  if (params.checkIn) searchParams.set('checkIn', params.checkIn);
  if (params.checkOut) searchParams.set('checkOut', params.checkOut);
  if (params.adults) searchParams.set('adults', String(params.adults));
  if (params.children !== undefined && params.children > 0) {
    searchParams.set('children', String(params.children));
  }
  if (params.room) searchParams.set('room', params.room);
  if (params.type) searchParams.set('type', params.type);

  const qs = searchParams.toString();
  return qs ? `/contact?${qs}#booking-enquiry` : '/contact#booking-enquiry';
}

export function resolveRoomDisplayName(slugOrName?: string): string {
  if (!slugOrName) return 'Suites Room (2 Units)';
  const matched = ROOM_CATEGORIES.find(
    (r) =>
      r.slug.toLowerCase() === slugOrName.toLowerCase() ||
      r.name.toLowerCase() === slugOrName.toLowerCase()
  );
  if (matched) {
    return `${matched.name} (${matched.unitCount} Units)`;
  }
  return slugOrName;
}
