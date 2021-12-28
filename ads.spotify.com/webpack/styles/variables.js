import { css } from 'styled-components';
import { getScaledImageUrl } from 'utils/get-scaled-image-url';
import { IMG_DIMENSIONS } from 'constants/image-attributes';

/* Color Palette */
export const colors = {
  /* Primary colors */
  white: '#fff',
  black: '#000000',
  spotifyGreen: '#1ED760',
  advertisingLavender: '#705378',
  sgFallBack05: '#22a74a',
  sgFallBack06: '#0a8930',
  /* Grey scale */
  grey100: '#232323',
  grey200: '#3A3A3A',
  grey300: '#545454',
  grey400: '#757575',
  grey500: '#979797',
  grey600: '#D1D1D1',
  grey700: '#EAEAEA',
  grey800: '#F9F9F9',
  /* Secondary colors */
  aubergine: '#503750',
  maroon: '#8C1932',
  chocolate: '#7D4B32',
  forest: '#006450',
  midnight: '#1E3264',
  violet: '#AF2896',
  brightRed: '#EB1E32',
  gold: '#F59B23',
  spearmint: '#4B917D',
  royalBlue: '#2D46B9',
  fuchsia: '#F037A5',
  tangerine: '#FF4632',
  neonGreen: '#5FF550',
  kleinBlue: '#4100F5',
  salmon: '#F573A0',
  electricSeafoam: '#19E68C',
  azure: '#509BF5',
  lavender: '#B49BC8',
  orange: '#FF6437',
  bole: '#C87D55',
  factoryYellow: '#FAE62D',
  citric: '#CDF564',
  aquamarine: '#9BF0E1',
  pink: '#FFCDD2',
  tan: '#C39687',
  sunflower: '#FFC864',
  powderGreen: '#C3F0C8',
  storm: '#A0C3D2',
  focusBlue: 'rgba(0, 106, 255, 0.57)',
  errorRed: '#FF0000',
  transparent: 'transparent',
  translucent75: 'rgba(0,0,0,0.75)',
  translucent50: 'rgba(0,0,0,0.5)',
  translucent25: 'rgba(0,0,0,0.25)',
};

/* Typography */
export const fontFamily = 'Circular Spotify Text, Helvetica, Arial, sans-serif';
export const fontWeights = {
  light: 300, // CircularSpotifyTxT-Book
  normal: 400, // CircularSpotifyTxT-Book
  bold: 700, // CircularSpotifyTxT-Bold
  black: 900, // CircularSpotifyTxT-Black
};

/* Breakpoints */

/* Used as @media min-width: */
export const minBreakpoints = {
  xs: 320,
  sm: 641,
  md: 769,
  lg: 1025,
  ml: 1280, // Breakpoint used to avoid tight text links in large Global Nav
  xl: 1441,
  xxl: 1681,
};

/* Used as @media max-width: */
export const maxBreakpoints = {
  xs: 640,
  sm: 768,
  md: 1024,
  lg: 1440,
  ml: 1279, // Breakpoint used to avoid tight text links in large Global Nav
  xl: 1520,
};

/* Defined ratios percentages */
export const ratioPercentage = {
  oneOne: 100,
  threeTwo: 66.66,
  fourThree: 75,
  eightFive: 62.5,
  sixteenNine: 56.25,
  fiveFour: 80,
};

/* Animations */
export const animations = {
  defaultTransition: '0.3s ease-in-out',
};

export const visibilityThreshold = {
  oneThird: 0.33,
  oneHalf: 0.5,
  threeFourth: 0.75,
};

export const navHeight = {
  smToLg: 7.1,
  mlUp: 7.1,
};

export const sideNavHeight = {
  sm: 4.8,
};

export const cssGlobals = {
  antiFlicker: 'anti-flicker',
};

export const cssFragments = {
  defaultFocusState: css`
    &:focus {
      /* Fallback for browsers that don't support :focus-visible */
      outline: 1px dotted ${colors.grey100};
      outline: -webkit-focus-ring-color auto 1px;
    }

    &:focus:not(:focus-visible) {
      /* Remove the focus indicator on mouse-focus for browsers that do support :focus-visible */
      outline: none;
    }

    &:focus-visible {
      /* Focus indicator style for keyboard-focus on browsers that do support :focus-visible */
      outline: 1px dotted ${colors.grey100};
      outline: -webkit-focus-ring-color auto 1px;
    }
  `,
  backgroundScaledImage: css`
    background-image: ${props =>
      `url(${getScaledImageUrl(
        props['data-src'],
        IMG_DIMENSIONS[0],
      )})`}; /* Firefox fallback due to image-set not supported */
    background-image: ${props =>
      `image-set(${IMG_DIMENSIONS.map(
        dimension =>
          `url(${getScaledImageUrl(props['data-src'], dimension)})  ${
            dimension.d
          }`,
      ).toString()})`};
  `,
};
