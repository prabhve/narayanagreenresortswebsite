'use client';

import React from 'react';
import { MessageCircle, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { RESORT_CONFIG } from '@/data/resort';
import { createMailtoUrl, createWhatsAppUrl } from '@/lib/whatsapp';

interface WhatsAppBookingProps {
  title: string;
  formattedMessage: string;
  emailSubject: string;
  onReset?: () => void;
}

export function WhatsAppBooking({
  title,
  formattedMessage,
  emailSubject,
  onReset,
}: WhatsAppBookingProps) {
  const whatsappUrl = createWhatsAppUrl(formattedMessage);
  const mailtoUrl = createMailtoUrl(emailSubject, formattedMessage.replace(/\*/g, ''));

  return (
    <div className="border border-[#0E2017]/20 bg-[#F8F6F0] p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#183827]" />
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#8C6D32] uppercase">
            Enquiry Ready to Send
          </p>
          <h4 className="mt-1 font-serif text-2xl font-medium text-[#0E2017]">{title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-[#4A554E]">
            Your details have been validated and formatted. Choose your preferred channel
            below to send this enquiry directly to the {RESORT_CONFIG.name} front desk.
            Our reservations team will reply to confirm availability and applicable tariffs.
          </p>
        </div>
      </div>

      {/* Formatted Message Preview */}
      <div className="mt-5 border border-[#0E2017]/12 bg-[#EFECE3]/70 p-4">
        <p className="text-[11px] font-semibold tracking-wider text-[#4A554E] uppercase">
          Formatted Enquiry Transcript
        </p>
        <pre className="mt-2 overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre-wrap text-[#0E2017]">
          {formattedMessage.replace(/\*/g, '')}
        </pre>
      </div>

      {/* Direct Action Buttons */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 bg-[#0E2017] px-6 py-4 text-xs font-semibold tracking-[0.14em] text-[#F8F6F0] uppercase transition-colors hover:bg-[#183827]"
        >
          <MessageCircle className="h-4 w-4 text-[#C8A45D]" />
          <span>Send via WhatsApp Concierge</span>
        </a>

        <a
          href={mailtoUrl}
          className="inline-flex items-center justify-center gap-2.5 border border-[#0E2017]/25 bg-transparent px-6 py-4 text-xs font-semibold tracking-[0.14em] text-[#0E2017] uppercase transition-colors hover:border-[#0E2017] hover:bg-[#0E2017]/5"
        >
          <Mail className="h-4 w-4 text-[#8C6D32]" />
          <span>Send via Email Client</span>
        </a>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#0E2017]/10 pt-4 text-xs text-[#4A554E]">
        <a
          href={RESORT_CONFIG.contact.phoneHref}
          className="inline-flex items-center gap-1.5 font-medium text-[#0E2017] hover:underline"
        >
          <Phone className="h-3.5 w-3.5 text-[#8C6D32]" />
          <span>Prefer to speak immediately? Call {RESORT_CONFIG.contact.phoneDisplay}</span>
        </a>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="font-semibold tracking-wider text-[#8C6D32] uppercase hover:underline"
          >
            Edit Enquiry Details
          </button>
        )}
      </div>
    </div>
  );
}
