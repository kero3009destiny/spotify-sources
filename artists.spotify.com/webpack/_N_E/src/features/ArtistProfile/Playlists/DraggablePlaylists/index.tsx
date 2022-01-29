import _toConsumableArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DraggablePlaylist } from './DraggablePlaylist';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var DraggablePlaylists = /*#__PURE__*/function (_Component) {
  _inherits(DraggablePlaylists, _Component);

  var _super = _createSuper(DraggablePlaylists);

  function DraggablePlaylists() {
    var _this;

    _classCallCheck(this, DraggablePlaylists);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onMovePlaylist", function (dragIndex, hoverIndex) {
      var playlists = _this.props.playlists;
      var draggedPlaylist = playlists[dragIndex];
      var otherplaylists = [].concat(_toConsumableArray(playlists.slice(0, dragIndex)), _toConsumableArray(playlists.slice(dragIndex + 1)));
      var newplaylists = [].concat(_toConsumableArray(otherplaylists.slice(0, hoverIndex)), [draggedPlaylist], _toConsumableArray(otherplaylists.slice(hoverIndex)));

      _this.props.onMovePlaylist(newplaylists);
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnd", function (result) {
      var _result$destination;

      var destinationIndex = (_result$destination = result.destination) === null || _result$destination === void 0 ? void 0 : _result$destination.index;

      if (destinationIndex != null) {
        _this.onMovePlaylist(result.source.index, destinationIndex);
      }
    });

    return _this;
  }

  _createClass(DraggablePlaylists, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          playlists = _this$props.playlists,
          mobile = _this$props.mobile;

      if (!playlists || playlists.length === 0) {
        return null;
      }

      var playlistsComponents = playlists.map(function (_ref, index) {
        var uri = _ref.uri,
            image = _ref.image,
            title = _ref.title,
            subtitle = _ref.subtitle;
        return /*#__PURE__*/_jsx(DraggablePlaylist, {
          uri: uri,
          image: image,
          title: title,
          subtitle: subtitle,
          hasRemoveFeature: true,
          onRemove: _this2.props.onRemovePlaylist,
          onMovePlaylist: _this2.onMovePlaylist,
          mobile: mobile,
          index: index
        }, uri);
      });
      return /*#__PURE__*/_jsx(DragDropContext, {
        onDragEnd: this.onDragEnd,
        children: /*#__PURE__*/_jsx(Droppable, {
          droppableId: "playlists",
          children: function children(provided) {
            return /*#__PURE__*/_jsx("section", _objectSpread(_objectSpread({}, provided.droppableProps), {}, {
              ref: provided.innerRef,
              children: /*#__PURE__*/_jsxs("div", {
                children: [playlistsComponents, provided.placeholder]
              })
            }));
          }
        })
      });
    }
  }]);

  return DraggablePlaylists;
}(Component);

_defineProperty(DraggablePlaylists, "defaultProps", {
  playlists: [],
  onMovePlaylist: function onMovePlaylist() {},
  onRemovePlaylist: function onRemovePlaylist() {},
  confirmMovePlaylist: function confirmMovePlaylist() {}
});