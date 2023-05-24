"use client";

import Image from 'next/image'
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search');

  return <h1>My Page{search}</h1>;
}