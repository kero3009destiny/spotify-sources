import React, { useState, useEffect } from 'react';
import PropTypes, { any } from 'prop-types';
import { ThemeProvider } from 'styled-components';

import kebabCase from 'lodash/kebabCase';
import sample from 'lodash/sample';
import shuffle from 'lodash/shuffle';
import get from 'lodash/get';

import { Card } from 'components/molecules/card';
import { eventTrack, CURATED_LIST_CTA_CLICK } from 'utils/google-tag-manager';
import { getPageEyebrow } from 'utils/get-page-eyebrow';
import { useImageSupport } from 'utils/use-image-support';
import { i18n } from 'i18n/nexti18n';

import * as Styled from './CuratedList.styled';

/**
 * Returns a default background image object as a Hero foreground image fallback
 * @param {String} fileExt string from useImageSupport hook
 */
const getDefaultBackground = fileExt => {
  const DEFAULT_IMAGES = [
    `/images/hero/spotify-burst-red.${fileExt}`,
    `/images/hero/spotify-burst-green.${fileExt}`,
    `/images/hero/spotify-burst-blue.${fileExt}`,
    `/images/hero/spotify-burst-brown.${fileExt}`,
    `/images/hero/spotify-burst-pink.${fileExt}`,
    `/images/hero/spotify-burst-yellow.${fileExt}`,
  ];
  const url = sample(shuffle(DEFAULT_IMAGES)); // Gets a random image url

  return {
    url,
    description: i18n.t('defaultHeroImage'),
  };
};

const VARIATIONS = {
  1: 'oneUp',
  2: 'twoUp',
};

/**
 * Renders a Curated List as a group of Cards.
 * @param {Object} data A `Curated List` data object, from Contentful.
 * @param {string} backgroundColor Background color of the curated list.
 *    Defaults to transparent if not provided.
 * @param {string} tag The HTML tag to render the list as.
 * @param {string} className The component class name.
 * @param {boolean} displayTitle Whether component should display the title or not
 * @param {Function} beforeRender Callback which returns a React element to display before the component content
 */
const CuratedList = ({
  data,
  backgroundColor = '',
  tag = 'section',
  className = null,
  displayTitle = true,
  beforeRender = null,
}) => {
  const { title } = data;
  const pages = get(data, 'pagesCollection.items', []);

  if (!pages.length) return null;

  const modifier = VARIATIONS[pages.length] || null;
  const [currentPages, setCurrentPages] = useState([]);
  const { queryUrl, fileExt } = useImageSupport();

  useEffect(() => {
    if (fileExt) {
      const pagesWithDefaultImage = pages.map(page => {
        let cardImage = getDefaultBackground(fileExt);

        if (page.hero.foregroundImage) {
          cardImage = {
            description: page.hero.foregroundImage.description,
            url: page.hero.foregroundImage[queryUrl],
          };
        }

        return { ...page, cardImage };
      });

      setCurrentPages(pagesWithDefaultImage);
    }
  }, [fileExt]);

  return (
    <ThemeProvider theme={{ modifier }}>
      <Styled.CuratedList
        backgroundColor={backgroundColor}
        className={className}
        as={tag}
      >
        {beforeRender && beforeRender()}
        <Styled.Container>
          {title && displayTitle && (
            <Styled.Title tag="h3" styling="h3">
              {title}
            </Styled.Title>
          )}
          <Styled.Content>
            {currentPages.map(page => {
              const {
                navigationTag: { slug: urlTag },
                cardImage,
                hero,
                slug,
              } = page;
              const eyebrow = getPageEyebrow(page);
              const onCardClick = event => {
                eventTrack(CURATED_LIST_CTA_CLICK, {
                  event,
                  title,
                  eyebrow,
                  length: pages.length,
                });
              };

              return (
                <Styled.CardContainer
                  key={kebabCase(`${hero.title} ${eyebrow}`)}
                >
                  <Card
                    image={cardImage}
                    title={hero.title}
                    eyebrow={eyebrow}
                    tag={urlTag}
                    slug={slug || ''}
                    modifier={modifier}
                    onClick={onCardClick}
                  />
                </Styled.CardContainer>
              );
            })}
          </Styled.Content>
        </Styled.Container>
      </Styled.CuratedList>
    </ThemeProvider>
  );
};

CuratedList.propTypes = {
  /**
   * Curated List data
   */
  data: PropTypes.objectOf(any).isRequired,
  /**
   * Background color of the curated list. Transparent default
   */
  backgroundColor: PropTypes.string,
  /**
   * HTML tag
   */
  tag: PropTypes.string,
  /**
   * Class Name of the component
   */
  className: PropTypes.string,
  /**
   * Whether component should display the title or not
   */
  displayTitle: PropTypes.bool,
  /**
   * Callback which returns a React element to display before the component content
   */
  beforeRender: PropTypes.func,
};

export default CuratedList;
