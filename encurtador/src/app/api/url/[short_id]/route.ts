import { NextResponse } from 'next/server';

import{ getUrlByHash } from '../../../../db/url';

export async function GET(request: Request, context: { params: { short_id: string }}) {
  const short_id = context.params.short_id;

  const url = await getUrlByHash(short_id);

  return NextResponse.json(url);
}
