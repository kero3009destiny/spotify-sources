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

import styled, { css } from 'styled-components';
import classNames from 'classnames'; // d3-transition adds apis to d3-selection

import 'd3-transition';
import { drag as d3Drag } from 'd3-drag';
import { select } from 'd3-selection';
import { geoContains, geoIdentity, geoPath, geoTransform } from 'd3-geo';
import { interpolate } from 'd3-interpolate';
import { max, min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { geoMiller, geoProject } from 'd3-geo-projection';
import isEqual from 'lodash/isEqual';
import throttle from 'lodash/throttle';
import React, { Component } from 'react';
import { OverlayTrigger, Tooltip, Type, IconPlusAlt, IconMinusAlt, gray20, gray60, gray75, gray80, gray95, storm } from '@spotify-internal/encore-web-v3';
import { dataDarkBlue } from '@mrkt/features/creator-color-tokens';
import { useT } from '@mrkt/features/i18n';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { feature, mesh } from 'topojson-client';
import { topology } from 'topojson-server';
import { presimplify } from 'topojson-simplify';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { animationDuration } from '../constants';
import { isTouchDevice } from '../../../lib/isTouchDevice';
import hatch6 from './6px_invert.png';
import styles from './MapChart.module.scss';
import { MapChartLegend } from './MapChartLegend';
import { getCountries50m } from './MapLoader';
import { excludeTopNPercent } from './excludeTopNPercent';
import { StyledButtonIcon, ZoomControls } from './styled';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var sendEventThrottled = throttle(sendEvent, 250);
var ORIGINAL_WIDTH = 960;
var ORIGINAL_HEIGHT = 500;
var ZOOM_FACTOR = 1.6;
var HEIGHT_TRANSLATE_FACTOR = 1.8;
var SCALE_EXTENT = [1, 12];
var PERCENT = 0.01;
var BLOCK_NAME = 'map_chart';
export var CountryStats;

(function (CountryStats) {
  CountryStats["LISTENERS"] = "listeners";
  CountryStats["STREAMS"] = "streams";
})(CountryStats || (CountryStats = {}));

var StyledTooltipWrapper = styled.div.withConfig({
  displayName: "MapChart__StyledTooltipWrapper",
  componentId: "suoj3x-0"
})(["", ";bottom:", "px;pointer-events:none;position:fixed;top:", "px;"], function (props) {
  return props.isRtl ? css(["right:calc(25% + ", "px);"], props.horizontalPos) : css(["left:", "px;"], props.horizontalPos);
}, function (props) {
  return props.top;
}, function (props) {
  return props.top;
});
export var MapChartClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(MapChartClassComponent, _Component);

  var _super = _createSuper(MapChartClassComponent);

  function MapChartClassComponent(props) {
    var _this;

    _classCallCheck(this, MapChartClassComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "canvas", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "canvasContext", void 0);

    _defineProperty(_assertThisInitialized(_this), "isTouch", void 0);

    _defineProperty(_assertThisInitialized(_this), "simplify", void 0);

    _defineProperty(_assertThisInitialized(_this), "mapTransform", void 0);

    _defineProperty(_assertThisInitialized(_this), "colorScale", void 0);

    _defineProperty(_assertThisInitialized(_this), "drag", void 0);

    _defineProperty(_assertThisInitialized(_this), "pattern", void 0);

    _defineProperty(_assertThisInitialized(_this), "projection", void 0);

    _defineProperty(_assertThisInitialized(_this), "features", void 0);

    _defineProperty(_assertThisInitialized(_this), "originalfeatures", void 0);

    _defineProperty(_assertThisInitialized(_this), "borders", void 0);

    _defineProperty(_assertThisInitialized(_this), "path", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      k: 1,
      isZooming: false,
      tooltipPos: undefined
    });

    _defineProperty(_assertThisInitialized(_this), "onDrag", function (_ref) {
      var dx = _ref.dx,
          dy = _ref.dy;
      var k = _this.state.k;

      var _assertThisInitialize = _assertThisInitialized(_this),
          mapTransform = _assertThisInitialize.mapTransform,
          adjustProjections = _assertThisInitialize.adjustProjections;

      var translate = mapTransform.translate();
      var clip = mapTransform.clipExtent();
      var scale = mapTransform.scale();
      var cX = translate[0] + dx;
      var cY = translate[1] + dy;

      var _this$findPosBounds = _this.findPosBounds([cX, cY], k),
          x = _this$findPosBounds.x,
          y = _this$findPosBounds.y;

      adjustProjections({
        translate: [x, y],
        clip: clip,
        scale: scale
      });

      _this.setState({
        tooltipPos: undefined
      });

      sendEventThrottled({
        eventCategory: 'MapChartV2',
        eventAction: 'drag'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onZoomButton", function (e, buttonType) {
      var _this$props = _this.props,
          width = _this$props.width,
          height = _this$props.height;
      var _this$state = _this.state,
          isZooming = _this$state.isZooming,
          k = _this$state.k;
      e.preventDefault(); // disable event while in a zooming transition

      /* istanbul ignore if */

      if (isZooming || !_this.features) {
        return;
      }

      var translate = _this.mapTransform.translate();

      var scale = k;
      var extent = SCALE_EXTENT;
      var x = translate[0];
      var y = translate[1];
      var signedFactor = buttonType === 'zoom-in' ? ZOOM_FACTOR : 1 / ZOOM_FACTOR;
      var targetScale = scale * signedFactor;
      var center = [width / 2, height / 2];
      var scale0 = (width - 1) / 2 / Math.PI; // if we're already at an extent, done

      /* istanbul ignore if */

      if (targetScale > Math.max(extent[0], extent[1]) || targetScale < Math.min(extent[0], extent[1])) {
        return;
      } // if the signedFactor is too much, scale it down to reach the extent exactly


      var clampedTargetScale = Math.max(extent[0], Math.min(extent[1], targetScale));
      /* istanbul ignore if */

      if (clampedTargetScale !== targetScale) {
        targetScale = clampedTargetScale;
        signedFactor = targetScale / scale;
      } // // center each vector, stretch, then put back


      x = (x - center[0]) * signedFactor + center[0];
      y = (y - center[1]) * signedFactor + center[1];

      var pos = _this.findPosBounds([x, y], targetScale);

      _this.props.onZoomButtonTransition(new Promise(function (resolve) {
        // transition to the new view
        select(_this.canvas.current).transition('map-zoom').duration(_this.props.zoomDuration).tween('zoom', function () {
          var interpolateScale = interpolate(scale, targetScale);
          var interpolateX = interpolate(translate[0], pos.x);
          var interpolateY = interpolate(translate[1], pos.y);
          return function (t) {
            _this.adjustProjections({
              translate: [interpolateX(t), interpolateY(t)],
              clip: _this.mapTransform.clipExtent(),
              scale: interpolateScale(t) * scale0
            });

            _this.setState({
              k: interpolateScale(t),
              isZooming: true
            });
          };
        }).on('end', function () {
          _this.setState({
            isZooming: false
          });

          sendEventThrottled({
            eventCategory: 'MapChartV2',
            eventAction: 'zoom',
            eventLabel: "".concat(Math.round(targetScale * 100), "%")
          });
          resolve();
        });
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e) {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          setHighlightCountry = _this$props2.setHighlightCountry;

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          originalfeatures = _assertThisInitialize2.originalfeatures,
          projection = _assertThisInitialize2.projection;

      var point = _this.getOffsetPos(e, _this.canvas.current);

      var highlightCountry;

      if (!originalfeatures) {
        return;
      }

      originalfeatures.features.forEach(function (country) {
        if (highlightCountry || !Object.hasOwnProperty.call(data, country.properties.iso)) return;
        var coordinates = projection.invert(point);
        /* istanbul ignore if */

        if (geoContains(country, coordinates)) {
          highlightCountry = country.properties.iso;
        }
      });
      setHighlightCountry(highlightCountry);

      _this.setState({
        tooltipPos: {
          x: e.clientX,
          y: e.clientY
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMapLoadCb", function (countries) {
      var _this$props3 = _this.props,
          width = _this$props3.width,
          height = _this$props3.height;

      var _assertThisInitialize3 = _assertThisInitialized(_this),
          canvas = _assertThisInitialize3.canvas;

      _this.originalfeatures = feature(countries, countries.objects.countries);
      _this.features = feature(countries, countries.objects.countries);
      _this.projection = geoMiller().translate([0, 0]).scale(1);
      var geoJson = geoProject(_this.features, _this.projection);
      var topo = topology({
        countries: geoJson
      });
      var presimp = presimplify(topo);
      _this.features = feature(presimp, presimp.objects.countries);
      _this.borders = mesh(presimp, presimp.objects.countries, function (a, b) {
        return a !== b;
      });

      _this.adjustProjections({
        translate: [width / 2, height / HEIGHT_TRANSLATE_FACTOR],
        clip: [[0, 0], [width, height]],
        scale: (width - 1) / 2 / Math.PI
      });

      _this.path = geoPath().projection({
        stream:
        /* istanbul ignore next */
        function stream(s) {
          return _this.simplify.stream(_this.mapTransform.stream(s));
        }
      }).context(_this.canvasContext);
      select(canvas.current).call(_this.drag);

      _this.renderMap();
    });

    _defineProperty(_assertThisInitialized(_this), "getOffsetPos", function (e, node) {
      // implementation of d3.mouse => https://github.com/d3/d3-selection/blob/master/src/point.js
      var rect = node.getBoundingClientRect();
      return [e.clientX - rect.left - node.clientLeft, e.clientY - rect.top - node.clientTop];
    });

    _defineProperty(_assertThisInitialized(_this), "findPosBounds", function (translate, scale) {
      var _this$props4 = _this.props,
          width = _this$props4.width,
          height = _this$props4.height;
      var x = Math.min(0, Math.max(translate[0] - width / 2 * scale, width - width * scale)) + width / 2 * scale;
      var y = Math.min(0, Math.max(translate[1] - height / HEIGHT_TRANSLATE_FACTOR * scale, height - height * scale)) + height / HEIGHT_TRANSLATE_FACTOR * scale;
      return {
        x: x,
        y: y
      };
    });

    _defineProperty(_assertThisInitialized(_this), "adjustProjections", function (transform) {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
          mapTransform = _assertThisInitialize4.mapTransform,
          projection = _assertThisInitialize4.projection,
          features = _assertThisInitialize4.features;

      if (!features) {
        return;
      } // I opened an issue on d3-geo about projections not streaming
      // the way transforms stream. Until that is addressed, for dynamic
      // simplification I need to track both a transform and projection.
      // https://github.com/d3/d3-geo/issues/96


      mapTransform.translate(transform.translate).clipExtent(transform.clip).scale(transform.scale);
      projection.translate(transform.translate).clipExtent(transform.clip).scale(transform.scale);
    });

    _defineProperty(_assertThisInitialized(_this), "renderMap",
    /* istanbul ignore next */
    function () {
      var _this$props5 = _this.props,
          data = _this$props5.data,
          width = _this$props5.width,
          height = _this$props5.height,
          highlightCountry = _this$props5.highlightCountry;

      var _assertThisInitialize5 = _assertThisInitialized(_this),
          canvasContext = _assertThisInitialize5.canvasContext,
          path = _assertThisInitialize5.path,
          features = _assertThisInitialize5.features,
          borders = _assertThisInitialize5.borders,
          colorScale = _assertThisInitialize5.colorScale;

      if (!canvasContext) return;
      var canvasWidth = width;
      var canvasHeight = height;

      if (window.devicePixelRatio) {
        canvasWidth *= window.devicePixelRatio;
        canvasHeight *= window.devicePixelRatio;
      }

      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
      canvasContext.save();

      if (window.devicePixelRatio) {
        canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);
      } // draw countries


      var hoveredCountry;
      features.features.forEach(function (country) {
        var fill;

        if (data[country.properties.iso] && data[country.properties.iso].count > 0) {
          fill = colorScale(data[country.properties.iso].count);
        } else if (data[country.properties.iso] && data[country.properties.iso].count === 0 || Object.keys(data).length === 0) {
          fill = gray75;
        } else {
          fill = _this.pattern;
        }

        canvasContext.beginPath();
        path(country);
        canvasContext.fillStyle = fill;
        canvasContext.fill();

        if (highlightCountry === country.properties.iso) {
          hoveredCountry = {
            feature: country,
            fill: fill
          };
        }
      }); // draw borders

      canvasContext.beginPath();
      canvasContext.lineWidth = 1;
      path(borders);
      canvasContext.strokeStyle = '#FFF';
      canvasContext.stroke();

      if (hoveredCountry) {
        canvasContext.beginPath();
        path(hoveredCountry.feature);
        canvasContext.lineWidth = 4;
        canvasContext.strokeStyle = gray95;
        canvasContext.stroke();
        canvasContext.beginPath();
        path(hoveredCountry.feature);
        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = gray20;
        canvasContext.stroke();
      }

      canvasContext.restore();
    });

    var _width = props.width,
        _height = props.height,
        _data = props.data;
    var counts = Object.values(_data).map(function (val) {
      return val.count;
    });
    _this.isTouch = isTouchDevice(); // eslint-disable-next-line consistent-this

    var rThis = _assertThisInitialized(_this);

    _this.simplify = geoTransform({
      point:
      /* istanbul ignore next */
      function point(x, y, z) {
        var mapTransform = rThis.mapTransform;
        var scale = mapTransform.scale();
        var area = 1 / scale / scale;
        if (z && z >= area) this.stream.point(x, y);
      }
    });

    var _scale = (_width - 1) / 2 / Math.PI;

    _this.mapTransform = geoIdentity().translate([_width / 2, _height / HEIGHT_TRANSLATE_FACTOR]).clipExtent([[0, 0], [_width, _height]]).scale(_scale);
    _this.colorScale = scaleLinear().domain([1, max(excludeTopNPercent(counts, PERCENT))]).range([storm, dataDarkBlue]).clamp(true);
    _this.drag = d3Drag().filter(
    /* istanbul ignore next */
    function () {
      return !_this.isTouch;
    }).on('drag', _this.onDrag);
    return _this;
  }

  _createClass(MapChartClassComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var canvas = this.canvas,
          onMapLoadCb = this.onMapLoadCb;
      this.canvasContext = canvas.current && canvas.current.getContext('2d');
      /* istanbul ignore if */

      if (this.canvasContext) {
        this.canvasContext.lineJoin = 'round';
        this.canvasContext.lineCap = 'round';
      }

      var img = new Image();
      img.src = hatch6;
      this.pattern = 'rgb(231, 231, 231)';

      img.onload =
      /* istanbul ignore next */
      function () {
        _this2.pattern = _this2.canvasContext && _this2.canvasContext.createPattern(img, 'repeat');
      };

      getCountries50m().then(onMapLoadCb);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props6 = this.props,
          width = _this$props6.width,
          height = _this$props6.height;
      var k = this.state.k;
      var colorScale = this.colorScale;

      if (!isEqual(this.props.data, prevProps.data)) {
        var counts = Object.values(this.props.data).map(function (val) {
          return val.count;
        });
        colorScale.domain([1, max(excludeTopNPercent(counts, PERCENT))]);
      }

      if (width !== prevProps.width) {
        var scale0 = (width - 1) / 2 / Math.PI;
        var translate = this.mapTransform.translate();
        this.adjustProjections({
          translate: [width / 2 + (translate[0] - prevProps.width / 2), height / HEIGHT_TRANSLATE_FACTOR + (translate[1] - prevProps.height / HEIGHT_TRANSLATE_FACTOR)],
          clip: [[0, 0], [this.props.width, this.props.height]],
          scale: scale0 * k
        });
      }

      if (this.features) {
        this.renderMap();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      select(this.canvas.current).interrupt('map-zoom');
      sendEventThrottled.cancel();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props7 = this.props,
          data = _this$props7.data,
          width = _this$props7.width,
          height = _this$props7.height,
          legendHeight = _this$props7.legendHeight,
          highlightCountry = _this$props7.highlightCountry,
          setHighlightCountry = _this$props7.setHighlightCountry,
          statKey = _this$props7.statKey,
          rtl = _this$props7.rtl,
          t = _this$props7.t;
      var _this$state2 = this.state,
          k = _this$state2.k,
          isZooming = _this$state2.isZooming,
          tooltipPos = _this$state2.tooltipPos;
      var colorScale = this.colorScale,
          onZoomButton = this.onZoomButton,
          isTouch = this.isTouch;
      var canvasWidth = width;
      var canvasHeight = height;
      /* istanbul ignore if */

      if (window.devicePixelRatio) {
        canvasWidth *= window.devicePixelRatio;
        canvasHeight *= window.devicePixelRatio;
      }

      var isAtMinZoom = k * (1 / ZOOM_FACTOR) < min(SCALE_EXTENT);
      var isAtMaxZoom = k * ZOOM_FACTOR >= max(SCALE_EXTENT);
      var countryRank = null;
      var countryStat = null;

      if (data && highlightCountry && highlightCountry !== undefined) {
        if (data[highlightCountry].count > 0) {
          countryRank = t('MAP_CHART_7cf311', '#{rank} {countryName}', 'Text that appears in a tooltip when a user hovers over a country within a map chart. It shows the top country ranking of listeners for a given artist. Example Usage: #1 Brazil', {
            rank: data[highlightCountry].rank,
            countryName: data[highlightCountry].name
          });
        }

        if (data[highlightCountry].count === 0) {
          countryRank = t('MAP_CHART_f2e688', '{countryName}', 'Text that appears in a tooltip when a user hovers over a country within a map chart. It shows the top country of listeners for a given artist. Example Usage: Brazil', {
            countryName: data[highlightCountry].name
          });
        }

        if (statKey === CountryStats.LISTENERS) {
          countryStat = t('MAP_CHART_5c52f8', "{count, plural,\n            one {1 listener}\n            other {{count} listeners}\n          }", 'Text that appears in a tooltip when a user hovers over a country within a map chart. It shows the amount of listeners for a given artist. Example Usage: 100 listeners', {
            count: data[highlightCountry].formatted_count
          });
        }

        if (statKey === CountryStats.STREAMS) {
          countryStat = t('MAP_CHART_e9244f', "{count, plural,\n            one {1 stream}\n            other {{count} streams}\n          }", 'Text that appears in a tooltip when a user hovers over a country within a map chart. It shows the amount of streams for a given artist. Example Usage: 100 streams', {
            count: data[highlightCountry].formatted_count
          });
        }
      }

      return /*#__PURE__*/_jsxs("div", {
        className: classNames(styles.chart, styles["".concat(BLOCK_NAME)]),
        style: {
          width: width
        },
        "aria-hidden": "true",
        children: [!isTouch && /*#__PURE__*/_jsxs(ZoomControls, {
          children: [/*#__PURE__*/_jsx(StyledButtonIcon, {
            disabled: isAtMinZoom && !isZooming,
            "data-name": "zoom-out-button",
            onClick: function onClick(e) {
              if (!isAtMinZoom) {
                onZoomButton(e, 'zoom-out');
              }
            },
            tabIndex: -1,
            children: /*#__PURE__*/_jsx(IconMinusAlt, {
              color: isAtMinZoom && !isZooming ? gray80 : gray60
            })
          }), /*#__PURE__*/_jsx(StyledButtonIcon, {
            disabled: isAtMaxZoom && !isZooming,
            "data-name": "zoom-in-button",
            onClick: function onClick(e) {
              if (!isAtMaxZoom) {
                onZoomButton(e, 'zoom-in');
              }
            },
            tabIndex: -1,
            children: /*#__PURE__*/_jsx(IconPlusAlt, {
              color: isAtMaxZoom && !isZooming ? gray80 : gray60
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("canvas", {
            ref: this.canvas,
            width: canvasWidth,
            height: canvasHeight,
            style: {
              width: width,
              height: height,
              display: 'block'
            },
            onMouseMove: this.onMouseMove,
            onMouseLeave: function onMouseLeave() {
              setHighlightCountry();

              _this3.setState({
                tooltipPos: undefined
              });
            }
          }), highlightCountry && tooltipPos && /*#__PURE__*/_jsx(StyledTooltipWrapper, {
            isRtl: rtl,
            horizontalPos: tooltipPos.x,
            top: tooltipPos.y,
            children: /*#__PURE__*/_jsx(OverlayTrigger, {
              placement: OverlayTrigger.top,
              overlay: /*#__PURE__*/_jsx("span", {
                style: {
                  position: 'relative',
                  top: '-12px'
                },
                children: /*#__PURE__*/_jsx(Tooltip, {
                  children: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx(Type, {
                      as: "h1",
                      variant: Type.cta3,
                      color: "gray60",
                      style: {
                        paddingBottom: '0'
                      },
                      children: countryRank
                    }), /*#__PURE__*/_jsx("span", {
                      children: countryStat
                    })]
                  })
                })
              })
            })
          }), /*#__PURE__*/_jsx(MapChartLegend, {
            scale: colorScale,
            height: legendHeight
          })]
        })]
      });
    }
  }]);

  return MapChartClassComponent;
}(Component);

_defineProperty(MapChartClassComponent, "defaultProps", {
  width: ORIGINAL_WIDTH,
  height: ORIGINAL_HEIGHT,
  zoomDuration: animationDuration,
  // set to 0 in unit test
  onZoomButtonTransition: function onZoomButtonTransition() {},
  onMapLoad: function onMapLoad() {},
  setHighlightCountry: function setHighlightCountry() {}
});

export var MapChart = function MapChart(props) {
  var t = useT();
  var rtl = useRtl();
  return /*#__PURE__*/_jsx(MapChartClassComponent, _objectSpread(_objectSpread({}, props), {}, {
    rtl: rtl,
    t: t
  }));
};