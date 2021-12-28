import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useSpring, animated } from 'react-spring';
import { interpolate } from 'flubber';

import { AppContext } from '../../../common/context.app';
import {
  THEME_CLASSES,
  ThemeIdentifiers,
} from '../../../common/constants/colour-combinations';
import style from './hero-burst.module.css';
import { getPathname } from '../../../common/utils/getPathname';
import { ROUTE } from '../../../common/constants/routes';

export const SVG_PATHS = [
  'M-256 128h16v400H-256z',
  'M356 0c-18 115-92 248-221 392 178-82 379-110 249 122C-753 2025-372-868 356 0z',
  'M248 0C116 118 20 118 36 0c-170-415-192 530-6 940 2 9 14 10 10-3-42-137 17-488 409-404 9 2 11-9 4-11C157 426 69 240 270 0c6-11-1-20-22 0z',
  'M272 248C553 9 765-77 590 117c170-78 505-25-100 280 360-35 259 118 14 135 729 89 275 169-28 106 202 133-126 59-258 0-843 1448-414-1727-144-438 57-306 389-608 198 48z',
  'M80 0c13 37 22 95 0 168 113-61 544-312 12 159 220-35 677-17 213 93 521 103 511 326 60 196 624 325 339 293-30 63C402 1572-599-249 80 0z',
  'M240 612c504 98-474 643-183 98-760-850 944-1297 183-98z',
];

const MAX_SEGMENT_LENGTH = 24;

export const Bursts = {
  [THEME_CLASSES.blank]: 1,
  [THEME_CLASSES.process]: 2,
  [THEME_CLASSES.tools]: 2,
  [THEME_CLASSES.noted]: 3,
  [THEME_CLASSES.inspiration]: 4,
  [THEME_CLASSES.design]: 5,
  [THEME_CLASSES.team]: 0,
  [THEME_CLASSES.listen]: 0,
  [THEME_CLASSES.fourohfour]: 0,
  [THEME_CLASSES.undetermined]: 0,
};

export const HeroBurstAnimated = () => {
  const { theme, prefersReducedMotion, isLoading } = useContext(AppContext);
  const [animation, setAnimation] = useState(null);
  const [inView, setInView] = useState(false);
  const forceHide = !isLoading && getPathname() === ROUTE.HOME;

  const elementRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef<number>(0);

  const index = Bursts[theme as ThemeIdentifiers] || 0;
  const indexToAnimateTo = forceHide ? 0 : index;
  const shouldAnimate = prevIndexRef.current !== indexToAnimateTo;

  const { progress } = useSpring({
    from: { progress: 0 },
    to: { progress: 1 },
    config: { mass: 1, tension: 220, friction: 50 },
    reset: shouldAnimate,
    immediate: prefersReducedMotion,
  });

  useLayoutEffect(() => {
    if (shouldAnimate) {
      let method = undefined;

      if (inView && !prefersReducedMotion) {
        method = interpolate(
          SVG_PATHS[prevIndexRef.current],
          SVG_PATHS[indexToAnimateTo],
          {
            maxSegmentLength: MAX_SEGMENT_LENGTH,
          }
        );
      }
      setAnimation({ method });

      prevIndexRef.current = indexToAnimateTo;
    }
  }, [setAnimation, prevIndexRef, prefersReducedMotion, theme, shouldAnimate]);

  /** Performance. Only do animation when in view. */
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const element = elementRef.current;
      const [entry] = entries;

      if (element !== null) {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      }
    },
    [elementRef, setInView]
  );

  useLayoutEffect(() => {
    let observer: IntersectionObserver;

    if (window.IntersectionObserver && elementRef.current !== null) {
      const options = {
        rootMargin: '0px',
        threshold: [0, 1],
      } as IntersectionObserverInit;

      observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer && elementRef.current !== null) {
        observer.unobserve(elementRef.current);
        observer.disconnect();
      }
    };
  }, [elementRef, handleIntersection]);

  return (
    <div className={`hidden-without-js ${style.heroBurst}`} ref={elementRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 900 950"
      >
        {animation?.method ? (
          <animated.path d={progress.interpolate(animation?.method)} />
        ) : (
          <path d={SVG_PATHS[index]} />
        )}
      </svg>
    </div>
  );
};
