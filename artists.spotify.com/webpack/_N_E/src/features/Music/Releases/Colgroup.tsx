// ignore-string-externalization
import React from 'react';
import { TableColgroup } from '../../../shared/components/Table';
import { jsx as _jsx } from "react/jsx-runtime";
var smallScreenCols = [{
  key: 'number',
  colWidth: 20
}, {
  key: 'track_name',
  colWidth: '*'
}, {
  key: 'split_rights',
  colWidth: 30
}, {
  key: 'streams',
  colWidth: 120
}];
var mediumScreenCols = [{
  key: 'number',
  colWidth: 20
}, {
  key: 'track_name',
  colWidth: '*'
}, {
  key: 'split_rights',
  colWidth: 30
}, {
  key: 'streams',
  colWidth: 120
}, {
  key: 'release_date',
  colWidth: 140
}];
var mediumScreenColsWithViews = [{
  key: 'number',
  colWidth: 20
}, {
  key: 'track_name',
  colWidth: '*'
}, {
  key: 'split_rights',
  colWidth: 30
}, {
  key: 'streams',
  colWidth: 120
}, {
  key: 'views',
  colWidth: 120
}, {
  key: 'release_date',
  colWidth: 140
}];
var desktopCols = [{
  key: 'number',
  colWidth: 35
}, {
  key: 'track_name',
  colWidth: '*'
}, {
  key: 'split_rights',
  colWidth: 30
}, {
  key: 'streams',
  colWidth: 140
}, {
  key: 'listeners',
  colWidth: 140
}, {
  key: 'saves',
  colWidth: 140
}, {
  key: 'release_date',
  colWidth: 140
}];
var desktopColsWithViews = [{
  key: 'number',
  colWidth: 35
}, {
  key: 'track_name',
  colWidth: '*'
}, {
  key: 'split_rights',
  colWidth: 30
}, {
  key: 'streams',
  colWidth: 140
}, {
  key: 'listeners',
  colWidth: 140
}, {
  key: 'saves',
  colWidth: 140
}, {
  key: 'views',
  colWidth: 140
}, {
  key: 'release_date',
  colWidth: 140
}];
/* eslint-disable-next-line import/no-default-export */

export default function Colgroup(_ref) {
  var isSmallScreen = _ref.isSmallScreen,
      isMediumScreen = _ref.isMediumScreen,
      showCanvasColumn = _ref.showCanvasColumn;

  if (isSmallScreen) {
    return /*#__PURE__*/_jsx(TableColgroup, {
      cols: smallScreenCols
    });
  }

  if (isMediumScreen) {
    return /*#__PURE__*/_jsx(TableColgroup, {
      cols: showCanvasColumn ? mediumScreenColsWithViews : mediumScreenCols
    });
  }

  return /*#__PURE__*/_jsx(TableColgroup, {
    cols: showCanvasColumn ? desktopColsWithViews : desktopCols
  });
}