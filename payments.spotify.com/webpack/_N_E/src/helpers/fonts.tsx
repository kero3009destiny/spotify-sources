import React from 'react';

const GlobalFonts = () => {
  return (
    <style jsx global>{`
      @font-face {
        font-family: spotify-circular;
        src: url('https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff2') format('woff2'),
          url('https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff') format('woff'),
          url('https://open.scdn.co/fonts/CircularSpUIv3T-Book.ttf') format('ttf');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: spotify-circular;
        src: url('https://open.scdn.co/fonts/CircularSpUIv3T-Bold.woff2') format('woff2'),
          url('https://open.scdn.co/fonts/CircularSpUIv3T-Bold.woff') format('woff'),
          url('https://open.scdn.co/fonts/CircularSpUIv3T-Bold.ttf') format('ttf');
        font-weight: 700;
        font-style: normal;
      }

      @font-face {
        font-family: spotify-circular;
        src: url('https://open.scdn.co/fonts/CircularSpUIv3T-Black.woff2') format('woff2'),
          url('https://open.scdn.co/fonts/CircularSpUIv3T-Black.woff') format('woff'),
          url('https://open.scdn.co/fonts/CircularSpUIv3T-Black.ttf') format('ttf');
        font-weight: 900;
        font-style: normal;
      }
    `}</style>
  );
};

export default GlobalFonts;
