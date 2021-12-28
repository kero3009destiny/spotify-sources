import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './ActivityIndicator.styled';

/**
 * ActivityIndicator Component
 * @param {string|null} className The component class name.
 * @param {string} modifier Changes component styling
 * @returns {ReactElement}
 */
const ActivityIndicator = ({ className = null, modifier = '' }) => {
  return (
    <Styled.Root modifier={modifier}>
      <Styled.SpinnerWrapper className={className} modifier={modifier}>
        <Styled.Spinner modifier={modifier} />
      </Styled.SpinnerWrapper>
    </Styled.Root>
  );
};

ActivityIndicator.MODIFIERS = Styled.MODIFIERS;

ActivityIndicator.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * Changes component styling
   */
  modifier: PropTypes.string,
};

export default ActivityIndicator;
