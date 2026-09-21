import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { apiUser } from '@/lib/auth/guard';
import { clientKey, rateLimit, sameOrigin } from '@/lib/auth/rate-limit';
import { UNIT_BY_ID } from '@/data/curriculum';
import { evaluateFlashcardRecall } from '@/features/evaluation/flashcard';
import { MAX_ANSWER_CHARS } from '@/lib/ai/untrusted';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Checks one typed flashcard recall.
 *
 * Note what this route does *not* do: it does not emit a `flashcard-reviewed`
 * event, does not touch `FlashcardReview`, and does not compute a next review
 * date. Scheduling stays where it was, driven by the learner pressing known or
 * again, applied through the same event pipeline as before. This endpoint
 * returns an opinion and stores it for later reading; the scheduler never
 * consults it.
 */

const schema = z.object({
  unitId: z.string().regex(/^[A-Z]{2,4}-\d{3}$/),
  cardIndex: z.number().int().min(0).max(200),
  answer: z.string().min(1).max(MAX_ANSWER_CHARS),
  useAi: z.boolean().optional(),
});

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  const user = await apiUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const perClient = await rateLimit(clientKey(req, 'evaluate'), 40, 60 * 10);
  const perAccount = await rateLimit(`evaluate:user:${user.id}`, 30, 60 * 10);
  if (!perClient.ok || !perAccount.ok) {
    const retry = Math.max(perClient.retryAfterSeconds, perAccount.retryAfterSeconds);
    return NextResponse.json(
      { error: 'You are checking cards faster than we can read them. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(retry) } },
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Check the request and try again.' }, { status: 400 });

  const unit = UNIT_BY_ID.get(parsed.data.unitId);
  const card = unit?.flashcards[parsed.data.cardIndex];
  if (!unit || !card) return NextResponse.json({ error: 'No such card.' }, { status: 404 });

  const evaluation = await evaluateFlashcardRecall({
    front: card.front,
    back: card.back,
    unitTitle: unit.title,
    terminology: unit.terminology,
    unitText: [
      unit.title,
      unit.formalDefinition,
      unit.simpleExplanation,
      unit.whyItExists,
      ...unit.learningObjectives,
      ...unit.terminology.map((t) => `${t.term} ${t.definition}`),
    ].join(' '),
    answer: parsed.data.answer,
    useAi: parsed.data.useAi,
  });

  await prisma.answerEvaluation
    .upsert({
      where: {
        userId_target_unitId_itemIndex: {
          userId: user.id,
          target: 'flashcard',
          unitId: parsed.data.unitId,
          itemIndex: parsed.data.cardIndex,
        },
      },
      create: {
        userId: user.id,
        target: 'flashcard',
        unitId: parsed.data.unitId,
        itemIndex: parsed.data.cardIndex,
        answer: parsed.data.answer.slice(0, MAX_ANSWER_CHARS),
        result: JSON.stringify(evaluation),
        source: evaluation.source,
        score: evaluation.scores.overall,
      },
      update: {
        answer: parsed.data.answer.slice(0, MAX_ANSWER_CHARS),
        result: JSON.stringify(evaluation),
        source: evaluation.source,
        score: evaluation.scores.overall,
        attempts: { increment: 1 },
      },
    })
    .catch((error: unknown) => {
      console.error('[evaluate] could not store result:', error instanceof Error ? error.name : 'unknown');
    });

  return NextResponse.json({ evaluation });
}
