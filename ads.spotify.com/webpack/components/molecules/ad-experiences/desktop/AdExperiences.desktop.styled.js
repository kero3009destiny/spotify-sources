import styled from 'styled-components';
import ReactPlayer from 'react-player';

import {
  ResponsiveImage,
  Eyebrow as EyebrowComponent,
  Headline,
  Paragraph,
  Cta as CtaComponent,
  Video as VideoComponent,
  AudioToggle as AudioToggleComponent,
} from 'components/atoms';
import { ACTIVATE_ANIMATION_CLASS } from 'styles/animations';

import { navHeight, colors, animations } from 'styles/variables';
import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { levels } from 'styles/z-index';

export const Root = styled.div``;

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  position: relative;
  width: 100vw;
`;

export const Content = styled.div`
  ${columnsGutter}
  ${container}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  min-height: 65%; /* increase in case of text fit issues */
`;

export const ContentLeft = styled.div`
  grid-column: 1 / 6;
  position: relative;
`;

export const ContentRight = styled.div`
  grid-column: 7 / 12;
  grid-row: 1;
  position: relative;
`;

export const ContentRightIntro = styled(ContentRight)`
  grid-column: 6 / 13;
`;

export const BurstBackground = styled.div`
  bottom: 0;
  height: 100%;
  overflow: hidden;
  position: absolute;
  right: 0;
  width: 70%;
  opacity: 0;
  transform: translateY(30%);
  transition: transform ${animations.defaultTransition},
    opacity ${animations.defaultTransition};

  svg {
    bottom: 0;
    height: 90%;
    position: absolute;
  }

  .${ACTIVATE_ANIMATION_CLASS} & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const IntroTitle = styled(Headline).attrs({
  tag: 'h2',
  styling: 'h1',
})`
  font-size: 7.2rem;
  position: absolute;
  top: 35%;
`;

export const IntroSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  max-width: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: ${levels.base};
`;

export const IntroTitleContainer = styled.div`
  flex: 1;
  max-height: 100%;
  margin-bottom: 1.6rem;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  max-width: 100%;
  position: absolute;
  top: 10%;
  width: 100%;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
`;

export const Group = styled.div`
  position: absolute;
`;

export const GroupWrapper = styled.div`
  flex: 1;
  margin-bottom: 1.6rem;
  position: relative;
`;

export const IntroImage = styled.div`
  width: 100%;
  opacity: 0;
  transform: translateY(50px);
  transition: transform ${animations.defaultTransition},
    opacity ${animations.defaultTransition};

  .${ACTIVATE_ANIMATION_CLASS} & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Image = styled(ResponsiveImage)`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const AssetMobile = styled.div`
  display: flex;
  justify-content: center;
  width: 56%;
  position: absolute;
  margin: -10% 0 0 22%;
  top: 5%;
`;

export const MobileWrapper = styled.div`
  width: 100%;
`;

export const AssetWrapper = styled.div`
  display: flex;
  height: 0;
  padding-top: 216%;
  position: relative;
`;

export const Asset = styled.div`
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const AudioToggleSection = styled.div`
  ${container}

  position: relative;
`;

export const AudioToggleWrapper = styled.div`
  position: absolute;
  top: ${navHeight.smToLg + 3.2}rem;
  right: 3.2rem;
  z-index: ${levels.highlight};

  ${minWidth.lg`
    top: ${navHeight.mlUp + 3.2}rem;
  `}
`;

export const AudioToggle = styled(AudioToggleComponent).attrs({
  repeatWave: 1,
  repeatDelay: 1,
  duration: 2,
})``;

export const MobileImages = styled.div`
  display: flex;
  height: 75%;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 95%;
`;

export const ImageMobile = styled.img`
  height: 100%;
  left: 0;
  object-fit: contain;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const GroupVideo = styled(Group)`
  width: 100%;
  top: 50%;

  svg {
    height: 125%;
    left: -25%;
    position: absolute;
    top: -11%;
    width: 150%;
    z-index: ${levels.behind};
  }
`;

export const Video = styled(VideoComponent)``;

export const VideoBar = styled.img`
  position: relative;
  top: -1px;
  width: 100%;
`;

export const LaptopImage = styled.img`
  position: absolute;

  &.one {
    left: 0;
    top: 0;
    width: 100%;
  }

  &.two {
    bottom: -14%;
    right: -28%;
    width: 60%;
  }
  &.three {
    bottom: -5%;
    left: -14%;
    width: 45%;
  }
  &.four {
    left: 8%;
    top: 14%;
    width: 45%;
  }
`;

export const LaptopImagesContainer = styled.div`
  background-color: ${colors.white};
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Eyebrow = styled(EyebrowComponent)`
  margin-bottom: 2.4rem;
`;

export const Title = styled(Headline).attrs({ tag: 'h2', styling: 'h2' })`
  margin-bottom: 2.4rem;
`;

export const Description = styled(Paragraph)`
  color: ${props => props.textColor};
  flex: 1;
  overflow: hidden;
`;

export const CtaWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 100%;
`;

export const CtaHelpText = styled.span`
  display: block;
  margin-right: 2.4rem;
  white-space: nowrap;
`;

export const Cta = styled(CtaComponent)`
  white-space: nowrap;
`;

export const AudioAsset = styled(ReactPlayer)`
  display: none;
`;
