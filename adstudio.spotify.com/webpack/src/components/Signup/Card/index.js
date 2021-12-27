import React from 'react';
import cx from 'classnames';
import styled from 'styled-components';

import { SignupBreakpointSmall } from '../constants';

import PropTypes from 'prop-types';

const SignupCardContent = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 28px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  background: white;

  @media (${SignupBreakpointSmall}) {
    border: none;
    box-shadow: none;
  }
`;

export default function SignupCard({ children, className, ...props }) {
  return (
    <SignupCardContent className={cx(className)} {...props}>
      {children}
    </SignupCardContent>
  );
}

SignupCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
