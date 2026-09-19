import { cn } from '@/lib/cn';

/**
 * An original mark: three nodes converging into one, drawn as a single stroke.
 * Many inputs, one understanding.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn('shrink-0', className)} aria-hidden>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--c-primary))" />
          <stop offset="100%" stopColor="hsl(var(--c-accent))" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#logo-grad)" opacity="0.14" />
      <rect x="1" y="1" width="30" height="30" rx="9" stroke="url(#logo-grad)" strokeWidth="1.25" opacity="0.5" />
      <path
        d="M8.5 9.5 L16 16 L8.5 22.5 M16 16 L23.5 16"
        stroke="url(#logo-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="9.5" r="2.1" fill="hsl(var(--c-primary))" />
      <circle cx="8.5" cy="22.5" r="2.1" fill="hsl(var(--c-primary))" />
      <circle cx="23.5" cy="16" r="2.4" fill="hsl(var(--c-accent))" />
    </svg>
  );
}
