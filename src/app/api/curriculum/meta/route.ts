import { NextResponse } from 'next/server';
import { allUnitMeta } from '@/data/curriculum';

export const runtime = 'nodejs';

/**
 * The trimmed unit index used by the roadmap, the knowledge graph and the
 * mind map. Public and immutable for a session, so it caches aggressively.
 */
export async function GET() {
  return NextResponse.json(
    { units: allUnitMeta() },
    { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } },
  );
}
