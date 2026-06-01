import { redirect } from 'next/navigation'

type SearchParams = Promise<{ style?: string; occasion?: string; season?: string }>

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { style, occasion, season } = await searchParams

  if (!style) redirect('/style-quiz')

  const qs = new URLSearchParams()
  if (occasion) qs.set('occasion', occasion)
  if (season && season !== 'any') qs.set('season', season)

  redirect(`/style-quiz/result/${style}${qs.size ? `?${qs}` : ''}`)
}
