// src/components/ui/pagination.tsx
import React from 'react';
import { cn } from '@/lib/utils'; // optional helper to merge classNames

interface PaginationProps {
  children: React.ReactNode;
  className?: string;
}

export function Pagination({ children, className = '' }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={cn('inline-flex items-center gap-1', className)}>
      {children}
    </nav>
  );
}

export function PaginationContent({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1">{children}</div>;
}

export function PaginationItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

interface LinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function PaginationLink({ isActive = false, children, ...rest }: LinkProps) {
  return (
    <button
      {...rest}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium min-w-[2.25rem] flex items-center justify-center transition',
        'border border-border', // adjust if your theme uses different border token
        'shadow-sm',
        'disabled:opacity-50',
        isActive
          ? 'bg-primary text-white border-transparent'
          : 'bg-background text-foreground hover:bg-secondary'
      )}
    >
      {children}
    </button>
  );
}

export function PaginationPrevious({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="Previous page"
      className={cn(
        'px-3 py-2 rounded-md text-sm font-medium min-w-[2.25rem] flex items-center justify-center transition',
        'border border-border bg-background hover:bg-secondary',
        'shadow-sm disabled:opacity-50'
      )}
    >
      ‹‹
    </button>
  );
}

export function PaginationNext({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="Next page"
      className={cn(
        'px-3 py-2 rounded-md text-sm font-medium min-w-[2.25rem] flex items-center justify-center transition',
        'border border-border bg-background hover:bg-secondary',
        'shadow-sm disabled:opacity-50'
      )}
    >
      ››
    </button>
  );
}

export function PaginationEllipsis() {
  return (
    <span className="px-2 text-sm select-none flex items-center justify-center min-w-[2.25rem]">
      …
    </span>
  );
}
