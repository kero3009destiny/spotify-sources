import React, { useContext, useLayoutEffect, useRef } from 'react';
import { INTRO_LOADER_DURATION } from '../../common/constants';
import { Logo } from '../utilities/ui-icons';
import { AppContext } from '../../common/context.app';
import style from './style.module.css';

interface Props {
  active?: boolean;
  onTransitionEnd: Function;
}

export const HeroHome = ({ active, onTransitionEnd }: Props) => {
  const { isLoading } = useContext(AppContext);
  const timeoutRef = useRef<any>(null);

  useLayoutEffect(() => {
    const rootElement = document.scrollingElement as HTMLElement;
    if (active && onTransitionEnd) {
      if (rootElement) rootElement.style.overflow = 'hidden';

      timeoutRef.current = window.setTimeout(() => {
        if (rootElement) {
          rootElement.style.removeProperty('overflow');
        }
        onTransitionEnd();
      }, INTRO_LOADER_DURATION);
    }

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [active]);

  const activeClass = isLoading ? style.active : '';

  return (
    <div className={`${style.hero} ${activeClass}`}>
      <div className={style.clip}>
        <Logo className={style.logo} />
      </div>
    </div>
  );
};
