import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes, { any } from 'prop-types';

import classNames from 'classnames';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import { getLinkProps } from 'utils/get-link-props';
import { useImageSupport } from 'utils/use-image-support';
import { ACTIVATE_ANIMATION_CLASS } from 'styles/animations';
import { CTA_TYPES } from 'constants/cta-types';
import {
  getMultiCtaAction,
  eventTrack,
  MULTI_CTA_CLICK,
  MODULES_MULTI_CTA,
} from 'utils/google-tag-manager';

import * as Styled from './HeroDynamic.styled';

const ANIMATION_START_DELAY = 500;

const BACKGROUND_TYPE = {
  VIDEO: 'Video',
  IMAGE: 'Image',
};

const BURST_VARIATIONS = {
  [Styled.MODIFIERS.forestCitric]: {
    BurstComponent: Styled.HeroRectangleBurst,
    isDark: true,
  },
  [Styled.MODIFIERS.goldMidnight]: {
    BurstComponent: Styled.HeroTriangleBurst,
    isDark: false,
  },
  [Styled.MODIFIERS.salmonMidnight]: {
    BurstComponent: Styled.HeroRectangleBurst,
    isDark: false,
  },
  [BACKGROUND_TYPE.VIDEO]: {
    BurstComponent: ({ url }) => (
      <>
        <Styled.BackgroundVideo
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          src={url}
        />
        <Styled.BackgroundOverlay />
      </>
    ),
    isDark: true,
  },
  [BACKGROUND_TYPE.IMAGE]: {
    BurstComponent: mediaAsset => {
      const { queryUrl, fileExt } = useImageSupport();

      return (
        <>
          {fileExt && <Styled.BackgroundImage src={mediaAsset[queryUrl]} />}
          <Styled.BackgroundOverlay />
        </>
      );
    },
    isDark: true,
  },
};

/**
 * HeroDynamic component
 * @param {object} props
 * @param {object} props.data - Page data
 * @param {object} props.heroDynamic - Hero data
 * @param {string} props.heroDynamic.titleIntro - The hero title
 * @param {string[]} props.heroDynamic.titleOutros - An array of text to be animated as part of the title
 * @param {string} props.heroDynamic.description - The hero description
 * @param {string} props.heroDynamic.backgroundColorBurst - The hero burst variation
 * @param {string} props.heroDynamic.mediaAsset - The hero media asset image/video
 * @param {Array} props.ctasCollection.items - A list of CTAs
 * @returns {ReactElement}
 */
const HeroDynamic = ({ data }) => {
  const { heroDynamic: hero } = data;
  const {
    titleIntro,
    description,
    backgroundColorBurst,
    mediaAsset,
    ctasCollection,
  } = hero || {};
  const { SECONDARY, TERTIARY } = CTA_TYPES;
  const titleOutros = useMemo(
    () => (Array.isArray(hero.titleOutros) ? hero.titleOutros : []),
    [hero.titleOutros],
  );
  const ctaItems = get(ctasCollection, 'items', []);
  const containerRef = useRef(null);
  const enteringRef = useRef(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const [hasOutrosAnimationEnded, setOutrosAnimationEnded] = useState(false);
  const [titleHeight, setTitleHeight] = useState(0);
  const [index, setIndex] = useState(0);
  const [[currentText, followingText], setText] = useState([
    titleOutros[index],
    titleOutros[index + 1],
  ]);

  const { modifier, BurstComponent, burstProps = {}, isDark } = useMemo(() => {
    if (mediaAsset) {
      const isVideo = get(mediaAsset, 'contentType', '')
        .toLowerCase()
        .includes(BACKGROUND_TYPE.VIDEO.toLowerCase());

      return {
        modifier: Styled.MODIFIERS.withBackground,
        burstProps: mediaAsset,
        ...(isVideo
          ? BURST_VARIATIONS[BACKGROUND_TYPE.VIDEO]
          : BURST_VARIATIONS[BACKGROUND_TYPE.IMAGE]),
      };
    }

    return {
      modifier: backgroundColorBurst,
      ...BURST_VARIATIONS[backgroundColorBurst],
    };
  }, [backgroundColorBurst, mediaAsset]);

  const onTextLeavingAnimationEnd = useCallback(() => {
    setIndex(prevIndex => prevIndex + 1);
  }, []);

  useEffect(() => {
    if (!titleOutros.length || titleOutros.length - 1 === index) {
      setOutrosAnimationEnded(true);
      return;
    }

    const currText = titleOutros[index];
    const follText = titleOutros[index + 1];

    setText([currText, follText]);
  }, [index]);

  useEffect(() => {
    if (!enteringRef.current || !startAnimation) return;

    setTitleHeight(enteringRef.current.offsetHeight);
  }, [enteringRef, startAnimation, followingText]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setting initial height to allow first height transition
    setTitleHeight(containerRef.current.offsetHeight);
  }, [containerRef]);

  useEffect(() => {
    const initialAnimationTimeout = setTimeout(() => {
      setStartAnimation(true);
    }, ANIMATION_START_DELAY);

    return () => {
      clearTimeout(initialAnimationTimeout);
    };
  }, []);

  return (
    <Styled.Root>
      <Styled.Burst
        className={startAnimation && ACTIVATE_ANIMATION_CLASS}
        modifier={modifier}
      >
        {BurstComponent && <BurstComponent {...burstProps} />}
      </Styled.Burst>
      <Styled.Container>
        <Styled.TitleContainer
          ref={containerRef}
          titleHeight={!hasOutrosAnimationEnded && titleHeight}
        >
          <Styled.TitleIntro modifier={modifier}>
            {hasOutrosAnimationEnded ? (
              `${titleIntro} ${titleOutros[titleOutros.length - 1] || ''}`
            ) : (
              <>
                {`${titleIntro} `}
                <Styled.OutroTextLeaving
                  key={currentText}
                  className={classNames({
                    hide: startAnimation,
                  })}
                  onAnimationEnd={onTextLeavingAnimationEnd}
                >
                  {currentText}
                </Styled.OutroTextLeaving>
              </>
            )}
          </Styled.TitleIntro>
          {!hasOutrosAnimationEnded && (
            <Styled.TitleIntroDupe
              ref={enteringRef}
              modifier={modifier}
              aria-hidden
            >
              {`${titleIntro} `}
              <Styled.OutroTextEntering
                key={followingText}
                as="span"
                className={classNames({
                  show: startAnimation,
                })}
                aria-hidden
              >
                {followingText}
              </Styled.OutroTextEntering>
            </Styled.TitleIntroDupe>
          )}
        </Styled.TitleContainer>
        <Styled.ContentContainer>
          <Styled.Description modifier={modifier}>
            {description}
          </Styled.Description>
          {ctaItems.map(
            ({ title, url, type, overrideFunctionality }, indexCta) => {
              const { href, asLink } = getLinkProps(url);

              const onCtaClick = event => {
                const { isModalFormOpen } = get(event, 'data', {});
                const actionText = getMultiCtaAction(
                  { overrideFunctionality, url },
                  isModalFormOpen,
                );

                eventTrack(MULTI_CTA_CLICK, {
                  event,
                  module: MODULES_MULTI_CTA.heroDynamic,
                  actionText,
                  headerText: title,
                });
              };

              return (
                <Styled.Cta
                  key={kebabCase(`${title}-${indexCta}`)}
                  type={type === SECONDARY ? TERTIARY : type}
                  overrideFunctionality={overrideFunctionality}
                  href={href}
                  asLink={asLink}
                  isDarkTheme={isDark}
                  onClick={onCtaClick}
                >
                  {title}
                </Styled.Cta>
              );
            },
          )}
        </Styled.ContentContainer>
      </Styled.Container>
    </Styled.Root>
  );
};

HeroDynamic.propTypes = {
  /**
   * Page data
   */
  data: PropTypes.shape({
    /**
     * Hero data
     */
    heroDynamic: PropTypes.shape({
      /*
       * The hero title
       */
      titleIntro: PropTypes.string,
      /*
       * An array of text to be animated as part of the title
       */
      titleOutros: PropTypes.arrayOf(PropTypes.string),
      /*
       * The hero description
       */
      description: PropTypes.string,
      /*
       * The hero burst variation
       */
      backgroundColorBurst: PropTypes.string,
      /*
       * The hero media asset image/video
       */
      mediaAsset: PropTypes.shape({
        /**
         * Asset url
         */
        url: PropTypes.string,
        /**
         * Asset wepp url
         */
        webpUrl: PropTypes.string,
        /**
         * Asset optimized url
         */
        optimizedUrl: PropTypes.string,
        /*
         * A list of CTAs
         */
        ctasCollection: PropTypes.shape({
          items: PropTypes.arrayOf(any),
        }),
      }),
    }).isRequired,
  }).isRequired,
};

export default HeroDynamic;
