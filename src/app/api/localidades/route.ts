
import { NextResponse } from 'next/server';
import { LOCALIDADES_ARGENTINA } from '@/lib/data';
import Fuse from 'fuse.js';

const fuse = new Fuse(LOCALIDADES_ARGENTINA, {
  keys: ['name'],
  threshold: 0.3,
  includeScore: true,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ suggestions: [] });
  }

  const results = fuse.search(query);
  const suggestions = results.map(result => result.item);

  return NextResponse.json({ suggestions });
}
