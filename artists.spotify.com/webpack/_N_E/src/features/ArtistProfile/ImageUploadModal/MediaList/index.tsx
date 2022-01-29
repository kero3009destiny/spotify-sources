import _toConsumableArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { Component } from 'react';
import { DraggableMedia } from '../Media';
import { DraggableMediaDragLayer } from './DragLayer';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var MediaList = /*#__PURE__*/function (_Component) {
  _inherits(MediaList, _Component);

  var _super = _createSuper(MediaList);

  function MediaList() {
    var _this;

    _classCallCheck(this, MediaList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onMoveImage", function (dragIndex, hoverIndex) {
      var images = _this.props.images;
      var dragImage = images[dragIndex];
      var otherImages = [].concat(_toConsumableArray(images.slice(0, dragIndex)), _toConsumableArray(images.slice(dragIndex + 1)));
      var newImages = [].concat(_toConsumableArray(otherImages.slice(0, hoverIndex)), [dragImage], _toConsumableArray(otherImages.slice(hoverIndex)));

      _this.props.onMoveImage(newImages);
    });

    return _this;
  }

  _createClass(MediaList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          images = _this$props.images,
          onRemoveImage = _this$props.onRemoveImage,
          onRetry = _this$props.onRetry;

      if (!images || images.length === 0) {
        return null;
      }

      var mediaList = images.map(function (image, index) {
        return /*#__PURE__*/_jsx(DraggableMedia, {
          index: index,
          image: image,
          onMoveImage: _this2.onMoveImage,
          onRemoveImage: onRemoveImage,
          onRetry: onRetry
        }, "".concat(image.id, "-").concat(image.loading ? 'loading' : 'loaded'));
      });
      return /*#__PURE__*/_jsxs("section", {
        children: [/*#__PURE__*/_jsx(DraggableMediaDragLayer, {}), /*#__PURE__*/_jsx("ul", {
          className: styles.media_list,
          children: mediaList
        })]
      });
    }
  }]);

  return MediaList;
}(Component);

_defineProperty(MediaList, "defaultProps", {
  images: [],
  onMoveImage: function onMoveImage() {},
  onRemoveImage: function onRemoveImage() {},
  onRetry: function onRetry() {}
});

export var DraggableMediaList = MediaList;