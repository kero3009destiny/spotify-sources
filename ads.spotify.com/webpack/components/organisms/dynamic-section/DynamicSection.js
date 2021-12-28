import React, { useMemo, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import chunk from 'lodash/chunk';
import uniqueId from 'lodash/uniqueId';
import debounce from 'lodash/debounce';

import { eventTrack, DYNAMIC_CARD_CLICK } from 'utils/google-tag-manager';
import { useTextFit } from 'utils/use-text-fit';
import { getTargetMonths } from 'utils/get-target-months';
import { useImageSupport } from 'utils/use-image-support';
import { usePageContext } from 'contexts/page-context';
import { PAGE_DETAIL_TIME_RANGE } from 'constants/page';
import { useAppContext } from 'contexts/app-context';
import { getLinkProps } from 'utils/get-link-props';
import { useComponentSize } from 'utils/use-component-size';
import { getPrevScreenSize } from 'utils/get-prev-screen-size';
import * as SM from 'constants/scroll-magic';
import { Scene } from 'components/atoms/scroll-magic';
import { breakpointSelect } from 'styles/media-queries';

import { colors } from 'styles/variables';

import * as Styled from './DynamicSection.styled';

const RESIZE_DEBOUNCE_DELAY = 250;

const ctaClickTrack = e => eventTrack(DYNAMIC_CARD_CLICK, { event: e });

const PageItem = ({ title, tag, slug, backgroundImage }) => {
  const [{ locale }] = useAppContext();
  const { queryUrl } = useImageSupport();
  const { href, asLink } = getLinkProps(`/${tag}/${slug}`, locale);

  return (
    <Styled.PageCta href={href} asLink={asLink} onClick={ctaClickTrack}>
      <Styled.PageItem data-text={title}>
        <Styled.PageGradient />
        {backgroundImage ? (
          <Styled.PageImage
            src={backgroundImage[queryUrl]}
            alt={backgroundImage.description || ''}
          />
        ) : (
          <Styled.FallBackImage />
        )}
        <Styled.PageTitle>{title}</Styled.PageTitle>
      </Styled.PageItem>
    </Styled.PageCta>
  );
};

/**
 * DynamicSection Component
 * @param {string|null} className The component class name.
 * @param {string} title The component's title
 * @param {string} backgroundColor The component's background color
 * @param {string} timeRange The section time range
 * @returns {ReactElement}
 */
const DynamicSection = ({
  className = null,
  title = '',
  backgroundColor = colors.white,
  timeRange = '',
}) => {
  const [triggerHook, setTriggerHook] = useState(0);
  const { style, containerToFitRef, textFitRef } = useTextFit({
    isWrapped: false,
  });
  const [sceneKey, setSceneKey] = useState(title);
  const {
    pages = [],
    hasReachedEnd,
    firstSectionTitle,
    setBackgroundColor = () => {},
    setActiveSection = () => {},
    onSectionEndDown = () => {},
    onSectionEnterUp = () => {},
    onSectionEndUp = () => {},
  } = usePageContext();
  const isFirstSection = firstSectionTitle === title;
  const [isActive, setIsActive] = useState(isFirstSection);
  const [sectionHeight, setSectionHeight] = useState(0);
  const wrapperRef = useRef(null);
  const { height: heightWrapper } = useComponentSize(wrapperRef);
  const sectionPages = useMemo(() => {
    const targetMonths = getTargetMonths(timeRange);

    const filteredPages = pages
      .filter(({ timeRange: pageTimeRange }) => {
        const month = PAGE_DETAIL_TIME_RANGE[pageTimeRange];

        return typeof month === 'number' && targetMonths.includes(month);
      })
      .sort((a, b) => {
        const indexA = targetMonths.indexOf(
          PAGE_DETAIL_TIME_RANGE[a.timeRange],
        );
        const indexB = targetMonths.indexOf(
          PAGE_DETAIL_TIME_RANGE[b.timeRange],
        );

        if (indexA < indexB) return -1;

        if (indexA > indexB) return 1;

        return 0;
      });

    return chunk(filteredPages, 2);
  }, [timeRange, pages]);

  useEffect(() => {
    setSectionHeight(get(containerToFitRef, 'current.offsetHeight'));
  }, [sceneKey, heightWrapper]);

  useEffect(() => {
    const onReSize = getPrevScreenSize((_, { isMobileDevice, hasRotated }) => {
      if (!isMobileDevice || hasRotated) {
        setSceneKey(uniqueId(title));
      }
      setTriggerHook(breakpointSelect({ sm: 0.3, lg: 0.1 }));
    });

    const debounceOnReSize = debounce(onReSize, RESIZE_DEBOUNCE_DELAY);

    window.addEventListener('resize', debounceOnReSize);

    setTriggerHook(breakpointSelect({ sm: 0.3, lg: 0.1 }));

    return () => {
      debounceOnReSize.cancel();
      window.removeEventListener('resize', debounceOnReSize);
    };
  }, []);

  return (
    <Styled.Root id={title} isActive={isActive}>
      <Scene
        triggerHook={triggerHook}
        duration={sectionHeight}
        triggerElement={`#js-dynamic-section-${title}`}
        pin={`#js-dynamic-section-headline-${title}`}
        onEnter={event => {
          setIsActive(true);
          setActiveSection(title);
          setBackgroundColor(backgroundColor);

          if (event.state === SM.STATE.DURING) {
            setActiveSection(title);
          }

          if (event.scrollDirection === SM.SCROLL_DIRECTION.REVERSE) {
            onSectionEnterUp({ title });
          }
        }}
        onStart={event => {
          if (event.state === SM.STATE.BEFORE) {
            onSectionEndUp({ title });
          }
        }}
        onEnd={event => {
          if (event.scrollDirection === SM.SCROLL_DIRECTION.FORWARD) {
            onSectionEndDown({ title });
          }
        }}
        onLeave={event => {
          if (
            event.scrollDirection === SM.SCROLL_DIRECTION.FORWARD ||
            (!isFirstSection &&
              event.scrollDirection === SM.SCROLL_DIRECTION.REVERSE)
          ) {
            setIsActive(false);
          }

          if (event.state === SM.STATE.BEFORE) {
            onSectionEndUp({ title });
          }
        }}
      >
        {() => (
          <Styled.ScrollWrapper id={`js-dynamic-section-${title}`}>
            <Styled.Container className={className}>
              <Styled.Content ref={containerToFitRef}>
                <Styled.Headline
                  id={`js-dynamic-section-headline-${title}`}
                  ref={textFitRef}
                  style={style}
                  isActive={isActive}
                  hasReachedEnd={hasReachedEnd}
                >
                  {title}
                </Styled.Headline>
                <Styled.PageWrapper>
                  <div ref={wrapperRef}>
                    {sectionPages.map(([page1, page2]) => (
                      <Styled.PageGroup
                        key={`${page1.slug}-${get(page2, 'slug')}`}
                      >
                        <PageItem
                          title={get(page1, 'hero.title')}
                          tag={get(page1, 'navigationTag.slug')}
                          slug={get(page1, 'slug')}
                          backgroundImage={get(page1, 'hero.foregroundImage')}
                        />
                        {page2 && (
                          <PageItem
                            title={get(page2, 'hero.title')}
                            tag={get(page2, 'navigationTag.slug')}
                            slug={get(page2, 'slug')}
                            backgroundImage={get(page2, 'hero.foregroundImage')}
                          />
                        )}
                      </Styled.PageGroup>
                    ))}
                  </div>
                </Styled.PageWrapper>
              </Styled.Content>
            </Styled.Container>
          </Styled.ScrollWrapper>
        )}
      </Scene>
    </Styled.Root>
  );
};

DynamicSection.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The component's title
   */
  title: PropTypes.string,
  /**
   * The component's background color
   */
  backgroundColor: PropTypes.string,
  /**
   * The section time range
   */
  timeRange: PropTypes.string,
};

export default DynamicSection;
