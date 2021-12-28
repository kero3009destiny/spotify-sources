import React, { useCallback, useContext, useLayoutEffect, useRef } from 'react';
import { DocumentWithBlockingElements } from 'blocking-elements';

import { TOP_BAR_ID } from '../../../common/constants/a11y';
import { AppContext } from '../../../common/context.app';
import { FullHeight } from '../full-height';
import style from './style.module.css';

interface Props {
  open?: boolean;
  backdrop?: boolean;
  fullscreen?: boolean;
  aboveNav?: boolean;
  onClose?: Function;
  contentClass?: string;
  children?: React.ReactNode;
}

export const Overlay = ({
  open,
  children,
  onClose,
  backdrop,
  fullscreen,
  contentClass,
  aboveNav,
}: Props) => {
  const { setOverlayOpen } = useContext(AppContext);
  const elementRef = useRef<HTMLDivElement>(null);
  /**
   * The time out is used to remove `inert` from the top bar after marking this
   * overlay blocking.
   */
  const timeoutRef = useRef<number>(null);
  const aboveNavClass = aboveNav ? style.aboveNav : '';
  const openClass = open ? style.open : '';

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (open && onClose && event.key === 'Escape') {
        onClose();
      }
    },
    [onClose, open]
  );

  // ComponentDidMount && ComponentWillUnmount
  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  // On `open` state change.
  useLayoutEffect(() => {
    const element = elementRef.current;
    const topBar = document.getElementById(TOP_BAR_ID);
    const blockingElements = (document as DocumentWithBlockingElements)
      .$blockingElements;

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    if (setOverlayOpen) {
      setOverlayOpen(open);
    }

    if (element) {
      if (open) {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        element.removeAttribute('inert');
        if (blockingElements) {
          blockingElements.push(element);

          if (!aboveNav && topBar) {
            (timeoutRef as React.MutableRefObject<
              number
            >).current = window.setTimeout(() => {
              topBar.removeAttribute('inert');
            }, 200);
          }
        }

        element.focus();
      } else {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('touch-action');
        element.setAttribute('inert', '');
        if (blockingElements) {
          blockingElements.remove(element);
        }
      }
    }

    return () => {
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('touch-action');

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      if (blockingElements) {
        if (elementRef.current) {
          blockingElements.remove(elementRef.current);
        }
      }
    };
  }, [open, elementRef, setOverlayOpen]);

  return (
    <FullHeight
      enabled={fullscreen}
      forceHeight
      className={`${style.overlay} ${aboveNavClass} ${openClass}`}
    >
      <div className={style.inner} ref={elementRef}>
        {backdrop && (
          <div
            className={style.backdrop}
            onClick={event => (onClose ? onClose(event) : () => undefined)}
          />
        )}
        <div role="dialog" className={`${style.content} ${contentClass}`}>
          {children}
        </div>
        <button
          type="button"
          className={style.close}
          onClick={event => (onClose ? onClose(event) : () => undefined)}
        >
          <span className="t-ui-4">Close</span>
        </button>
      </div>
    </FullHeight>
  );
};

Overlay.defaultProps = {
  contentClass: '',
};
