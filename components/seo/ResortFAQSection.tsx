import Link from 'next/link';
import { ArrowUpRight, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { ResortFAQItem } from '@/data/seo-faqs';
import { RESORT_CONFIG } from '@/data/resort';
import { getFaqJsonLd } from '@/lib/seo';
import { Container } from '@/components/ui/Container';

interface ResortFAQSectionProps {
  faqs: ResortFAQItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  includeSchema?: boolean;
  className?: string;
}

/**
 * Crawlable, always-visible AEO & GEO Question-and-Answer Section.
 * Answers are rendered directly in semantic HTML without requiring JS clicks to reveal,
 * ensuring Google AI Overviews, ChatGPT Search, Perplexity, and Bing Copilot can extract
 * complete, citation-ready factual passages.
 */
export function ResortFAQSection({
  faqs,
  eyebrow = 'Essential Guest Information',
  title = 'Frequently Asked Questions About Narayana Green Resorts, Bodh Gaya',
  subtitle = 'Clear, verified answers regarding our 19 luxury rooms & cottages, Auric 24×7 Restaurant, destination wedding lawns, corporate events, and nearby heritage landmarks.',
  includeSchema = true,
  className = 'bg-[#EFECE3] border-t border-[#0E2017]/12',
}: ResortFAQSectionProps) {
  if (!faqs.length) return null;

  const faqSchema = includeSchema ? getFaqJsonLd(faqs) : null;

  return (
    <section
      aria-labelledby="resort-faq-heading"
      className={`py-20 lg:py-28 ${className}`}
    >
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
          }}
        />
      )}

      <Container>
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-[#8C6D32] text-[11px] font-medium uppercase tracking-[0.24em] mb-4">
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{eyebrow}</span>
          </div>
          <h2
            id="resort-faq-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] text-[#0E2017] font-normal leading-[1.15]"
          >
            {title}
          </h2>
          <p className="text-[#4A554E] font-light text-base sm:text-lg leading-relaxed mt-4">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className="bg-[#F8F6F0] border border-[#0E2017]/12 p-7 sm:p-8 flex flex-col justify-between transition-colors hover:border-[#8C6D32]/60"
            >
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#0E2017] font-medium leading-snug mb-3.5">
                  {faq.question}
                </h3>
                <p className="text-[#4A554E] font-light text-sm sm:text-[15px] leading-[1.78]">
                  {faq.answer}
                </p>
              </div>

              {faq.linkHref && faq.linkText && (
                <div className="mt-6 pt-4 border-t border-[#0E2017]/10">
                  <Link
                    href={faq.linkHref}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#0E2017] hover:text-[#8C6D32] font-semibold transition-colors"
                  >
                    <span>{faq.linkText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8C6D32]" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#0E2017]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-[#4A554E]">
          <p className="font-light">
            Have a specific question about room availability across our 19 units, custom wedding menus, or corporate group dates near Bodh Gaya?
          </p>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={RESORT_CONFIG.contact.phoneHref}
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#0E2017]/25 bg-[#FFFFFF] text-[#0E2017] hover:border-[#0E2017] text-xs uppercase tracking-[0.14em] font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#8C6D32]" aria-hidden="true" />
              <span>Call {RESORT_CONFIG.contact.phoneDisplay}</span>
            </a>
            <a
              href={RESORT_CONFIG.contact.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#0E2017] text-[#F8F6F0] hover:bg-[#183827] text-xs uppercase tracking-[0.14em] font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#C8A45D]" aria-hidden="true" />
              <span>WhatsApp Front Desk</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
