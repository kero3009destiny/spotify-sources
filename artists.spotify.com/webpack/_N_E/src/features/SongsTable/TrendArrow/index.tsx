import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import { useT } from '@mrkt/features/i18n';
import classNames from 'classnames';
import React, { Component } from 'react';
import { IconChartDown, IconChartUp, OverlayTrigger, Tooltip, ButtonIcon } from '@spotify-internal/encore-web-v3';
import styles from './index.module.scss';
import { Screen } from '../../../shared/lib/useViewport';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { jsx as _jsx } from "react/jsx-runtime";
var SEVEN_DAY_TREND_THRESHOLD = 10;
var ONE_DAY_TREND_THRESHOLD = 15;

var TrendArrowComponent = /*#__PURE__*/function (_Component) {
  _inherits(TrendArrowComponent, _Component);

  var _super = _createSuper(TrendArrowComponent);

  function TrendArrowComponent() {
    _classCallCheck(this, TrendArrowComponent);

    return _super.apply(this, arguments);
  }

  _createClass(TrendArrowComponent, [{
    key: "render",
    value: function render() {
      var _classNames;

      // @ts-ignore
      var _this$props = this.props,
          timeframe = _this$props.timeframe,
          percentChange = _this$props.percentChange,
          viewport = _this$props.viewport,
          ariaLabel = _this$props.ariaLabel,
          t = _this$props.t;
      var isViewportLarge = viewport >= Screen.LG;

      if (percentChange === 0) {
        return null;
      }

      var threshold = timeframe === '1day' ? ONE_DAY_TREND_THRESHOLD : SEVEN_DAY_TREND_THRESHOLD;
      var isSignificant = Math.abs(percentChange) >= threshold;
      var isIncrease = percentChange > 0;
      var tooltipText;

      if (isSignificant && isIncrease) {
        tooltipText = t('SONGS_TABLE_d93e5b', 'Significant increase compared to its average.', '');
      } else if (isSignificant && !isIncrease) {
        tooltipText = t('SONGS_TABLE_9be353', 'Significant decrease compared to its average.', '');
      } else if (!isSignificant && isIncrease) {
        tooltipText = t('SONGS_TABLE_9a0ac9', 'Moderate increase compared to its average.', '');
      } else if (!isSignificant && !isIncrease) {
        tooltipText = t('SONGS_TABLE_566839', 'Moderate decrease compared to its average.', '');
      }

      var iconClassName = classNames((_classNames = {}, _defineProperty(_classNames, styles.moderate, !isSignificant), _defineProperty(_classNames, styles.significantUp, isSignificant && percentChange > 0), _defineProperty(_classNames, styles.significantDown, isSignificant && percentChange < 0), _classNames));
      var icon = isIncrease ? /*#__PURE__*/_jsx(IconChartUp, {
        iconSize: 16,
        className: iconClassName,
        "aria-hidden": "true"
      }) : /*#__PURE__*/_jsx(IconChartDown, {
        iconSize: 16,
        className: iconClassName,
        "aria-hidden": "true"
      });
      return /*#__PURE__*/_jsx("div", {
        className: styles.tooltip_wrapper,
        children: /*#__PURE__*/_jsx(TooltipTrigger, {
          tooltipId: "listenerDelta",
          placement: isViewportLarge ? OverlayTrigger.right : OverlayTrigger.left,
          tooltip: /*#__PURE__*/_jsx(Tooltip, {
            className: styles.tooltip,
            children: /*#__PURE__*/_jsx("span", {
              className: styles.tooltip_text,
              children: tooltipText
            })
          }),
          children: /*#__PURE__*/_jsx(ButtonIcon, {
            "aria-label": ariaLabel,
            children: icon
          })
        })
      });
    }
  }]);

  return TrendArrowComponent;
}(Component);

export var TrendArrow = function TrendArrow(props) {
  var t = useT();
  return /*#__PURE__*/_jsx(TrendArrowComponent, _objectSpread({
    t: t
  }, props));
};