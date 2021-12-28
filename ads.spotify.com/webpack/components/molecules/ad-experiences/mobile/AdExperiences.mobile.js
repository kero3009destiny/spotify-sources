import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Timeline } from 'react-gsap';

import { Controller, Scene } from 'components/atoms/scroll-magic';

import * as Styled from './AdExperiences.mobile.styled';

const AdExperiencesMobileScene = forwardRef(() => {
  return null;
});

/**
 * AdExperiencesMobile
 * @param {string|null} className - The component class name.
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
 * @param {object} mediaAssets - The media assets
 * @returns {ReactElement}
 */
const AdExperiencesMobile = ({ className, ...props }) => {
  const [duration, setDuration] = useState();

  useEffect(() => {
    setDuration(window.innerHeight * 0);
  }, []);

  return (
    <Styled.Root className={className}>
      <Controller>
        <Scene pin triggerHook={0} duration={duration}>
          {progress => (
            <div>
              <Timeline
                target={
                  /* eslint-disable-next-line react/jsx-wrap-multilines */
                  <AdExperiencesMobileScene {...props} />
                }
                totalProgress={progress}
                paused
              />
            </div>
          )}
        </Scene>
      </Controller>
    </Styled.Root>
  );
};

AdExperiencesMobile.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string.isRequired,
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
  /**
   * The Assests
   */
  mediaAssets: PropTypes.shape({}).isRequired,
};

export default AdExperiencesMobile;
