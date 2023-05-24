import { NextResponse } from 'next/server';

export function GET() {

  const data = { 'a': 1 };

  return NextResponse.json(data);
}