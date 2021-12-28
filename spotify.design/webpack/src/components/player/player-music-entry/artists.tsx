import React from 'react';

interface Props {
  artists: Spotify.Artist[];
  className?: string;
}

export const Artists = ({ artists, className }: Props) => (
  <span className={className}>
    {artists.map(({ name }, index) => (
      <span key={name}>
        {name}
        {index + 1 < artists.length ? `, ` : ''}
      </span>
    ))}
  </span>
);

Artists.defaultProps = {
  className: '',
};
