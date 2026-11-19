'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageCircle, Mail, AlertCircle, ShieldCheck } from 'lucide-react';
import { ROOM_CATEGORIES } from '@/data/rooms';
import { RESORT_CONFIG } from '@/data/resort';
import {
  getTomorrowIsoDate,
  validateStayEnquiry,
  validateDiningEnquiry,
  validateEventEnquiry,
} from '@/lib/validation';
import {
  buildStayWhatsAppMessage,
  buildDiningWhatsAppMessage,
  buildEventWhatsAppMessage,
  createWhatsAppUrl,
} from '@/lib/whatsapp';
import { resolveRoomDisplayName } from '@/lib/booking';
import { useClientTodayIso } from '@/hooks/use-client-env';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { WhatsAppBooking } from '@/components/booking/WhatsAppBooking';
import {
  StayEnquiryPayload,
  DiningEnquiryPayload,
  EventEnquiryPayload,
} from '@/types/resort';

type EnquiryTab = 'stay' | 'dining' | 'event';

interface BookingFormProps {
  defaultTab?: EnquiryTab;
  defaultRoom?: string;
}

export function BookingForm({ defaultTab = 'stay', defaultRoom }: BookingFormProps) {
  const searchParams = useSearchParams();
  const qType = searchParams.get('type');
  const initialTab: EnquiryTab =
    qType === 'stay' || qType === 'dining' || qType === 'event' ? qType : defaultTab;

  const [activeTab, setActiveTab] = useState<EnquiryTab>(initialTab);

  const clientToday = useClientTodayIso();
  const clientTomorrow = clientToday ? getTomorrowIsoDate(clientToday) : '';

  // Stay Enquiry State (Zero localStorage / sessionStorage persistence for privacy compliance)
  const [stayData, setStayData] = useState<StayEnquiryPayload>(() => {
    const qCheckIn = searchParams.get('checkIn');
    const qCheckOut = searchParams.get('checkOut');
    const qAdults = searchParams.get('adults');
    const qChildren = searchParams.get('children');
    const qRoom = searchParams.get('room');

    return {
      guestName: '',
      phone: '',
      email: '',
      checkIn: qCheckIn || '',
      checkOut: qCheckOut || '',
      adults: qAdults ? Math.max(1, Number(qAdults)) : 2,
      children: qChildren ? Math.max(0, Number(qChildren)) : 0,
      roomCategory: resolveRoomDisplayName(qRoom || defaultRoom),
      specialRequirements: '',
    };
  });

  // Dining Enquiry State
  const [diningData, setDiningData] = useState<DiningEnquiryPayload>({
    guestName: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: 4,
    diningPreference: 'Multi-Cuisine Dining (Veg & Non-Veg)',
    specialRequirements: '',
  });

  // Event Enquiry State
  const [eventData, setEventData] = useState<EventEnquiryPayload>({
    guestName: '',
    phone: '',
    email: '',
    eventCategory: 'Destination Wedding (Up to 2,500+ Guests)',
    expectedGuests: '500',
    eventDate: '',
    requirements: '',
  });

  const effectiveCheckIn = stayData.checkIn || clientToday;
  const effectiveCheckOut =
    stayData.checkOut ||
    (effectiveCheckIn ? getTomorrowIsoDate(effectiveCheckIn) : clientTomorrow);

  const effectiveStayData: StayEnquiryPayload = {
    ...stayData,
    checkIn: effectiveCheckIn,
    checkOut: effectiveCheckOut,
  };

  const effectiveDiningData: DiningEnquiryPayload = {
    ...diningData,
    date: diningData.date || clientToday,
  };

  const effectiveEventData: EventEnquiryPayload = {
    ...eventData,
    eventDate: eventData.eventDate || clientTomorrow,
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preparedMessage, setPreparedMessage] = useState<{
    title: string;
    message: string;
    subject: string;
  } | null>(null);

  const handleStayCheckInChange = (newCheckIn: string) => {
    let nextCheckOut = effectiveCheckOut;
    if (newCheckIn && effectiveCheckOut && new Date(effectiveCheckOut) <= new Date(newCheckIn)) {
      nextCheckOut = getTomorrowIsoDate(newCheckIn);
    }
    setStayData((prev) => ({
      ...prev,
      checkIn: newCheckIn,
      checkOut: nextCheckOut,
    }));
  };

  const handleStaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateStayEnquiry(effectiveStayData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const msg = buildStayWhatsAppMessage(effectiveStayData);
    setPreparedMessage({
      title: `Stay Enquiry for ${effectiveStayData.roomCategory}`,
      message: msg,
      subject: `Stay Enquiry — ${effectiveStayData.roomCategory} (${effectiveStayData.checkIn} to ${effectiveStayData.checkOut})`,
    });
    window.open(createWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const handleDiningSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateDiningEnquiry(effectiveDiningData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const msg = buildDiningWhatsAppMessage(effectiveDiningData);
    setPreparedMessage({
      title: `Auric 24×7 Restaurant Reservation Request`,
      message: msg,
      subject: `Auric 24×7 Dining Enquiry — ${effectiveDiningData.date} at ${effectiveDiningData.time}`,
    });
    window.open(createWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEventEnquiry(effectiveEventData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const msg = buildEventWhatsAppMessage(effectiveEventData);
    setPreparedMessage({
      title: `${effectiveEventData.eventCategory} Proposal Request`,
      message: msg,
      subject: `Event Enquiry — ${effectiveEventData.eventCategory} on ${effectiveEventData.eventDate}`,
    });
    window.open(createWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="booking-enquiry" className="scroll-mt-24">
      {/* Interactive Mode Selector Tabs */}
      <div
        className="mb-8 flex flex-wrap border-b border-[#0E2017]/15"
        role="tablist"
        aria-label="Enquiry Category Selector"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'stay'}
          onClick={() => {
            setActiveTab('stay');
            setErrors({});
            setPreparedMessage(null);
          }}
          className={`px-6 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            activeTab === 'stay'
              ? 'border-b-2 border-[#0E2017] bg-[#0E2017] text-[#F8F6F0]'
              : 'text-[#4A554E] hover:text-[#0E2017]'
          }`}
        >
          01. Room & Stay Enquiry
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'event'}
          onClick={() => {
            setActiveTab('event');
            setErrors({});
            setPreparedMessage(null);
          }}
          className={`px-6 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            activeTab === 'event'
              ? 'border-b-2 border-[#0E2017] bg-[#0E2017] text-[#F8F6F0]'
              : 'text-[#4A554E] hover:text-[#0E2017]'
          }`}
        >
          02. Weddings & Corporate Events
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'dining'}
          onClick={() => {
            setActiveTab('dining');
            setErrors({});
            setPreparedMessage(null);
          }}
          className={`px-6 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            activeTab === 'dining'
              ? 'border-b-2 border-[#0E2017] bg-[#0E2017] text-[#F8F6F0]'
              : 'text-[#4A554E] hover:text-[#0E2017]'
          }`}
        >
          03. Auric 24×7 Table Reservation
        </button>
      </div>

      {preparedMessage ? (
        <WhatsAppBooking
          title={preparedMessage.title}
          formattedMessage={preparedMessage.message}
          emailSubject={preparedMessage.subject}
          onReset={() => setPreparedMessage(null)}
        />
      ) : (
        <>
          {/* TAB 1: STAY ENQUIRY */}
          {activeTab === 'stay' && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <form
                onSubmit={handleStaySubmit}
                noValidate
                className="border border-[#0E2017]/15 bg-[#FFFFFF] p-6 sm:p-8 lg:col-span-7"
              >
                <div className="border-b border-[#0E2017]/10 pb-4">
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
                    19 Verified Accommodations
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-medium text-[#0E2017]">
                    Request Stay Availability & Package Tariffs
                  </h3>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Guest Name */}
                  <div>
                    <label
                      htmlFor="stay-name"
                      className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                    >
                      Guest Full Name *
                    </label>
                    <input
                      id="stay-name"
                      type="text"
                      required
                      value={stayData.guestName}
                      onChange={(e) =>
                        setStayData({ ...stayData, guestName: e.target.value })
                      }
                      placeholder="e.g., Aarav Sharma"
                      className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                    />
                    {errors.guestName && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.guestName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="stay-phone"
                      className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                    >
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id="stay-phone"
                      type="tel"
                      required
                      value={stayData.phone}
                      onChange={(e) => setStayData({ ...stayData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="stay-email"
                      className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="stay-email"
                      type="email"
                      value={stayData.email}
                      onChange={(e) => setStayData({ ...stayData, email: e.target.value })}
                      placeholder="guest@example.com"
                      className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Room Preference */}
                  <div>
                    <label
                      htmlFor="stay-room"
                      className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                    >
                      Accommodation Category
                    </label>
                    <select
                      id="stay-room"
                      value={stayData.roomCategory}
                      onChange={(e) =>
                        setStayData({ ...stayData, roomCategory: e.target.value })
                      }
                      className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                    >
                      {ROOM_CATEGORIES.map((room) => (
                        <option
                          key={room.slug}
                          value={`${room.name} (${room.unitCount} Units)`}
                        >
                          {room.name} ({room.unitCount} Units Available)
                        </option>
                      ))}
                      <option value="Multiple Rooms / Group Block (Up to 19 Units)">
                        Multiple Rooms / Full Group Block (Up to 19 Units)
                      </option>
                    </select>
                  </div>

                  {/* Check-in Date */}
                  <div>
                    <label
                      htmlFor="stay-checkin"
                      className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                    >
                      Check-In Date *
                    </label>
                    <input
                      id="stay-checkin"
                      type="date"
                      min={clientToday || undefined}
                      required
                      value={effectiveStayData.checkIn}
                      onChange={(e) => handleStayCheckInChange(e.target.value)}
                      className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 font-mono text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                    />
                    {errors.checkIn && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.checkIn}</span>
                      </p>
                    )}
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <label
                      htmlFor="stay-checkout"
                      className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                    >
                      Check-Out Date *
                    </label>
                    <input
                      id="stay-checkout"
                      type="date"
                      min={
                        effectiveStayData.checkIn
                          ? getTomorrowIsoDate(effectiveStayData.checkIn)
                          : undefined
                      }
                      required
                      value={effectiveStayData.checkOut}
                      onChange={(e) =>
                        setStayData({ ...stayData, checkOut: e.target.value })
                      }
                      className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 font-mono text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                    />
                    {errors.checkOut && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.checkOut}</span>
                      </p>
                    )}
                  </div>

                  {/* Adults */}
                  <div>
                    <label
                      htmlFor="stay-adults"
                      className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                    >
                      Adults *
                    </label>
                    <select
                      id="stay-adults"
                      value={stayData.adults}
                      onChange={(e) =>
                        setStayData({ ...stayData, adults: Number(e.target.value) })
                      }
                      className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Adult' : 'Adults'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Children */}
                  <div>
                    <label
                      htmlFor="stay-children"
                      className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                    >
                      Children
                    </label>
                    <select
                      id="stay-children"
                      value={stayData.children}
                      onChange={(e) =>
                        setStayData({ ...stayData, children: Number(e.target.value) })
                      }
                      className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Child' : 'Children'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div className="mt-5">
                  <label
                    htmlFor="stay-notes"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Special Requests or Package Preferences
                  </label>
                  <textarea
                    id="stay-notes"
                    rows={3}
                    value={stayData.specialRequirements}
                    onChange={(e) =>
                      setStayData({ ...stayData, specialRequirements: e.target.value })
                    }
                    placeholder="Share arrival time, dining requests (e.g., Maharaj Magadh Thali), or multiple-room needs..."
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#0E2017] px-8 py-4 text-xs font-semibold tracking-[0.15em] text-[#F8F6F0] uppercase transition-colors hover:bg-[#183827] cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 text-[#C8A45D]" />
                    <span>Enquire via WhatsApp Concierge</span>
                  </button>

                  <a
                    href={`mailto:${RESORT_CONFIG.contact.reservationEmail}?subject=${encodeURIComponent(
                      `Stay Enquiry — ${stayData.roomCategory}`
                    )}`}
                    className="inline-flex items-center justify-center gap-2 border border-[#0E2017]/20 px-5 py-4 text-xs font-semibold tracking-wider text-[#0E2017] uppercase transition-colors hover:border-[#0E2017]"
                  >
                    <Mail className="h-4 w-4 text-[#8C6D32]" />
                    <span>Email Fallback</span>
                  </a>
                </div>

                <p className="mt-4 flex items-center gap-2 text-xs text-[#4A554E]">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#183827]" />
                  <span>
                    Zero third-party trackers: your personal details are never stored in browser
                    storage.
                  </span>
                </p>
              </form>

              <div className="lg:col-span-5">
                <BookingSummary payload={effectiveStayData} />
              </div>
            </div>
          )}

          {/* TAB 2: WEDDINGS & CORPORATE EVENTS ENQUIRY */}
          {activeTab === 'event' && (
            <form
              onSubmit={handleEventSubmit}
              noValidate
              className="border border-[#0E2017]/15 bg-[#FFFFFF] p-6 sm:p-8"
            >
              <div className="border-b border-[#0E2017]/10 pb-4">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
                  2,500+ Wedding Capacity · 3,000+ Corporate Capacity · 100+ Min Event Size
                </p>
                <h3 className="mt-1 font-serif text-2xl font-medium text-[#0E2017]">
                  Request a Custom Wedding or Corporate Event Proposal
                </h3>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label
                    htmlFor="event-name"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Host / Contact Name *
                  </label>
                  <input
                    id="event-name"
                    type="text"
                    required
                    value={eventData.guestName}
                    onChange={(e) =>
                      setEventData({ ...eventData, guestName: e.target.value })
                    }
                    placeholder="Full Name or Organization"
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  />
                  {errors.guestName && (
                    <p className="mt-1.5 text-xs text-red-700">{errors.guestName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="event-phone"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="event-phone"
                    type="tel"
                    required
                    value={eventData.phone}
                    onChange={(e) => setEventData({ ...eventData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-700">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="event-email"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    id="event-email"
                    type="email"
                    value={eventData.email}
                    onChange={(e) => setEventData({ ...eventData, email: e.target.value })}
                    placeholder="events@company.com"
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-700">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="event-category"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Event Category *
                  </label>
                  <select
                    id="event-category"
                    value={eventData.eventCategory}
                    onChange={(e) =>
                      setEventData({ ...eventData, eventCategory: e.target.value })
                    }
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  >
                    <option value="Destination Wedding (Up to 2,500+ Guests)">
                      Destination Wedding (Up to 2,500+ Guests)
                    </option>
                    <option value="Wedding Function (Reception / Sangeet / Ring Ceremony)">
                      Wedding Function (Reception / Sangeet / Ring Ceremony)
                    </option>
                    <option value="Family Celebration & Reunion">
                      Family Celebration & Reunion
                    </option>
                    <option value="Corporate Conference (Up to 3,000+ Guests)">
                      Corporate Conference (Up to 3,000+ Guests)
                    </option>
                    <option value="Corporate Gathering & Executive Retreat">
                      Corporate Gathering & Executive Retreat
                    </option>
                    <option value="Large Group Event (100+ Minimum Guests)">
                      Large Group Event (100+ Minimum Guests)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="event-guests"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Expected Guest Count *
                  </label>
                  <select
                    id="event-guests"
                    value={eventData.expectedGuests}
                    onChange={(e) =>
                      setEventData({ ...eventData, expectedGuests: e.target.value })
                    }
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  >
                    <option value="100 – 250 Guests">100 – 250 Guests</option>
                    <option value="250 – 500 Guests">250 – 500 Guests</option>
                    <option value="500 – 1,000 Guests">500 – 1,000 Guests</option>
                    <option value="1,000 – 2,000 Guests">1,000 – 2,000 Guests</option>
                    <option value="2,000 – 2,500+ Guests (Grand Wedding Lawn)">
                      2,000 – 2,500+ Guests (Grand Wedding Lawn)
                    </option>
                    <option value="2,500 – 3,000+ Guests (Corporate Convention)">
                      2,500 – 3,000+ Guests (Corporate Convention)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="event-date"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Preferred Event Date *
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    min={clientToday || undefined}
                    required
                    value={effectiveEventData.eventDate}
                    onChange={(e) =>
                      setEventData({ ...eventData, eventDate: e.target.value })
                    }
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 font-mono text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  />
                  {errors.eventDate && (
                    <p className="mt-1.5 text-xs text-red-700">{errors.eventDate}</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="event-requirements"
                  className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                >
                  Lawn Setup, Catering & 19-Unit Room Block Requirements
                </label>
                <textarea
                  id="event-requirements"
                  rows={3}
                  value={eventData.requirements}
                  onChange={(e) =>
                    setEventData({ ...eventData, requirements: e.target.value })
                  }
                  placeholder="Tell us if you require full buyout of all 19 rooms (Suites, Cottages, Pool-View, Garden-View), multi-day lawn staging, or Auric 24×7 banquet catering..."
                  className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0E2017] px-8 py-4 text-xs font-semibold tracking-[0.15em] text-[#F8F6F0] uppercase transition-colors hover:bg-[#183827] cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 text-[#C8A45D]" />
                  <span>Request Event Proposal via WhatsApp</span>
                </button>
                <p className="text-xs text-[#4A554E]">
                  Our events specialist will confirm lawn dates and custom banquet options.
                </p>
              </div>
            </form>
          )}

          {/* TAB 3: AURIC 24×7 RESTAURANT ENQUIRY */}
          {activeTab === 'dining' && (
            <form
              onSubmit={handleDiningSubmit}
              noValidate
              className="border border-[#0E2017]/15 bg-[#FFFFFF] p-6 sm:p-8"
            >
              <div className="border-b border-[#0E2017]/10 pb-4">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
                  Auric 24×7 Restaurant · Maharaj Magadh Thali · Poolside Snacks
                </p>
                <h3 className="mt-1 font-serif text-2xl font-medium text-[#0E2017]">
                  Reserve a Table or Enquire About Dining
                </h3>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label
                    htmlFor="dining-name"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Guest Name *
                  </label>
                  <input
                    id="dining-name"
                    type="text"
                    required
                    value={diningData.guestName}
                    onChange={(e) =>
                      setDiningData({ ...diningData, guestName: e.target.value })
                    }
                    placeholder="Full Name"
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  />
                  {errors.guestName && (
                    <p className="mt-1.5 text-xs text-red-700">{errors.guestName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="dining-phone"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="dining-phone"
                    type="tel"
                    required
                    value={diningData.phone}
                    onChange={(e) =>
                      setDiningData({ ...diningData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-700">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="dining-preference"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Dining Experience
                  </label>
                  <select
                    id="dining-preference"
                    value={diningData.diningPreference}
                    onChange={(e) =>
                      setDiningData({ ...diningData, diningPreference: e.target.value })
                    }
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  >
                    <option value="Multi-Cuisine Dining (Veg & Non-Veg)">
                      Multi-Cuisine Dining (Veg & Non-Veg)
                    </option>
                    <option value="Signature Maharaj Magadh Thali Experience">
                      Signature Maharaj Magadh Thali Experience
                    </option>
                    <option value="Poolside Snacks & Refreshments">
                      Poolside Snacks & Refreshments
                    </option>
                    <option value="Family / Group Dining Table">
                      Family / Group Dining Table
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="dining-date"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Date *
                  </label>
                  <input
                    id="dining-date"
                    type="date"
                    min={clientToday || undefined}
                    required
                    value={effectiveDiningData.date}
                    onChange={(e) => setDiningData({ ...diningData, date: e.target.value })}
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 font-mono text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dining-time"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Preferred Time *
                  </label>
                  <input
                    id="dining-time"
                    type="time"
                    required
                    value={diningData.time}
                    onChange={(e) => setDiningData({ ...diningData, time: e.target.value })}
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 font-mono text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dining-guests"
                    className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                  >
                    Number of Guests *
                  </label>
                  <select
                    id="dining-guests"
                    value={diningData.guests}
                    onChange={(e) =>
                      setDiningData({ ...diningData, guests: Number(e.target.value) })
                    }
                    className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 30].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="dining-notes"
                  className="block text-xs font-semibold tracking-wider text-[#0E2017] uppercase"
                >
                  Dietary Preferences or Table Notes
                </label>
                <textarea
                  id="dining-notes"
                  rows={2}
                  value={diningData.specialRequirements}
                  onChange={(e) =>
                    setDiningData({ ...diningData, specialRequirements: e.target.value })
                  }
                  placeholder="Pure vegetarian preference, Maharaj Magadh Thali count, or celebration table requests..."
                  className="mt-2 w-full border border-[#0E2017]/20 bg-[#F8F6F0] px-4 py-3 text-sm text-[#0E2017] focus:border-[#0E2017] focus:outline-none"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0E2017] px-8 py-4 text-xs font-semibold tracking-[0.15em] text-[#F8F6F0] uppercase transition-colors hover:bg-[#183827] cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 text-[#C8A45D]" />
                  <span>Reserve Table via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
