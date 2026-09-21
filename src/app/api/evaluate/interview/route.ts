import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { apiUser } from '@/lib/auth/guard';
import { clientKey, rateLimit, sameOrigin } from '@/lib/auth/rate-limit';
import { UNIT_BY_ID } from '@/data/curriculum';
import { evaluateInterviewAnswer } from '@/features/evaluation/interview';
import { MAX_ANSWER_CHARS } from '@/lib/ai/untrusted';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Evaluates one typed interview answer.
 *
 * The request names a question; it does not supply one. `unitId` and
 * `questionIndex` are looked up in the curriculum on the server, and the
 * question, the reference answer and the unit's terminology all come from
 * there. A client cannot submit its own question text, its own reference
 * answer, its own user id, or its own score — the only thing it contributes is
 * the prose being graded.
 *
 * Failure is never fatal to the session. If the model is unavailable, slow or
 * returns nonsense, the deterministic grade is still returned with a `degraded`
 * field saying so, and the interview view carries on.
 */

const schema = z.object({
  unitId: z.string().regex(/^[A-Z]{2,4}-\d{3}$/),
  questionIndex: z.number().int().min(0).max(50),
  answer: z.string().min(1).max(MAX_ANSWER_CHARS),
  /** Lets the learner ask for the concept check alone. */
  useAi: z.boolean().optional(),
});

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });

  // Identity comes from the session cookie, never from the body. There is no
  // userId field in the schema for exactly that reason.
  const user = await apiUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  // Two limits: the client's, and the account's. Evaluation costs an upstream
  // request, so the account limit is the one that bounds spend.
  const perClient = await rateLimit(clientKey(req, 'evaluate'), 40, 60 * 10);
  const perAccount = await rateLimit(`evaluate:user:${user.id}`, 30, 60 * 10);
  if (!perClient.ok || !perAccount.ok) {
    const retry = Math.max(perClient.retryAfterSeconds, perAccount.retryAfterSeconds);
    return NextResponse.json(
      { error: 'You are evaluating answers faster than we can grade them. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(retry) } },
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Check the request and try again.' }, { status: 400 });

  const unit = UNIT_BY_ID.get(parsed.data.unitId);
  const question = unit?.interviewQuestions[parsed.data.questionIndex];
  if (!unit || !question) return NextResponse.json({ error: 'No such question.' }, { status: 404 });

  const evaluation = await evaluateInterviewAnswer({
    question: question.question,
    referenceAnswer: question.answer,
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

  // Stored under the session's user id, so a row can only ever belong to the
  // account that created it.
  await prisma.answerEvaluation
    .upsert({
      where: {
        userId_target_unitId_itemIndex: {
          userId: user.id,
          target: 'interview',
          unitId: parsed.data.unitId,
          itemIndex: parsed.data.questionIndex,
        },
      },
      create: {
        userId: user.id,
        target: 'interview',
        unitId: parsed.data.unitId,
        itemIndex: parsed.data.questionIndex,
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
      // Persisting is a convenience; failing to persist must not cost the
      // learner the feedback they just waited for.
      console.error('[evaluate] could not store result:', error instanceof Error ? error.name : 'unknown');
    });

  return NextResponse.json({ evaluation });
}
