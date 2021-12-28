import styled, { css } from 'styled-components';

import { getModifierStyles } from 'utils/get-modifier-styles';
import { PAGES } from 'constants/content-types';
import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { colors } from 'styles/variables';

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

const IFRAME_PLAYLIST = css`
  height: 40rem;
`;

const IFRAME_TRACK = css`
  height: 8rem;
`;

const IFRAME_PODCAST = css`
  height: 15.2rem;
`;

export const MODIFIERS = {
  GRID: 'grid',
  PLAYLIST: 'playlist',
  TRACK: 'track',
  PODCAST: 'podcast',
};

// Style modifier map
const STYLE_MAP = {
  Root: {
    [MODIFIERS.GRID]: ROOT_USE_GRID,
    [PAGES.HOME]: ROOT_USE_GRID,
    [PAGES.DETAIL]: ROOT_USE_GRID,
    [PAGES.LANDING]: ROOT_USE_GRID,
  },
  Container: {
    [MODIFIERS.GRID]: CONTAINER_USE_GRID,
    [PAGES.HOME]: CONTAINER_USE_GRID,
    [PAGES.DETAIL]: CONTAINER_USE_GRID,
    [PAGES.LANDING]: CONTAINER_USE_GRID,
  },
  Iframe: {
    [MODIFIERS.PLAYLIST]: IFRAME_PLAYLIST,
    [MODIFIERS.TRACK]: IFRAME_TRACK,
    [MODIFIERS.PODCAST]: IFRAME_PODCAST,
  },
};

export const Root = styled.div`
  margin: 6.4rem auto;

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Root)}
`;

export const Container = styled.div`
  display: grid;

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Container)}
`;

export const Iframe = styled.iframe`
  background-color: ${colors.transparent};
  border: none;
  overflow: hidden;
  width: 100%;

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Iframe)}
`;
