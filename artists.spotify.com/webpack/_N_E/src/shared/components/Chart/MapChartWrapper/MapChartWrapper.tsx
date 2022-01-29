import _classCallCheck from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component, Fragment } from 'react';
import { VisuallyHidden } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { MapChart } from '../MapChart';
import { TopCountriesTable } from '../TopCountriesTable';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ORIGINAL_WIDTH = 960;
var ORIGINAL_HEIGHT = 400;
var LEGEND_HEIGHT = 40;
var MARGIN_RIGHT = 50;
export var MapChartWrapperClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(MapChartWrapperClassComponent, _Component);

  var _super = _createSuper(MapChartWrapperClassComponent);

  function MapChartWrapperClassComponent() {
    var _this;

    _classCallCheck(this, MapChartWrapperClassComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      highlightCountry: undefined
    });

    _defineProperty(_assertThisInitialized(_this), "setHighlightCountry", function (country) {
      return _this.setState({
        highlightCountry: country
      });
    });

    return _this;
  }

  _createClass(MapChartWrapperClassComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tableData = _this$props.tableData,
          mapData = _this$props.mapData,
          width = _this$props.width,
          isViewportXS = _this$props.isViewportXS,
          isViewportSM = _this$props.isViewportSM,
          qaId = _this$props.qaId,
          statKey = _this$props.statKey,
          stat = _this$props.stat,
          t = _this$props.t;
      var highlightCountry = this.state.highlightCountry;
      var height = ORIGINAL_HEIGHT / ORIGINAL_WIDTH * width;
      var tableWidth = width / 3;
      var mapWidth = width * (2 / 3);
      return /*#__PURE__*/_jsxs("div", {
        "data-testid": qaId,
        children: [/*#__PURE__*/_jsx(TopCountriesTable, {
          data: tableData,
          height: isViewportSM ? 'auto' : height + 2 * LEGEND_HEIGHT,
          width: isViewportSM ? '100%' : tableWidth,
          setHighlightCountry: this.setHighlightCountry,
          isViewportXS: isViewportXS,
          isViewportSM: isViewportSM,
          stat: stat
        }), !isViewportXS && !isViewportSM && /*#__PURE__*/_jsxs(Fragment, {
          children: [/*#__PURE__*/_jsx(MapChart, {
            data: mapData,
            width: mapWidth - MARGIN_RIGHT,
            height: height,
            legendHeight: LEGEND_HEIGHT,
            setHighlightCountry: this.setHighlightCountry,
            highlightCountry: highlightCountry,
            statKey: statKey
          }), /*#__PURE__*/_jsx(VisuallyHidden, {
            children: t('CHART_MAP_WRAPPER_a65d3b', 'This is an interactive world map that is not supported on your screenreader. But you can find the same information in the Top Countries table.', '')
          })]
        })]
      });
    }
  }]);

  return MapChartWrapperClassComponent;
}(Component);
export var MapChartWrapper = function MapChartWrapper(props) {
  var t = useT();
  return /*#__PURE__*/_jsx(MapChartWrapperClassComponent, _objectSpread(_objectSpread({}, props), {}, {
    t: t
  }));
};