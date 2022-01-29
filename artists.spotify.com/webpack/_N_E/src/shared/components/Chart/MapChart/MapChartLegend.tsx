import React from 'react';
import styled from 'styled-components';
import { storm } from '@spotify-internal/encore-web-v3';
import { dataDarkBlue } from '@mrkt/features/creator-color-tokens';
import { useNumberFormatter, useT } from '@mrkt/features/i18n';
import styles from './MapChartLegend.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var BLOCK_NAME = 'map_chart_legend';
var legendWidth = '200px';
var legendHeight = '8px';
var Gradient = styled.div.withConfig({
  displayName: "MapChartLegend__Gradient",
  componentId: "sc-4bk5vy-0"
})(["background:linear-gradient(to right,", ",", ");height:", ";margin-bottom:5px;width:", ";"], storm, dataDarkBlue, legendHeight, legendWidth);
export function MapChartLegend(props) {
  var scale = props.scale,
      height = props.height;
  var t = useT();
  var numberFormatter = useNumberFormatter({
    notation: 'compact'
  });

  var _scale$domain = scale.domain(),
      domainMin = _scale$domain[0],
      domainMax = _scale$domain[1];

  var ticks = [domainMin, domainMax * (1 / 3), domainMax * (2 / 3), domainMax];
  var difference = domainMax - domainMin;

  if (difference === 2) {
    // less than four unique ticks
    ticks = [domainMin, domainMax / 2, domainMax];
  } else if (difference === 1) {
    // less than three unique ticks
    ticks = [domainMin, domainMax];
  } else if (difference === 0) {
    // less than two unique ticks
    ticks = [domainMin];
  } else if (domainMax == null || isNaN(domainMax)) {
    ticks = [];
  }

  return /*#__PURE__*/_jsxs("div", {
    className: styles[BLOCK_NAME],
    style: {
      height: height
    },
    children: [/*#__PURE__*/_jsxs("div", {
      className: styles["".concat(BLOCK_NAME, "-gradient-container")],
      children: [/*#__PURE__*/_jsx(Gradient, {}), /*#__PURE__*/_jsx("div", {
        className: styles["".concat(BLOCK_NAME, "-ticks")],
        children: ticks.map(function (d, i) {
          var tickText;
          var tickIndex = i;

          if (d < 1 && d !== 0) {
            tickText = '';
          } else if (d < 100) {
            tickText = Math.round(d);
          } else if (d < 999500) {
            tickText = numberFormatter.format(Math.round(d / 1000) * 1000);
          } else {
            tickText = numberFormatter.format(Math.round(d / 1000000) * 1000000);
          }

          return /*#__PURE__*/_jsx("div", {
            className: styles["".concat(BLOCK_NAME, "-tick")],
            style: {
              left: "".concat(100 * (tickIndex / (ticks.length - 0.75)), "%")
            },
            children: tickIndex === ticks.length - 1 ? "".concat(tickText, "+") : tickText
          }, "".concat(d, "-").concat(tickIndex));
        })
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: styles["".concat(BLOCK_NAME, "-swatch-container")],
      children: [/*#__PURE__*/_jsx("div", {
        className: styles["".concat(BLOCK_NAME, "-swatch")]
      }), /*#__PURE__*/_jsx("div", {
        className: styles["".concat(BLOCK_NAME, "-label-container")],
        children: /*#__PURE__*/_jsx("div", {
          className: styles["".concat(BLOCK_NAME, "-label")],
          children: t('CHART_MAP_6639ee', 'Spotify N/A', 'The "N/A" text stands for "Not Available" and is the label for a map legend. It has a corresponding color swatch that represents countries in which Spotify is not available.')
        })
      })]
    })]
  });
}