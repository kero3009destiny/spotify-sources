import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { IPalette } from '../../../common/types';
import { TitleStyles, Heading1Styles } from '../../01_atoms/heading';

interface IStyledRollingTextSlideProps {
  palette: IPalette;
}

const spinningTextAnimation = keyframes`
  from {
    transform: rotateX(360deg);
  }
  to {
    transform: rotateX(0);
  }
`;

const StyledRollingTextSlide = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 56px 1fr 68px;
  grid-gap: 24px;
  background-color: ${(props: IStyledRollingTextSlideProps) => props.palette.background};
  div {
    grid-row: 2;
    grid-column: 2 / span 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    > * {
      color: ${(props: IStyledRollingTextSlideProps) => props.palette.foreground};
    }
    h1 {
      animation: ${spinningTextAnimation} 1 2500ms;
      animation-delay: 2500ms;
    }
  }

  @media (min-width: 1025px) {
    h1 {
      ${TitleStyles};
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 56px 1fr;
    grid-gap: 0;

    h1 {
      ${Heading1Styles};
    }

    div {
      grid-column: 1 / span 4;
      text-align: center;
      padding: 30px;
    }
  }
`;

interface IRollingTextProps {
  slide: any;
  palette: IPalette;
  onSlideEnd: any;
  slideTime: number;
}

const RollingTextSlide = (props: IRollingTextProps) => {
  const [copy, setCopy] = useState<string>(props.slide.fields.copy1);
  const [supportCopy, setSupportCopy] = useState<string>(props.slide.fields.supportCopy1);

  let slideTransitionTimeout: any;

  useEffect(() => {
    slideTransitionTimeout = setTimeout(() => {
      setCopy(props.slide.fields.copy2);
      setSupportCopy(props.slide.fields.supportCopy2);
    }, 3000);
    return () => {
      clearTimeout(slideTransitionTimeout)
    };
  }, []);

  return (
    <StyledRollingTextSlide palette={props.palette}>
      <div>
        <h1>{copy}</h1>
        {
          supportCopy &&
          <p>{supportCopy}</p>
        }
      </div>
    </StyledRollingTextSlide>
  );
};

export default RollingTextSlide;
