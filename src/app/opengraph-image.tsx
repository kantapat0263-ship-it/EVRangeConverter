import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/site';

export const alt = `${SITE_NAME} — EV Range Calculator`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 50% 30%, #15303d 0%, #121516 70%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: '-2px',
            color: '#33bcff',
            textTransform: 'uppercase',
          }}
        >
          EV Range Converter
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            fontWeight: 400,
            color: '#cbd5e1',
          }}
        >
          Convert distance to battery usage · Tesla · BYD · WLTP · EPA
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 28,
            color: '#94a3b8',
          }}
        >
          Free EV Range &amp; Saving Calculator
        </div>
      </div>
    ),
    { ...size }
  );
}
