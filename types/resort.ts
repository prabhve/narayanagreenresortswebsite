export type RoomSlug = 'suites' | 'cottages' | 'pool-view' | 'garden-view';

export interface RoomImage {
  src: string;
  alt: string;
  caption: string;
}

export interface RoomCategory {
  slug: RoomSlug;
  name: string;
  shortName: string;
  unitCount: number;
  unitLabel: string;
  tagline: string;
  shortDescription: string;
  editorialDescription: string;
  idealFor: string;
  settingNote: string;
  highlights: string[];
  primaryImage: string;
  images: RoomImage[];
}

export interface DiningHighlight {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface AmenityItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  iconName: 'Waves' | 'Sparkles' | 'Utensils' | 'Compass' | 'Trees' | 'Users';
}

export interface EventCategoryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface DestinationItem {
  id: string;
  name: string;
  distanceLabel?: string;
  description: string;
  significance: string;
  image: string;
  alt: string;
}

export type GalleryCategory =
  | 'All'
  | 'Property'
  | 'Rooms'
  | 'Pool'
  | 'Dining'
  | 'Gardens'
  | 'Events'
  | 'Wedding Spaces';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  aspect?: 'landscape' | 'portrait' | 'wide';
}

export interface StayEnquiryPayload {
  guestName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomCategory: string;
  specialRequirements: string;
}

export interface DiningEnquiryPayload {
  guestName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  diningPreference: string;
  specialRequirements: string;
}

export interface EventEnquiryPayload {
  guestName: string;
  phone: string;
  email: string;
  eventCategory: string;
  expectedGuests: string;
  eventDate: string;
  requirements: string;
}
