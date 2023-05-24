import { NextResponse } from 'next/server';

import{ createUrl } from '../../../db/url';

export async function POST(request: Request) {
  const url = 'teste';

  const result = await createUrl(url);

  return NextResponse.json(result);
}
