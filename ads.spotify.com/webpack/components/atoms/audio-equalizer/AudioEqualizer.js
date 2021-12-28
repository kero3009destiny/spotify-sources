import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles/variables';

import * as Styled from './AudioEqualizer.styled';

/**
 * AudioEqualizer Component
 * @param {string|null} className - The component class name.
 * @param {boolean} isPlaying - The is playing state, used to start or pause the animation
 * @param {string} barColor - The color of the bars
 * @returns {ReactElement}
 */
const AudioEqualizer = ({
  className = null,
  isPlaying = false,
  barColor = colors.white,
}) => {
  // Used to avoid server side warning about classes not matching because of the random nature of the <Styled.Container />
  const [isReady, setIsReady] = useState(false);

  useEffect(() => setIsReady(true), []);

  return isReady ? (
    <Styled.Container className={className} isPlaying={isPlaying}>
      <Styled.Bar barColor={barColor} />
      <Styled.Bar barColor={barColor} />
      <Styled.Bar barColor={barColor} />
      <Styled.Bar barColor={barColor} />
    </Styled.Container>
  ) : null;
};

AudioEqualizer.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The is playing state, used to start or pause the animation
   */
  isPlaying: PropTypes.bool,
  /**
   * The color of the bars
   */
  barColor: PropTypes.string,
};

export default AudioEqualizer;
