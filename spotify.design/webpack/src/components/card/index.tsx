import React, { useCallback } from 'react';
import Img, { FluidObject } from 'gatsby-image';

import { IMAGE_PLACEHOLDER_COLOR } from '../../common/constants';
import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';
import { getPathname } from '../../common/utils/getPathname';
import { getTrackingLabelFromPathname } from '../../common/utils/getTrackingLabelFromPathname';
import { Link } from '../utilities/gatsby-link';

import { Tag, TagData } from '../tag';
import style from './style.module.css';

export interface CardData {
  title?: string | null;
  description?: string | null;
  image?: {
    src?: FluidObject | null;
    alt?: string | null;
  };
  href?: string | null;
  tags?: TagData[] | null;
  playlist?: string | null;
}

export const Card = ({ title, description, href, tags, image }: CardData) => {
  const handleClick = useCallback(() => {
    const pathname = getPathname();
    const category = getTrackingLabelFromPathname(pathname);
    sendTrackingEvent(category, 'click', `Card: ${title}`);
  }, [sendTrackingEvent]);

  return (
    <div className={style.card}>
      {image?.src && (
        <Img
          fluid={image.src}
          className={style.card__image}
          backgroundColor={IMAGE_PLACEHOLDER_COLOR}
          alt={image.alt ? image.alt : ''}
          loading="lazy"
        />
      )}

      {tags && (
        <ul className={`unstyled-list ${style.card__tags}`}>
          {tags.map(({ title, href }) => (
            <li key={title}>
              <Tag title={title} href={href} />
            </li>
          ))}
        </ul>
      )}

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
