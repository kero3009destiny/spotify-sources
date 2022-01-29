// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { IconDownloadAlt, ButtonIcon, Tooltip, spacer20 } from '@spotify-internal/encore-web-v3';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";
var Wrapper = styled.div.withConfig({
  displayName: "StatsCSVDownloadButton__Wrapper",
  componentId: "sc-1e1w8tn-0"
})(["display:inline-flex;margin-right:", ";"], spacer20);
var StyledButtonIcon = styled(ButtonIcon).withConfig({
  displayName: "StatsCSVDownloadButton__StyledButtonIcon",
  componentId: "sc-1e1w8tn-1"
})(["&:focus{outline:none;}"]);
export var StatsCSVDownloadButton = function StatsCSVDownloadButton(_ref) {
  var tooltipText = _ref.tooltipText,
      downloadURL = _ref.downloadURL,
      _ref$onDownloadClick = _ref.onDownloadClick,
      onDownloadClick = _ref$onDownloadClick === void 0 ? function () {} : _ref$onDownloadClick;
  var viewport = useViewport();
  var xsViewport = viewport === Viewport.XS;
  return /*#__PURE__*/_jsx(Wrapper, {
    children: /*#__PURE__*/_jsx(TooltipTrigger, {
      placement: xsViewport ? 'topRight' : 'top',
      tooltipId: "csv-tooltip".concat(downloadURL),
      tooltip: /*#__PURE__*/_jsx(Tooltip, {
        children: tooltipText
      }),
      children: /*#__PURE__*/_jsx(StyledButtonIcon, {
        component: "a",
        "data-testid": "csv-download",
        "aria-labelledby": "csv-tooltip",
        target: "_self",
        onClick: function onClick() {
          return onDownloadClick();
        },
        href: downloadURL,
        children: /*#__PURE__*/_jsx(IconDownloadAlt, {
          "aria-hidden": "true",
          "data-testid": "CSVIconDownload"
        })
      })
    })
  });
};