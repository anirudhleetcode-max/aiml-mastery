import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { apiUser } from '@/lib/auth/guard';
import { clientKey, rateLimit, sameOrigin } from '@/lib/auth/rate-limit';
import { UNIT_BY_ID } from '@/data/curriculum';
import { reviewTeaching } from '@/features/evaluation/teaching';
import { MAX_ANSWER_CHARS } from '@/lib/ai/untrusted';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Reads a teach-back explanation a second time.
 *
 * Deliberately separate from the sync pipeline that records the attempt. The
 * recorded teaching score still comes from `evaluateTeaching` inside the
 * transaction that writes the row, so mastery cannot move on a model's opinion
 * — and an outage here costs the learner a second opinion, not their progress.
 */

const schema = z.object({
  unitId: z.string().regex(/^[A-Z]{2,4}-\d{3}$/),
  text: z.string().min(1).max(MAX_ANSWER_CHARS),
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
      { error: 'You are submitting explanations faster than we can read them. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(retry) } },
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Check the request and try again.' }, { status: 400 });

  const unit = UNIT_BY_ID.get(parsed.data.unitId);
  if (!unit) return NextResponse.json({ error: 'No such unit.' }, { status: 404 });

  const review = await reviewTeaching(unit, parsed.data.text);
  if (!review.ai) return NextResponse.json({ evaluation: null });

  await prisma.answerEvaluation
    .upsert({
      where: {
        userId_target_unitId_itemIndex: { userId: user.id, target: 'teaching', unitId: unit.id, itemIndex: 0 },
      },
      create: {
        userId: user.id,
        target: 'teaching',
        unitId: unit.id,
        itemIndex: 0,
        answer: parsed.data.text.slice(0, MAX_ANSWER_CHARS),
        result: JSON.stringify(review.ai),
        source: review.ai.source,
        score: review.ai.scores.overall,
      },
      update: {
        answer: parsed.data.text.slice(0, MAX_ANSWER_CHARS),
        result: JSON.stringify(review.ai),
        source: review.ai.source,
        score: review.ai.scores.overall,
        attempts: { increment: 1 },
      },
    })
    .catch((error: unknown) => {
      console.error('[evaluate] could not store result:', error instanceof Error ? error.name : 'unknown');
    });

  return NextResponse.json({ evaluation: review.ai });
}
