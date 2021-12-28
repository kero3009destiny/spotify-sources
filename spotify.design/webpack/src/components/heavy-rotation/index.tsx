import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Swiper, { SwiperInstance } from 'react-id-swiper';
import 'swiper/css/swiper.min.css';
import { Link } from 'gatsby';

import { AppContext } from '../../common/context.app';
import { padLeft } from '../../common/utils/padLeft';
import { IconArrow, IconShuffle, IconSkip } from '../utilities/ui-icons';
import { CardData } from '../card';
import { CAROUSEL_SETTINGS, SHUFFLE_BACK_TIMEOUT, shuffleArray } from './utils';
import { CardStack } from './card-stack';
import { Controls } from './controls';
import {
  THEME_CLASSES,
  ThemeIdentifiers,
} from '../../common/constants/colour-combinations';
import { HOME_SECTION_IDS } from '../../pages';
import { scrollToDestination } from '../../common/utils/scrollToElement';
import buttonStyles from '../buttons/style.module.css';
import style from './style.module.css';

export interface Props {
  articles: CardData[];
}

export const HeavyRotation = ({ articles }: Props) => {
  const { setTheme, isLoading, prefersReducedMotion } = useContext(AppContext);
  /** The Swiper instance. */
  const [swiper, updateSwiper] = useState<SwiperInstance>(null);
  /** Whether the slides are currently shuffling. */
  const [isShuffling, setIsShuffling] = useState(false);
  /** The index of the active carousel slide. */
  const [activeIndex, setActiveIndex] = useState(0);
  /** Whether the carousel is auto playing. */
  const [isAutoPlaying, setIsAutoplaying] = useState(false);
  /** We copy [articles], so we can shuffle without side-effects to original data. */
  const [entries, setEntries] = useState(articles);
  /** Whether one of the cards is being dragged. */
  const [isDraggingCard, setIsDraggingCard] = useState(false);
  const [elementToScrollTo, setElementToScrollTo] = useState<HTMLElement>(null);
  /** We have a ref to the carousel wrapper to check for viewport intersection. */
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  /** Ref to a setTimeout, so we can clear it. */
  const shuffleTimeoutRef = useRef<number>(null);
  /** Ref to a setTimeout, so we can clear it. */
  const entriesTimeoutRef = useRef<number>(null);
  /** Ref to the timeline bar element, to keep track of animations. */
  const barRef = useRef<HTMLDivElement>(null);

  const shuffleClass = isShuffling ? style.shuffling : '';
  const autoplayClass = isAutoPlaying ? style.barInnerAnimating : '';
  const revealClass = !isLoading ? style.reveal : '';

  const shuffleAnimation = useCallback(
    (entries?: CardData[]) => {
      let timeoutDuration = entries
        ? SHUFFLE_BACK_TIMEOUT * 2
        : SHUFFLE_BACK_TIMEOUT;

      if (prefersReducedMotion) {
        timeoutDuration = 2;
      }

      if (shuffleTimeoutRef.current) {
        window.clearTimeout(shuffleTimeoutRef.current);
      }

      if (entriesTimeoutRef.current) {
        window.clearTimeout(entriesTimeoutRef.current);
      }

      (shuffleTimeoutRef as React.MutableRefObject<
        number
      >).current = window.setTimeout(() => {
        setIsShuffling(false);
      }, timeoutDuration);

      if (entries) {
        (entriesTimeoutRef as React.MutableRefObject<
          number
        >).current = window.setTimeout(() => {
          setEntries(entries);
        }, timeoutDuration / 2);
      }

      setIsShuffling(true);
    },
    [activeIndex, setIsShuffling, shuffleTimeoutRef, setEntries]
  );

  const handleSlideChange = useCallback(() => {
    if (swiper && !swiper.destroyed) {
      if (barRef.current !== null) {
        swiper.autoplay.start();
        swiper.autoplay.stop();
      }

      if (activeIndex !== swiper.activeIndex) {
        setActiveIndex(swiper.activeIndex);
      }
    }
  }, [swiper, activeIndex, setActiveIndex, barRef, setTheme]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (swiper && !swiper.destroyed) {
        if (entry.isIntersecting) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      }
    },
    [swiper]
  );

  const handleNext = useCallback(() => {
    if (swiper && !swiper.destroyed) {
      const isLast = swiper.activeIndex >= entries.length - 1;
      // If we are on the last slide and we click next, do the shuffle anim.
      if (isLast && !isShuffling) {
        shuffleAnimation();
      } else {
        swiper.slideNext();
      }
    }
  }, [swiper, isShuffling, shuffleAnimation]);

  const handlePrev = useCallback(() => {
    if (swiper && !swiper.destroyed) swiper.slidePrev();
  }, [swiper]);

  const handleShuffle = useCallback(() => {
    const randomisedEntries = shuffleArray(entries) as CardData[];
    shuffleAnimation(randomisedEntries);
  }, [entries, shuffleAnimation]);

  const handleAutoplayStateChange = useCallback(() => {
    if (swiper && !swiper.destroyed) {
      if (swiper.autoplay.running) {
        setIsAutoplaying(true);
      } else {
        setIsAutoplaying(false);
      }
    }
  }, [swiper, setIsAutoplaying]);

  const onShuffleChange = () => {
    if (swiper && !swiper.destroyed) {
      if (isShuffling) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.start();
        swiper.slideTo(0);
      }
    }
  };
  useEffect(onShuffleChange, [isShuffling]);

  const changeTheme = () => {
    if (setTheme && entries?.length) {
      const category = entries[activeIndex]?.tags?.[0]
        ?.parentCategory as ThemeIdentifiers;
      if (category && setTheme) {
        setTheme(THEME_CLASSES[category]);
      }
    }
  };
  useEffect(changeTheme, [activeIndex, entries]);

  // Drag state handler.
  const onDraggingChange = () => {
    if (swiper && !swiper.destroyed) {
      if (isDraggingCard) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.start();
      }
    }
  };
  useEffect(onDraggingChange, [isDraggingCard]);

  // ComponentDidMount && ComponentWillUnmount.
  useLayoutEffect(() => {
    let observer: IntersectionObserver;

    if (swiper && !swiper.destroyed) {
      swiper.on('slideChange', handleSlideChange);
      swiper.on('autoplayStart', handleAutoplayStateChange);
      swiper.on('autoplayStop', handleAutoplayStateChange);
      handleSlideChange();
    }

    if (window.IntersectionObserver && carouselWrapperRef.current !== null) {
      const options = {
        rootMargin: '0px',
        threshold: 0.1,
      } as IntersectionObserverInit;

      observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(carouselWrapperRef.current);
    }

    changeTheme();

    setElementToScrollTo(document.getElementById(HOME_SECTION_IDS.newReleases));

    return () => {
      if (shuffleTimeoutRef.current)
        window.clearTimeout(shuffleTimeoutRef.current);
      if (entriesTimeoutRef.current)
        window.clearTimeout(entriesTimeoutRef.current);

      if (observer && carouselWrapperRef.current !== null) {
        observer.unobserve(carouselWrapperRef.current);
        observer.disconnect();
      }

      if (swiper && !swiper.destroyed) {
        swiper.off('slideChange', handleSlideChange);
        swiper.off('autoplayStart', handleAutoplayStateChange);
        swiper.off('autoplayStop', handleAutoplayStateChange);
      }
    };
  }, [swiper, handleSlideChange, handleIntersection]);

  const handleAnchorClick = useCallback(
    event => {
      event.preventDefault();

      const rect = elementToScrollTo.getBoundingClientRect();
      const destination = rect.top + document.documentElement.scrollTop;
      scrollToDestination(destination);
    },
    [elementToScrollTo]
  );

  return (
    <div
      className={`hidden-without-js sd-container ${style.heavyRotation} ${shuffleClass} ${revealClass}`}
    >
      <div className={`sd-container-inner ${style.wrapper}`}>
        <div
          className={style.controls}
          style={{ zIndex: isDraggingCard ? 0 : 102 }}
        >
          <Controls
            onClick={handlePrev}
            label="Previous Story"
            disabled={activeIndex === 0}
          >
            <IconSkip />
          </Controls>
          <Controls onClick={handleNext} label="Next Story">
            <IconSkip rotation={180} />
          </Controls>
          <Controls onClick={handleShuffle} label="Shuffle Stories">
            <IconShuffle />
          </Controls>
        </div>
        <div className={style.carousel} ref={carouselWrapperRef}>
          <h2 className="a11y-visually-hidden">Featured articles</h2>
          <Swiper
            shouldSwiperUpdate={true}
            {...CAROUSEL_SETTINGS}
            speed={prefersReducedMotion ? 1 : 500}
            getSwiper={updateSwiper}
          >
            {entries.map((data: CardData, i: number) => (
              <div key={i}>
                <div className={style.slide}>
                  {data.tags && (
                    <ul className={`unstyled-list ${style.slideTags}`}>
                      {data.tags.map(({ title, href }, index: number) => (
                        <li key={index}>
                          <Link
                            className={`t-ui-4 ${style.slideLink}`}
                            to={href}
                            tabIndex={activeIndex !== i ? -1 : undefined}
                          >
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {data.title && data.href && (
                    <h3 className="t-display-4">
                      <Link
                        className={style.slideLink}
                        to={data.href}
                        tabIndex={activeIndex !== i ? -1 : undefined}
                      >
                        {data.title}
                      </Link>
                    </h3>
                  )}
                </div>
              </div>
            ))}
          </Swiper>
        </div>
        <div className={style.cards}>
          {!isLoading && (
            <CardStack
              articles={entries}
              activeIndex={activeIndex}
              isShuffling={isShuffling}
              onDrag={setIsDraggingCard}
              onThrow={(direction: number) => {
                direction < 0 ? handlePrev() : handleNext();
              }}
            />
          )}
        </div>

        <div className={style.bottomBar}>
          <div className={style.timeline}>
            <span className="t-ui-4">{padLeft(activeIndex + 1)}</span>
            {!prefersReducedMotion && (
              <div className={style.bar}>
                <div
                  className={`${style.barInner} ${autoplayClass}`}
                  style={{
                    animationDuration: `${CAROUSEL_SETTINGS.autoplay.delay}ms`,
                  }}
                />
              </div>
            )}
            <span className="t-ui-4">{padLeft(entries.length)}</span>
          </div>

          <a
            href={`#${HOME_SECTION_IDS.newReleases}`}
            className={buttonStyles.buttonBig}
            onClick={handleAnchorClick}
          >
            <span
              className={`t-ui-4 ${buttonStyles.label} ${style.scrollLabel}`}
            >
              Scroll Down
            </span>
            <div className={buttonStyles.icon}>
              <div className={buttonStyles.background} />
              <IconArrow />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
