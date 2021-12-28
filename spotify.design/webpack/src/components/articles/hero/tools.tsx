import React, { useContext } from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { animated, useTrail } from 'react-spring';

import {
  ContentfulToolDownload,
  ContentfulToolExternalLink,
} from '../../../../typings/graphql-types';
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
import { CTADownload } from '../../cta-download';
import sharedStyle from './shared.module.css';
import style from './tools.module.css';

interface Props extends ArticleHeroProps {
  downloads?: ContentfulToolDownload[];
  links?: ContentfulToolExternalLink[];
}

export const HeroTools = ({
  image,
  heading,
  publishDate,
  downloads,
  links,
  topics,
}: Props) => {
  const { prefersReducedMotion } = useContext(AppContext);
  const aspectRatio = image?.fluid?.aspectRatio;
  const imageIsSquareOrPortrait = aspectRatio && aspectRatio <= 1;
  const smallClass = imageIsSquareOrPortrait ? style.narrow : '';

  const animation = useTrail(4, {
    ...fadeUpProperties,
    immediate: prefersReducedMotion,
  });

  return (
    <div className={`sd-container ${sharedStyle.hero}`}>
      <div className="sd-container-inner">
        <div className={`sd-grid ${style.inner}`}>
          <div className={style.content}>
            <animated.div style={fadeUpStyle(animation[0])}>
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
                style={fadeUpStyle(animation[1])}
              >
                {formatDate(publishDate)}
              </animated.span>
            )}
            <animated.div style={fadeUpStyle(animation[2])}>
              <CopyToClipboard />
            </animated.div>
          </div>

          <animated.div
            className={`${style.image} ${smallClass}`}
            style={fadeUpStyle(animation[1])}
          >
            {image?.fluid?.src && (
              <Img
                fluid={image.fluid as FluidObject}
                alt={image.description || heading || undefined}
                backgroundColor={IMAGE_PLACEHOLDER_COLOR}
              />
            )}
          </animated.div>

          <animated.div
            className={style.resource}
            style={fadeUpStyle(animation[3])}
          >
            {downloads?.map(download => (
              <CTADownload
                key={download.title}
                url={download.file?.file?.url || ''}
                downloadable={true}
                filetype={download.filetype || ''}
                title={download.title || ''}
              />
            ))}

            {links?.map(link => (
              <CTADownload
                key={link.link}
                url={link.link || ''}
                downloadable={true}
                filetype={link.filetype || ''}
                title={link.title || ''}
              />
            ))}
          </animated.div>
        </div>
      </div>
    </div>
  );
};
