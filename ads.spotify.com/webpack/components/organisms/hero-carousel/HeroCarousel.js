import React, { useState, useEffect, useRef } from 'react';
import PropTypes, { any } from 'prop-types';

import classNames from 'classnames';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import debounce from 'lodash/debounce';

import { Markdown } from 'components/molecules';
import { useComponentSize } from 'utils/use-component-size';
import { useImageSupport } from 'utils/use-image-support';
import { useSwipeCallback } from 'utils/use-swipe-callback';
import { useIsInViewport } from 'utils/use-is-in-viewport';
import { useProgress } from 'utils/use-progress';
import { getLinkProps } from 'utils/get-link-props';
import { getIsDarkTheme } from 'utils/get-theme-color';
import { ACTIVATE_ANIMATION_CLASS } from 'styles/animations';
import { useAppContext } from 'contexts/app-context';
import {
  eventTrack,
  HERO_CTA_CLICK,
  HERO_CAROUSEL_ENTRIES_CLICK,
  getMultiCtaAction,
} from 'utils/google-tag-manager';

import * as Styled from './HeroCarousel.styled';

const BAR_CYCLING_DELAY = 500; // The duration of the initial animation
const RESIZE_DEBOUNCE_DELAY = 250;
const OPEN = 'open';

/**
 * EntriesContent
 * @param {number} active - current active entry
 * @param {string} title - The title of the entry
 * @param {string} titleColor - The color of the title entry
 * @param {string} theme - The theme color variant
 * @param {string} body - The description text body of the entry
 * @param {number} outerHeight - The wrapper height
 * @param {function} onLayout - The layout change listener
 * @returns {ReactElement}
 */
const EntriesContent = ({
  active,
  title,
  titleColor,
  theme,
  body,
  outerHeight,
  children,
  onLayout = () => {},
}) => {
  const entryRef = useRef(null);
  const { height } = useComponentSize(entryRef);
  const currentlyActive = active && OPEN;

  useEffect(() => {
    if (height !== 0 && typeof height === 'number') {
      onLayout(height);
    }
  }, [height]);

  return (
    <Styled.EntriesContent
      outerHeight={outerHeight}
      active={active}
      key={kebabCase(title)}
      tabIndex={active ? 0 : -1}
    >
      <div ref={entryRef}>
        <Styled.EntryTitle titleColor={titleColor} className={currentlyActive}>
          {title}
        </Styled.EntryTitle>
        <Styled.EntryDescription className={currentlyActive}>
          <Markdown body={body} theme={theme} />
        </Styled.EntryDescription>
        {children}
      </div>
    </Styled.EntriesContent>
  );
};

/**
 * HeroCarousel component
 * @param {object} data - Page data
 * @param {object} data.heroCarousel - Hero data
 * @param {string} data.heroCarousel.backgroundColor - The hero background color
 * @param {string} data.heroCarousel.titleColor - The entries title color
 * @param {object} data.heroCarousel.cta - The hero cta
 * @param {Array} data.heroCarousel.heroCarouselEntriesCollection.items - A list of the hero entries
 * @param {string} data.heroCarousel.theme - The hero theme
 * @returns {ReactElement}
 */
const HeroCarousel = ({ data }) => {
  const { heroCarousel: hero } = data;
  const {
    backgroundColor,
    cta,
    heroCarouselEntriesCollection,
    theme,
    titleColor,
  } = hero || {};
  const [inViewport, rootRef] = useIsInViewport({ disconnect: false });
  const [stopCycling, setStopCycling] = useState(false);
  const heroCarouselEntries = get(heroCarouselEntriesCollection, 'items', []);
  const { queryUrl, fileExt } = useImageSupport();
  const isDarkTheme = getIsDarkTheme(theme);
  const progress = useProgress({ duration: 6000 });
  const [currentEntry, setCurrentEntry] = useState(0);
  const [entriesMaxHeight, setEntriesMaxHeight] = useState(-Infinity);
  const [startAnimation, setStartAnimation] = useState(false);
  const [{ isAntiFlickerActive }] = useAppContext();

  const handleEntryChange = index => {
    setCurrentEntry(index);
    setStopCycling(true);
  };

  const handleEntrySwipe = ({ direction, fromCycling }) => {
    const { length } = heroCarouselEntries;
    const next = (currentEntry + length + direction) % length;

    setCurrentEntry(next);

    // If not fired by code (cycling feature) we need to stop auto-cycling
    if (!fromCycling) {
      setStopCycling(true);
    }
  };

  useSwipeCallback(handleEntrySwipe, {
    elementRef: rootRef,
  });

  useEffect(() => {
    if (stopCycling) return undefined;
    let barCyclingTimeout;

    if (inViewport && startAnimation) {
      barCyclingTimeout = setTimeout(() => {
        progress.play();
      }, BAR_CYCLING_DELAY);
    } else {
      progress.pause();
    }

    return () => clearTimeout(barCyclingTimeout);
  }, [inViewport, startAnimation, stopCycling]);

  useEffect(() => {
    if (stopCycling) return;

    if (progress.value === 1) {
      handleEntrySwipe({ direction: 1, fromCycling: true }); // manual fire of the swipe handler with custom event data
      progress.restart();
    }
  }, [progress.value, stopCycling]);

  useEffect(() => {
    const debouncedUpdateSize = debounce(
      () => {
        setEntriesMaxHeight(0);
      },
      RESIZE_DEBOUNCE_DELAY,
      { leading: true, trailing: false },
    );

    window.addEventListener('resize', debouncedUpdateSize);

    return () => {
      debouncedUpdateSize.cancel();
      window.removeEventListener('resize', debouncedUpdateSize);
    };
  }, []);

  useEffect(() => {
    if (!isAntiFlickerActive) {
      setStartAnimation(true);
    }
  }, [isAntiFlickerActive]);

  return (
    <Styled.Root ref={rootRef} backgroundColor={backgroundColor}>
      <Styled.Wrapper
        className={classNames({
          [ACTIVATE_ANIMATION_CLASS]: startAnimation,
        })}
      >
        <Styled.Container>
          <Styled.Content>
            <Styled.EntriesList>
              {heroCarouselEntries.map(({ listItemText, title }, index) => {
                const active = index === currentEntry;

                return (
                  <Styled.EntryListItem
                    active={active}
                    key={kebabCase(title)}
                    theme={theme}
                    onClick={event => {
                      handleEntryChange(index);
                      eventTrack(HERO_CAROUSEL_ENTRIES_CLICK, {
                        event,
                        index,
                        label: listItemText || title,
                      });
                    }}
                    onMouseDown={() => {
                      /**
                       * Mouse down is faster than the click event which fixes SB2B-723
                       * And we need to keep the onClick event to keep user interactions from keyboard
                       */
                      handleEntryChange(index);
                    }}
                    onFocus={() => setStopCycling(true)}
                  >
                    <Styled.EntryBar>
                      <Styled.ProgressIndicator
                        theme={theme}
                        active={active}
                        titleColor={titleColor}
                        progress={progress.value}
                        stopCycling={stopCycling}
                      />
                    </Styled.EntryBar>
                    <Styled.EntryListNumber>{index + 1}</Styled.EntryListNumber>
                    <Styled.EntryListItemText>
                      {listItemText || title}
                    </Styled.EntryListItemText>
                  </Styled.EntryListItem>
                );
              })}
            </Styled.EntriesList>
            {heroCarouselEntries.map(({ title, description }, index) => {
              const active = index === currentEntry;

              return (
                <EntriesContent
                  active={active}
                  key={kebabCase(title)}
                  title={title}
                  titleColor={titleColor}
                  body={description}
                  onLayout={height => {
                    setEntriesMaxHeight(prevHeight =>
                      Math.max(prevHeight, height),
                    );
                  }}
                  outerHeight={entriesMaxHeight}
                  theme={theme}
                >
                  {cta && (
                    <Styled.Cta
                      {...getLinkProps(cta.url)}
                      overrideFunctionality={cta.overrideFunctionality}
                      type={cta.type}
                      isDarkTheme={isDarkTheme}
                      className={active && OPEN}
                      tabIndex={active ? 0 : -1}
                      onClick={event => {
                        const { isModalFormOpen } = get(event, 'data', {});
                        const { overrideFunctionality, url } = cta;
                        const actionText = getMultiCtaAction(
                          { overrideFunctionality, url },
                          isModalFormOpen,
                        );

                        eventTrack(HERO_CTA_CLICK, {
                          event,
                          index: currentEntry,
                          href: url,
                          actionText,
                        });
                      }}
                    >
                      {cta.title}
                    </Styled.Cta>
                  )}
                </EntriesContent>
              );
            })}
          </Styled.Content>
          <Styled.HeroImages>
            {heroCarouselEntries.map(({ image, title }, index) => (
              <Styled.HeroImage
                key={kebabCase(title)}
                className={index === currentEntry && OPEN}
              >
                {fileExt && (
                  <Styled.Image
                    picture={{
                      sizes: image,
                      queryUrl,
                    }}
                  />
                )}
              </Styled.HeroImage>
            ))}
          </Styled.HeroImages>
        </Styled.Container>
      </Styled.Wrapper>
    </Styled.Root>
  );
};

HeroCarousel.propTypes = {
  /**
   * Page data
   */
  data: PropTypes.shape({
    /**
     * Hero data
     */
    heroCarousel: PropTypes.shape({
      /*
       * The hero background color variation
       */
      backgroundColor: PropTypes.string,
      /*
       * The entries title color
       */
      titleColor: PropTypes.string,
      /*
       * A list of the hero entries
       */
      heroCarouselEntriesCollection: PropTypes.shape({
        items: PropTypes.arrayOf(any),
      }),
      /*
       * The hero Cta
       */
      cta: PropTypes.shape({
        /**
         * The Cta  url
         */
        url: PropTypes.string,
        /**
         * The Cta title
         */
        title: PropTypes.string,
        /**
         * Asset optimized url
         */
        overrideFunctionality: PropTypes.string,
      }),
      /*
       * The theme for the hero
       */
      theme: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default HeroCarousel;
