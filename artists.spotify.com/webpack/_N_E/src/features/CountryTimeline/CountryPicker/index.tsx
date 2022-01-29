import React, { useContext } from 'react';
import styled from 'styled-components';
import { Type, spacer8, spacer32, gray70 } from '@spotify-internal/encore-web-v3';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useT } from '@mrkt/features/i18n';
import { CountryTimelineContext } from '../CountryTimelineContext';
import { ComparisonButton } from '../../ComparisonButton';
import { GA_EVENT_CATEGORY } from '../constants';
import { CountryInput } from './CountryInput';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Wrapper = styled.div.withConfig({
  displayName: "CountryPicker__Wrapper",
  componentId: "ohjtw1-0"
})(["margin-top:", ";"], spacer32);
var StyledButtonsWrapper = styled.div.withConfig({
  displayName: "CountryPicker__StyledButtonsWrapper",
  componentId: "ohjtw1-1"
})(["margin-top:", ";"], spacer8);
export function CountryPicker(_ref) {
  var _ref$sortedCountries = _ref.sortedCountries,
      sortedCountries = _ref$sortedCountries === void 0 ? [] : _ref$sortedCountries;

  var _useContext = useContext(CountryTimelineContext),
      removeCountry = _useContext.removeCountry;

  var t = useT();
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [sortedCountries.length < 5 ? /*#__PURE__*/_jsx(CountryInput, {}) : /*#__PURE__*/_jsx(Type, {
      as: "p",
      color: gray70,
      children: t('COUNTRY_TIMELINE_dda996', 'You can only compare 5 countries at a time.', '')
    }), /*#__PURE__*/_jsx(StyledButtonsWrapper, {
      children: sortedCountries.map(function (_ref2) {
        var countryCode = _ref2.countryCode,
            countryName = _ref2.countryName;
        return /*#__PURE__*/_jsx(ComparisonButton, {
          buttonText: countryName,
          onClick: function onClick() {
            removeCountry(countryCode);
            sendEvent({
              eventCategory: GA_EVENT_CATEGORY,
              eventAction: 'removeCountry',
              eventLabel: countryCode,
              // @ts-ignore
              eventValue: sortedCountries.map(function (country) {
                return country.countryCode;
              }).toString()
            });
          }
        }, countryCode);
      })
    })]
  });
}