import moment, { Moment } from 'moment';

export const ISO_SERVER_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
export const ISO_SERVER_FORMAT_SIMPLE = 'YYYY-MM-DDTHH:mm:ss[Z]';
export const MonthDayYear = 'MM/DD/YYYY';
export const DayMonthYear = 'DD/MM/YYYY';

/**
 * Format date strings
 * @param isoDateStart
 * @param isoDateEnd
 */
export function daysBetweenDates(
  isoDateStart: number,
  isoDateEnd: number,
): number {
  const end = moment(isoDateEnd);
  const start = moment(isoDateStart);
  return Math.ceil(end.diff(start, 'days', true));
}

/**
 * @param days
 * @return Date
 */
export function daysFromToday(days: number): Date {
  const today = new Date(Date.now());
  today.setDate(today.getDate() + days);
  today.setHours(0, 1, 0, 0);
  return today;
}

/**
 * Set inputted date time to be 11:59PM
 * @param date
 * @return Date
 */
export function endOfDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 0, 0);
  return newDate;
}

/**
 * for use in sending the offset in milliseconds for the user's browser timezone
 * for formatting in emails, like payment receipts.
 * @return number
 */
export function getTimezoneOffsetMillis() {
  return new Date().getTimezoneOffset() * 60 * 1000;
}

/**
 * @param date
 */
export function hasDatePassed(date: string | Moment): boolean {
  return moment().isAfter(moment(date));
}

/**
 * Returns today's day as the modulo number of days since 1970-01-01 within a rolling window.
 * E.g if today is 2020-12-03, which is 18,599 days from the beginning of the Unix epoch, and
 * the window is the default value of 90, then it will return 59, which is the number of days
 * since the last day when the number of days since the epoch was wholly divisible by 90 (the
 * window).  The return value will always be an integer in the range 0 - (window - 1).
 * @param [window = 90] The rolling window to apply.
 * @returns The position of todays date in the rolling window specified since the beginning of
 * the Unix epoch.
 */
export const getRollingDayNumber = (window: number = 90): number =>
  Math.trunc((Date.now() / 1000 / 60 / 60 / 24) % Math.abs(window));

/**
 * Converts timestamp from protobuf response into JS Date object.
 * Protobuf timestamps are sent as string, but any unset values will be sent as epoch
 * (midnight on Jan 1 1970), which should be filtered out and replaced with undefined.
 */
export function dateFromProtobufTimestamp(timestamp: string): Date | undefined {
  const timestampDate = new Date(timestamp);

  return timestampDate.getTime() !== 0 ? timestampDate : undefined;
}

export function parseDateOrFastforward(
  date: string,
  days: number | undefined = 1,
): string {
  if (date) {
    const parsedDate = moment(date);

    if (!hasDatePassed(parsedDate)) {
      return parsedDate.utc().format(ISO_SERVER_FORMAT);
    }
  }

  return moment()
    .add(days, 'day')
    .utc()
    .format(ISO_SERVER_FORMAT);
}

export const getInitialBeginDate = () => daysFromToday(7).toISOString();
export const getInitialEndDate = () =>
  endOfDay(daysFromToday(37)).toISOString();
