import React, { useContext } from 'react';
import { animated, useTrail } from 'react-spring';
import Img, { FluidObject } from 'gatsby-image';

import { AppContext } from '../../../common/context.app';
import { IMAGE_PLACEHOLDER_COLOR } from '../../../common/constants';
import {
  fadeUpProperties,
  fadeUpStyle,
} from '../../../common/utils/spring-animation';
import { formatDate } from '../../../common/utils/formateDate';
import { CopyToClipboard } from '../../utilities/copy-to-clipboard';

import { ArticleHeroProps } from './index';
import { Topics } from './utils';
import sharedStyle from './shared.module.css';
import style from './spotlight.module.css';

export const HeroSpotlight = ({
  image,
  heading,
  publishDate,
  topics,
}: ArticleHeroProps) => {
  const { prefersReducedMotion } = useContext(AppContext);

  const animation = useTrail(3, {
    ...fadeUpProperties,
    immediate: prefersReducedMotion,
  });

  return (
    <div className={`sd-container ${sharedStyle.hero}`}>
      <div className="sd-container-inner">
        <div className={`sd-grid ${style.inner}`}>
          <animated.div
            className={style.imageContainer}
            style={fadeUpStyle(animation[1])}
          >
            {image?.fluid?.src && (
              <Img
                fluid={image.fluid as FluidObject}
                alt={image.description || heading || undefined}
                backgroundColor={IMAGE_PLACEHOLDER_COLOR}
                className={style.image}
              />
            )}
          </animated.div>

          <div className={style.content}>
            <animated.div style={fadeUpStyle(animation[0])}>
              {topics && (
                <span className={`t-subhead-2 ${sharedStyle.topic}`}>
                  <Topics topics={topics} />
                </span>
              )}
              {heading && <h1 className="t-display-4">{heading}</h1>}
            </animated.div>

            {publishDate && (
              <animated.span
                className="t-heading-1"
                style={fadeUpStyle(animation[1])}
              >
                {formatDate(publishDate)}
              </animated.span>
            )}

            <animated.div style={fadeUpStyle(animation[2])}>
              <CopyToClipboard />
            </animated.div>
          </div>
        </div>
      </div>
    </div>
  );
};
