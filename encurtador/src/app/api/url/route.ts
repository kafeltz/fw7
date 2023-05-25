import { NextResponse } from 'next/server';

import{ createUrl, getUrls } from '../../../db/url';

// TODO: page, limit e offset
export async function GET (request: Request) {
  const result = await getUrls();

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const data = await request.json();
  const url = data['url'];

  const result = await createUrl(url);

  if (result == -1) {
    return NextResponse.json(null, {status: 409})
  } else {
    return NextResponse.json(result);
  }

}
