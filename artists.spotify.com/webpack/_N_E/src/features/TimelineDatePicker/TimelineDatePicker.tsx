// ignore-string-externalization
import React, { useState } from 'react';
import { I18NDateRangePicker } from '@mrkt/features/react-dates';
import { useMostRecentDateWithData } from './useMostRecentDateWithData';
import { jsx as _jsx } from "react/jsx-runtime";

/**
 * VISIBLE FOR TESTING ONLY
 */
var _isOutsideRange = function isOutsideRange(day, minDate, maxDate) {
  var utcDay = day.clone().utc().startOf('day');
  return utcDay.isBefore(minDate, 'day') || utcDay.isAfter(maxDate, 'day');
};

export { _isOutsideRange as isOutsideRange };
export function TimelineDatePicker(_ref) {
  var onDatesChange = _ref.onDatesChange,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      numberOfMonths = _ref.numberOfMonths,
      anchorDirection = _ref.anchorDirection;

  var _useState = useState('startDate'),
      focusInput = _useState[0],
      setFocusInput = _useState[1];

  var maxDate = useMostRecentDateWithData();
  var minDate = maxDate.clone().subtract(5, 'years').startOf('year');
  var earliestMonthVisible = maxDate.clone().subtract(1, 'month').startOf('month');
  return /*#__PURE__*/_jsx(I18NDateRangePicker, {
    keepOpenOnDateSelect: true,
    onDatesChange: onDatesChange,
    startDate: startDate || null,
    endDate: endDate || null,
    startDateId: "timeline-date-start",
    endDateId: "timeline-date-end",
    focusedInput: focusInput,
    onFocusChange: function onFocusChange(focus) {
      if (!focus) return;
      setFocusInput(focus);
    },
    anchorDirection: anchorDirection,
    initialVisibleMonth: function initialVisibleMonth() {
      return earliestMonthVisible;
    },
    minDate: minDate,
    maxDate: maxDate,
    numberOfMonths: numberOfMonths,
    isOutsideRange: function isOutsideRange(day) {
      return _isOutsideRange(day, minDate, maxDate);
    }
  });
}