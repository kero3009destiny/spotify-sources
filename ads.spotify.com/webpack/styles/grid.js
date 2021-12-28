import { css } from 'styled-components';
import { minWidth } from './media-queries';

/* Gutter */
const gutter = {
  xs: 16,
  sm: 32,
  md: 32,
  lg: 48,
  xl: 56,
};

/* Offset */
const offset = {
  xs: 24,
  sm: 40,
  md: 48,
  lg: 64,
  xl: 80,
};

/* Relative offset: offset calculated to being used with rem measurement */
const relativeOffset = {
  xs: 2.4, // offset.xs / 10
  sm: 4, // offset.sm / 10,
  md: 4.8, // offset.md / 10
  lg: 6.4, // offset.lg / 10
  xl: 8, // offset.xl / 10
};

const getTotalWidth = (size, width) => offset[size] * 2 + width;

/* Grid Max Width */
const totalWidth = {
  xs: getTotalWidth('xs', 640),
  sm: getTotalWidth('sm', 768),
  md: getTotalWidth('md', 1024),
  lg: getTotalWidth('lg', 1440),
  xl: getTotalWidth('xl', 1520),
};

/* Container definition */
const container = css`
  margin: auto;
  max-width: ${totalWidth.xs}px;
  padding-left: ${offset.xs}px;
  padding-right: ${offset.xs}px;
  width: 100%;

  ${minWidth.sm`
    max-width: ${totalWidth.sm}px;
    padding-left: ${offset.sm}px;
    padding-right: ${offset.sm}px;
  `}

  ${minWidth.md`
    max-width: ${totalWidth.md}px;
    padding-left: ${offset.md}px;
    padding-right: ${offset.md}px;
  `}

  ${minWidth.lg`
    max-width: ${totalWidth.lg}px;
    padding-left: ${offset.lg}px;
    padding-right: ${offset.lg}px;
  `}

  ${minWidth.xl`
    max-width: ${totalWidth.xl}px;
    padding-left: ${offset.xl}px;
    padding-right: ${offset.xl}px;
  `}
`;

const columnsGutter = css`
  grid-column-gap: ${gutter.xs}px;

  /* IE alternative approach for grid-column-gap */
  & > * {
    margin-right: ${gutter.xs}px;

    &:last-child {
      margin-right: 0;
    }
  }

  /* If the browser supports the property, reset the styles */
  @supports (grid-column-gap: ${gutter.xs}px) {
    & > * {
      margin-right: 0;
    }
  }

  ${minWidth.sm`
    grid-column-gap: ${gutter.sm}px;

    & > * {
      margin-right: ${gutter.sm}px;

      &:last-child {
        margin-right: 0;
      }
    }

    @supports (grid-column-gap: ${gutter.sm}px) {
      & > * {
        margin-right: 0;
      }
    }
  `}

  ${minWidth.md`
    grid-column-gap: ${gutter.md}px;

    & > * {
      margin-right: ${gutter.md}px;

      &:last-child {
        margin-right: 0;
      }
    }

    @supports (grid-column-gap: ${gutter.md}px) {
      & > * {
        margin-right: 0;
      }
    }
  `}

  ${minWidth.lg`
    grid-column-gap: ${gutter.lg}px;

    & > * {
      margin-right: ${gutter.lg}px;

      &:last-child {
        margin-right: 0;
      }
    }

    @supports (grid-column-gap: ${gutter.lg}px) {
      & > * {
        margin-right: 0;
      }
    }
  `}

  ${minWidth.xl`
    grid-column-gap: ${gutter.xl}px;

    & > * {
      margin-right: ${gutter.xl}px;

      &:last-child {
        margin-right: 0;
      }
    }

    @supports (grid-column-gap: ${gutter.xl}px) {
      & > * {
        margin-right: 0;
      }
    }
  `}
`;

export { relativeOffset, offset, gutter, container, columnsGutter };
