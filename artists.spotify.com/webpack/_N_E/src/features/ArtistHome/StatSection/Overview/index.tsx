import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table, TableRow, TableCell, TextLink, black, spacer12, spacer24, screenSmMin } from '@spotify-internal/encore-web';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import StatsTopHeader from '../StatsTopHeader';
import { StatsDelta } from '../StatsDelta';
import { StatsDeltaTitle } from '../Style';
import { useT, useNumberFormatter } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var OverviewRow = styled(TableRow).withConfig({
  displayName: "Overview__OverviewRow",
  componentId: "sc-1je2qz4-0"
})(["display:flex;justify-content:space-between;padding-bottom:", ";padding-top:", ";&:hover{cursor:pointer;}"], spacer12, spacer12);
var OverviewCell = styled(TableCell).withConfig({
  displayName: "Overview__OverviewCell",
  componentId: "sc-1je2qz4-1"
})(["align-items:center;display:flex;padding-left:0;padding-right:0;"]);
var OverviewTable = styled(Table).withConfig({
  displayName: "Overview__OverviewTable",
  componentId: "sc-1je2qz4-2"
})(["border-top:1px solid ", ";padding-bottom:", ";"], black, spacer24);
var OverviewArea = styled.div.withConfig({
  displayName: "Overview__OverviewArea",
  componentId: "sc-1je2qz4-3"
})(["@media (min-width:", "){padding-bottom:", ";}"], screenSmMin, spacer24);
var StyledTextLink = styled(TextLink).withConfig({
  displayName: "Overview__StyledTextLink",
  componentId: "sc-1je2qz4-4"
})(["&&&{text-decoration:none;&:hover{text-decoration:none;color:inherit;}}"]);
var Overview = /*#__PURE__*/React.memo(function (props) {
  var listeners = props.listeners,
      streams = props.streams,
      followers = props.followers;
  var t = useT();
  var numberFormat = useNumberFormatter();
  var OverviewData = [{
    id: 'listeners',
    label: t('S4A_LOGGED_IN_HOME_605606', 'Listeners', ''),
    data: {
      total: numberFormat.format(Number(listeners.total) || 0),
      deltaPct: listeners.deltaPct
    }
  }, {
    id: 'streams',
    label: t('S4A_LOGGED_IN_HOME_b98dff', 'Streams', ''),
    data: {
      total: numberFormat.format(Number(streams.total) || 0),
      deltaPct: streams.deltaPct
    }
  }, {
    id: 'followers',
    label: t('S4A_LOGGED_IN_HOME_720ef5', 'Followers', ''),
    data: {
      total: numberFormat.format(Number(followers.total) || 0),
      delta: followers.delta
    }
  }];
  return /*#__PURE__*/_jsxs(OverviewArea, {
    children: [props.isMobile ? /*#__PURE__*/_jsx(StatsTopHeader, {
      latestDate: props.latestDate
    }) : null, /*#__PURE__*/_jsx(OverviewTable, {
      "data-testid": "overview-table",
      children: /*#__PURE__*/_jsx("tbody", {
        children: OverviewData.map(function (row) {
          return /*#__PURE__*/_jsxs(OverviewRow, {
            "data-testid": "overview-row",
            hover: true,
            onClick: function onClick() {
              sendEvent({
                eventCategory: 'Navigate',
                eventAction: 'audience',
                eventLabel: "".concat(row.id)
              });
              props.history.push("/artist/".concat(props.artist.id, "/audience?audience-filter=").concat(row.id, "&time-filter=7day"));
            },
            children: [/*#__PURE__*/_jsx(OverviewCell, {
              highlight: true,
              children: /*#__PURE__*/_jsx(StyledTextLink, {
                href: "#",
                children: row.label
              })
            }), /*#__PURE__*/_jsxs(OverviewCell, {
              align: "right",
              children: [/*#__PURE__*/_jsx(StatsDeltaTitle, {
                children: row.data && row.data.total !== undefined ? row.data.total : '-'
              }), !!row.data ? /*#__PURE__*/_jsx(StatsDelta, {
                delta: row.id === 'followers' ? row.data.delta : row.data.deltaPct,
                isDeltaPct: row.id !== 'followers',
                id: row.id
              }) : null]
            })]
          }, row.id);
        })
      })
    })]
  });
});
Overview.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  latestDate: PropTypes.string,
  listeners: PropTypes.shape({
    total: PropTypes.number,
    deltaPct: PropTypes.number
  }).isRequired,
  streams: PropTypes.shape({
    total: PropTypes.number,
    deltaPct: PropTypes.number
  }).isRequired,
  followers: PropTypes.shape({
    delta: PropTypes.number,
    total: PropTypes.number,
    deltaPct: PropTypes.number
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
/* eslint-disable-next-line import/no-default-export */

export default Overview;