import React from 'react';
import { createGlobalStyle as css } from 'styled-components';

const LatinFonts = css`
  @font-face {
    font-family: 'spotify-circular';
    src: url('https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff') format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIv3T-Book.ttf') format('ttf');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'spotify-circular';
    src: url('https://open.scdn.co/fonts/CircularSpUIv3T-Bold.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIv3T-Bold.woff') format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIv3T-Bold.ttf') format('ttf');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'spotify-circular';
    src: url('https://open.scdn.co/fonts/CircularSpUIv3T-Black.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIv3T-Black.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIv3T-Black.ttf') format('ttf');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
`;

const ArabicFonts = css`
  @font-face {
    font-family: 'circular-spotify-arabic';
    src: url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Light.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Light.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Light.otf')
        format('opentype');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'circular-spotify-arabic';
    src: url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Book.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Book.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Book.otf')
        format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'circular-spotify-arabic';
    src: url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Bold.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Bold.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Bold.otf')
        format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'circular-spotify-arabic';
    src: url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Black.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Black.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIAraOnly-Black.otf')
        format('opentype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
`;

const HebrewFonts = css`
  @font-face {
    font-family: 'circular-spotify-hebrew';
    src: url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Light.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Light.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Light.otf')
        format('opentype');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'circular-spotify-hebrew';
    src: url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Book.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Book.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Book.otf')
        format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'circular-spotify-hebrew';
    src: url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Bold.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Bold.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Bold.otf')
        format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'circular-spotify-hebrew';
    src: url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Black.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Black.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUIHbrOnly-Black.otf')
        format('opentype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
`;

const CyrillicFonts = css`
  @font-face {
    font-family: 'circular-spotify-cyrillic';
    src: url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Light.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Light.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Light.otf')
        format('opentype');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'circular-spotify-cyrillic';
    src: url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Book.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Book.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Book.otf')
        format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'circular-spotify-cyrillic';
    src: url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Bold.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Bold.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Bold.otf')
        format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'circular-spotify-cyrillic';
    src: url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Black.woff2')
        format('woff2'),
      url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Black.woff')
        format('woff'),
      url('https://open.scdn.co/fonts/CircularSpUICyrOnly-Black.otf')
        format('opentype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
`;

export function Fonts({ locale }: { locale: string }) {
  return (
    <>
      {/** always load latin fonts */}
      <LatinFonts />
      {locale === 'ar' && <ArabicFonts />}
      {locale === 'he' && <HebrewFonts />}
      {locale === 'ru' && <CyrillicFonts />}
    </>
  );
}
