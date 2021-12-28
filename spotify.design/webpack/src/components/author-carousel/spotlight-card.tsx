import React, { useContext, useState } from 'react';
import Img from 'gatsby-image';
import { Link } from '../utilities/gatsby-link';
import { Author } from './index';
import { AUTHOR_BURSTS, Bursts } from './bursts';
import style from './spotlight-card.module.css';
import { AppContext } from '../../common/context.app';
import { IMAGE_PLACEHOLDER_COLOR } from '../../common/constants';

interface Props {
  author: Author;
  type: number;
}

export const SpotlightCard = ({ author, type }: Props) => {
  const { prefersReducedMotion } = useContext(AppContext);
  const [hover, setHover] = useState(false);
  const { articleUrl, headshot, name, quote, jobTitle, location } = author;

  if (!articleUrl || !headshot?.image?.src) return null;

  let typeClass = '';

  switch (type) {
    case 0:
      typeClass = style.type1;
      break;
    case 1:
      typeClass = style.type2;
      break;
    case 2:
      typeClass = style.type3;
      break;
  }

  /**
   * Reset count if there is no SVG for the index.
   */
  const burstIndex = type % (AUTHOR_BURSTS.length - 1);

  return (
    <div className={`${style.card} ${typeClass}`}>
      {!prefersReducedMotion && (
        <div className={style.burstWrapper}>
          <div className={style.burst}>
            <Bursts index={burstIndex} active={hover} />
          </div>
        </div>
      )}
      <div className={style.inner}>
        <Link
          to={articleUrl}
          className={style.link}
          aria-label={`Read more about ${name}`}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Img
            fluid={headshot.image}
            alt={headshot.alt ? headshot.alt : ''}
            backgroundColor={IMAGE_PLACEHOLDER_COLOR}
            className={style.image}
            fadeIn
            loading="lazy"
          />
          {quote && (
            <div className={style.overlay}>
              <div className={style.overlayBackground} />
              <div className={style.overlayContent}>
                <q className="t-subhead-2">{quote}</q>
                <div className={`t-ui-4 ${style.fakeLink}`}>Read more</div>
              </div>
            </div>
          )}
        </Link>
        {name && <h3 className="t-heading-2">{name}</h3>}
        {jobTitle && <span className="t-subhead-2">{jobTitle}</span>}
      </div>
      {location && (
        <span className={`t-ui-4 ${style.location}`}>{location}</span>
      )}
    </div>
  );
};
