import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#E07A5F',
          fontWeight: 700,
          borderRadius: 36,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        CJ
      </div>
    ),
    {
      ...size,
    }
  );
}
