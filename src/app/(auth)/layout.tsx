import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { TOTAL_UNITS } from '@/types/curriculum';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-dvh lg:grid-cols-2">
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] lg:hidden" />

      <div className="relative flex flex-col justify-center px-5 py-12 sm:px-10 lg:px-16">
        <Link href="/" className="mb-10 flex w-fit items-center gap-2.5">
          <Logo className="h-7 w-7" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">AI/ML Mastery</span>
        </Link>
        <main id="main" className="w-full max-w-sm">
          {children}
        </main>
      </div>

      <aside className="relative hidden overflow-hidden border-l border-line bg-surface/50 lg:block">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--c-primary)/0.16),transparent_65%)]" />
        <div className="relative flex h-full flex-col justify-center px-14 xl:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-ink">The commitment</p>
          <p className="mt-5 text-[26px] font-semibold leading-snug tracking-tight text-ink xl:text-[30px]">
            {TOTAL_UNITS} concepts. Every one explained until it makes sense — then tested until it sticks.
          </p>
          <ul className="mt-10 space-y-4 text-[14px] leading-relaxed text-muted">
            {[
              'Intuition before notation, in every single unit.',
              'A daily test on exactly what you studied — never on what you have not been taught.',
              'Mastery you earn with evidence, not with a checkbox.',
              'It is not finished until you can teach it to someone else.',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
