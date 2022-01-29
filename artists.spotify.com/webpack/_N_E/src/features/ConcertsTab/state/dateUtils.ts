import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
var DATE_TIME_VIEW_FORMAT_OPTIONS = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC'
};
var CONCERT_START_TIME = {
  hour: 'numeric',
  timeZone: 'UTC'
};
var CALENDAR_ICON_MONTH = {
  month: 'short',
  timeZone: 'UTC'
};
var CALENDAR_ICON_DAY = {
  day: 'numeric',
  timeZone: 'UTC'
};
var CALENDAR_MONTH_DAY = {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC'
};
var DATE_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)T([0-9]+):([0-9]+):([0-9]+)[+\-0-9]+/; // We display concert dates in the time of the concert locale, not the timeZone
// of the current user's computer.
// We parse the date this way ourselves, because Safari cannot parse a dateString
// like: 2017-07-22T11:00:00+0200
// NOTE: This parser does not care about Timezones...

export var parseDateFromString = function parseDateFromString(dateString) {
  // @ts-ignore
  var dateParts = DATE_REGEX.exec(dateString).slice(1) // only take the time parts from the regex exec
  .map(Number) // turn them all into numbers
  .map(function (maybeMonth, idx) {
    return idx === 1 ? maybeMonth - 1 : maybeMonth;
  }); // Date.UTC expects the 'month' to be from 0 => 11, date
  // strings are on the range of 1 => 12; hence the extra map above;
  // @ts-ignore

  var utcMillis = Date.UTC.apply(Date, _toConsumableArray(dateParts));
  return new Date(utcMillis);
};
// Allow others to pass formatting options.
// @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Using_options
export function formatConcertDateView(dateObj) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var opts = _objectSpread(_objectSpread({}, DATE_TIME_VIEW_FORMAT_OPTIONS), options);

  return new Intl.DateTimeFormat(locale, opts).format(dateObj);
}
export function formatConcertDateStartTime(dateObj) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  return new Intl.DateTimeFormat(locale, CONCERT_START_TIME).format(dateObj);
}
export function formatConcertDateIconMonth(dateObj) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  return new Intl.DateTimeFormat(locale, CALENDAR_ICON_MONTH).format(dateObj);
}
export function formatConcertDateIconDay(dateObj) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  return new Intl.DateTimeFormat(locale, CALENDAR_ICON_DAY).format(dateObj);
}
export function formatConcertMonthDay(dateObj) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  return new Intl.DateTimeFormat(locale, CALENDAR_MONTH_DAY).format(dateObj);
}