import React, { useContext } from 'react';
import { PlayerContext } from '../../../common/context.player';
import { getPropertyWithHighestValue } from '../../../common/utils/array.getPropertyWithHighestValue';
import { IconArrow } from '../../utilities/ui-icons';
import style from './artwork.module.css';

interface Props {
  className?: string;
  album: Spotify.Album;
}
export const MusicEntryArtwork = ({ className, album }: Props) => {
  const { activePlaylist } = useContext(PlayerContext);
  const { name, images } = album;

  let srcSet = '';
  images.forEach(({ url, width }, index) => {
    srcSet += `${url} ${width}w`;
    if (index < images.length) {
      srcSet += ', ';
    }
  });

  const highestQuality = getPropertyWithHighestValue(images, 'width');

  return (
    <a
      href={activePlaylist?.external_urls?.spotify}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className={style.artworkLink}
    >
      <figure className={`${style.artwork} ${className}`}>
        <img
          width={highestQuality.width || 640}
          height={highestQuality.height || 640}
          srcSet={srcSet}
          src={highestQuality.url}
          loading="lazy"
          aria-hidden="true"
        />
        <div className={style.artworkArrow}>
          <IconArrow rotation={-135} />
        </div>
      </figure>
    </a>
  );
};

MusicEntryArtwork.defaultProps = {
  className: '',
};
