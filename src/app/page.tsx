import Link from 'next/link';
import {
  ArrowRight, BookOpen, Boxes, Brain, Binary, Code2, Database, Dices, Eye, FlaskConical,
  Grid3x3, GraduationCap, LineChart, MessageSquareText, Network, NotebookPen, Repeat,
  Sigma, Sparkles, Table2, Target, Flame, Bot, Layers, ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketingNav } from '@/components/layout/marketing-nav';
import { Logo } from '@/components/layout/logo';
import { DOMAINS, PLANNED_UNITS, domainColor } from '@/data/domains';
import { LEVELS } from '@/features/xp/levels';
import { MASTERY_META, MASTERY_LEVELS } from '@/types/progress';
import { TOTAL_UNITS } from '@/types/curriculum';
import { COURSE_END, COURSE_START } from '@/features/scheduling/planner';
import { daysBetween, prettyDateLong } from '@/lib/format';
import { getCurrentUser } from '@/lib/auth/guard';
import { Reveal } from '@/components/layout/reveal';
import { HeroCanvas } from '@/components/viz/hero-canvas';

const DOMAIN_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2, Binary, Grid3x3, Table2, LineChart, Database, Sigma, Dices, Brain, Network,
  MessageSquareText, Eye, Sparkles, Boxes,
};

const TOTAL_DAYS = daysBetween(COURSE_START, COURSE_END) + 1;

const TEACHING_ARC = [
  { step: 'What is it?', detail: 'Plain language first. No equation opens a lesson.' },
  { step: 'Why does it exist?', detail: 'What was painful before someone invented this.' },
  { step: 'Analogy', detail: 'A story — then an explicit map back to the real concept.' },
  { step: 'Visual intuition', detail: 'See the mechanism move before you read about it.' },
  { step: 'The mathematics', detail: 'Now the symbols mean something. Every variable named.' },
  { step: 'Worked example', detail: 'Real numbers you can check by hand.' },
  { step: 'Code', detail: 'Runnable, with output, and an explanation of why.' },
  { step: 'Common mistakes', detail: 'The specific ways this goes wrong in practice.' },
  { step: 'Interview perspective', detail: 'What a good answer sounds like, and the follow-up.' },
  { step: 'Practice & test', detail: 'Evidence, not a checkbox.' },
  { step: 'Teach it back', detail: 'The last step, because it is the real one.' },
];

const PLATFORM = [
  { icon: Target, title: "Today's mission", body: 'A plan built from your actual budget and pace — not 214 divided by 103. Fall behind and it rebuilds around prerequisites first.' },
  { icon: FlaskConical, title: 'Interactive labs', body: 'Drag the learning rate and watch gradient descent overshoot. Change k and watch the clusters move. Apply a convolution and see the edges appear.' },
  { icon: Bot, title: 'AI tutor', body: 'Grounded in the unit you are on and in what you have already got wrong. Asks before it explains, and never dumps a wall of text.' },
  { icon: Repeat, title: 'Spaced revision', body: 'Poor score, shorter interval. Repeated failure triggers a re-teach that goes back to the analogy rather than repeating the test.' },
  { icon: NotebookPen, title: 'Mistake notebook', body: 'Every wrong answer is kept with why it was wrong and when to revisit it. Get it right later and it resolves itself.' },
  { icon: GraduationCap, title: 'Teacher mode', body: 'Explain the concept in your own words. You get told exactly which points you covered and which you missed.' },
  { icon: Layers, title: 'Knowledge graph', body: 'Every concept knows its prerequisites and what it unlocks. Learning stops feeling like a list of topics.' },
  { icon: ShieldCheck, title: 'Nothing gets lost', body: 'Work offline and your test results queue locally, then sync when you reconnect. Scores are graded on the server, never claimed by the browser.' },
];

export default async function LandingPage() {
  const user = await getCurrentUser();

  return (
    <>
      <MarketingNav signedIn={Boolean(user)} />

      <main id="main">
        {/* ---------------------------------------------------------- Hero */}
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-[0.28] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
          <HeroCanvas />

          <div className="relative mx-auto flex min-h-[92dvh] max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6">
            <Reveal>
              <Badge tone="primary" className="mb-6 w-fit px-3 py-1">
                <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                {TOTAL_UNITS} units · {TOTAL_DAYS} days · one curriculum
              </Badge>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="max-w-4xl text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                <span className="text-ink">Master AI/ML.</span>
                <br />
                <span className="text-gradient">One concept at a time.</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-lg">
                From Python fundamentals to Generative AI — build the knowledge, intuition and confidence
                to understand, build and teach AI/ML.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={user ? '/dashboard' : '/signup'}>
                  <Button size="lg" className="group">
                    {user ? 'Continue your journey' : 'Start my journey'}
                    <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link href="/roadmap">
                  <Button size="lg" variant="outline">
                    Explore roadmap
                  </Button>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <dl className="mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
                {[
                  { value: String(TOTAL_UNITS), label: 'Concepts' },
                  { value: String(TOTAL_DAYS), label: 'Days' },
                  { value: '14', label: 'Domains' },
                  { value: 'Daily', label: 'Tests' },
                  { value: '6', label: 'Mastery levels' },
                  { value: '3D', label: 'Visualisations' },
                ].map((s) => (
                  <div key={s.label} className="bg-surface/80 px-4 py-4 backdrop-blur">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.13em] text-subtle">{s.label}</dt>
                    <dd className="mt-1 text-xl font-semibold tabular-nums text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------ Approach */}
        <section id="approach" className="relative border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">The method</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Understanding first. Always.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                Most courses show you gradient descent as an equation and hope it lands. Here you stand on a
                mountain in fog and want to reach the lowest point — and only once the picture is in your head
                do the symbols arrive, each one naming something you already understand.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
              <Reveal delay={80}>
                <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-subtle">
                    Every unit, the same arc
                  </p>
                  <ol className="mt-5 space-y-3.5">
                    {TEACHING_ARC.map((item, i) => (
                      <li key={item.step} className="flex gap-3.5">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-[11px] font-semibold tabular-nums text-subtle">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[14px] font-medium text-ink">{item.step}</p>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-subtle">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="flex h-full flex-col gap-4">
                  <div className="rounded-2xl border border-line bg-gradient-to-br from-surface to-surface-2 p-6 shadow-soft sm:p-8">
                    <Badge tone="accent" className="mb-4">Gradient descent, before the maths</Badge>
                    <blockquote className="space-y-3 text-[15px] leading-relaxed text-muted">
                      <p>
                        You are standing on a mountain in thick fog and you want to reach the lowest point in the
                        valley. You cannot see the valley. But you <em className="text-ink not-italic font-medium">can</em>{' '}
                        feel which way the ground slopes under your feet.
                      </p>
                      <p>So you take one step downhill. Then you feel again. Then you step again.</p>
                    </blockquote>
                    <div className="mt-6 grid gap-2 border-t border-line pt-5 text-[13px] sm:grid-cols-2">
                      {[
                        ['The mountain', 'the loss surface'],
                        ['Where you stand', 'the model parameters'],
                        ['The slope underfoot', 'the gradient'],
                        ['How big a step', 'the learning rate'],
                        ['The lowest point', 'minimum loss'],
                        ['Stepping in fog', 'why it can get stuck'],
                      ].map(([from, to]) => (
                        <div key={from} className="flex items-center gap-2">
                          <span className="text-subtle">{from}</span>
                          <ArrowRight size={12} className="shrink-0 text-primary" />
                          <span className="font-medium text-ink">{to}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-[13px] leading-relaxed text-subtle">
                      Then — and only then — you meet{' '}
                      <code className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[12px] text-accent">
                        θ ← θ − α∇J(θ)
                      </code>{' '}
                      and every symbol is already a thing you have felt.
                    </p>
                  </div>

                  <div className="flex-1 rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-subtle">
                      The standard every unit is held to
                    </p>
                    <p className="mt-4 text-[14px] leading-relaxed text-muted">
                      By the end of a unit you should be able to answer all ten of these without notes:
                    </p>
                    <ul className="mt-4 grid gap-1.5 text-[13px] text-muted sm:grid-cols-2">
                      {[
                        'What is it?', 'Why does it exist?', 'How does it work?', 'When should I use it?',
                        'When should I not?', 'What does it assume?', 'What can go wrong?', 'How do I implement it?',
                        'How do I evaluate it?', 'How would I explain it?',
                      ].map((q) => (
                        <li key={q} className="flex items-start gap-2">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- Curriculum */}
        <section id="curriculum" className="border-t border-line bg-surface/40 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">The curriculum</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Fourteen domains. {TOTAL_UNITS} units. Nothing skipped.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                Ordered so that everything you need arrives before you need it. Python before NumPy, NumPy before
                models, calculus before backpropagation, attention before transformers.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {DOMAINS.map((domain, i) => {
                const Icon = DOMAIN_ICONS[domain.icon] ?? BookOpen;
                return (
                  <Reveal key={domain.id} delay={Math.min(i * 35, 280)}>
                    <Link
                      href={`/roadmap#${domain.id}`}
                      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-soft transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="grid h-9 w-9 place-items-center rounded-lg"
                            style={{ background: domainColor(domain.id, 0.14), color: domainColor(domain.id) }}
                          >
                            <Icon size={17} />
                          </span>
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-subtle">
                              Domain {String(domain.order).padStart(2, '0')}
                            </p>
                            <h3 className="text-[15px] font-semibold text-ink">{domain.name}</h3>
                          </div>
                        </div>
                        <span
                          className="rounded-md px-2 py-0.5 text-[11px] font-semibold tabular-nums"
                          style={{ background: domainColor(domain.id, 0.12), color: domainColor(domain.id) }}
                        >
                          {PLANNED_UNITS[domain.id]}
                        </span>
                      </div>
                      <p className="mt-3 text-[13px] leading-relaxed text-subtle">{domain.description}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
                        {domain.modules.slice(0, 4).map((m) => (
                          <span key={m} className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] text-subtle">
                            {m}
                          </span>
                        ))}
                        {domain.modules.length > 4 && (
                          <span className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] text-subtle">
                            +{domain.modules.length - 4}
                          </span>
                        )}
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ Platform */}
        <section id="platform" className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">The platform</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Built for the part everybody skips: actually finishing.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PLATFORM.map((f, i) => (
                <Reveal key={f.title} delay={Math.min(i * 40, 280)}>
                  <div className="h-full rounded-xl border border-line bg-surface p-5 shadow-soft">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/12 text-primary">
                      <f.icon size={17} />
                    </span>
                    <h3 className="mt-4 text-[14px] font-semibold text-ink">{f.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-subtle">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- Mastery */}
        <section id="mastery" className="border-t border-line bg-surface/40 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <Reveal>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Mastery</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    You cannot click your way to mastered.
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    Opening a lesson gets you to level one. Every level above that needs recorded evidence —
                    a score, completed practice, a solved challenge, and finally an explanation in your own words.
                  </p>

                  <ol className="mt-8 space-y-2.5">
                    {MASTERY_LEVELS.filter((l) => l !== 'NOT_STARTED').map((level, i) => {
                      const meta = MASTERY_META[level];
                      return (
                        <li
                          key={level}
                          className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4"
                        >
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-3 text-[12px] font-semibold tabular-nums text-muted">
                            {i + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[14px] font-semibold text-ink">{meta.label}</p>
                            <p className="text-[12.5px] text-subtle">{meta.requirement}</p>
                          </div>
                          <div
                            className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-surface-3"
                            aria-hidden
                          >
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                              style={{ width: `${((i + 1) / 6) * 100}%` }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="flex h-full flex-col gap-4">
                  <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
                    <div className="flex items-center gap-2">
                      <Flame size={16} className="text-xp" />
                      <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-subtle">
                        Ten levels of progression
                      </p>
                    </div>
                    <div className="mt-5 space-y-1.5">
                      {LEVELS.map((l) => (
                        <div key={l.level} className="flex items-baseline gap-3">
                          <span className="w-6 shrink-0 text-right text-[11px] font-semibold tabular-nums text-subtle">
                            {l.level}
                          </span>
                          <span className="text-[13.5px] font-medium text-ink">{l.title}</span>
                          <span className="hidden flex-1 truncate text-[12px] text-subtle sm:block">
                            {l.subtitle}
                          </span>
                          <span className="ml-auto shrink-0 text-[11px] tabular-nums text-subtle">
                            {l.minXP.toLocaleString('en-US')} XP
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-subtle">
                      Motivation without manipulation
                    </p>
                    <ul className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-muted">
                      <li className="flex gap-2.5">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-success" />
                        XP has a floor of zero. A missed test costs you, but your balance never goes negative.
                      </li>
                      <li className="flex gap-2.5">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-success" />
                        Discipline is tracked separately from XP, so a bad week does not erase a good month.
                      </li>
                      <li className="flex gap-2.5">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-success" />
                        Streaks come with two freezes. Life happens; the streak survives one missed day.
                      </li>
                      <li className="flex gap-2.5">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-success" />
                        No fake scarcity, no countdown pressure, no notification spam. Reminders are yours to configure.
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- CTA */}
        <section className="relative overflow-hidden border-t border-line py-24 sm:py-32">
          <div className="absolute inset-0 grid-bg opacity-[0.22] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
            <Reveal>
              <Logo className="mx-auto h-11 w-11" />
              <h2 className="mt-7 text-3xl font-semibold tracking-tight text-ink sm:text-[2.6rem] sm:leading-tight">
                {TOTAL_DAYS} days. {TOTAL_UNITS} concepts. One mission.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
                Understand AI/ML deeply enough to build it — and to teach it to someone else.
              </p>
              <p className="mt-3 text-[13px] text-subtle">
                {prettyDateLong(COURSE_START)} → {prettyDateLong(COURSE_END)}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href={user ? '/today' : '/signup'}>
                  <Button size="lg" className="group">
                    {user ? "Go to today's mission" : 'Start my journey'}
                    <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link href="/roadmap">
                  <Button size="lg" variant="outline">
                    Explore the roadmap
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2.5">
            <Logo className="h-6 w-6" />
            <span className="text-[13px] font-medium text-muted">AI/ML Mastery</span>
          </div>
          <p className="text-center text-[12px] text-subtle">
            Optimised for understanding, not for feature count.
          </p>
          <div className="flex gap-4 text-[12px] text-subtle">
            <Link href="/roadmap" className="hover:text-ink">Roadmap</Link>
            <Link href="/glossary" className="hover:text-ink">Glossary</Link>
            <Link href="/formulas" className="hover:text-ink">Formulas</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
