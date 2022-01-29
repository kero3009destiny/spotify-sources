import * as React from 'react';
import * as S from './styles';
import { useCountryRightsTooltip } from './hooks/useCountryRightsTooltip';
import { useNormalizeCountryNames } from './hooks/useNormalizeCountryNames';
import { jsx as _jsx } from "react/jsx-runtime";
export function SplitRightsBanner(_ref) {
  var bannerText = _ref.bannerText,
      countries = _ref.countries;
  var normalized = useNormalizeCountryNames(countries);
  var countriesTooltip = useCountryRightsTooltip(normalized, bannerText);
  return /*#__PURE__*/_jsx(S.InfoBanner, {
    contextual: true,
    renderIcon: function renderIcon(_props) {
      return null;
    },
    children: countriesTooltip
  });
}