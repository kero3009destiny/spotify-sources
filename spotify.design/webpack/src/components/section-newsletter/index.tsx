import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { Swirl } from './swirl';
import { Arrow } from './arrow';
import style from './style.module.css';
import { MailchimpForm } from './mailchimp-form';

interface Props {
  className?: string;
}

const SVG_ACTIVE_ATTRIBUTE = 'data-newsletter-svg-active';

export const NewsLetter = ({ className }: Props) => {
  const graphicsWrapperRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const swirlRef = useRef<HTMLSpanElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  /** Make sure the arrow is always pointing at the input. */
  const handleResize = useCallback(() => {
    const graphicsWrapper = graphicsWrapperRef.current;
    const arrow = arrowRef.current;
    const inputWrapper = inputWrapperRef.current;

    if (graphicsWrapper !== null && inputWrapper !== null && arrow !== null) {
      const swirlBCR = graphicsWrapper.getBoundingClientRect();
      const inputWrapperBCR = inputWrapper.getBoundingClientRect();

      const startX = swirlBCR.left + swirlBCR.width / 2;
      const startY = swirlBCR.top + swirlBCR.height;
      const endX = inputWrapperBCR.left + inputWrapperBCR.width / 2;
      const endY = inputWrapperBCR.top;

      const x = swirlBCR.width / 2;
      const y = swirlBCR.height;
      const width = Math.max(endX - startX, 100);
      const height = Math.max(endY - startY, 150);
      const rotation = (Math.atan2(height, width) * 180) / Math.PI;
      const scale = 0.8;

      arrow.style.width = `${width}px`;
      arrow.style.height = `${height}px`;
      arrow.style.transform = `
          translate(${x}px, ${y}px)
          rotate(${rotation}deg)
          scale(${scale})`;
    }
  }, [graphicsWrapperRef, inputWrapperRef]);

  /** Animate the SVG's if the input is in view. */
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const arrow = arrowRef.current;
      const swirl = swirlRef.current;

      if (swirl !== null && arrow !== null) {
        if (entries && entries[0].isIntersecting) {
          arrow.setAttribute(SVG_ACTIVE_ATTRIBUTE, '');
          swirl.setAttribute(SVG_ACTIVE_ATTRIBUTE, '');
        } else {
          arrow.removeAttribute(SVG_ACTIVE_ATTRIBUTE);
          swirl.removeAttribute(SVG_ACTIVE_ATTRIBUTE);
        }
      }
    },
    [arrowRef]
  );

  useLayoutEffect(() => {
    let observer: IntersectionObserver;

    if (window.IntersectionObserver && inputWrapperRef.current !== null) {
      const options = {
        rootMargin: '0px',
        threshold: 1,
      } as IntersectionObserverInit;

      observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(inputWrapperRef.current);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      if (observer && inputWrapperRef.current !== null) {
        observer.unobserve(inputWrapperRef.current);
        observer.disconnect();
      }

      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, inputWrapperRef]);

  return (
    <div
      className={`hidden-without-js sd-container ${style.wrapper} ${className}`}
    >
      <div className={`sd-container-inner sd-grid ${style.inner}`}>
        <p className={`t-display-4 ${style.heading}`}>
          Want Spotify Design&nbsp;updates
          <br />
          sent&nbsp;straight to&nbsp;your
          <span className={style.graphicsWrapper} ref={graphicsWrapperRef}>
            <span className={style.swirl} aria-hidden="true" ref={swirlRef}>
              <Swirl />
            </span>
            <span>&nbsp;inbox</span>
            <span className={style.arrow} ref={arrowRef} aria-hidden="true">
              <Arrow />
            </span>
          </span>
          ?
        </p>
        <div className={style.content}>
          <div className={style.input}>
            <div ref={inputWrapperRef}>
              <MailchimpForm />
            </div>
          </div>
          <p className={`${style.terms} t-body-4`}>
            By clicking send you&apos;ll receive occasional emails from Spotify
            Design. You always have the choice to unsubscribe within every email
            you receive.
          </p>
        </div>
      </div>
    </div>
  );
};

NewsLetter.defaultProps = {
  className: '',
};
