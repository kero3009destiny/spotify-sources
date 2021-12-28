import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import style from './style.module.css';

interface Props {
  children: React.ReactNode;
  scrollingThroughArticle: Function;
}

const transform = (x: number, y: number): string =>
  `translate3d(${-100 + x * 100}%, ${y}%, 0)`;

export const ScrollProgress = ({
  children,
  scrollingThroughArticle,
}: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const elementHeightRef = useRef<number>();
  const elementTopRef = useRef<number>();

  const [animation, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 1, tension: 220, friction: 50 },
  }));

  const handleResize = useCallback(() => {
    const element = elementRef.current;
    if (element) {
      const bcr = element.getBoundingClientRect();
      elementHeightRef.current = bcr.height;
      elementTopRef.current = element.offsetTop;
    }
  }, [elementRef]);

  const handleScroll = useCallback(() => {
    const element = elementRef.current;
    const height = elementHeightRef.current;
    const top = elementTopRef.current;

    if (!element || !height || !top) return;
    const scrollingElement = document.scrollingElement as HTMLElement;
    const scrollTop = scrollingElement.scrollTop;
    const multiplier = height - window.innerHeight;
    const scrollProgress = (scrollTop - top) / multiplier;

    const x = Math.max(Math.min(scrollProgress, 1), 0);
    const y = scrollProgress > 1 ? -100 : 0;

    scrollingThroughArticle(scrollTop - top > 200 && x < 1);

    const xy = [x, y];
    set({ xy });
  }, [elementRef, elementHeightRef, elementTopRef, scrollingThroughArticle]);

  useLayoutEffect(() => {
    if (elementRef.current) {
      if (handleScroll) window.addEventListener('scroll', handleScroll);
      if (handleResize) {
        window.addEventListener('resize', handleResize);
        handleResize();
      }
    }

    return () => {
      if (elementRef.current) {
        if (handleScroll) window.removeEventListener('scroll', handleScroll);
        if (handleResize) window.removeEventListener('resize', handleResize);
      }
    };
  }, [elementRef, handleScroll, handleResize]);

  return (
    <div ref={elementRef}>
      <div className={style.track}>
        <animated.div
          className={style.bar}
          style={{ transform: animation.xy.interpolate(transform) }}
        />
      </div>
      {children}
    </div>
  );
};
