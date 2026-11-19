import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'gold' | 'outline' | 'ghost' | 'whatsapp';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#0E2017] text-[#F8F6F0] border border-[#0E2017] hover:bg-[#183827] hover:border-[#183827] focus-visible:ring-[#0E2017]',
  gold:
    'bg-[#C8A45D] text-[#0E2017] border border-[#C8A45D] hover:bg-[#d6b36c] hover:border-[#d6b36c] focus-visible:ring-[#C8A45D]',
  outline:
    'bg-transparent text-[#0E2017] border border-[#0E2017]/25 hover:border-[#0E2017] hover:bg-[#0E2017]/5 focus-visible:ring-[#0E2017]',
  ghost:
    'bg-transparent text-[#F8F6F0] border border-[#F8F6F0]/35 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-[#0E2017] focus-visible:ring-[#C8A45D]',
  whatsapp:
    'bg-[#183827] text-[#F8F6F0] border border-[#C8A45D]/40 hover:bg-[#0E2017] hover:border-[#C8A45D] focus-visible:ring-[#C8A45D]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs tracking-wider uppercase',
  md: 'px-6 py-3 text-xs tracking-[0.14em] uppercase',
  lg: 'px-8 py-4 text-xs sm:text-sm tracking-[0.14em] uppercase',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    'inline-flex items-center justify-center gap-2.5 font-semibold whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if ('href' in props && props.href !== undefined) {
    const { href, external, ...linkRest } = rest as ButtonAsLink;
    const isExternal =
      external ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:');

    if (isExternal) {
      return (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={classes}
          {...linkRest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
