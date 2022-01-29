import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Type, screenSmMin } from '@spotify-internal/encore-web';
import { lastSevenDays } from '../../HomeHelper';
import { useDateTimeFormatter, useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ThisWeek = styled.div.withConfig({
  displayName: "StatsTopHeader__ThisWeek",
  componentId: "fksx1d-0"
})(["align-items:baseline;display:flex;flex-direction:row;justify-content:space-between;@media (min-width:", "){grid-area:statsheader;grid-row-start:2;}"], screenSmMin);
var StatsTopHeader = /*#__PURE__*/React.memo(function (props) {
  var t = useT();
  var dateFormatter = useDateTimeFormatter({
    day: 'numeric',
    month: 'numeric'
  });
  return /*#__PURE__*/_jsxs(ThisWeek, {
    children: [/*#__PURE__*/_jsx(Type.h1, {
      variant: Type.heading3,
      weight: Type.bold,
      condensed: true,
      children: t('S4A_LOGGED_IN_HOME_900c8b', "Last {days, plural, one {{days} day} other {{days} days}}", 'Refers to the previous x number of days', {
        days: 7
      })
    }), props.latestDate ? /*#__PURE__*/_jsx(Type.p, {
      variant: Type.cta4,
      semanticColor: "textSubdued",
      children: lastSevenDays(props.latestDate, dateFormatter.format)
    }) : null]
  });
});
StatsTopHeader.propTypes = {
  latestDate: PropTypes.string
};
/* eslint-disable-next-line import/no-default-export */

export default StatsTopHeader;