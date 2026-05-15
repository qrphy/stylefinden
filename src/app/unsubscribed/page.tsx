import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Unsubscribed — Stylefinden',
  robots: { index: false, follow: false },
}

export default function UnsubscribedPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <span className="text-3xl font-black">✦</span>
        <h1 className="text-2xl font-black tracking-tight mt-5 mb-3">
          You&apos;re unsubscribed.
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-10">
          You won&apos;t receive any more emails from us. You can resubscribe anytime from the homepage.
        </p>
        <Link
          href="/"
          className="inline-block text-xs font-semibold tracking-widest uppercase border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors duration-200"
        >
          Back to Stylefinden
        </Link>
      </div>
    </main>
  )
}
