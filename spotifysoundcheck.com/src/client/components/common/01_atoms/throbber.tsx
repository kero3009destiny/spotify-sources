import React from 'react';
import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished';

interface IThrobberProps {
  throbberBGColor: string;
}

const StyledThrobberWrapper = styled.div`
  position: relative;
`;

const StyledThrobberBackground = styled.div`
  position: absolute;
  top: 60px;
  bottom: 62px;
  left: 0;
  right: 0;
  background: ${(props: IThrobberProps) => rgba(props.throbberBGColor, 0.9)};
  z-index: 99999;
  min-width: 100px;
`;

const StyledDotsAnimation = (throbberColor: string) => keyframes`
  0%, 40%, 100% { 
    transform: translate(0, 0);
    background: ${rgba(throbberColor, 0.5)};
  }
  10% { 
    transform: translate(0, -15px); 
    background: ${rgba(throbberColor, 1)};
  }  
`;

const StyledThrobberDots = styled.div`
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -20px 0 0 -50px;
  z-index: 999999;
  span {
    transition: all 6000ms ease;
    background: ${(props: IThrobberProps) => rgba(props.throbberBGColor, 1)};
    height: 15px;
    width: 15px;
    margin: 0 2px 0 0;
    display: inline-block;
    border-radius: 50%;
    animation: ${(props: IThrobberProps) => StyledDotsAnimation(props.throbberBGColor)} 2s ease
      infinite;
    &:nth-child(1) {
      animation-delay: 0;
    }
    &:nth-child(2) {
      animation-delay: 100ms;
    }
    &:nth-child(3) {
      animation-delay: 200ms;
    }
  }
`;

const Throbber = () => {
  const throbberBGCSSVar = getComputedStyle(document.body).getPropertyValue('--color-MINE-SHAFT');
  return (
    <StyledThrobberWrapper>
      <StyledThrobberBackground throbberBGColor={throbberBGCSSVar}>
        <StyledThrobberDots throbberBGColor={throbberBGCSSVar}>
          <span></span>
          <span></span>
          <span></span>
        </StyledThrobberDots>
      </StyledThrobberBackground>
    </StyledThrobberWrapper>
  );
};

export default Throbber;
