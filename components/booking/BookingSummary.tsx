import React from 'react';
import { Calendar, Users, BedDouble, Info } from 'lucide-react';
import { calculateNights } from '@/lib/validation';
import { formatReadableDate } from '@/lib/whatsapp';
import { StayEnquiryPayload } from '@/types/resort';

interface BookingSummaryProps {
  payload: StayEnquiryPayload;
}

export function BookingSummary({ payload }: BookingSummaryProps) {
  const nights = calculateNights(payload.checkIn, payload.checkOut);

  return (
    <div className="border border-[#0E2017]/15 bg-[#EFECE3] p-6 sm:p-7">
      <div className="flex items-center justify-between border-b border-[#0E2017]/10 pb-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
            Live Enquiry Preview
          </p>
          <h3 className="mt-1 font-serif text-xl font-medium text-[#0E2017]">
            Stay Request Summary
          </h3>
        </div>
        {nights > 0 && (
          <span className="border border-[#8C6D32]/40 bg-[#F8F6F0] px-3 py-1 font-mono text-xs font-semibold text-[#0E2017] tabular-nums">
            {nights} {nights === 1 ? 'Night' : 'Nights'}
          </span>
        )}
      </div>

      <dl className="mt-5 space-y-4 text-sm">
        <div className="flex items-start gap-3">
          <BedDouble className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
          <div>
            <dt className="text-xs font-medium tracking-wider text-[#4A554E] uppercase">
              Preferred Category
            </dt>
            <dd className="mt-0.5 font-medium text-[#0E2017]">
              {payload.roomCategory || 'Suites Room (2 Units)'}
            </dd>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-y border-[#0E2017]/10 py-3.5">
          <div className="flex items-start gap-2.5">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
            <div>
              <dt className="text-xs font-medium tracking-wider text-[#4A554E] uppercase">
                Check-In
              </dt>
              <dd className="mt-0.5 font-mono text-xs font-semibold text-[#0E2017] tabular-nums">
                {formatReadableDate(payload.checkIn)}
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
            <div>
              <dt className="text-xs font-medium tracking-wider text-[#4A554E] uppercase">
                Check-Out
              </dt>
              <dd className="mt-0.5 font-mono text-xs font-semibold text-[#0E2017] tabular-nums">
                {formatReadableDate(payload.checkOut)}
              </dd>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
          <div>
            <dt className="text-xs font-medium tracking-wider text-[#4A554E] uppercase">
              Guest Party
            </dt>
            <dd className="mt-0.5 font-medium text-[#0E2017]">
              {payload.adults} {payload.adults === 1 ? 'Adult' : 'Adults'}
              {payload.children > 0
                ? ` · ${payload.children} ${payload.children === 1 ? 'Child' : 'Children'}`
                : ' · No Children'}
            </dd>
          </div>
        </div>
      </dl>

      {/* Honest Reservation Verification Notice */}
      <div className="mt-6 border border-[#8C6D32]/30 bg-[#F8F6F0] p-4 text-xs leading-relaxed text-[#4A554E]">
        <div className="flex items-start gap-2.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#8C6D32]" />
          <div>
            <p className="font-semibold text-[#0E2017]">
              Direct Front Desk Confirmation Policy
            </p>
            <p className="mt-1">
              Submitting this form prepares a formatted enquiry for our reservations team via
              WhatsApp or Email. Please note that opening WhatsApp does not constitute an
              instant confirmed booking—our team will personally verify room availability and
              confirm current package tariffs with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
