import _toConsumableArray from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
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

// ignore-string-externalization
import { drag } from 'd3-drag';
import { select, pointer } from 'd3-selection';
import { forceCenter, forceLink, forceManyBody, forceSimulation } from 'd3-force';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var NetworkDiagram = /*#__PURE__*/function (_Component) {
  _inherits(NetworkDiagram, _Component);

  var _super = _createSuper(NetworkDiagram);

  function NetworkDiagram() {
    var _this;

    _classCallCheck(this, NetworkDiagram);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "canvas", void 0);

    _defineProperty(_assertThisInitialized(_this), "ctx", void 0);

    _defineProperty(_assertThisInitialized(_this), "dragHandler", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      selectedNode: null,
      nodesById: {},
      linksById: {},
      connectedNodes: [],
      connectedLinks: []
    });

    _defineProperty(_assertThisInitialized(_this), "onTick",
    /* istanbul ignore next */
    function () {
      var _this$props = _this.props,
          width = _this$props.width,
          height = _this$props.height,
          artistId = _this$props.artistId;
      var _this$state = _this.state,
          selectedNode = _this$state.selectedNode,
          connectedLinks = _this$state.connectedLinks,
          connectedNodes = _this$state.connectedNodes;

      var _assertThisInitialize = _assertThisInitialized(_this),
          ctx = _assertThisInitialize.ctx,
          drawLink = _assertThisInitialize.drawLink,
          drawNode = _assertThisInitialize.drawNode;

      var nodes = _this.simulation.nodes();

      var links = _this.simulation.force('link').links();

      var mainArtistNode = _this.simulation.nodes().find(function (d) {
        return d.uri === "spotify:artist:".concat(artistId);
      });

      if (!ctx) return;
      var canvasWidth = width;
      var canvasHeight = height;

      if (window.devicePixelRatio) {
        canvasWidth *= window.devicePixelRatio;
        canvasHeight *= window.devicePixelRatio;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.save();

      if (window.devicePixelRatio) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }

      ctx.beginPath();
      links.forEach(drawLink);
      ctx.strokeStyle = '#aaa';
      ctx.stroke();
      ctx.beginPath();
      nodes.forEach(drawNode);
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      if (mainArtistNode) {
        if (selectedNode && selectedNode.id !== mainArtistNode.id) {
          ctx.beginPath();
          connectedLinks.forEach(drawLink);
          ctx.strokeStyle = 'orange';
          ctx.stroke();
          ctx.beginPath();
          connectedNodes.forEach(drawNode);
          ctx.fillStyle = 'red';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(mainArtistNode.x + 10, mainArtistNode.y);
        ctx.arc(mainArtistNode.x, mainArtistNode.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      }

      ctx.restore();
    });

    _defineProperty(_assertThisInitialized(_this), "onDblClick",
    /* istanbul ignore next */
    function (evt) {
      var _pointer = pointer(evt, _this.canvas),
          x = _pointer[0],
          y = _pointer[1];

      var node = _this.simulation.find(x, y);

      if (!node || node.uri === "spotify:artist:".concat(_this.props.artistId)) return;
      var artistId = node.uri.split(':')[2];

      _this.props.loadData(artistId);
    });

    _defineProperty(_assertThisInitialized(_this), "drawLink",
    /* istanbul ignore next */
    function (d) {
      _this.ctx.moveTo(d.source.x, d.source.y);

      _this.ctx.lineTo(d.target.x, d.target.y);
    });

    _defineProperty(_assertThisInitialized(_this), "drawNode",
    /* istanbul ignore next */
    function (d) {
      _this.ctx.moveTo(d.x + 3, d.y);

      _this.ctx.arc(d.x, d.y, 3, 0, 2 * Math.PI);
    });

    _defineProperty(_assertThisInitialized(_this), "simulation", forceSimulation().force('link', forceLink().id(function (d) {
      return d.id;
    })).force('charge', forceManyBody()).force('center', forceCenter(_this.props.width / 2, _this.props.height / 2)));

    _defineProperty(_assertThisInitialized(_this), "dragsubject",
    /* istanbul ignore next */
    function (evt) {
      return _this.simulation.find(evt.x, evt.y);
    });

    _defineProperty(_assertThisInitialized(_this), "dragstarted",
    /* istanbul ignore next */
    function (evt) {
      if (!evt.active) _this.simulation.alphaTarget(0.3).restart();
      evt.subject.fx = evt.subject.x;
      evt.subject.fy = evt.subject.y;
    });

    _defineProperty(_assertThisInitialized(_this), "dragged",
    /* istanbul ignore next */
    function (evt) {
      evt.subject.fx = evt.x;
      evt.subject.fy = evt.y;

      var links = _this.simulation.force('link').links();

      var connectedLinks = links.filter(function (d) {
        return d.target.id === evt.subject.id || d.source.id === evt.subject.id;
      });
      var connectedNodes = uniq(connectedLinks.map(function (d) {
        return d.target.id !== evt.subject.id ? d.target : d.source;
      }));

      _this.setState({
        connectedLinks: connectedLinks,
        connectedNodes: connectedNodes,
        selectedNode: evt.subject
      });
    });

    _defineProperty(_assertThisInitialized(_this), "dragended",
    /* istanbul ignore next */
    function (evt) {
      if (!evt.active) _this.simulation.alphaTarget(0);
      evt.subject.fx = null;
      evt.subject.fy = null;

      _this.setState({
        selectedNode: null,
        connectedLinks: [],
        connectedNodes: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateGraph", function (raw) {
      var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$state2 = _this.state,
          nodesByIdState = _this$state2.nodesById,
          linksByIdState = _this$state2.linksById;
      if (!raw) return;

      var rawLinks = _this.simulation.force('link').links().map(function (d) {
        return {
          source: d.source.id,
          target: d.target.id
        };
      });

      var nodesById = _objectSpread({}, nodesByIdState);

      var linksById = _objectSpread({}, linksByIdState);

      var nodes = _toConsumableArray(_this.simulation.nodes());

      var links = _toConsumableArray(rawLinks);

      if (reset) {
        nodesById = {};
        linksById = {};
        nodes = [];
        links = [];
      }

      raw.artistNodes.forEach(function (d) {
        if (!nodesById[d.id]) {
          nodesById[d.id] = true;
          nodes.push(d);
        }
      });
      raw.artistCollabRelations.forEach(function (d) {
        var key = "".concat(typeof d.source === 'object' ? d.source.id : d.source, "-").concat(typeof d.target === 'object' ? d.target.id : d.target);

        if (!linksById[key]) {
          linksById[key] = true;
          links.push(d);
        }
      });

      _this.simulation.nodes(nodes);

      _this.simulation.force('link').links(links);

      _this.simulation.alphaTarget(0.3).restart();

      _this.setState({
        nodesById: nodesById,
        linksById: linksById
      });
    });

    return _this;
  }

  _createClass(NetworkDiagram, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ctx = this.canvas.getContext('2d');
      /* istanbul ignore next */

      if (this.ctx) {
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
      }

      this.dragHandler = drag().container(this.canvas).subject(this.dragsubject).on('start', this.dragstarted).on('drag', this.dragged).on('end', this.dragended);
      select(this.canvas).on('dblclick', this.onDblClick).call(this.dragHandler);
      this.simulation.on('tick', this.onTick);

      if (this.props.data) {
        this.updateGraph(this.props.data);
      } else {
        this.simulation.nodes([]);
        this.simulation.force('link').links([]);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!isEqual(this.props.data, prevProps.data) || this.props.artistId !== prevProps.artistId) {
        this.updateGraph(this.props.data, this.props.artistId !== prevProps.artistId);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.simulation.stop();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          width = _this$props2.width,
          height = _this$props2.height,
          artistId = _this$props2.artistId;
      var canvasWidth = width;
      var canvasHeight = height;
      /* istanbul ignore next */

      if (window.devicePixelRatio) {
        canvasWidth *= window.devicePixelRatio;
        canvasHeight *= window.devicePixelRatio;
      }

      return /*#__PURE__*/_jsxs("div", {
        style: {
          position: 'relative'
        },
        children: [this.state.selectedNode && /*#__PURE__*/_jsx("div", {
          style: {
            position: 'absolute',
            transform: "translate(".concat(this.state.selectedNode.x, "px, ").concat(this.state.selectedNode.y, "px)")
          },
          children: this.state.selectedNode.name
        }), this.state.selectedNode && this.state.selectedNode.uri !== "spotify:artist:".concat(artistId) && this.state.connectedNodes.map(function (node) {
          return /*#__PURE__*/_jsx("div", {
            style: {
              position: 'absolute',
              transform: "translate(".concat(node.x, "px, ").concat(node.y, "px)")
            },
            children: node.name
          }, node.id);
        }), /*#__PURE__*/_jsx("canvas", {
          ref: function ref(_ref) {
            return _this2.canvas = _ref;
          },
          width: canvasWidth,
          height: canvasHeight,
          style: {
            width: width,
            height: height
          }
        })]
      });
    }
  }]);

  return NetworkDiagram;
}(Component);

_defineProperty(NetworkDiagram, "defaultProps", {
  width: 960,
  height: 600,
  loadData: function loadData() {}
});