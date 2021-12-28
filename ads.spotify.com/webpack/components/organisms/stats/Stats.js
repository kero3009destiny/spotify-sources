import React, { useMemo } from 'react';
import PropTypes, { any } from 'prop-types';

import lowerCase from 'lodash/lowerCase';
import kebabCase from 'lodash/kebabCase';
import { colors } from 'styles/variables';

import * as Styled from './Stats.styled';

const THEME = {
  dark: colors.white,
  light: colors.black,
};

/**
 * Renders a list of Stat objects.
 * @param {Array} stats - An array of `Stat` objects.
 * @param {string} title - The module title
 * @param {string} backgroundColor - The module background color
 * @param {string} theme - The module theme
 * @returns {ReactElement}
 */
const Stats = ({ stats = [], title, backgroundColor, theme = '' }) => {
  const numStats = stats.length;
  const textColor = useMemo(() => THEME[lowerCase(theme)], [theme]);

  return (
    <Styled.Root backgroundColor={backgroundColor}>
      <Styled.Stats>
        <Styled.Headline color={textColor} numStats={numStats}>
          {title}
        </Styled.Headline>
        <Styled.StatList numStats={numStats}>
          {stats.map((item, idx) => (
            <Styled.StatListItem
              tag="li"
              modifier="grid"
              key={kebabCase(`${item.stat} ${idx.toString()}`)}
              stat={item}
              numStats={numStats}
              bodyColor={textColor}
              theme={theme}
            />
          ))}
        </Styled.StatList>
      </Styled.Stats>
    </Styled.Root>
  );
};

Stats.propTypes = {
  /**
   * An array of `Stat` objects.
   */
  stats: PropTypes.arrayOf(any).isRequired,
  /**
   * The module title
   */
  title: PropTypes.string,
  /**
   * The module background color
   */
  backgroundColor: PropTypes.string,
  /**
   * The module theme
   */
  theme: PropTypes.string,
};

export default Stats;
