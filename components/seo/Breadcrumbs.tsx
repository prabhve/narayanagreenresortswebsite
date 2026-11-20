import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbItem, getBreadcrumbJsonLd } from '@/lib/seo';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark';
  className?: string;
}

export function Breadcrumbs({
  items,
  variant = 'dark',
  className = '',
}: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] =
    items[0]?.path === '/'
      ? items
      : [{ name: 'Home', path: '/' }, ...items];

  const jsonLd = getBreadcrumbJsonLd(fullItems);

  const textBase =
    variant === 'light'
      ? 'text-[#F8F6F0]/70 hover:text-[#C8A45D]'
      : 'text-[#4A554E] hover:text-[#0E2017]';

  const activeText =
    variant === 'light' ? 'text-[#C8A45D] font-medium' : 'text-[#0E2017] font-semibold';

  const separatorColor =
    variant === 'light' ? 'text-[#F8F6F0]/35' : 'text-[#0E2017]/35';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`text-[11px] tracking-[0.18em] uppercase ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {fullItems.map((item, idx) => {
            const isLast = idx === fullItems.length - 1;
            return (
              <li key={item.path} className="inline-flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 ${separatorColor}`}
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span aria-current="page" className={activeText}>
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className={`transition-colors ${textBase}`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
