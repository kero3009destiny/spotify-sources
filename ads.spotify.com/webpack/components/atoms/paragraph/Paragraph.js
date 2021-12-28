import React from 'react';
import PropTypes, { any } from 'prop-types';

import * as Styled from './Paragraph.styled';

/**
 * Defines a component with the paragraph styles.
 * @param {string|null} className Defines the CSS class value.
 * @param {string|Array} children A string or array of strings/ReactElements
 *    that are wrapped by this component.
 * @returns {ReactElement}
 */
const Paragraph = ({ className = null, children }) => (
  <Styled.Paragraph className={className}>{children}</Styled.Paragraph>
);

Paragraph.propTypes = {
  /**
   * The component class name.
   */
  className: PropTypes.string,
  /**
   * ReactElement that is wrapped by this component.
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(any)])
    .isRequired,
};

export default Paragraph;
