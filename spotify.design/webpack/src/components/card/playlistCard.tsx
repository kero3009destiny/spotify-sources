import React, { useCallback, useContext } from 'react';
import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';
import { getPathname } from '../../common/utils/getPathname';
import { getTrackingLabelFromPathname } from '../../common/utils/getTrackingLabelFromPathname';
import { PlayerContext } from '../../common/context.player';
import { Link } from '../utilities/gatsby-link';
import { IconPlayCircular } from '../utilities/ui-icons';
import { Tag, TagData } from '../tag';
import style from './style.module.css';
import playlistStyle from './playlistCard.module.css';
import Img from 'gatsby-image';
import { IMAGE_PLACEHOLDER_COLOR } from '../../common/constants';
import { ROUTE } from '../../common/constants/routes';

export interface PlaylistCardData {
  title?: string | null;
  description?: string | null;
  image?: {
    src?: string;
  };
  href?: string | null;
  tags?: TagData[] | null;
  playlist?: string;
}

export const PlaylistCard = ({
  title,
  description,
  href,
  tags,
  image,
  playlist,
}: PlaylistCardData) => {
  const {
    setOverlayOpen,
    setActivePlaylist,
    setRequestedPlaylist,
    authenticated,
    isCompatible,
  } = useContext(PlayerContext);

  const handleClick = useCallback(
    event => {
      const pathname = getPathname();
      const category = getTrackingLabelFromPathname(pathname);
      sendTrackingEvent(category, 'click', `Card: ${title}`);

      if (playlist && isCompatible) {
        event.preventDefault();

        if (authenticated) {
          // Authenticated? Set playlist to active.
          setActivePlaylist(playlist);
        } else {
          // Otherwise request the playlist and open auth. */
          setRequestedPlaylist(playlist);
        }

        setOverlayOpen(true);
      }
    },
    [
      sendTrackingEvent,
      setOverlayOpen,
      isCompatible,
      authenticated,
      setRequestedPlaylist,
    ]
  );

  const imageIsFluid = 'fluid' in image;

  return (
    <div className={`${style.card} ${playlistStyle.playlistCard}`}>
      <div className={playlistStyle.imageContainer}>
        {image?.src && !imageIsFluid && (
          <img
            src={image.src}
            className={playlistStyle.image}
            alt={title || undefined}
            width={800}
            height={800}
            loading="lazy"
          />
        )}
        {imageIsFluid && (
          <Img
            fluid={image?.fluid}
            className={style.card__image}
            backgroundColor={IMAGE_PLACEHOLDER_COLOR}
            alt={image?.alt || undefined}
            loading="lazy"
          />
        )}

        <IconPlayCircular className={playlistStyle.playIcon} />
      </div>

      <div className={style.cardCtas}>
        {tags && (
          <ul className={`unstyled-list ${style.card__tags}`}>
            {tags.map(({ title, href, parentCategory }) => (
              <li
                key={title}
                className={
                  parentCategory === ROUTE.LISTEN ? 'theme-listen' : ''
                }
              >
                <Tag title={title} href={href} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {title && (
        <h3 className={`t-heading-2 ${style.card__title}`}>
          {href ? (
            <Link className={style.card__link} to={href} onClick={handleClick}>
              {title}
            </Link>
          ) : (
            <span>{title}</span>
          )}
        </h3>
      )}

      {description && (
        <p className={`t-body-4 ${style.card__description}`}>{description}</p>
      )}
    </div>
  );
};
