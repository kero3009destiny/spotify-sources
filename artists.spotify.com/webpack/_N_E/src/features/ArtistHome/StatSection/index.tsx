import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavPill, NavPillList, NavPillListItem, screenSmMin } from '@spotify-internal/encore-web';
import Overview from './Overview';
import TopSongs from './TopSongs';
import TopPlaylists from './TopPlaylists';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Siderail = styled.div.withConfig({
  displayName: "StatSection__Siderail",
  componentId: "sc-13i57uq-0"
})(["grid-area:stats;min-width:0;@media (min-width:", "){grid-row-start:3;}"], screenSmMin);
var StatSection = /*#__PURE__*/React.memo(function (props) {
  var t = useT();
  var isMobile = props.isMobile,
      activeStatsTabIndex = props.activeStatsTabIndex,
      onChangeStatsTab = props.onChangeStatsTab;

  var OverviewSection = /*#__PURE__*/_jsx(Overview, _objectSpread({}, props));

  var SongSection = /*#__PURE__*/_jsx(TopSongs, _objectSpread({}, props));

  var PlaylistSection = /*#__PURE__*/_jsx(TopPlaylists, _objectSpread({}, props));

  var NavPills = [{
    id: 'overview',
    label: t('308fd5', 'Overview', ''),
    content: OverviewSection
  }, {
    id: 'songs',
    label: t('6f27f3', 'Songs', ''),
    content: SongSection
  }, {
    id: 'playlists',
    label: t('6ed5a4', 'Playlists', ''),
    content: PlaylistSection
  }];
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: isMobile ? /*#__PURE__*/_jsx(Siderail, {
      children: /*#__PURE__*/_jsx(NavPill, {
        list: /*#__PURE__*/_jsx(NavPillList, {
          style: {
            textAlign: 'left'
          },
          children: NavPills.map(function (tab, index) {
            return /*#__PURE__*/_jsx(NavPillListItem, {
              id: tab.id,
              active: index === activeStatsTabIndex,
              label: tab.label,
              onClick: function onClick(e) {
                return onChangeStatsTab(e, index);
              }
            }, tab.id);
          })
        }),
        children: /*#__PURE__*/_jsx("div", {
          role: "tabpanel",
          "aria-labelledby": NavPills[activeStatsTabIndex].id,
          children: NavPills[activeStatsTabIndex].content
        })
      })
    }) : /*#__PURE__*/_jsxs(Siderail, {
      children: [OverviewSection, SongSection, PlaylistSection]
    })
  });
});
StatSection.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  activeStatsTabIndex: PropTypes.number.isRequired,
  onChangeStatsTab: PropTypes.func.isRequired
};
/* eslint-disable-next-line import/no-default-export */

export default StatSection;