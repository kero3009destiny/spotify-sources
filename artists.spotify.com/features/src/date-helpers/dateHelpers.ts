// ignore-string-externalization
import { utcDay } from 'd3-time';
import { timeFormat, timeParse, utcFormat, utcParse } from 'd3-time-format';
import invariant from 'invariant';

/**
 * Parsers: Create a date from its string representation.
 */
export const parseYearMonthDay = timeParse('%Y-%m-%d');
const parseYearMonthDayUTC = utcParse('%Y-%m-%d');

export const parseStringToDateUTC = (dateString?: string): Date => {
  invariant(
    typeof dateString === 'string',
    'Function expects a string as an argument',
  );

  const dateObj = parseYearMonthDayUTC(dateString);

  invariant(
    !(dateObj === null),
    "Invalid date string passed to function, ensure the string is in the format of '%Y-%m-%d'",
  );

  return dateObj;
};

/**
 * Formatters: Create a string representation of a date.
 */
const formatDayNameUTC = utcFormat('%a, %b %d');
const formatMonthNameUTC = utcFormat('%b %d');
const DAYS_IN_MONTH = 28;

export const formatDateUTC = (date: Date): string => formatDayNameUTC(date);

export const formatDateMonthUTC = (date: Date): string =>
  formatMonthNameUTC(date);

export const formatDateWindowUTC = (date: Date): string =>
  `${formatMonthNameUTC(
    utcDay.offset(date, -DAYS_IN_MONTH),
  )} to ${formatMonthNameUTC(date)}`;

export const tooltipDateFormatter = timeFormat('%a, %b %d');
export const formatMonthDayOfMonthYear = timeFormat('%B %-d %Y');
export const formatWeekdayDayOfMonth = timeFormat('%a %d');
export const formatMonthDayOfMonth = timeFormat('%b %d');
export const formatShortMonth = timeFormat('%b');
export const formatFullYear = timeFormat('%Y');
