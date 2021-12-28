import React from 'react';
import PropTypes, { any } from 'prop-types';

import { Markdown } from 'components/molecules';
import useIsInViewport from 'utils/use-is-in-viewport/useIsInViewport';
import { ACTIVATE_ANIMATION_CLASS } from 'styles/animations';
import { visibilityThreshold } from 'styles/variables';

import * as Styled from './Stat.styled';

/**
 * Renders a single Stat object.
 * @param {Object} stat A stat object from Contentful.
 * @param {string} tag The HTML element tag to render the Stat as.
 * @param {string} modifier A modifier to use for style overrides.
 * @param {string} className The component class name.
 * @param {string} bodyColor The text color for body text
 * @param {string} theme - The module theme
 * @returns {ReactElement}
 */
const Stat = ({
  stat = {},
  tag = 'div',
  modifier = '',
  className = null,
  numStats = 1,
  bodyColor = '',
  theme = '',
}) => {
  const [inViewport, inViewportRef] = useIsInViewport({
    threshold: visibilityThreshold.threeFourth,
  });
  const { color, stat: statText, title, descriptionText } = stat;
  const uniqueStat = numStats === 1;
  return (
    <Styled.Stat ref={inViewportRef} as={tag} className={className}>
      <Styled.StatText
        numStats={numStats}
        textColor={color}
        modifier={modifier}
        className={inViewport && ACTIVATE_ANIMATION_CLASS}
      >
        {statText}
      </Styled.StatText>
      <Styled.StatContainer uniqueStat={uniqueStat}>
        <Styled.StatTitle textColor={bodyColor}>{title}</Styled.StatTitle>
        {descriptionText && (
          <Styled.StatDescription textColor={bodyColor}>
            <Markdown body={descriptionText} theme={theme} />
          </Styled.StatDescription>
        )}
      </Styled.StatContainer>
    </Styled.Stat>
  );
};

Stat.propTypes = {
  /**
   * A stat object from Contentful.
   */
  stat: PropTypes.objectOf(any).isRequired,
  /**
   * The HTML element tag to render the Stat as (defaults to `div`).
   */
  tag: PropTypes.string,
  /**
   * A modifier to use for style overrides.
   */
  modifier: PropTypes.string,
  /**
   * The className ref.
   */
  className: PropTypes.string,
  /**
   * Number of stats
   */
  numStats: PropTypes.number,
  /**
   * The text color for body text
   */
  bodyColor: PropTypes.string,
};

export default Stat;
