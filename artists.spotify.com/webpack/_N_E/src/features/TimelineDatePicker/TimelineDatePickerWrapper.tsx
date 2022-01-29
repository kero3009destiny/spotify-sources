import React, { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { Banner, ButtonPrimary, ButtonTertiary, DialogAlert, maroon, screenSmMin, screenXsMax, spacer20, spacer24 } from '@spotify-internal/encore-web-v3';
import styled from 'styled-components';
import { TimelineDatePicker } from './TimelineDatePicker';
import { TimeFilterOptions } from './TimeFilterOptions';
import { useMostRecentDateWithData } from './useMostRecentDateWithData';
import { useLocale, useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledErrorBanner = styled(Banner).withConfig({
  displayName: "TimelineDatePickerWrapper__StyledErrorBanner",
  componentId: "yvfis4-0"
})(["background:rgba(226,33,52,0.1);border-radius:6px;color:", ";margin:0 18px ", " 18px;"], maroon, spacer24);
var StyledDialogAlert = styled(DialogAlert).withConfig({
  displayName: "TimelineDatePickerWrapper__StyledDialogAlert",
  componentId: "yvfis4-1"
})(["padding:", " 0;position:absolute;right:", ";top:70px;width:620px;min-width:320px;background-color:white !important;@media (max-width:", "){width:320px !important;}> header h1{display:none;}@media (min-width:", "){max-height:", ";}"], spacer20, spacer20, screenXsMax, screenSmMin, function (props) {
  return props.hasBanner ? '560px' : '530px';
});
var StyledFooter = styled.div.withConfig({
  displayName: "TimelineDatePickerWrapper__StyledFooter",
  componentId: "yvfis4-2"
})(["margin-right:0;margin-top:", ";@media (min-width:screenXsMin){margin-right:", ";margin-top:", ";}> button:last-child{margin-left:0;}"], spacer24, spacer20, spacer20);
var StyledWrapper = styled.div.withConfig({
  displayName: "TimelineDatePickerWrapper__StyledWrapper",
  componentId: "yvfis4-3"
})(["@media (max-width:", "){.DateRangePickerInput{border-radius:4px;overflow:hidden;justify-content:space-around;}.DateInput{inline-size:130px;}}"], screenXsMax);

var formatStartDate = function formatStartDate(query, mostRecentDate, startDate) {
  switch (query) {
    case TimeFilterOptions.SEVEN_DAYS:
    case TimeFilterOptions.TWENTY_EIGHT_DAYS:
      return moment(mostRecentDate).utc().subtract(parseInt(query.replace(/day/i, ''), 10) - 1, 'days').startOf('day');

    case TimeFilterOptions.CUSTOM:
      return startDate ? moment(startDate).utc() : undefined;

    case TimeFilterOptions.ONE_YEAR:
      return moment(mostRecentDate).utc().subtract(365 - 1, 'days').startOf('day');

    case TimeFilterOptions.YTD:
      return moment(mostRecentDate).utc().startOf('year');

    default:
      return undefined;
  }
};

var formatEndDate = function formatEndDate(query, mostRecentDate, endDate) {
  if (query === TimeFilterOptions.CUSTOM) {
    return endDate ? moment(endDate).utc() : undefined;
  }

  return moment(mostRecentDate).utc();
};

export var TimelineDatePickerWrapper = function TimelineDatePickerWrapper(_ref) {
  var onSave = _ref.onSave,
      onCancel = _ref.onCancel,
      query = _ref.query,
      customDates = _ref.customDates,
      anchorDirection = _ref.anchorDirection,
      numberOfMonths = _ref.numberOfMonths;

  var _ref2 = customDates || {},
      startDateString = _ref2.startDate,
      endDateString = _ref2.endDate;

  var mostRecentDate = useMostRecentDateWithData();

  var _useState = useState(formatStartDate(query, mostRecentDate, startDateString)),
      startDate = _useState[0],
      setStartDate = _useState[1];

  var _useState2 = useState(formatEndDate(query, mostRecentDate, endDateString)),
      endDate = _useState2[0],
      setEndDate = _useState2[1];

  var _useState3 = useState({
    visible: false,
    text: ''
  }),
      showBanner = _useState3[0],
      setShowBanner = _useState3[1];

  var t = useT();
  var locale = useLocale();
  var BANNER_ERROR_TEXT = {
    format: t('TIMELINE_DATE_PICKER_DATE_FORMAT_ERROR', 'The date must be in the following format: MM/DD/YYYY', 'User formatted the date wrongly'),
    range: t('TIMELINE_DATE_PICKER_ONE_YEAR_MAX_RANGE_ERROR', 'Shorten your date range. It can’t exceed one year.', 'User put in too wide of a date range')
  };

  var onDatesChange = function onDatesChange(dates) {
    if (dates.startDate) {
      var utcStartDate = dates.startDate.clone().utc().startOf('day');
      setStartDate(utcStartDate);
    }

    if (dates.endDate) {
      var utcEndDate = dates.endDate.clone().utc().startOf('day');
      setEndDate(utcEndDate);
    }
  };

  function checkInputDateFormat(event) {
    var value = event.target.value; // @todo: explore solution that scales to other languages

    if (!moment(value, 'MM/DD/YYYY', true).isValid() && locale === 'en') {
      setShowBanner({
        visible: true,
        text: BANNER_ERROR_TEXT.format
      });
    }
  }

  useEffect(function () {
    if (startDate && Object.keys(startDate).length && endDate) {
      if (startDate.isBefore(endDate.clone().subtract(1, 'year'))) {
        setShowBanner({
          visible: true,
          text: BANNER_ERROR_TEXT.range
        });
      }
    }

    return function cleanup() {
      setShowBanner({
        visible: false,
        text: ''
      });
    };
  }, [startDate, endDate, BANNER_ERROR_TEXT.range]);
  useEffect(function () {
    var inputStartDate = document.getElementById('timeline-date-start');
    var inputEndDate = document.getElementById('timeline-date-end');

    if (inputStartDate && inputEndDate) {
      [inputStartDate, inputEndDate].forEach(function (input) {
        return input.addEventListener('blur', checkInputDateFormat);
      });
    }

    return function cleanup() {
      if (inputStartDate && inputEndDate) {
        [inputStartDate, inputEndDate].forEach(function (input) {
          return input.removeEventListener('blur', checkInputDateFormat);
        });
      }
    };
  });
  return /*#__PURE__*/_jsx(StyledDialogAlert, {
    hasBanner: showBanner.visible,
    body: /*#__PURE__*/_jsxs(Fragment, {
      children: [showBanner.visible && /*#__PURE__*/_jsx(StyledErrorBanner, {
        variant: Banner.error,
        children: showBanner.text
      }), /*#__PURE__*/_jsx(StyledWrapper, {
        children: /*#__PURE__*/_jsx(TimelineDatePicker, {
          onDatesChange: onDatesChange,
          startDate: startDate,
          endDate: endDate,
          anchorDirection: anchorDirection,
          numberOfMonths: numberOfMonths
        })
      })]
    }),
    footer: /*#__PURE__*/_jsxs(StyledFooter, {
      children: [/*#__PURE__*/_jsx(ButtonTertiary, {
        buttonSize: "sm",
        onClick: onCancel,
        children: t('TIMELINE_DATE_PICKER_CANCEL', 'Cancel', 'Cancel')
      }), ' ', /*#__PURE__*/_jsx(ButtonPrimary, {
        "data-testid": "dialog-save-button",
        disabled: showBanner.visible,
        buttonSize: "sm",
        onClick: function onClick() {
          if (startDate && endDate) {
            onSave(startDate, endDate);
          }
        },
        children: t('TIMELINE_DATE_PICKER_SAVE', 'Save', 'Save')
      })]
    })
  });
};