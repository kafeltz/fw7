import { NextResponse } from 'next/server';

import{ createUrl, getUrls, deleteUrlById } from '../../../db/url';

// TODO: page, limit
export async function GET (request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;

  const result = await getUrls(page, limit);

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const data = await request.json();

  const action = data['action'];

  switch(action) {
    case "delete":
      return _delete(data);
    case "create":
    default:
      return _create(data);
  }
}

async function _create(data: any) {
  const url = data['url'];

  const result = await createUrl(url);

  if (result == -1) {
    return NextResponse.json(null, {status: 409})
  } else {
    return NextResponse.json(result);
  }
}

async function _delete(data: any) {
  const id = Number(data['id']);

  const result = await deleteUrlById(id);

  return NextResponse.json(result);
}