import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { IntroContext } from 'contexts/intro-context';

import * as Styled from './Subhead.styled';

/**
 * Renders a Subhead
 * @param {string|null} className The component class name.
 * @param {string} children Subhead text
 * @returns {ReactElement}
 */
const Subhead = ({ className = null, children }) => {
  const { withHeight, withIntro } = useContext(IntroContext);

  return (
    <Styled.Container withHeight={withHeight}>
      <Styled.Subhead
        withIntro={withIntro}
        tag="h2"
        styling="h5"
        className={className}
      >
        {children}
      </Styled.Subhead>
    </Styled.Container>
  );
};

Subhead.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * Subhead text
   */
  children: PropTypes.string.isRequired,
};

export default Subhead;
