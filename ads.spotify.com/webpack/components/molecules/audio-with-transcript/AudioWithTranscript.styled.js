import styled from 'styled-components';

import {
  Cta as CtaComponent,
  Eyebrow as EyebrowComponent,
  Headline as HeadlineComponent,
  Paragraph,
  AudioEqualizer as AudioEqualizerComponent,
} from 'components/atoms';
import { hexToRGB } from 'utils/hex-to-rgb';

import { levels } from 'styles/z-index';
import { container, columnsGutter } from 'styles/grid';
import { animations, fontWeights, cssFragments } from 'styles/variables';
import { minWidth } from 'styles/media-queries';

export const Root = styled.div`
  background-color: ${props => props.backgroundColor};
  padding: 5.6rem 0 8rem;

  ${minWidth.lg`
    padding: 11.2rem 0 16rem;
  `}
`;

export const Wrapper = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

export const Container = styled.div`
  grid-column: 1 / 13;

  ${minWidth.lg`
    grid-column: 4 / 10;
  `}
`;

export const Eyebrow = styled(EyebrowComponent)`
  color: ${props => props.textColor};
  margin-bottom: 1.6rem;

  ${minWidth.lg`
    margin-bottom: 2.4rem;
  `}
`;

export const Title = styled(HeadlineComponent).attrs({
  tag: 'h2',
  styling: 'h1',
})`
  color: ${props => props.textColor};
  margin-bottom: 2.4rem;

  ${minWidth.lg`
    margin-bottom: 4rem;
  `}
`;

export const Description = styled(Paragraph)`
  color: ${props => props.textColor};
  margin-bottom: 2.4rem;

  ${minWidth.lg`
    margin-bottom: 6rem;
  `}
`;

export const Audio = styled.audio``;

export const AudioEqualizer = styled(AudioEqualizerComponent)``;

export const PlayButton = styled.button`
  color: ${props => props.textColor};
  cursor: pointer;
  overflow: hidden;
  position: relative;
  z-index: ${levels.highlight};

  ${AudioEqualizer} {
    height: 1.4rem;
    margin-right: 0.9rem;
    width: 1.4rem;

    ${minWidth.lg`
      height: 1.6rem;
      margin-right: 1.1rem;
      width: 1.6rem;
    `}
  }

  ${cssFragments.defaultFocusState}
`;

export const PlayButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PlayingText = styled.span`
  font-size: 1.4rem;
  font-weight: ${fontWeights.normal};
  line-height: 2rem;

  ${minWidth.lg`
    font-size: 1.6rem;
  `}
`;

export const CAPTIONS_BOX_SIZE = 320;

export const CaptionsWrapper = styled.div`
  height: ${props =>
    props.hasCaptions ? `${CAPTIONS_BOX_SIZE / 10}rem` : '0rem'};
  margin-top: -4rem;
  min-height: 4rem;
  overflow: hidden;
  position: relative;
  transition: height ${animations.defaultTransition};
  z-index: ${levels.base};

  &:before {
    background: linear-gradient(
      180deg,
      ${props => props.backgroundColor} 26.56%,
      ${props => hexToRGB(props.backgroundColor, 0)} 100%
    );
    bottom: 45%;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: ${levels.highlight};
  }

  &:after {
    background: linear-gradient(
      0deg,
      ${props => props.backgroundColor} 26.56%,
      ${props => hexToRGB(props.backgroundColor, 0)} 100%
    );
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 45%;
    z-index: ${levels.highlight};
  }
`;

export const Captions = styled.div`
  color: ${props => props.textColor};
  display: flex;
  flex-direction: column;
  transform: translateY(${props => props.translateY}px);
  transition: transform ${animations.defaultTransition};
`;

export const Caption = styled(HeadlineComponent).attrs({
  tag: 'div',
  styling: 'h5',
})`
  height: ${props => (props.outerHeight ? `${props.outerHeight}px;` : 'auto')};
  margin-bottom: 2.4rem;

  ${minWidth.lg`
    margin-bottom: 3.2rem;
  `}

  & pre {
    margin: 0;
    white-space: pre-wrap;
  }
`;

export const Cta = styled(CtaComponent).attrs({
  type: 'textlink',
})`
  color: ${props => props.textColor};
`;
