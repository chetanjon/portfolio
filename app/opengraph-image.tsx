import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Chetan Jonnalagadda — Product Manager who ships 0→live. iOS app shipped in 7 days at a 5.0 App Store rating.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0A',
          padding: '64px 72px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Top bar — identity */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                backgroundColor: '#E07A5F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0A0A0A',
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              CJ
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  color: '#F0F0F0',
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                Chetan Jonnalagadda
              </div>
              <div style={{ color: '#888', fontSize: 16, marginTop: 2, letterSpacing: '0.24em', textTransform: 'uppercase' }}>
                Product Manager
              </div>
            </div>
          </div>

          {/* Live badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 16px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#4ADE80',
              }}
            />
            <div style={{ color: '#9CA3AF', fontSize: 14, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              2 products live
            </div>
          </div>
        </div>

        {/* Center — the claim */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#E07A5F',
              fontSize: 16,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            Zero → Live
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 68,
              fontWeight: 700,
              color: '#F5F5F5',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              maxWidth: 1000,
            }}
          >
            <span>Shipped a live iOS app in&nbsp;</span>
            <span style={{ color: '#E07A5F' }}>7 days at a 5.0 rating.&nbsp;</span>
            <span>Scaled a B2B marketplace&nbsp;</span>
            <span style={{ color: '#E07A5F' }}>3.75x.</span>
          </div>
        </div>

        {/* Bottom — metrics + url */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', gap: 48 }}>
            {[
              { v: '5.0★', l: 'App Store launch' },
              { v: '20→75+', l: 'Vendor growth' },
              { v: '25→40%', l: 'Gross margin' },
            ].map((m) => (
              <div key={m.l} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: '#F5F5F5', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {m.v}
                </div>
                <div style={{ color: '#6B7280', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>
                  {m.l}
                </div>
              </div>
            ))}
          </div>
          <div style={{ color: '#6B7280', fontSize: 18, letterSpacing: '0.06em' }}>
            chetanjonnalagadda.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
