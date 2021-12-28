import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash/debounce';

import { isXSmallToMedium } from 'styles/media-queries';

import LaptopSVG from 'assets/svg/laptop.svg';
import MobileSVG from 'assets/svg/mobile.svg';
import BurstGreen from 'assets/svg/Burst-green.svg';

import AdExperiencesMobile from './mobile/AdExperiences.mobile';
import AdExperiencesDesktop from './desktop/AdExperiences.desktop';

// TODO: Assets could be uploaded to Contentful to be managed by the API without querying
// TODO: Images assets alt attribute is missing
const mediaAssets = {
  ImageSearch: { src: '/images/adexperiences-assets/search.jpg', alt: '' },
  ImageCreativeTwo: {
    src: '/images/adexperiences-assets/CreativeTwo.jpg',
    alt: '',
  },
  ImageCreativeThree: {
    src: '/images/adexperiences-assets/CreativeThree.jpg',
    alt: '',
  },
  ImageStudioUI: {
    src: '/images/adexperiences-assets/StudioUIRevised.jpg',
    alt: '',
  },
  ImageUIBlue: { src: '/images/adexperiences-assets/UIBlue.png', alt: '' },
  ImageUIVoice: { src: '/images/adexperiences-assets/UIVoice.png', alt: '' },
  ImageUIWhite: { src: '/images/adexperiences-assets/UIWhite.png', alt: '' },
  ImageVideoBar: { src: '/images/adexperiences-assets/VideoBar.jpg', alt: '' },
  Video: '/images/adexperiences-assets/4_Video.mp4',
  Audio: '/images/adexperiences-assets/Audio2.mp3',
  LaptopSVG,
  MobileSVG,
  BurstGreen,
};

const RESIZE_DEBOUNCE_DELAY = 250;

/**
 * AdExperiences
 * @param {string} introTitle - The intro title
 * @param {object} introImage - The intro image
 * @param {string} eyebrow - The eyebrow
 * @param {string} title1 - The first title
 * @param {string} description1 - The first description
 * @param {string} title2 - The second title
 * @param {string} description2 - The second description
 * @param {string} title3 - The third title
 * @param {string} description3 - The third description
 * @param {string} ctaHelpText - The cta help text
 * @param {object} cta - The cta
 * @returns {ReactElement}
 */
const AdExperiences = ({
  introTitle,
  introImage,
  eyebrow,
  title1,
  description1,
  title2,
  description2,
  title3,
  description3,
  ctaHelpText,
  cta,
}) => {
  const [isMobile, setIsMobile] = useState();

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

  return !isMobile ? (
    <AdExperiencesDesktop
      introTitle={introTitle}
      introImage={introImage}
      eyebrow={eyebrow}
      title1={title1}
      description1={description1}
      title2={title2}
      description2={description2}
      title3={title3}
      description3={description3}
      ctaHelpText={ctaHelpText}
      cta={cta}
      mediaAssets={mediaAssets}
    />
  ) : (
    <AdExperiencesMobile
      introTitle={introTitle}
      introImage={introImage}
      eyebrow={eyebrow}
      title1={title1}
      description1={description1}
      title2={title2}
      description2={description2}
      title3={title3}
      description3={description3}
      ctaHelpText={ctaHelpText}
      cta={cta}
      mediaAssets={mediaAssets}
    />
  );
};

AdExperiences.propTypes = {
  /**
   * The intro title
   */
  introTitle: PropTypes.string.isRequired,
  /**
   * The intro image
   */
  introImage: PropTypes.shape({}).isRequired,
  /**
   * The eyebrow
   */
  eyebrow: PropTypes.string.isRequired,
  /**
   * The first title
   */
  title1: PropTypes.string.isRequired,
  /**
   * The first description
   */
  description1: PropTypes.string.isRequired,
  /**
   * The second title
   */
  title2: PropTypes.string.isRequired,
  /**
   * The second description
   */
  description2: PropTypes.string.isRequired,
  /**
   * The third title
   */
  title3: PropTypes.string.isRequired,
  /**
   * The third description
   */
  description3: PropTypes.string.isRequired,
  /**
   * The cta help text
   */
  ctaHelpText: PropTypes.string.isRequired,
  /**
   * The cta
   */
  cta: PropTypes.shape({}).isRequired,
};

export default AdExperiences;
