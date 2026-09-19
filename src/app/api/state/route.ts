import { NextResponse } from 'next/server';
import { apiUser } from '@/lib/auth/guard';
import { loadState } from '@/lib/sync/state';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await apiUser();
  if (!user) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const state = await loadState(user.id);
  if (!state) return NextResponse.json({ error: 'No learner state found.' }, { status: 404 });

  return NextResponse.json({ state }, { headers: { 'Cache-Control': 'no-store' } });
}
