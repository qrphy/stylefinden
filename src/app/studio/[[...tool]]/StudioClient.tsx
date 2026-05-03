// Sanity Studio istemci bileşeni — NextStudio SSR olmadan yüklenir çünkü Studio tarayıcı API'lerine ihtiyaç duyar.
// Bu dosya StudioPage (page.tsx) tarafından sarılarak render edilir.
'use client'
import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((m) => m.NextStudio),
  { ssr: false }
)

export default function StudioClient() {
  return <NextStudio config={config} />
}
