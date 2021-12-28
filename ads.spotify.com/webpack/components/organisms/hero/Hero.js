import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import { Eyebrow } from 'components/atoms/eyebrow';
import { getPageEyebrow } from 'utils/get-page-eyebrow';
import { useImageSupport } from 'utils/use-image-support';
import { useTextFit } from 'utils/use-text-fit';
import { PAGES } from 'constants/content-types';
import * as CommonTypes from 'constants/common-proptypes';
import { ratioPercentage } from 'styles/variables';
import { ACTIVATE_ANIMATION_CLASS } from 'styles/animations';
import { useAppContext } from 'contexts/app-context';

import { CTA_TYPES } from 'constants/cta-types';
import { getLinkProps } from 'utils/get-link-props';
import {
  getMultiCtaAction,
  eventTrack,
  MULTI_CTA_CLICK,
  MODULES_MULTI_CTA,
} from 'utils/google-tag-manager';

import * as Styled from './Hero.styled';

/**
 * FloatingBox Component
 * @param {object} props
 * @param {object} props.children - React children reference
 * @param {string} props.modifier - Style modifier rule
 * @param {number} props.aspectRatio - aspect ratio value
 * @returns {ReactComponent}
 */
const FloatingBox = ({ children, modifier, aspectRatio }) => {
  return (
    <Styled.FloatingBox modifier={modifier}>
      <Styled.FloatingBoxWrapper
        className="floatingbox-wrapper"
        aspectRatio={aspectRatio}
      >
        <Styled.FloatingBoxContent className="floatingbox-content">
          {children}
        </Styled.FloatingBoxContent>
      </Styled.FloatingBoxWrapper>
    </Styled.FloatingBox>
  );
};

const PAGE_VARIATIONS = {
  withImage: {
    [PAGES.HOME]: Styled.MODIFIERS.useA,
    [PAGES.LANDING]: Styled.MODIFIERS.useA,
    [PAGES.DETAIL]: Styled.MODIFIERS.useB,
  },
  withoutImage: {
    [PAGES.HOME]: Styled.MODIFIERS.useC,
    [PAGES.LANDING]: Styled.MODIFIERS.useC,
    [PAGES.DETAIL]: Styled.MODIFIERS.useD,
  },
};

/**
 * getPageVariation - Gets the page variation modifier based on certain rules
 * @param {string} pageContext - The page content type
 * @param {boolean} hasImage - If the hero has image or not
 * @returns {string}
 */
function getPageVariation(pageContext, hasImage) {
  if (hasImage) return PAGE_VARIATIONS.withImage[pageContext];

  return PAGE_VARIATIONS.withoutImage[pageContext];
}

/**
 * FloatingBox Component
 * @param {object} props
 * @param {object} props.children - React children reference
 * @param {string} props.pageContext - The page content type
 */
const VariationWrapper = ({ children, pageVariation }) => {
  const [Content, Figure] = children;

  if (pageVariation === Styled.MODIFIERS.useA) {
    return (
      <>
        <FloatingBox
          modifier={pageVariation}
          aspectRatio={ratioPercentage.fourThree}
        >
          {Figure}
        </FloatingBox>
        <Styled.Grid>
          <Styled.AspectRatioGrid className="has-content">
            {Content}
          </Styled.AspectRatioGrid>
        </Styled.Grid>
      </>
    );
  }

  if (pageVariation === Styled.MODIFIERS.useB) {
    return (
      <>
        <FloatingBox
          modifier={pageVariation}
          aspectRatio={ratioPercentage.fourThree}
        >
          {Content}
        </FloatingBox>
        <Styled.Grid modifier={pageVariation}>
          <Styled.AspectRatioGrid className="has-figure">
            {Figure}
          </Styled.AspectRatioGrid>
        </Styled.Grid>
      </>
    );
  }

  // Variation C and D
  return <>{Content}</>;
};

const CONTENT_FIT_PADDING = 88; // default font-size value

/**
 * Hero Component
 * @param {object} props
 * @param {object} props.data - Page data
 * @param {string} props.pageContext - The page content type
 * @returns {ReactComponent}
 */
const Hero = ({ data, pageContext }) => {
  const { hero } = data;
  const ctaItems = get(hero, 'ctasCollection.items', []);
  const hasImage = !!hero.foregroundImage;
  const tag = getPageEyebrow(data);
  const pageVariation = getPageVariation(pageContext, hasImage);
  const { queryUrl, fileExt } = useImageSupport();
  const [startAnimation, setStartAnimation] = useState(false);
  const [{ isAntiFlickerActive }] = useAppContext();
  const { style, textFitRef, containerToFitRef } = [
    Styled.MODIFIERS.useA,
    Styled.MODIFIERS.useB,
  ].includes(pageVariation)
    ? useTextFit({
        isWrapped: true,
        paddingBreakpoints: {
          sm: 0,
          lg: CONTENT_FIT_PADDING,
        },
      })
    : {};

  useEffect(() => {
    if (!isAntiFlickerActive) {
      setStartAnimation(true);
    }
  }, [isAntiFlickerActive]);

  return (
    <Styled.Header textColor={hero.textColor} modifier={pageVariation}>
      <Styled.Container modifier={pageVariation}>
        <VariationWrapper pageVariation={pageVariation}>
          <Styled.Content
            ref={containerToFitRef}
            modifier={pageVariation}
            backgroundColor={hero.backgroundColor}
          >
            <Styled.ContentContainer
              className={classNames('content-container', {
                [ACTIVATE_ANIMATION_CLASS]: startAnimation,
              })}
            >
              {tag && (
                <Eyebrow css={Styled.eyebrowStyles} className="eyebrow">
                  {tag}
                </Eyebrow>
              )}
              <Styled.Title ref={textFitRef} className="title" style={style}>
                {hero.title}
              </Styled.Title>
              {pageVariation === Styled.MODIFIERS.useA && hero.description && (
                <Styled.Description>{hero.description}</Styled.Description>
              )}
              {pageVariation === Styled.MODIFIERS.useA && ctaItems && (
                <Styled.CtaWrapper>
                  {ctaItems.map(
                    ({ title, url, type, overrideFunctionality }, indexCta) => {
                      const { href, asLink } = getLinkProps(url);

                      const onCtaClick = event => {
                        const { isModalFormOpen } = get(event, 'data', {});
                        const actionText = getMultiCtaAction(
                          { overrideFunctionality, url },
                          isModalFormOpen,
                        );

                        eventTrack(MULTI_CTA_CLICK, {
                          event,
                          module: MODULES_MULTI_CTA.heroDynamic,
                          actionText,
                          headerText: title,
                        });
                      };

                      return (
                        <Styled.Cta
                          key={kebabCase(`${title}-${indexCta}`)}
                          type={
                            type === CTA_TYPES.SECONDARY
                              ? CTA_TYPES.TERTIARY
                              : type
                          }
                          overrideFunctionality={overrideFunctionality}
                          href={href}
                          asLink={asLink}
                          onClick={onCtaClick}
                        >
                          {title}
                        </Styled.Cta>
                      );
                    },
                  )}
                </Styled.CtaWrapper>
              )}
            </Styled.ContentContainer>
          </Styled.Content>
          {hero.foregroundImage && fileExt && (
            <Styled.Figure modifier={pageVariation}>
              <Styled.FigureImage
                className={classNames({
                  [ACTIVATE_ANIMATION_CLASS]: startAnimation,
                })}
                src={hero.foregroundImage[queryUrl]}
                alt={hero.foregroundImage.description || ''}
              />
            </Styled.Figure>
          )}
        </VariationWrapper>
      </Styled.Container>
    </Styled.Header>
  );
};

Hero.propTypes = {
  /**
   * Page data
   */
  data: PropTypes.shape({
    /**
     * Hero data
     */
    hero: PropTypes.shape({
      /**
       * The heading title
       */
      title: PropTypes.string.isRequired,
      /**
       * The color of the title
       */
      titleColor: PropTypes.string,
      /**
       * The foreground image
       */
      foregroundImage: CommonTypes.Image,
      /**
       * The color of the text
       */
      textColor: PropTypes.string,
      /**
       * The color of the theme
       */
      theme: PropTypes.string,
      /**
       * Color used as background
       */
      backgroundColor: PropTypes.string,
    }),
  }).isRequired,
  /**
   * The page content type
   */
  pageContext: PropTypes.string,
};

export default Hero;
