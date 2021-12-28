import React, { useContext, useLayoutEffect, useRef } from 'react';
import { AppContext } from '../../../common/context.app';
import style from './style.module.css';

interface Props {
  active?: boolean;
}

const MIN = 0.3;

const setBarTransform = (element: HTMLElement, remove?: boolean) => {
  if (!element) return;

  if (remove) {
    element.style.removeProperty('transform');
  } else {
    const scaleY = (Math.random() * (1 - MIN) + MIN).toFixed(2);
    element.style.transform = `scaleY(${scaleY})`;
  }
};

function iterateChildren(children: HTMLCollection, remove?: boolean) {
  for (let childIndex = 0; childIndex < children.length; childIndex++) {
    const child = children[childIndex] as HTMLDivElement;
    setBarTransform(child, remove);
  }
}

export const PlayerEqualiser = ({ active }: Props) => {
  const { prefersReducedMotion } = useContext(AppContext);
  const elementRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number>(null);

  useLayoutEffect(() => {
    const parent = elementRef.current;
    const children = parent?.children;

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    if (children?.length && active) {
      if (!prefersReducedMotion) {
        (intervalRef as React.MutableRefObject<
          number
        >).current = window.setInterval(() => iterateChildren(children), 320);
      }

      iterateChildren(children);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      if (children) {
        iterateChildren(children, true);
      }
    };
  }, [active, prefersReducedMotion]);

  return (
    <div className={style.equaliser} ref={elementRef}>
      <div className={style.bar} />
      <div className={style.bar} />
      <div className={style.bar} />
      <div className={style.bar} />
    </div>
  );
};
