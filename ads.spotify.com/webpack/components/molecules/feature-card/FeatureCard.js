import React, { useState } from 'react';
import PropTypes, { any } from 'prop-types';
import { ThemeProvider } from 'styled-components';

import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import { Markdown } from 'components/molecules';
import { getThemeKey, THEMES } from 'utils/get-theme-color';
import { getLinkProps } from 'utils/get-link-props';
import {
  getMultiCtaAction,
  eventTrack,
  MULTI_CTA_CLICK,
  MODULES_MULTI_CTA,
} from 'utils/google-tag-manager';
import { useImageSupport } from 'utils/use-image-support';
import { CTA_TYPES } from 'constants/cta-types';

import * as Styled from './FeatureCard.styled';

const HOVERING_CLASS = 'hovering';

/**
 * Renders a Feature Card with different variations like image left/right, no image.
 * @param {string|null} className The component class name.
 * @param {string} backgroundColor The component background color.
 * @param {string} description The component description.
 * @param {string} eyebrow The component eyebrow.
 * @param {object} image The component image, composed by the url and description.
 * @param {boolean} imagePosition True if the image is right positioned, false if is left positioned.
 * @param {boolean} theme True if the theme is light, false if it is dark.
 * @param {string} title The component title.
 * @param {string} titleColor The component title color.
 * @param {Array} ctasCollection.items - A list of CTAs
 * @param {string} columnList The component column list.
 * @returns {ReactElement}
 */
const FeatureCard = ({
  className = null,
  backgroundColor,
  description,
  eyebrow = '',
  image = null,
  imagePosition,
  theme,
  title,
  titleColor = '',
  ctasCollection,
  columnList,
}) => {
  const [hoveringClass, setHoveringClass] = useState('');
  const startHovering = () => setHoveringClass(HOVERING_CLASS);
  const stopHovering = () => setHoveringClass('');
  const { queryUrl, fileExt } = useImageSupport();
  const hasImage = !!image && fileExt;
  const imageRight = hasImage && !imagePosition;
  const themeKey = getThemeKey(theme);
  const isDark = themeKey === THEMES.DARK;
  const isEyebrowVisible = hasImage && !!eyebrow;
  const ctaItems = get(ctasCollection, 'items', []);
  const { SECONDARY, TERTIARY } = CTA_TYPES;

  return (
    <ThemeProvider
      theme={{
        backgroundColor,
        titleColor,
        hasImage,
        imageRight,
        themeKey,
      }}
    >
      <Styled.FeatureCard className={className}>
        <Styled.Container>
          {hasImage && (
            <Styled.Image
              className={hoveringClass}
              data-src={image[queryUrl]}
              alt={image.description}
            />
          )}
          <Styled.Content>
            <Styled.HeadlineContainer>
              {isEyebrowVisible && (
                <Styled.TitleEyebrow>{eyebrow}</Styled.TitleEyebrow>
              )}
              <Styled.Title tag="h2" styling="h2">
                {title}
              </Styled.Title>
            </Styled.HeadlineContainer>
            <Styled.DescriptionContainer>
              <Markdown body={description} theme={theme} />
              {columnList && (
                <Styled.ColumnList body={columnList} theme={theme} />
              )}
              <Styled.CtasContainer>
                {ctaItems.map(
                  (
                    { title: ctaTitle, url, type, overrideFunctionality },
                    index,
                  ) => {
                    const { href, asLink } = getLinkProps(url);
                    const ctaClickTrack = event => {
                      const { isModalFormOpen } = get(event, 'data', {});
                      const actionText = getMultiCtaAction(
                        { overrideFunctionality, url },
                        isModalFormOpen,
                      );

                      eventTrack(MULTI_CTA_CLICK, {
                        event,
                        module: MODULES_MULTI_CTA.featureCard,
                        actionText,
                        headerText: title,
                        eyebrowText: eyebrow,
                      });
                    };

                    return (
                      <Styled.Cta
                        key={kebabCase(`${ctaTitle}-${index}`)}
                        type={type === SECONDARY ? TERTIARY : type}
                        overrideFunctionality={overrideFunctionality}
                        href={href}
                        asLink={asLink}
                        onMouseEnter={index === 0 && startHovering}
                        onMouseLeave={index === 0 && stopHovering}
                        onFocus={index === 0 && startHovering}
                        onBlur={index === 0 && stopHovering}
                        onClick={ctaClickTrack}
                        isDarkTheme={isDark}
                      >
                        {ctaTitle}
                      </Styled.Cta>
                    );
                  },
                )}
              </Styled.CtasContainer>
            </Styled.DescriptionContainer>
          </Styled.Content>
        </Styled.Container>
      </Styled.FeatureCard>
    </ThemeProvider>
  );
};

FeatureCard.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The component background color.
   */
  backgroundColor: PropTypes.string.isRequired,
  /**
   * The component description.
   */
  description: PropTypes.string.isRequired,
  /**
   * The component eyebrow.
   */
  eyebrow: PropTypes.string,
  /**
   * The component image, composed by the url and description.
   */
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    webpUrl: PropTypes.string.isRequired,
    optimizedUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  /**
   * True if the image is right positioned, false if is left positioned.
   */
  imagePosition: PropTypes.bool.isRequired,
  /**
   * True if the theme is light, false if it is dark.
   */
  theme: PropTypes.bool.isRequired,
  /**
   * The component title.
   */
  title: PropTypes.string.isRequired,
  /**
   * The component title color.
   */
  titleColor: PropTypes.string,
  /*
   * A list of CTAs
   */
  ctasCollection: PropTypes.shape({
    items: PropTypes.arrayOf(any),
  }),
  /*
   * An unordered list
   */
  columnList: PropTypes.string,
};

export default FeatureCard;
