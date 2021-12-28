import styled, { css } from 'styled-components';

import { colors, fontWeights } from 'styles/variables';
import { caption } from 'styles/typography';
import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { Paragraph } from 'components/atoms';
import { getModifierStyles } from 'utils/get-modifier-styles';
import { PAGES } from 'constants/content-types';

// Modifier styles
const ROOT_USE_GRID = css`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 3.2rem auto;

  ${minWidth.lg`
    margin: 6.4rem auto;
`}
`;

const CONTAINER_USE_GRID = css`
  grid-column: 1 / 13;

  ${minWidth.lg`
    grid-column: 4 / 10;
  `}
`;

export const MODIFIERS = {
  useGrid: 'useGrid',
};

// Style modifier map
const STYLE_MAP = {
  Root: {
    [MODIFIERS.useGrid]: ROOT_USE_GRID,
    [PAGES.HOME]: ROOT_USE_GRID,
    [PAGES.DETAIL]: ROOT_USE_GRID,
    [PAGES.LANDING]: ROOT_USE_GRID,
  },
  Container: {
    [MODIFIERS.useGrid]: CONTAINER_USE_GRID,
    [PAGES.HOME]: CONTAINER_USE_GRID,
    [PAGES.DETAIL]: CONTAINER_USE_GRID,
    [PAGES.LANDING]: CONTAINER_USE_GRID,
  },
};

export const Root = styled.div`
  margin: 6.4rem auto;

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Root)}
`;

export const Container = styled.div`
  position: relative;

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Container)}
`;

export const Title = styled(Paragraph)`
  color: ${colors.black};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.025rem;
  margin-bottom: 2.2rem;

  ${minWidth.lg`
    font-size: 2rem;
    letter-spacing: -0.05rem;
    margin-bottom: 3rem;
  `}
`;

export const Caption = styled.p`
  ${caption}

  color: ${colors.grey400};
  font-weight: ${fontWeights.normal};
  margin-top: 2.4rem;

  ${minWidth.lg`
    margin-top: 3.2rem;
  `}
`;

export const Player = styled.div`
  align-items: center;
  background-color: ${colors.grey700};
  border-radius: 0.6rem;
  display: flex;
  height: 5.4rem;

  ${minWidth.lg`
    height: 9rem;
    border-radius: 0.8rem;
  `}
`;

export const Audio = styled.audio`
  display: none;
`;

export const PlayerControls = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 1;
  padding-left: 1.6rem;
  padding-right: 1.6rem;

  ${minWidth.lg`
    padding-left: 2rem;
    padding-right: 2rem;
  `}
`;

export const PlayButton = styled.button`
  background-color: ${colors.darkPink};
  cursor: pointer;
  height: 3.2rem;
  width: 3.2rem;

  &:hover {
    background-color: ${colors.darkerPink};
  }

  ${minWidth.lg`
    height: 4.8rem;
    width: 4.8rem;
  `}
`;

export const Loading = styled.div`
  height: 100%;
  width: 100%;

  & path {
    animation: rotate 1000ms linear infinite;
    transform-origin: 50% 50%;
  }
`;

export const ProgressContainer = styled.div`
  background-color: ${colors.grey600};
  border-radius: 0.2rem;
  display: flex;
  flex: 1;
  height: 0.4rem;
  margin: 0 1.6rem;
  overflow: hidden;
  position: relative;

  ${minWidth.lg`
    margin: 0 2.4rem;
  `}
`;

export const ProgressBar = styled.div`
  background-color: ${colors.black};
  border-radius: 0.2rem;
  height: 100%;
  left: -100%;
  position: absolute;
  transform: translateX(0%);
  width: 100%;
`;

export const Timer = styled(Paragraph).attrs({
  styling: 'p',
})`
  color: ${colors.grey300};
  font-size: 1.4rem;
  font-weight: ${fontWeights.normal};
  letter-spacing: normal;
  text-align: center;
  white-space: nowrap;
  width: 9.2rem;

  ${minWidth.lg`
    font-size: 1.6rem;
    letter-spacing: normal;
    width: 10.5rem;
  `}
`;
