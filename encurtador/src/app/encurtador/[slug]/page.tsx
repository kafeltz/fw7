import Image from 'next/image'

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (<h1>My Page com Slug {params.slug}</h1>);
}