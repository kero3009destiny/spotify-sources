// ignore-string-externalization
import {
  screenXsMin,
  screenSmMin,
  screenMdMin,
  screenLgMin,
} from '@spotify-internal/encore-web-v3';
import { useDateTimeFormatter, useNumberFormatter } from '@mrkt/features/i18n';

export const EM_DASH = '—';

// numbers
export const formatNumberWithFallback = (
  input: string | number,
  formatter: ReturnType<typeof useNumberFormatter>,
) => (Number(input) === 0 ? EM_DASH : formatter.format(Number(input)));

export const intlNumberFormatSuffixOptions: Intl.NumberFormatOptions = {
  notation: 'compact',
};

// percentages
export const formatPercentWithFallback = (
  num: number,
  formatter: ReturnType<typeof useNumberFormatter>,
) => (num === 0 ? EM_DASH : formatter.format(Math.floor(Math.abs(num)) * 0.01));

// date parsing and formatting
export const parseDate = (str: string) => new Date(str);
export const formatDateToString = (
  date: Date | null,
  formatter: ReturnType<typeof useDateTimeFormatter>,
) => (date == null ? EM_DASH : formatter.format(date));

// UTC dates (i18n)
export const intlDateFormatOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
};

export const intlDateFormatTitleOptions: Intl.DateTimeFormatOptions = {
  ...intlDateFormatOptions,
  month: 'long',
  weekday: 'long',
};

// non-UTC dates (i18n)
// note: these formatters power the timeline chart tooltips
// and axes. They use the runtime's default time zone.
export const intlTimelineAxisDateFormatOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

export const intlTimelineTooltipDateFormatOptions: Intl.DateTimeFormatOptions = {
  ...intlTimelineAxisDateFormatOptions,
  weekday: 'short',
};

// titles
export const formattedTitleTextAccessorFunction = (datum: {
  [x: string]: string;
}) => datum.titleText || {};

// screen sizes
export const stringToNumHelper = (str: string) => parseInt(str, 10);
export const screenXsInt = stringToNumHelper(screenXsMin);
export const screenSmInt = stringToNumHelper(screenSmMin);
export const screenMdInt = stringToNumHelper(screenMdMin);
export const screenLgInt = stringToNumHelper(screenLgMin);
