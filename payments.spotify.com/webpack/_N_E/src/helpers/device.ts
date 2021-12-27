import {
  screenLgMax,
  screenLgMin,
  screenMdMax,
  screenMdMin,
  screenSmMax,
  screenSmMin,
  screenXlMin,
  screenXsMax,
  screenXsMin,
  screenXxsMax,
} from '@spotify-internal/encore-foundation';

/** More about breakpoints: https://encore.spotify.net/web/basics/layout?format=figma-figma#spotify-layout */

type minBreakpoint =
  | typeof screenXsMin // '480px' Extra small devices;
  | typeof screenSmMin // '768px' Small devices;
  | typeof screenMdMin // '992px' Medium devices;
  | typeof screenLgMin // '1200px' Large devices;
  | typeof screenXlMin; // '1920px' Extra large devices;;

type maxBreakpoint =
  | typeof screenXxsMax
  | typeof screenXsMax
  | typeof screenSmMax
  | typeof screenMdMax
  | typeof screenLgMax;

export const ifDeviceBiggerThan = (breakpoint: minBreakpoint) => `@media (min-width: ${breakpoint})`;

export const ifDeviceSmallerThan = (breakpoint: maxBreakpoint) => `@media (max-width: ${breakpoint})`;
