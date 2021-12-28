import React, { useContext } from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { animated, useTrail } from 'react-spring';

import { AppContext } from '../../../common/context.app';
import { IMAGE_PLACEHOLDER_COLOR } from '../../../common/constants';
import { formatDate } from '../../../common/utils/formateDate';
import { CopyToClipboard } from '../../utilities/copy-to-clipboard';
import {
  fadeUpProperties,
  fadeUpStyle,
} from '../../../common/utils/spring-animation';

import { ArticleHeroProps } from './index';
import { Topics } from './utils';
import sharedStyle from './shared.module.css';
import style from './long-form.module.css';

export const HeroLongForm = ({
  image,
  heading,
  publishDate,
  topics,
}: ArticleHeroProps) => {
  const { prefersReducedMotion } = useContext(AppContext);
  const aspectRatio = image?.fluid?.aspectRatio;
  const imageIsSquareOrPortrait = aspectRatio && aspectRatio <= 1;
  const smallClass = imageIsSquareOrPortrait ? style.narrow : '';

  const animation = useTrail(3, {
    ...fadeUpProperties,
    immediate: prefersReducedMotion,
  });

  return (
    <div className={`sd-container ${sharedStyle.hero}`}>
      <div className="sd-container-inner">
        <div className={`sd-grid ${style.inner}`}>
          <animated.div
            className={`${style.image} ${smallClass}`}
            style={fadeUpStyle(animation[0])}
          >
            {image?.fluid?.src && (
              <Img
                fluid={image.fluid as FluidObject}
                alt={image.description || heading || undefined}
                backgroundColor={IMAGE_PLACEHOLDER_COLOR}
              />
            )}
          </animated.div>

          <div className={style.content}>
            <animated.div style={fadeUpStyle(animation[1])}>
              {topics && (
                <span className={`t-subhead-2 ${sharedStyle.topic}`}>
                  <Topics topics={topics} />
                </span>
              )}
              {heading && <h1 className="t-display-2">{heading}</h1>}
            </animated.div>
            {publishDate && (
              <animated.span
                className="t-heading-1"
                style={fadeUpStyle(animation[2])}
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
