import React, { useContext } from 'react';
import styled from 'styled-components';
import has from 'lodash/has';
import { Tooltip } from '@spotify-internal/encore-web-v3';
import { useCountryNames } from '@mrkt/features/country-names';
import { useT } from '@mrkt/features/i18n';
import { Alignment, Legend } from '../../shared/components/Chart/Legend';
import { useGetString } from '../../shared/messages/strings';
import { CountryTimelineGraph } from './CountryTimelineGraph';
import { CountryTimelineContext } from './CountryTimelineContext';
import { CountryPicker } from './CountryPicker';
import { ASPECT_RATIO } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledTooltipContainer = styled.div.withConfig({
  displayName: "CountryTimelineWrapper__StyledTooltipContainer",
  componentId: "sc-1jezugq-0"
})(["position:absolute;height:", "px;width:", "px;"], function (props) {
  return props.height;
}, function (props) {
  return props.width;
});
var StyledTooltip = styled(Tooltip).withConfig({
  displayName: "CountryTimelineWrapper__StyledTooltip",
  componentId: "sc-1jezugq-1"
})(["position:relative;top:50%;left:50%;transform:translate(-50%,-50%);"]);
export function CountryTimelineWrapper(_ref) {
  var width = _ref.width;
  var countryTimelineContext = useContext(CountryTimelineContext);
  var countryNames = useCountryNames();
  var t = useT();
  var countries = countryTimelineContext.countries,
      countryTimelineData = countryTimelineContext.countryTimelineData,
      colorScale = countryTimelineContext.colorScale;
  var height = width * ASPECT_RATIO;
  var strings = useGetString();
  var isEmpty = !countryTimelineData || has(countryTimelineData, 'status') || // @ts-ignore
  countryTimelineData.length === 0;
  var emptyCopy = t('COUNTRY_TIMELINE_f973bf', 'Add countries to country comparisons', '');

  var errorComponent = /*#__PURE__*/_jsx("div", {
    children: strings.insightsError
  });

  if (has(countryTimelineData, 'status') && // @ts-ignore
  countryTimelineData.status !== 200) {
    // @ts-ignore
    switch (countryTimelineData.status) {
      /**
       * User scenario: Forbidden (403)
       */
      case 403:
        return null;

      case 204:
        emptyCopy = t('COUNTRY_TIMELINE_066be8', 'You don’t have any stats for this time period. Try changing the time range or adding more countries.', '');
        break;

      /**
       * User scenario: Catches any other bad response
       */

      default:
        return errorComponent;
    }
  }

  var sortedCountries = (countries || []).map(function (countryCode) {
    return {
      // @ts-ignore
      countryName: countryNames[countryCode] || countryCode,
      countryCode: countryCode
    };
  }).sort(function (a, b) {
    if (a.countryName < b.countryName) return -1;
    if (a.countryName > b.countryName) return 1;
    return 0;
  });
  var legendKeys = sortedCountries.map(function (val) {
    return {
      key: val.countryCode,
      label: val.countryName
    };
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Legend, {
      alignment: Alignment.end // @ts-ignore
      ,
      colorScale: colorScale,
      keys: legendKeys
    }), isEmpty && /*#__PURE__*/_jsx(StyledTooltipContainer, {
      width: width,
      height: height,
      children: /*#__PURE__*/_jsx(StyledTooltip, {
        children: emptyCopy
      })
    }), /*#__PURE__*/_jsx(CountryTimelineGraph // @ts-ignore
    , {
      data: !isEmpty ? countryTimelineData : [] // @ts-ignore
      ,
      colorScale: colorScale,
      height: height,
      width: width
    }), /*#__PURE__*/_jsx(CountryPicker, {
      sortedCountries: sortedCountries
    })]
  });
}