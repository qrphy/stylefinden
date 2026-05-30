export function OgCard({
  category,
  title,
  tags,
  imageUrl,
}: {
  category: string
  title: string
  tags: string[]
  imageUrl: string | null
}) {
  const panelWidth = imageUrl ? 600 : 1200
  const fontSize = title.length > 40 ? 42 : title.length > 28 ? 52 : 62

  return (
    <div style={{ display: 'flex', width: '1200px', height: '630px', backgroundColor: '#000' }}>
      {/* Text panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 52px',
          width: `${panelWidth}px`,
          flexShrink: 0,
          backgroundColor: '#000000',
        }}
      >
        <div style={{ display: 'flex' }}>
          <span
            style={{
              fontSize: 13,
              letterSpacing: '0.28em',
              color: '#ffffff',
              fontWeight: 700,
              fontFamily: 'sans-serif',
            }}
          >
            STYLEFINDEN
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex' }}>
            <span
              style={{
                fontSize: 10,
                letterSpacing: '0.35em',
                color: '#888888',
                fontWeight: 700,
                fontFamily: 'sans-serif',
              }}
            >
              {category}
            </span>
          </div>

          <div style={{ display: 'flex' }}>
            <span
              style={{
                fontSize: fontSize,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.05,
                fontFamily: 'sans-serif',
              }}
            >
              {title}
            </span>
          </div>

          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '20px' }}>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: '#555555',
                    fontWeight: 600,
                    fontFamily: 'sans-serif',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex' }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              color: '#444444',
              fontFamily: 'sans-serif',
            }}
          >
            stylefinden.com
          </span>
        </div>
      </div>

      {imageUrl && (
        <div
          style={{
            display: 'flex',
            flex: 1,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
      )}
    </div>
  )
}
