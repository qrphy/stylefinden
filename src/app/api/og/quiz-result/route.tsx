import { ImageResponse } from 'next/og'
import { STYLE_PROFILES } from '@/lib/style-profiles'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const style = searchParams.get('style') ?? ''
  const profile = STYLE_PROFILES[style]

  if (!profile) return new Response('Not found', { status: 404 })

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '1200px',
        height: '630px',
        backgroundColor: '#000',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 72px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, letterSpacing: '0.3em', color: '#fff', fontWeight: 700 }}>
          STYLEFINDEN
        </span>
        <span style={{ fontSize: 11, letterSpacing: '0.3em', color: '#555', fontWeight: 600 }}>
          STYLE QUIZ RESULT
        </span>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.35em', color: '#666', fontWeight: 700 }}>
          MY STYLE IS
        </span>
        <span
          style={{
            fontSize: profile.name.length > 12 ? 88 : 104,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
        >
          {profile.name}
        </span>
        <span style={{ fontSize: 20, color: '#888', fontStyle: 'italic', lineHeight: 1.4, marginTop: 4 }}>
          &ldquo;{profile.tagline}&rdquo;
        </span>

        {/* Traits */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          {profile.traits.map((trait, i) => (
            <span
              key={i}
              style={{
                fontSize: 10,
                letterSpacing: '0.25em',
                color: '#444',
                fontWeight: 600,
                border: '1px solid #333',
                padding: '6px 12px',
              }}
            >
              {trait.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <span style={{ fontSize: 11, letterSpacing: '0.22em', color: '#333' }}>
        stylefinden.com/style-quiz
      </span>
    </div>,
    { width: 1200, height: 630 }
  )
}
