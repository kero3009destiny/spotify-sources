import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes, { any } from 'prop-types';
import { ThemeProvider } from 'styled-components';

import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import { Headline } from 'components/atoms';
import { getThemeKey } from 'utils/get-theme-color';
import { getLinkProps } from 'utils/get-link-props';
import { useImageSupport } from 'utils/use-image-support';
import {
  eventTrack,
  TOPIC_CAROUSEL_INLINE_CLICK,
  TOPIC_CAROUSEL_OPEN,
} from 'utils/google-tag-manager';

import * as Styled from './TopicCarousel.styled';

const CLASSES = {
  OPEN: 'open',
  RESIZING: 'resizing',
};

/**
 * Creates a topic carousel for a given carousel entries.
 * @param {string|null} className The component class name.
 * @param {string} eyebrow The component eyebrow.
 * @param {Array} entries The topic carousel entries.
 * @returns {ReactElement}
 */
const TopicCarousel = ({ className = null, eyebrow, entries }) => {
  const dataItems = get(entries, 'items', []);

  const buildItems = useCallback(
    () =>
      dataItems.map(item => ({
        ...item,
        isOpen: false,
        contentRef: useRef(null),
      })),
    [],
  );
  const [items, setItems] = useState(buildItems());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tallestHeight, setTallestHeight] = useState(0);
  const [resizing, setResizing] = useState(false);
  const { queryUrl, fileExt } = useImageSupport();
  const getThemeData = useCallback(() => {
    const { backgroundColor, theme } = items[currentIndex];
    const themeKey = getThemeKey(theme);

    return {
      backgroundColor,
      themeKey,
    };
  }, [currentIndex]);
  const getClasses = useCallback(
    isOpen =>
      `${isOpen ? CLASSES.OPEN : ''} ${
        resizing ? CLASSES.RESIZING : ''
      }`.trim(),
    [resizing],
  );
  const updateIndex = event => {
    const { index } = get(event, 'currentTarget.parentElement.dataset', {});

    setCurrentIndex(parseInt(index, 10));
    eventTrack(TOPIC_CAROUSEL_OPEN, {
      event,
      eyebrow,
    });
  };

  const onClickCta = event =>
    eventTrack(TOPIC_CAROUSEL_INLINE_CLICK, { event, eyebrow });

  // Find the tallestHeight of the items to avoid jumping
  const updateTallestHeight = useCallback(() => {
    const getHeight = item =>
      item.contentRef.current ? item.contentRef.current.scrollHeight : 0;
    const heights = items.map(item => getHeight(item));
    const maxHeight = Math.max(...heights);

    setTallestHeight(maxHeight);
  }, []);

  // Debouncing the resize to re-calculate highest height
  let resizeTimer = null;

  const asyncUpdateHeight = useCallback(() => {
    updateTallestHeight();
    setResizing(false);
  }, []);

  const debouncedResizeHandler = useCallback(() => {
    setResizing(true);
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(asyncUpdateHeight, 250);
  }, []);

  // Efects

  // Listeners
  useEffect(() => {
    window.addEventListener('resize', debouncedResizeHandler);

    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
    };
  }, []);

  // First highest height calculation
  useEffect(() => {
    updateTallestHeight();
  }, []);

  // Update open and closed item
  useEffect(() => {
    setItems(prevItems =>
      prevItems.map((item, index) => ({
        ...item,
        isOpen: currentIndex === index,
      })),
    );
  }, [currentIndex]);

  return (
    <ThemeProvider theme={getThemeData()}>
      <Styled.Carousel className={className}>
        <Styled.Container>
          <Styled.Images>
            {items.map(({ image, isOpen }) => (
              <Styled.ImageContainer
                className={getClasses(isOpen)}
                key={image[queryUrl]}
              >
                {fileExt && (
                  <Styled.Image
                    data-src={image[queryUrl]}
                    alt={image.description}
                  />
                )}
              </Styled.ImageContainer>
            ))}
          </Styled.Images>
          <Styled.Content>
            {eyebrow && <Styled.Eyebrow>{eyebrow}</Styled.Eyebrow>}
            {items.map(
              ({ sys, title, description, cta, isOpen, contentRef }, index) => {
                return (
                  <Styled.Item
                    className={getClasses(isOpen)}
                    key={kebabCase(`${title} ${sys.id}`)}
                    contentHeight={tallestHeight}
                    aria-expanded={isOpen}
                    data-index={index}
                  >
                    <Styled.Button onClick={updateIndex}>
                      <Headline tag="h5" styling="h2">
                        {title}
                      </Headline>
                    </Styled.Button>
                    <Styled.ItemContent ref={contentRef} aria-hidden={!isOpen}>
                      <p>{description}</p>
                      {cta && (
                        <Styled.Cta
                          tabIndex={isOpen ? 0 : -1}
                          {...getLinkProps(cta.url)}
                          type={cta.type}
                          overrideFunctionality={cta.overrideFunctionality}
                          onClick={onClickCta}
                        >
                          {cta.title}
                        </Styled.Cta>
                      )}
                    </Styled.ItemContent>
                  </Styled.Item>
                );
              },
            )}
          </Styled.Content>
        </Styled.Container>
      </Styled.Carousel>
    </ThemeProvider>
  );
};

TopicCarousel.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The component eyebrow
   */
  eyebrow: PropTypes.string,
  /**
   * The topic carousel entries
   */
  entries: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.shape({
          webpUrl: PropTypes.string.isRequired,
          optimizedUrl: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        }),
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        cta: PropTypes.objectOf(any),
        backgroundColor: PropTypes.string.isRequired,
        theme: PropTypes.bool.isRequired,
      }),
    ),
  }),
};

export default TopicCarousel;
