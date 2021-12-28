import React from 'react';
import style from './style.module.css';

interface Props {
  src: string;
  podcast?: boolean | null;
}

const EMBED_ORIGIN = 'https://open.spotify.com/';

export const SpotifyEmbed = ({ src, podcast }: Props) => {
  if (!src) return null;

  const embedUrl = src.replace(EMBED_ORIGIN, `${EMBED_ORIGIN}embed/`);
  return (
    <iframe
      src={embedUrl}
      width="300"
      height={podcast ? 80 : 380}
      frameBorder="0"
      allow="encrypted-media"
      className={`sd-article-spotify-embed ${style.embed} ${
        podcast ? 'podcast' : ''
      }`}
    />
  );
};
