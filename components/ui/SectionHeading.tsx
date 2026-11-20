import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'mb-4 flex items-center gap-3.5 text-[11px] font-medium tracking-[0.24em] uppercase',
            align === 'center' ? 'justify-center' : 'justify-start',
            light ? 'text-[#C8A45D]' : 'text-[#8C6D32]'
          )}
        >
          <span
            className={cn(
              'h-px w-9 shrink-0',
              light ? 'bg-[#C8A45D]/50' : 'bg-[#8C6D32]/50'
            )}
            aria-hidden="true"
          />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2
        className={cn(
          'font-serif text-3xl leading-[1.14] font-normal tracking-[-0.01em] [text-wrap:balance] sm:text-4xl lg:text-[2.85rem]',
          light ? 'text-[#F8F6F0]' : 'text-[#0E2017]'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-[15px] leading-[1.78] font-normal sm:text-base',
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl',
            light ? 'text-[#F8F6F0]/75' : 'text-[#4A554E]'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
