import { cloneDeep, isEmpty } from 'lodash';
import moment from 'moment';

import { jsonStringify } from 'utils/storageHelpers';

import { MAX_WIDTH, MIN_WIDTH, STAT_ATTRS } from 'config/stats';
/**
 * Calculate the sizes of the audience charts.  These are their standard width, reduced to fit in
 * the container if that container falls below MIN_WIDTH.
 * @param {object} size = Current size of the container including width/height.
 * @param {number} size.width = MAX_WIDTH The current width of the container.
 * @returns {object} The chart widths calculated to ratio
 */
export function calculateChartSizes({ width = MAX_WIDTH } = {}) {
  const ratio = width >= MIN_WIDTH ? 1 : width / MIN_WIDTH;
  const calculatedChartSizes = {};

  Object.entries(STAT_ATTRS).forEach(([key, value]) => {
    calculatedChartSizes[key] = Math.round((value.chartWidth || 0) * ratio);
  });

  return calculatedChartSizes;
}

/**
 * Take GMT timestamp from stats and turn it into the same date
 * at midnight in local time and strip the rest
 *
 * This does not have a fallback because we do not expect to
 * consume anything not produced by the current stats BE
 *
 * @param {string} timestamp Date string to clean and return
 * @return {Date}
 */
export function cleanStatDate(timestamp) {
  return getDayOnly(timestamp).toDate();
}

export function cleanXDomain(dateBegin, dateEnd) {
  return [cleanStatDate(dateBegin), cleanStatDate(dateEnd)];
}

/**
 * Takes a date object and returns a date with its time normalized to midnight in the locale
 * timezone.
 *
 * Why is this needed? Because getDayOnly(), which cleanStatDate() wraps, returns a date-only
 * string, normalized to UTC. This means if our source date/time stamp is 01-OCT-2018 11:00:00PM
 * Eastern Daylight Time, the UTC date-only string returned will be 02-OCT-2018 (or something to
 * that effect). When cleanDateStamp() returns a JS Date from that string, JavaScript insists on
 * parsing that date-only string 02-OCT-2018 as 02-OCT-2018 00:00:00 UTC when constructing the JS
 * Date.
 *
 * When the JS Date gets forced to a string somewhere deep in the charts libraries either through a
 * call to Date.protototype.toString() or a coercement to a string, it automatically applies the
 * local machine's timezone, and gives us a string that is now 01-OCT-2018 20:00:00 Eastern
 * Daylight Time. Which means that we are now trying to match date strings forced to UTC dates
 * via moment.utc() against date strings forced to local timezone dates by the JS Date object.
 *
 * This method basically forces the date received back to a date-only string and uses the timezone
 * offset of the original date to convert it back to a date that when stripped of its time will
 * be the correct date to match the stripped UTC date.
 * @param {Date} date Input date
 * @returns {Date} Output date
 */
export const normalizeTimezone = date =>
  new Date(
    moment(date)
      .add(date.getTimezoneOffset() > 0 ? 1 : 0, 'd')
      .toDate()
      .toDateString(),
  );

// Accessors and formatters
export const xEquals = (data, otherData, { x }) =>
  x(data).toString() === x(otherData).toString();
export const adsServedAccessor = d => d.adsServed;
export const yAccessor = d => d.paidListens || d.reach || 0;
export const accResolver = d => jsonStringify(d);
export const formatXAxis = date => moment(date).format('MMM DD');
// cleanStatDate returns us a JS Date object which when forced to a string adjusts to the local
// timezone.  We don't want that as we've already normalized our data days to time-and-TZ-less
// dates, so we have to finagle the date used in the axis to midnight in the local timezone.
export const xAccessor = d => normalizeTimezone(cleanStatDate(d.timestamp));

// Functions for handling one day long campaigns
export function getDaysOfCampaign(startDate, endDate) {
  const startDay = getDayOnly(startDate);
  const endDay = getDayOnly(endDate);
  return endDay.diff(startDay, 'days');
}

export function getDaysToCampaign(startDate) {
  const today = getDayOnly(new Date());
  const startDay = getDayOnly(startDate).add(12, 'hours');
  return startDay.diff(today, 'days');
}

export function isSameDay(startDate, endDate) {
  const startDay = getDayOnly(startDate);
  const endDay = getDayOnly(endDate);
  return startDay.isSame(endDay, 'day');
}

export function nowIsLessThanOneDaySince(sinceDate) {
  return moment().diff(sinceDate, 'days') < 1;
}

function getDayOnly(date) {
  const processed = moment
    .utc(date)
    .hour(0)
    .minute(0)
    .second(0);
  if (!moment(processed).isValid()) {
    // The browser does not like the date format, so we need to manually parse it.
    // This is known to be an issue with Safari.  Chrome should not hit this path.
    const parsed = date.match(/\w{3} (\w{3}) (\d{2}) 00:00:00 \w{3} (\d{4})/);
    return moment.utc(`${parsed[1]} ${parsed[2]} ${parsed[3]}`, 'MMM DD YYYY');
  }
  return processed;
}

export function getOneDayStats(stats) {
  const xDomain = getXDomain(stats);
  return padOneDayStats(stats, xDomain);
}

export function getXDomain(stats) {
  if (isEmpty(stats)) return [];

  const date = cleanStatDate(stats[0].timestamp);
  return [
    moment(date)
      .subtract(3, 'day')
      .toDate(),
    moment(date)
      .subtract(2, 'day')
      .toDate(),
    moment(date)
      .subtract(1, 'day')
      .toDate(),
    date,
    moment(date)
      .add(1, 'day')
      .toDate(),
    moment(date)
      .add(2, 'day')
      .toDate(),
    moment(date)
      .add(3, 'day')
      .toDate(),
  ];
}

export function padOneDayStats(stats, xDomain) {
  const results = [];
  if (isEmpty(stats)) return results;

  const keys = Object.keys(stats[0]);
  const originalStats = cloneDeep(stats[0], {});
  const originalDate = cleanStatDate(stats[0].timestamp);
  originalStats.timestamp = originalDate;
  xDomain.forEach(day => {
    const data = {};

    if (!moment(originalDate).isSame(day)) {
      keys.forEach(key => {
        if (key === 'timestamp') {
          data[key] = day;
        } else {
          data[key] = 0;
        }
      });

      results.push(data);
    } else {
      results.push(originalStats);
    }
  });

  return results;
}

export function removeOutsideStats(stats, startDate) {
  const startDay = getDayOnly(startDate);
  return stats.filter(stat => {
    const timestamp = getDayOnly(stat.timestamp);
    if (startDay.isSame(timestamp) || startDay.isBefore(timestamp)) {
      return true;
    }
  });
}
