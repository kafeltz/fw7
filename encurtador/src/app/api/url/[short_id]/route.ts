import { NextResponse } from 'next/server';

import{ getUrls } from '../../../../db/url';

export async function GET(request: Request, context: { params: { short_id: string }}) {
  const short_id = context.params.short_id;

  const urls = await getUrls();

  console.log(urls);

  return NextResponse.json(short_id);
}
