import { NextResponse } from 'next/server';

import{ connectDb } from '../../../../../src/db/connect';

export async function GET(request: Request, context: { params: { short_id: string }}) {
  const short_id = context.params.short_id;

  await connectDb();

  return NextResponse.json(short_id);
}
