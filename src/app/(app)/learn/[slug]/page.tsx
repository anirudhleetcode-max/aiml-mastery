import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import 'katex/dist/katex.min.css';
import { ArrowRight, Braces, Building2, GraduationCap, Lightbulb, Quote } from 'lucide-react';
import { getUnit, nextUnit, previousUnit, prerequisitesOf, relatedUnits } from '@/data/curriculum';
import { DOMAIN_BY_ID, domainColor } from '@/data/domains';
import { LessonShell, type LessonSection } from '@/components/lesson/lesson-shell';
import { Math, MathSection } from '@/components/lesson/math';
import { VisualBlock } from '@/components/lesson/visual';
import { CodeBlock } from '@/components/lesson/code-block';
import {
  ChallengeSection, FlashcardsSection, PracticeSection, QuickCheckSection, TeachBackSection,
} from '@/components/lesson/interactive';
import { buildQuickCheck } from '@/features/testing/generate';
import { highlight, type HighlightLanguage } from '@/lib/highlight';
import { Badge } from '@/components/ui/badge';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) return { title: 'Unit not found' };
  return {
    title: unit.title,
    description: unit.simpleExplanation.slice(0, 155),
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) notFound();

  const domain = DOMAIN_BY_ID[unit.domain];
  const prev = previousUnit(unit.id);
  const next = nextUnit(unit.id);
  const prereqs = prerequisitesOf(unit.id);
  const related = relatedUnits(unit.id);
  const quickCheck = buildQuickCheck(unit);

  const sections: LessonSection[] = [];

  /* ------------------------------------------------------ Intuition */
  sections.push({
    id: 'intuition',
    label: 'Intuition',
    node: (
      <div className="space-y-5">
        <Heading title="What is it?" eyebrow="Start here" />
        <p className="lesson-prose text-[15.5px]">{unit.simpleExplanation}</p>

        <div className="rounded-xl border border-line bg-surface-2 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-ink">Why does it exist?</p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">{unit.whyItExists}</p>
        </div>

        <div className="rounded-xl border border-accent/25 bg-accent/[0.05] p-5">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
            <Quote size={12} /> The analogy
          </p>
          <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{unit.analogy.scenario}</p>

          <div className="mt-4 grid gap-1.5 border-t border-accent/20 pt-4 sm:grid-cols-2">
            {unit.analogy.mapping.map((m) => (
              <div key={m.from} className="flex items-center gap-2 text-[12.5px]">
                <span className="text-subtle">{m.from}</span>
                <ArrowRight size={11} className="shrink-0 text-accent" />
                <span className="font-medium text-ink">{m.to}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 border-t border-accent/20 pt-4 text-[13.5px] leading-relaxed text-muted">
            {unit.analogy.bridge}
          </p>
          {unit.analogy.limitations && (
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-subtle">
              <span className="font-medium">Where it breaks down: </span>
              {unit.analogy.limitations}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-line bg-surface p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">By the end you can</p>
          <ul className="mt-2.5 space-y-1.5">
            {unit.learningObjectives.map((o) => (
              <li key={o} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                {o}
              </li>
            ))}
          </ul>
        </div>

        {prereqs.length > 0 && (
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">Builds on</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {prereqs.map((p) => (
                <Link
                  key={p.id}
                  href={`/learn/${p.slug}`}
                  className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[12.5px] text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
  });

  /* --------------------------------------------------------- Visual */
  if (unit.visuals.length > 0) {
    sections.push({
      id: 'visual',
      label: 'See it',
      node: (
        <div className="space-y-5">
          <Heading title="See the mechanism" eyebrow="Visual intuition" />
          {unit.visuals.map((v, i) => (
            <VisualBlock key={i} visual={v} />
          ))}
        </div>
      ),
    });
  }

  /* ----------------------------------------------------- Definition */
  sections.push({
    id: 'definition',
    label: 'Definition',
    node: (
      <div className="space-y-5">
        <Heading title="Now the precise version" eyebrow="Formal definition" />
        <div className="rounded-xl border border-line bg-surface p-5">
          <p className="text-[15px] leading-relaxed text-ink">{unit.formalDefinition}</p>
        </div>

        <div id="terminology">
          <h3 className="mb-3 text-[14px] font-semibold text-ink">Terminology</h3>
          <dl className="space-y-3">
            {unit.terminology.map((t) => (
              <div key={t.term} className="rounded-xl border border-line bg-surface-2 p-4">
                <dt className="text-[13.5px] font-semibold text-ink">{t.term}</dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-muted">{t.definition}</dd>
                {t.simple && (
                  <dd className="mt-2 border-t border-line pt-2 text-[12.5px] leading-relaxed text-subtle">
                    <span className="font-medium text-accent">Plainly: </span>
                    {t.simple}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    ),
  });

  /* ---------------------------------------------------- Mathematics */
  if (unit.math) {
    sections.push({
      id: 'mathematics',
      label: 'Mathematics',
      node: (
        <div className="space-y-5">
          <Heading
            title="The mathematics"
            eyebrow="Now the symbols mean something"
            note="You met every one of these ideas above in words. The notation is shorthand for what you already understand."
          />
          <MathSection math={unit.math} />
        </div>
      ),
    });
  }

  /* --------------------------------------------------------- Example */
  if (unit.workedExample || unit.realWorldExamples.length > 0) {
    const we = unit.workedExample;
    sections.push({
      id: 'example',
      label: 'Worked example',
      node: (
        <div className="space-y-5">
          <Heading title="Worked through" eyebrow="Real numbers" />

          {we && (
            <div className="rounded-xl border border-line bg-surface p-5">
              <h3 className="text-[15px] font-semibold text-ink">{we.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{we.setup}</p>
              <ol className="mt-4 space-y-3 border-t border-line pt-4">
                {we.steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-surface-3 text-[11px] font-semibold tabular-nums text-subtle">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-medium text-ink">{s.label}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{s.detail}</p>
                      {s.latex && (
                        <div className="mt-2 overflow-x-auto rounded-lg bg-surface-2 px-3 py-2">
                          <Math tex={s.latex} display />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-line pt-4 text-[13.5px] leading-relaxed text-ink">
                <span className="font-semibold">So: </span>
                {we.conclusion}
              </p>
            </div>
          )}

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-[14px] font-semibold text-ink">
              <Building2 size={14} className="text-subtle" /> Where this shows up
            </h3>
            <div className="space-y-2.5">
              {unit.realWorldExamples.map((r) => (
                <div key={r.context} className="rounded-xl border border-line bg-surface-2 p-4">
                  <p className="text-[13px] font-semibold text-ink">{r.context}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{r.usage}</p>
                </div>
              ))}
            </div>
          </div>

          {unit.projectConnections && unit.projectConnections.length > 0 && (
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">In real projects</p>
              <ul className="mt-3 space-y-2">
                {unit.projectConnections.map((p) => (
                  <li key={p.tool} className="flex flex-wrap items-baseline gap-2 text-[13px]">
                    <code className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[12px] text-accent">{p.tool}</code>
                    <ArrowRight size={11} className="text-subtle" />
                    <span className="flex-1 text-muted">{p.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    });
  }

  /* ------------------------------------------------------------ Code */
  if (unit.codeExamples.length > 0) {
    sections.push({
      id: 'code',
      label: 'Code',
      node: (
        <div className="space-y-5">
          <Heading title="In code" eyebrow="Runnable" />
          {unit.codeExamples.map((c, i) => (
            <div key={i}>
              <CodeBlock
                html={highlight(c.code, c.language as HighlightLanguage)}
                raw={c.code}
                language={c.language}
                title={c.title}
                output={c.output}
              />
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{c.explanation}</p>
            </div>
          ))}
        </div>
      ),
    });
  }

  /* -------------------------------------------------------- Mistakes */
  sections.push({
    id: 'mistakes',
    label: 'Mistakes',
    node: (
      <div className="space-y-5">
        <Heading
          title="How this goes wrong"
          eyebrow="Common mistakes"
          note="These are the specific errors people actually make. Recognising one in your own code later is worth more than any amount of re-reading."
        />
        <div className="space-y-3">
          {unit.commonMistakes.map((m, i) => (
            <div key={i} className="rounded-xl border border-line bg-surface p-5">
              <p className="flex items-start gap-2 text-[14px] font-semibold text-ink">
                <Lightbulb size={15} className="mt-0.5 shrink-0 text-warning" />
                {m.mistake}
              </p>
              <p className="mt-2.5 pl-6 text-[13px] leading-relaxed text-muted">
                <span className="font-medium text-warning">Why it happens: </span>
                {m.why}
              </p>
              <p className="mt-1.5 pl-6 text-[13px] leading-relaxed text-muted">
                <span className="font-medium text-success">The fix: </span>
                {m.fix}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  });

  /* ------------------------------------------------------- Interview */
  sections.push({
    id: 'interview',
    label: 'Interview',
    node: (
      <div className="space-y-5">
        <Heading
          title="If they ask you this"
          eyebrow="Interview perspective"
          note="Read the question, answer it out loud, then read the answer. Comparing your version with a strong one is the whole exercise."
        />
        <div className="space-y-3">
          {unit.interviewQuestions.map((q, i) => (
            <details key={i} className="group rounded-xl border border-line bg-surface p-5">
              <summary className="cursor-pointer list-none marker:content-none">
                <span className="flex items-start gap-3">
                  <Badge tone="primary" className="mt-0.5 shrink-0 capitalize">
                    {q.level.replace('-', ' ')}
                  </Badge>
                  <span className="flex-1 text-[14px] font-medium leading-relaxed text-ink">{q.question}</span>
                  <span className="mt-1 shrink-0 text-subtle transition-transform group-open:rotate-90">▸</span>
                </span>
              </summary>
              <p className="mt-4 border-t border-line pt-4 text-[13.5px] leading-relaxed text-muted">{q.answer}</p>
              {q.followUp && (
                <p className="mt-3 rounded-lg bg-surface-2 p-3 text-[12.5px] leading-relaxed text-subtle">
                  <span className="font-medium text-accent">What separates a strong answer: </span>
                  {q.followUp}
                </p>
              )}
            </details>
          ))}
        </div>
      </div>
    ),
  });

  /* -------------------------------------------------------- Practice */
  sections.push({
    id: 'practice',
    label: 'Practice',
    node: <PracticeSection unitId={unit.id} questions={unit.practiceQuestions} />,
  });

  /* ----------------------------------------------------- Quick check */
  sections.push({
    id: 'check',
    label: 'Quick check',
    node: (
      <QuickCheckSection
        unitId={unit.id}
        unitTitle={unit.title}
        questions={quickCheck.questions.map((q) => q.question)}
      />
    ),
  });

  /* ------------------------------------------------------ Flashcards */
  sections.push({
    id: 'flashcards',
    label: 'Flashcards',
    node: <FlashcardsSection cards={unit.flashcards} unitTitle={unit.title} />,
  });

  /* ------------------------------------------------------- Challenge */
  if (unit.challenge) {
    sections.push({
      id: 'challenge',
      label: 'Challenge',
      node: <ChallengeSection unitId={unit.id} challenge={unit.challenge} />,
    });
  }

  /* ----------------------------------------------------------- Teach */
  sections.push({
    id: 'teach',
    label: 'Teach it back',
    node: (
      <div className="space-y-5">
        <TeachBackSection unit={unit} />
        {related.length > 0 && (
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">
              <Braces size={12} /> This connects to
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/learn/${r.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-[12.5px] text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: domainColor(r.domain) }} aria-hidden />
                  {r.title}
                </Link>
              ))}
            </div>
            <Link
              href={`/graph?focus=${unit.id}`}
              className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium text-primary-ink hover:underline"
            >
              <GraduationCap size={13} /> See this in the knowledge graph
            </Link>
          </div>
        )}
      </div>
    ),
  });

  return (
    <LessonShell
      meta={{
        unitId: unit.id,
        title: unit.title,
        slug: unit.slug,
        domainName: domain?.name ?? unit.domain,
        domainId: unit.domain,
        module: unit.module,
        topic: unit.topic,
        difficulty: unit.difficulty,
        estimatedMinutes: unit.estimatedMinutes,
        prevSlug: prev?.slug ?? null,
        prevTitle: prev?.title ?? null,
        nextSlug: next?.slug ?? null,
        nextTitle: next?.title ?? null,
      }}
      sections={sections}
    />
  );
}

function Heading({ title, eyebrow, note }: { title: string; eyebrow: string; note?: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-ink">{eyebrow}</p>
      <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-ink">{title}</h2>
      {note && <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-subtle">{note}</p>}
    </div>
  );
}
