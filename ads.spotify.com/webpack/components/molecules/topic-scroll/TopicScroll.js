import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Controller, Scene } from 'components/atoms/scroll-magic';

import debounce from 'lodash/debounce';

import {
  eventTrack,
  TOPIC_SCROLL_SCROLLED,
  TOPIC_SCROLL_CLICK,
} from 'utils/google-tag-manager';
import { KEYCODES } from 'constants/keycodes';
import { getLinkProps } from 'utils/get-link-props';
import * as CommonTypes from 'constants/common-proptypes';
import { isXSmallToMedium, breakpointSelect } from 'styles/media-queries';
import { gutter } from 'styles/grid';
import { useComponentSize } from 'utils/use-component-size';
import * as Styled from './TopicScroll.styled';

const RESIZE_DEBOUNCE_DELAY = 250;

/**
 * Creates a topic scroll for a given entries.
 * @param {Array} entries TopicScroll Entries list
 * @returns {ReactElement}
 */
const TopicScroll = ({ entries, textColor = '', headlineColor = '' }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const columnRef = useRef(null);
  const wrapperRef = useRef(null);
  const trackingEntry = useMemo(() => 1 / entries.length, [entries]);
  const setRef = useRef(new Set());
  const [isMobile, setIsMobile] = useState(null);
  const [duration, setDuration] = useState(0);
  const { width: widthEntry } = useComponentSize(columnRef);

  useEffect(() => {
    const gutterSelect = breakpointSelect({
      sm: 0,
      lg: gutter.lg,
    });

    const columnGap = Styled.getMarginEntry(widthEntry, gutterSelect);
    setDuration((widthEntry + columnGap) * (entries.length - 1));
  }, [widthEntry]);

  useEffect(() => {
    setIsMobile(isXSmallToMedium());

    const onResize = debounce(() => {
      setIsMobile(isXSmallToMedium());
    }, RESIZE_DEBOUNCE_DELAY);

    window.addEventListener('resize', onResize);

    return () => {
      onResize.cancel();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setIsEnabled(entries.length >= 2 && !isMobile);
  }, [isMobile, entries]);

  const onKeyUp = e => {
    if (e.keyCode === KEYCODES.TAB) {
      const { activeElement } = document;
      const isEntry = activeElement.nodeName === 'DIV';
      const hasButton = !!(isEntry && activeElement.querySelector('button'));
      const xActive = activeElement.getBoundingClientRect().x;
      const xWrapper = wrapperRef.current.getBoundingClientRect().x;

      // if tab is moving forward
      if (xActive > xWrapper && isEntry && !e.shiftKey) {
        window.scrollBy(0, widthEntry);
      }
      // if tab moving backwards
      if (xActive < 0 && ((isEntry && !hasButton) || !isEntry) && e.shiftKey) {
        window.scrollBy(0, -widthEntry);
      }
    }
  };

  const onProgress = useCallback(
    progress => {
      if (progress > 0 && progress < 1) {
        const progressRounded = Math.floor(progress / trackingEntry);

        if (!setRef.current.has(progressRounded)) {
          eventTrack(TOPIC_SCROLL_SCROLLED, { slide: progressRounded + 1 });
          setRef.current.add(progressRounded);
        }
      }
    },
    [isMobile, trackingEntry, setRef],
  );

  const ctaClickTrack = event => eventTrack(TOPIC_SCROLL_CLICK, { event });

  return (
    <Styled.Root>
      <Styled.Container onKeyUp={onKeyUp}>
        <Styled.ColumnRef ref={columnRef} />
        <Styled.Column>
          <Controller>
            <Scene
              enabled={isEnabled}
              triggerHook={0.3}
              duration={duration}
              pin
            >
              {progress => (
                <div>
                  <Styled.Wrapper
                    ref={wrapperRef}
                    style={{
                      transform:
                        !isMobile && `translateX(-${duration * progress}px)`,
                    }}
                  >
                    {!isMobile && onProgress(progress)}
                    {entries.map(
                      ({ name, eyebrow, description, title, cta }) => (
                        <Styled.Entry
                          key={name}
                          width={widthEntry}
                          tabIndex={0}
                        >
                          {eyebrow && (
                            <Styled.Eyebrow textColor={textColor}>
                              {eyebrow}
                            </Styled.Eyebrow>
                          )}
                          <Styled.Title headlineColor={headlineColor}>
                            {title}
                          </Styled.Title>
                          <Styled.Description textColor={textColor}>
                            {description}
                          </Styled.Description>
                          {cta && (
                            <Styled.Cta
                              {...getLinkProps(cta.url)}
                              type={cta.type}
                              overrideFunctionality={cta.overrideFunctionality}
                              textColor={textColor}
                              onClick={ctaClickTrack}
                            >
                              {cta.title}
                            </Styled.Cta>
                          )}
                        </Styled.Entry>
                      ),
                    )}
                  </Styled.Wrapper>
                </div>
              )}
            </Scene>
          </Controller>
        </Styled.Column>
      </Styled.Container>
    </Styled.Root>
  );
};

export const topicScrollProptypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    cta: CommonTypes.Cta,
  }),
);

TopicScroll.propTypes = {
  /**
   * The module headline color
   */
  headlineColor: PropTypes.string,
  /**
   * The module text color
   */
  textColor: PropTypes.string,
  /**
   * TopicScroll Entries list
   */
  entries: topicScrollProptypes,
};

export default TopicScroll;
