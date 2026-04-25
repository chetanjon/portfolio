import { ImageResponse } from 'next/og';
import { getWorkBySlug } from '@/data/work';

export const runtime = 'edge';

export const alt = 'Case Study | Chetan Jonnalagadda';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function CaseStudyOGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return new ImageResponse(<div>Not Found</div>, size);
  }

  const topMetrics = work.metrics.slice(0, 3);

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
        {/* Top bar — identity + Case Study badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
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
              <div
                style={{
                  color: '#888',
                  fontSize: 16,
                  marginTop: 2,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                }}
              >
                Product Manager
              </div>
            </div>
          </div>

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
                color: '#9CA3AF',
                fontSize: 14,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              Case Study
            </div>
          </div>
        </div>

        {/* Center — company + role */}
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
            {work.role}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 96,
              fontWeight: 700,
              color: '#F5F5F5',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              maxWidth: 1000,
            }}
          >
            {work.company}
          </div>
          <div
            style={{
              color: '#9CA3AF',
              fontSize: 22,
              marginTop: 24,
              maxWidth: 980,
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
            }}
          >
            {work.description}
          </div>
        </div>

        {/* Bottom — top metrics + url */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', gap: 48 }}>
            {topMetrics.map((m) => (
              <div key={m.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    color: '#F5F5F5',
                    fontSize: 32,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    color: '#6B7280',
                    fontSize: 13,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginTop: 4,
                  }}
                >
                  {m.label}
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
    { ...size }
  );
}
