import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { IntroContext } from 'contexts/intro-context';
import * as Styled from './WrapperIntro.styled';

/**
 * Container wrapper element for Byline and Intro components.
 * @param {object} props
 * @param {object} props.children - React children reference
 * @returns {ReactElement}
 */
const WrapperIntro = ({ children }) => {
  const { withHeight, withIntro } = useContext(IntroContext);

  return (
    <Styled.Container withHeight={withHeight} withIntro={withIntro}>
      {children}
    </Styled.Container>
  );
};

WrapperIntro.propTypes = {
  /**
   * Default className prop
   */
  children: PropTypes.node,
};

export default WrapperIntro;
