import Icon from './svgIcon';
import React from 'react';
import styled from 'styled-components';
const logo = require('~/static/images/global/SFB_logo.svg');

interface ILogoProps {
  clickBack?: () => void;
}

const StyledLogo = styled.div`
  max-width: 350px;
  margin-right: 20px;

  svg {
    display: block;
    max-width: 350px;
    max-height: 30px;
    width: 100%;

    path {
      fill: black;
    }
  }

  @media (max-width: 600px) {
    svg {
      max-width: 180px;
    }
  }
`;

const Logo = (props: ILogoProps) => {
  return (
    <StyledLogo onClick={() => (typeof props.clickBack === 'function' ? props.clickBack() : null)}>
      <Icon src={logo} />
    </StyledLogo>
  );
};

export default Logo;
