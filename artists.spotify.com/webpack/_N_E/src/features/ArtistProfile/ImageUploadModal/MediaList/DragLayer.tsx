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
import classnames from 'classnames';
import { DragLayer } from 'react-dnd';
import { MediaItem } from '../Media/MediaItem';
import { MEDIA } from '../Media/ItemTypes';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export function getItemStyles(props, item) {
  var currentOffset = props.currentOffset;

  if (!currentOffset || !item) {
    return {
      display: 'none'
    };
  }

  var x = currentOffset.x,
      y = currentOffset.y;
  var transform = "translate(".concat(x - item.width / 2, "px, ").concat(y - item.height / 2, "px)");
  return {
    transform: transform,
    width: "".concat(item.width, "px")
  };
}
export var MediaDragLayer = /*#__PURE__*/function (_Component) {
  _inherits(MediaDragLayer, _Component);

  var _super = _createSuper(MediaDragLayer);

  function MediaDragLayer() {
    var _this;

    _classCallCheck(this, MediaDragLayer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (type, item) {
      switch (type) {
        case MEDIA:
          if (item) {
            return /*#__PURE__*/_jsx(MediaItem, {
              hasControls: true,
              index: item.index,
              image: item.image
            });
          }

          return null;

        default:
          return null;
      }
    });

    return _this;
  }

  _createClass(MediaDragLayer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          item = _this$props.item,
          itemType = _this$props.itemType,
          isDragging = _this$props.isDragging;
      var itemStyles = getItemStyles(this.props, item);

      if (!isDragging) {
        return null;
      }

      return /*#__PURE__*/_jsx("ul", {
        className: classnames(styles.media_list, styles.drag_layer),
        children: /*#__PURE__*/_jsx("li", {
          className: styles.media,
          style: itemStyles,
          children: this.renderItem(itemType, item)
        })
      });
    }
  }]);

  return MediaDragLayer;
}(Component);

var collect = function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset()
  };
}; // eslint-disable-next-line new-cap


export var DraggableMediaDragLayer = DragLayer(collect)(MediaDragLayer);