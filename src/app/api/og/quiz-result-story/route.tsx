import { ImageResponse } from 'next/og'
import { STYLE_PROFILES } from '@/lib/style-profiles'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const style = searchParams.get('style') ?? ''
  const profile = STYLE_PROFILES[style]

  if (!profile) return new Response('Not found', { status: 404 })

  const imageResponse = new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '1080px',
        height: '1920px',
        backgroundColor: '#000',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '96px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 18, letterSpacing: '0.3em', color: '#fff', fontWeight: 700 }}>
          STYLEFINDEN
        </span>
        <span style={{ fontSize: 14, letterSpacing: '0.3em', color: '#444', fontWeight: 600 }}>
          STYLE QUIZ
        </span>
      </div>

      {/* Center */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <span style={{ fontSize: 14, letterSpacing: '0.4em', color: '#555', fontWeight: 700 }}>
          MY STYLE IS
        </span>

        <span
          style={{
            fontSize: profile.name.length > 12 ? 120 : profile.name.length > 8 ? 140 : 160,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}
        >
          {profile.name}
        </span>

        <span
          style={{
            fontSize: 26,
            color: '#666',
            fontStyle: 'italic',
            lineHeight: 1.5,
            maxWidth: '800px',
            marginTop: '8px',
          }}
        >
          &ldquo;{profile.tagline}&rdquo;
        </span>

        {/* Divider */}
        <div style={{ display: 'flex', width: '60px', height: '1px', backgroundColor: '#222', marginTop: '8px' }} />

        {/* Traits */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '8px' }}>
          {profile.traits.map((trait, i) => (
            <span
              key={i}
              style={{
                fontSize: 12,
                letterSpacing: '0.3em',
                color: '#444',
                fontWeight: 600,
                border: '1px solid #2a2a2a',
                padding: '10px 20px',
              }}
            >
              {trait.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: 13, letterSpacing: '0.25em', color: '#333' }}>
          Find your style at
        </span>
        <span style={{ fontSize: 18, letterSpacing: '0.2em', color: '#555', fontWeight: 700 }}>
          stylefinden.com/style-quiz
        </span>
      </div>
    </div>,
    { width: 1080, height: 1920 }
  )

  const buffer = await imageResponse.arrayBuffer()
  const filename = `my-style-${style}.png`

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
