import _classCallCheck from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
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
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { metricMessages } from '../../../messages/metric';
import { DataTrendHdrDesktop } from '../DataTrendHdr/DataTrendHdrDesktop';
import styles from './VennChart.module.scss';
import { VennChartLabel } from './VennChartLabel';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
var LABEL_MARGIN = {
  top: 0,
  left: 175,
  bottom: 0,
  right: 175
};
var PADDING_SCALAR = 0.1;
var CIRCLE_LEFT = 'circle-left';
var CIRCLE_RIGHT = 'circle-right';
var BLOCK_NAME = 'venn_chart';
var APPROXIMATE_ASPECT_RATIO = 0.86; // this is an approximate as height and width are later updated based on data (fans/listeners/overlap)

var ORIGINAL_WIDTH = 300;
var ORIGINAL_HEIGHT = ORIGINAL_WIDTH * APPROXIMATE_ASPECT_RATIO;
var MAX_WIDTH = 1000;
var MIN_WIDTH = 265;
var height = ORIGINAL_HEIGHT;
export var VennChart = /*#__PURE__*/function (_React$Component) {
  _inherits(VennChart, _React$Component);

  var _super = _createSuper(VennChart);

  function VennChart() {
    var _this;

    _classCallCheck(this, VennChart);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "getDataHdrProps", function () {
      var data = _this.props.data; // Assemble data trend header props

      return {
        dataNumber: "".concat(data.overlapPercentage, "%"),
        dataLabel: function dataLabel(value) {
          return /*#__PURE__*/_jsxs(Fragment, {
            children: [value, " of your fans listened in the last 28 days."]
          });
        },
        delta: {
          trend: data.overlapTrend,
          deltaNumber: "".concat(data.overlapDelta, "%"),
          deltaLabel: function deltaLabel(value) {
            return /*#__PURE__*/_jsxs(Fragment, {
              children: [value, " yesterday"]
            });
          }
        },
        deltaLabelMobile: function deltaLabelMobile(value) {
          return /*#__PURE__*/_jsxs(Fragment, {
            children: [value, " Fan engagement"]
          });
        }
      };
    });

    return _this;
  }

  _createClass(VennChart, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          propWidth = _this$props.width,
          extraSmall = _this$props.extraSmall;
      var width = Math.min(propWidth * (1 - 2 * PADDING_SCALAR), MAX_WIDTH);
      width = Math.max(width - LABEL_MARGIN.left - LABEL_MARGIN.right, MIN_WIDTH);
      var url = "".concat(window.location.pathname).concat(window.location.search);
      var LEFT_CIRCLE_ID = "".concat(BLOCK_NAME, "-").concat(CIRCLE_LEFT);
      var RIGHT_CIRCLE_ID = "".concat(BLOCK_NAME, "-").concat(CIRCLE_RIGHT); // Calculate radiuses of circles (relative)

      var r1 = Math.sqrt(data.listeners);
      var r2 = Math.sqrt(data.fans);
      var rMax = Math.max(r1, r2);
      r1 = r1 / rMax / 2;
      r2 = r2 / rMax / 2;
      rMax = 0.5;
      var rMin = Math.min(r1, r2); // Calculate distance between centers of circles (relative)
      // WARNING: this is approximate, the function is built by three points (0, 0.5, 1)

      var distance = rMin * 2 * (1 - Math.pow(data.overlap, 3 / 4)) + (rMax - rMin); // Calculate combined width of two-circle shape (relative)

      var twoCircleWidth = r1 + distance + r2; // Update height to make it fit really nice

      height = data.listeners && data.fans ? width / twoCircleWidth * rMax * 2 : width * APPROXIMATE_ASPECT_RATIO; // Get normalized values (not relative, real ones)

      var y = height / 2;
      r1 *= height;
      r2 *= height;
      distance *= height;
      twoCircleWidth *= height; // Calculate positions of circles

      var x1 = (width - twoCircleWidth) / 2 + r1;
      var x2 = x1 + distance;
      return /*#__PURE__*/_jsxs("div", {
        className: classNames(styles.chart, 'u-flush-top', styles["".concat(BLOCK_NAME, "-container")]),
        children: [/*#__PURE__*/_jsx("div", {
          className: styles["".concat(BLOCK_NAME, "-subheader")],
          children: data && data.overlapPercentage && /*#__PURE__*/_jsx(DataTrendHdrDesktop, {
            data: this.getDataHdrProps()
          })
        }), !extraSmall && /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(VennChartLabel, {
            data: data.listeners,
            direction: "left",
            message: metricMessages.listeners28
          }), /*#__PURE__*/_jsx("svg", {
            width: width,
            height: height,
            className: styles[BLOCK_NAME],
            children: (data.listeners || data.fans) && /*#__PURE__*/_jsxs("g", {
              children: [/*#__PURE__*/_jsxs("defs", {
                children: [/*#__PURE__*/_jsx("clipPath", {
                  id: LEFT_CIRCLE_ID,
                  children: /*#__PURE__*/_jsx("circle", {
                    cx: x1,
                    cy: y,
                    r: r1
                  })
                }), /*#__PURE__*/_jsx("clipPath", {
                  id: RIGHT_CIRCLE_ID,
                  children: /*#__PURE__*/_jsx("circle", {
                    cx: x2,
                    cy: y,
                    r: r2
                  })
                })]
              }), /*#__PURE__*/_jsxs("g", {
                children: [/*#__PURE__*/_jsx("rect", {
                  className: styles["".concat(BLOCK_NAME, "-circle")],
                  clipPath: "url(".concat(url, "#").concat(LEFT_CIRCLE_ID, ")"),
                  width: width,
                  height: height
                }), /*#__PURE__*/_jsx("rect", {
                  className: styles["".concat(BLOCK_NAME, "-circle")],
                  clipPath: "url(".concat(url, "#").concat(RIGHT_CIRCLE_ID, ")"),
                  width: width,
                  height: height
                })]
              }), /*#__PURE__*/_jsx("g", {
                clipPath: "url(".concat(url, "#").concat(RIGHT_CIRCLE_ID, ")"),
                children: /*#__PURE__*/_jsx("rect", {
                  className: styles["".concat(BLOCK_NAME, "-circle-intersection")],
                  clipPath: "url(".concat(url, "#").concat(LEFT_CIRCLE_ID, ")"),
                  width: width,
                  height: height
                })
              })]
            })
          }), /*#__PURE__*/_jsx(VennChartLabel, {
            data: data.fans,
            direction: "right",
            message: metricMessages.fans
          })]
        })]
      });
    }
  }]);

  return VennChart;
}(React.Component);

_defineProperty(VennChart, "defaultProps", {
  width: ORIGINAL_WIDTH
});