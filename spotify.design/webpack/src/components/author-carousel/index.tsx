import React, { useContext, useRef } from 'react';
import Swiper from 'react-id-swiper';
import { FluidObject } from 'gatsby-image';
import 'swiper/css/swiper.min.css';

import { AppContext } from '../../common/context.app';
import { CAROUSEL_SETTINGS } from './utils';
import { CustomCursor } from '../utilities/custom-cursor';
import { SpotlightCard } from './spotlight-card';
import { SummaryList } from '../summary-list';
import style from './style.module.css';
import { HOME_SECTION_IDS } from '../../pages';
import { ROUTE } from '../../common/constants/routes';

export interface Author {
  name?: string | null;
  jobTitle?: string | null;
  location?: string | null;
  headshot?: {
    image?: FluidObject | null;
    alt?: string | null;
  };
  quote?: string | null;
  articleUrl?: string | null;
}

interface Props {
  className?: string;
  authors: Author[];
}

export const AuthorCarousel = ({ className, authors }: Props) => {
  const { isDesktop, prefersReducedMotion } = useContext(AppContext);
  const boundingElementRef = useRef<HTMLDivElement>(null);
  return (
    <section
      id={HOME_SECTION_IDS.inTheSpotlight}
      className={`sd-container ${style.wrapper} ${className}`}
    >
      <div className="sd-container-inner">
        <SummaryList
          heading="In the Spotlight"
          subheading="Meet the humans who design Spotify"
          buttonLabel="View all in the spotlights"
          buttonUrl={`/${ROUTE.STORIES}/inspiration/in-the-spotlight`}
          trackingLabel="homepage"
        >
          <div ref={boundingElementRef}>
            <Swiper {...CAROUSEL_SETTINGS}>
              {authors.map((author: Author, i: number) => (
                <div key={i}>
                  <SpotlightCard author={author} type={i % 3} />
                </div>
              ))}
            </Swiper>
          </div>
          {isDesktop && !prefersReducedMotion && (
            <CustomCursor boundingElement={boundingElementRef} />
          )}
        </SummaryList>
      </div>
    </section>
  );
};

AuthorCarousel.defaultProps = {
  className: '',
};
