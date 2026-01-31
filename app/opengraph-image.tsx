import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Chetan Jonnalagadda - Product Manager';
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
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor: '#1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E07A5F',
              fontSize: 36,
              fontWeight: 700,
              marginRight: 24,
            }}
          >
            CJ
          </div>
          <div style={{ color: '#666', fontSize: 28 }}>chetanjonnalagadda.com</div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#F0F0F0',
            lineHeight: 1.2,
            marginBottom: '24px',
          }}
        >
          Chetan Jonnalagadda
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#E07A5F',
            marginBottom: '32px',
          }}
        >
          Product Manager
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#888',
            lineHeight: 1.5,
            maxWidth: '800px',
          }}
        >
          B2B marketplace growth, seller experience, and data-driven product development.
          CSPO certified. MS in Management of Technology at ASU.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
