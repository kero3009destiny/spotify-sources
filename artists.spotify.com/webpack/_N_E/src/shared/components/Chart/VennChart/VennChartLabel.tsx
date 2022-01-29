import _classCallCheck from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization

/**
 * HEADS UP!
 * This chart is currently deprecated in S4A.
 * For more info, view the README in this repo.
 */
import React from 'react';
import { Type } from '@spotify-internal/encore-web-v3';
import { applyMetricSuffix } from '../../../lib/numberHelpers';
import styles from './VennChart.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var BLOCK_NAME = 'venn_chart';
export var VennChartLabel = /*#__PURE__*/function (_React$Component) {
  _inherits(VennChartLabel, _React$Component);

  var _super = _createSuper(VennChartLabel);

  function VennChartLabel() {
    _classCallCheck(this, VennChartLabel);

    return _super.apply(this, arguments);
  }

  _createClass(VennChartLabel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          direction = _this$props.direction,
          message = _this$props.message;
      return /*#__PURE__*/_jsx("div", {
        className: styles["".concat(BLOCK_NAME, "-label")],
        children: /*#__PURE__*/_jsxs("div", {
          className: styles["".concat(BLOCK_NAME, "-label-container--").concat(direction)],
          children: [/*#__PURE__*/_jsx(Type.h3, {
            variant: "heading3",
            style: {
              paddingBottom: '0'
            },
            children: applyMetricSuffix(data)
          }), /*#__PURE__*/_jsx("p", {
            className: "u-flush-top",
            children: /*#__PURE__*/_jsx("span", {
              children: message.defaultMessage
            })
          })]
        })
      });
    }
  }]);

  return VennChartLabel;
}(React.Component);

_defineProperty(VennChartLabel, "defaultProps", {
  data: 0
});