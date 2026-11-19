import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: 'div' | 'section' | 'article';
  narrow?: boolean;
}

export function Container({
  children,
  className,
  as: Component = 'div',
  narrow = false,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-12',
        narrow ? 'max-w-5xl' : 'max-w-[1360px]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
