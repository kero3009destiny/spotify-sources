import React, { useState } from 'react';
import { arc, pie } from 'd3-shape';
import throttle from 'lodash/throttle';
import { OverlayTrigger, Popover, Tooltip } from '@spotify-internal/encore-web-v3';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useT } from '@mrkt/features/i18n';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { StyledMobileTooltipWrapper, StyledDesktopTooltipWrapper, StyledOverlay, StyledTooltipContent, StyledTooltipContentList, StyledTooltipContentListItem, StyledTooltipValue, StyledRadialChartWrapper, StyledRadialChart, StyledLegendWrapper, StyledLegend, StyledLegendItem, StyledLegendValue } from './styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var sendEventThrottled = throttle(sendEvent, 250);
var ORIGINAL_WIDTH = 300;
var ORIGINAL_HEIGHT = ORIGINAL_WIDTH;
var MARGIN = {
  left: 250,
  right: 250
};
var MIN_WIDTH = 270;
export function RadialChart(props) {
  var _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      currentArtist = props.currentArtist,
      isViewportXS = props.isViewportXS,
      qaId = props.qaId,
      _props$width = props.width,
      propWidth = _props$width === void 0 ? ORIGINAL_WIDTH : _props$width;

  var _useState = useState(false),
      showMobileTooltip = _useState[0],
      setShowMobileTooltip = _useState[1];

  var _useState2 = useState(false),
      showDesktopTooltip = _useState2[0],
      setShowDesktopTooltip = _useState2[1];

  var _useState3 = useState(),
      tooltipContent = _useState3[0],
      setTooltipContent = _useState3[1];

  var _useState4 = useState({
    x: 0,
    y: 0
  }),
      tooltipPosition = _useState4[0],
      setTooltipPosition = _useState4[1];

  var t = useT();
  var rtl = useRtl(); // create helpers

  var pieInstance = pie();
  pieInstance.value(function (d) {
    return d.value;
  }).sort(function (a, b) {
    return a.message.localeCompare(b.message);
  });
  var pieLayout = pieInstance;
  var width = Math.min(propWidth - MARGIN.left - MARGIN.right, ORIGINAL_WIDTH);
  width = Math.max(width, MIN_WIDTH);
  var height = ORIGINAL_HEIGHT / ORIGINAL_WIDTH * width;
  var outerRadius = width / 2;
  var innerRadius = width / 2.25;
  var arcInstance = arc().innerRadius(innerRadius).outerRadius(outerRadius);
  var pieData = pieLayout(data.filter(function (d) {
    return d.value > 0;
  }));

  var updateDesktopTooltip = function updateDesktopTooltip(e, d) {
    setTooltipContent({
      text: d.message,
      value: d.value_formatted,
      color: d.color_hex
    });
    setTooltipPosition({
      x: e.clientX,
      y: e.clientY
    });
    setShowDesktopTooltip(true);
  };

  var renderMobileTooltip = function renderMobileTooltip() {
    return /*#__PURE__*/_jsx(StyledMobileTooltipWrapper, {
      "aria-hidden": "true",
      "data-testid": "mobile-tooltip",
      children: /*#__PURE__*/_jsx(Popover, {
        onClose: function onClose() {
          return setShowMobileTooltip(false);
        },
        popoverTitle: t('CHART_RADIAL_e8a42a', 'Gender', 'Header for a modal that lists the possible gender types users can identify with on our app: Female, Male, Non-binary, or Not specified.'),
        children: /*#__PURE__*/_jsx(StyledTooltipContentList, {
          children: data.map(function (d) {
            return /*#__PURE__*/_jsxs(StyledTooltipContentListItem, {
              discColor: d.color_hex,
              children: [/*#__PURE__*/_jsx("span", {
                children: d.message
              }), /*#__PURE__*/_jsx(StyledTooltipValue, {
                children: d.value_formatted
              })]
            }, d.message);
          })
        })
      })
    });
  };

  var renderDesktopTooltip = function renderDesktopTooltip() {
    return /*#__PURE__*/_jsx(StyledDesktopTooltipWrapper, {
      "aria-hidden": "true",
      "data-testid": "desktop-tooltip",
      isRtl: rtl,
      tooltipX: tooltipPosition.x,
      tooltipY: tooltipPosition.y,
      children: /*#__PURE__*/_jsx(OverlayTrigger, {
        placement: OverlayTrigger.top,
        overlay: /*#__PURE__*/_jsx(StyledOverlay, {
          children: tooltipContent && /*#__PURE__*/_jsx(Tooltip, {
            children: /*#__PURE__*/_jsxs(StyledTooltipContent, {
              discColor: tooltipContent.color,
              children: [tooltipContent.text, /*#__PURE__*/_jsx(StyledTooltipValue, {
                children: tooltipContent.value
              })]
            })
          })
        })
      })
    });
  };

  return /*#__PURE__*/_jsxs(StyledRadialChartWrapper, {
    "data-testid": qaId,
    onClick: function onClick() {
      return isViewportXS && !showMobileTooltip ? setShowMobileTooltip(true) : null;
    },
    role: isViewportXS ? 'button' : undefined,
    tabIndex: 0,
    children: [/*#__PURE__*/_jsx(StyledLegendWrapper, {
      isRtl: rtl,
      children: /*#__PURE__*/_jsx(StyledLegend, {
        "data-testid": "legend",
        children: data.map(function (d) {
          return /*#__PURE__*/_jsxs(StyledLegendItem, {
            "aria-label": "".concat(d.message, " ").concat(d.value, "% ").concat(d.value_formatted),
            discColor: d.color_hex,
            children: [/*#__PURE__*/_jsx(StyledLegendValue, {
              "aria-hidden": "true",
              children: d.percentage_formatted
            }), ' ', /*#__PURE__*/_jsx("span", {
              "aria-hidden": "true",
              children: d.message
            })]
          }, d.message);
        })
      })
    }), isViewportXS && showMobileTooltip && renderMobileTooltip(), !isViewportXS && showDesktopTooltip && renderDesktopTooltip(), /*#__PURE__*/_jsx(StyledRadialChart, {
      "aria-hidden": "true",
      width: width,
      height: height,
      onMouseEnter: function onMouseEnter() {
        sendEventThrottled({
          eventCategory: 'audience-gender',
          eventAction: 'mouseEnter',
          eventLabel: currentArtist
        });
      },
      children: /*#__PURE__*/_jsx("g", {
        "data-name": "arc",
        transform: "translate(".concat(outerRadius, ", ").concat(outerRadius, ")"),
        children: pieData.map(function (d, i) {
          return /*#__PURE__*/_jsx("g", {
            children: /*#__PURE__*/_jsx("path", {
              "data-testid": "arc-segment",
              d: arcInstance(d, i) || undefined,
              fill: d.data.color_hex,
              onMouseMove: function onMouseMove(e) {
                return !isViewportXS ? updateDesktopTooltip(e, d.data) : null;
              },
              onMouseLeave: function onMouseLeave() {
                return !isViewportXS ? setShowDesktopTooltip(false) : null;
              }
            })
          }, d.data.message);
        })
      })
    })]
  });
}