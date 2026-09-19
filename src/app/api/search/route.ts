import { NextResponse } from 'next/server';
import { apiUser } from '@/lib/auth/guard';
import { searchCurriculum, type SearchKind } from '@/features/curriculum/search';
import type { DomainId } from '@/types/curriculum';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const user = await apiUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const url = new URL(req.url);
  const q = (url.searchParams.get('q') ?? '').slice(0, 120);
  const limit = Math.min(40, Math.max(1, Number(url.searchParams.get('limit') ?? 20)));
  const kindsParam = url.searchParams.get('kinds');
  const domain = url.searchParams.get('domain') as DomainId | null;

  const results = searchCurriculum(q, {
    limit,
    kinds: kindsParam ? (kindsParam.split(',') as SearchKind[]) : undefined,
    domain: domain ?? undefined,
  });

  return NextResponse.json({ results }, { headers: { 'Cache-Control': 'private, max-age=30' } });
}
