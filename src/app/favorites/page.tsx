import type { Metadata } from 'next'
import FavoritesPageView from '@/components/favorites/FavoritesPageView'

export const metadata: Metadata = {
  title: 'Saved Looks | STYLEFINDEN',
  description: 'Your personal outfit collection — save looks you love and come back to them anytime.',
  robots: { index: false },
}

export default function FavoritesPage() {
  return <FavoritesPageView />
}
