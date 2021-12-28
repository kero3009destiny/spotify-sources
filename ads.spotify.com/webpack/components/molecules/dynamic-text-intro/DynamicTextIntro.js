import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';
import delay from 'lodash/delay';

import { Scene } from 'components/atoms/scroll-magic';
import { eventTrack, JUMP_LINK_CLICK } from 'utils/google-tag-manager';
import { useComponentSize } from 'utils/use-component-size';
import { isXSmallToMedium } from 'styles/media-queries';
import { ICONS } from 'constants/icons';
import { navHeight, sideNavHeight } from 'styles/variables';
import { MotionBackground } from 'components/atoms';
import { getPrevScreenSize } from 'utils/get-prev-screen-size';

import * as Styled from './DynamicTextIntro.styled';

const RESIZE_DEBOUNCE_DELAY = 250;

/**
 * DynamicTextIntro
 * @param {string} eyebrow - The component eyebrow
 * @param {string} heading - The component heading
 * @param {string} subHeading - The component subHeading
 * @param {string} jumpText - The component jumpText
 * @param {string} backgroundColor - The backgroundColor
 * @returns {ReactElement}
 */
const DynamicTextIntro = ({
  eyebrow,
  heading,
  subHeading,
  jumpText,
  backgroundColor,
}) => {
  const [viewportAttrs, setViewportAttrs] = useState({
    resizing: false,
    isMobile: null,
  });
  const [headingLimits, setHeadingLimits] = useState([0, 0]);
  const [subHeadingLimits, setSubHeadingLimits] = useState([0, 0]);
  const [linkJumpLimits, setLinkJumpLimits] = useState([0, 0]);
  const ctaRef = useRef(null);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const { height: heightWrapper } = useComponentSize(wrapperRef);
  const { height: heightContainer } = useComponentSize(containerRef);

  const getLimits = (element, offset) => {
    const elementAttrs = element ? element.getBoundingClientRect() : { top: 0 };
    const distanceTop = window.scrollY + elementAttrs.top - offset;
    const top = distanceTop / heightWrapper;
    const bottom = (distanceTop + elementAttrs.height) / heightWrapper;

    return [top, bottom];
  };

  const setSizes = () => {
    const navigationHeight =
      (viewportAttrs.isMobile ? navHeight.smToLg : navHeight.mlUp) * 10;
    const subNavigationHeight =
      (viewportAttrs.isMobile ? sideNavHeight.sm : 0) * 10;
    const offsetTop = navigationHeight + subNavigationHeight;
    const headingEl = wrapperRef.current.querySelector('.heading');
    const linkJumpEl = wrapperRef.current.querySelector('.jumpText');
    const subHeadingEl = wrapperRef.current.querySelector('h2');

    setLinkJumpLimits(getLimits(linkJumpEl, heightContainer));
    setHeadingLimits(getLimits(headingEl, offsetTop));
    setSubHeadingLimits(getLimits(subHeadingEl, offsetTop));
  };

  useEffect(() => {
    setViewportAttrs({ resizing: false, isMobile: isXSmallToMedium() });
    const onResize = getPrevScreenSize((_, { isMobileDevice, hasRotated }) => {
      setLinkJumpLimits([0, 0]);
      setViewportAttrs({ resizing: true, isMobile: null });

      if (!isMobileDevice || hasRotated) {
        delay(() => {
          setViewportAttrs({ resizing: false, isMobile: isXSmallToMedium() });
        }, 1);
      }
    });

    const debounceOnReSize = debounce(onResize, RESIZE_DEBOUNCE_DELAY);
    window.addEventListener('resize', debounceOnReSize);

    return () => {
      debounceOnReSize.cancel();
      window.removeEventListener('resize', debounceOnReSize);
    };
  }, []);

  useEffect(() => {
    if (!viewportAttrs.resizing && viewportAttrs.isMobile !== null) {
      setSizes();
    }
  }, [viewportAttrs]);

  const jumpNext = e => {
    e.preventDefault();
    const { offsetTop } = document.querySelector('section');

    window.scroll({
      top: offsetTop,
      behavior: 'smooth',
    });

    eventTrack(JUMP_LINK_CLICK, { event: e });
  };

  return (
    <Styled.Root backgroundColor={backgroundColor}>
      <Styled.Eyebrow>{eyebrow}</Styled.Eyebrow>
      <Scene
        triggerHook={0.1}
        duration={heightWrapper}
        triggerElement="#js-text-intro"
      >
        {progress => (
          <div id="js-text-intro">
            <MotionBackground pause={progress >= 1} />
            <Styled.Container ref={containerRef}>
              <Styled.Wrapper ref={wrapperRef}>
                <Styled.Title progress={progress} limits={headingLimits}>
                  {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                  <span className="heading" tabIndex={0}>
                    {heading}
                  </span>
                </Styled.Title>
                <Styled.BottomArea>
                  {subHeading && (
                    <Styled.Description
                      progress={progress}
                      limits={subHeadingLimits}
                    >
                      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
                      <span tabIndex={0}>{subHeading}</span>
                    </Styled.Description>
                  )}
                  {jumpText && (
                    <Styled.CtaWrapper
                      ref={ctaRef}
                      innerRef={ctaRef}
                      className="jumpText"
                      progress={progress}
                      limits={linkJumpLimits}
                      subHeadingLimits={subHeadingLimits}
                      isMobile={viewportAttrs.isMobile}
                    >
                      <Styled.Cta onClick={jumpNext} type="TextLink">
                        {jumpText}
                        <Styled.Arrow name={ICONS.ARROW} />
                      </Styled.Cta>
                    </Styled.CtaWrapper>
                  )}
                </Styled.BottomArea>
              </Styled.Wrapper>
            </Styled.Container>
          </div>
        )}
      </Scene>
    </Styled.Root>
  );
};

DynamicTextIntro.propTypes = {
  /**
   * Component eyebrow
   */
  eyebrow: PropTypes.string,
  /**
   * Component heading
   */
  heading: PropTypes.string.isRequired,
  /**
   * Component subheading
   */
  subHeading: PropTypes.string,
  /**
   * Component jumpText
   */
  jumpText: PropTypes.string,
  /**
   * Component backgroundColor
   */
  backgroundColor: PropTypes.string,
};

export default DynamicTextIntro;
