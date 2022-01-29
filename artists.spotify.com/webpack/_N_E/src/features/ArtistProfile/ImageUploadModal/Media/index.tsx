import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React, { Component } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource, DropTarget } from 'react-dnd';
import { MEDIA } from './ItemTypes';
import { MediaItem } from './MediaItem';
import styles from './Media.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
var MediaItemWithRef = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return (
    /*#__PURE__*/
    // @ts-ignore
    _jsx("div", {
      ref: ref,
      children: /*#__PURE__*/_jsx(MediaItem, _objectSpread({}, props))
    })
  );
});
export var mediaSource = {
  beginDrag: function beginDrag(props, _, component) {
    var boundingRect = component.node && component.node.current ? component.node.current.getBoundingClientRect() : {};
    return {
      index: props.index,
      image: props.image,
      width: boundingRect.width,
      height: boundingRect.height
    };
  }
};
export var mediaTarget = {
  hover: function hover(props, monitor) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index; // don't replace items with themselves

    if (dragIndex === hoverIndex) return; // move image

    props.onMoveImage(dragIndex, hoverIndex); // eslint-disable-next-line

    monitor.getItem().index = hoverIndex;
  },
  canDrop: function canDrop() {
    return true;
  }
};
export var Media = /*#__PURE__*/function (_Component) {
  _inherits(Media, _Component);

  var _super = _createSuper(Media);

  function Media() {
    var _this;

    _classCallCheck(this, Media);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "node", /*#__PURE__*/React.createRef());

    return _this;
  }

  _createClass(Media, [{
    key: "componentDidMount",
    value:
    /* istanbul ignore next */
    function componentDidMount() {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      this.props.connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          index = _this$props.index,
          image = _this$props.image,
          isDragging = _this$props.isDragging,
          onRemoveImage = _this$props.onRemoveImage,
          onRetry = _this$props.onRetry,
          connectDragSource = _this$props.connectDragSource,
          connectDropTarget = _this$props.connectDropTarget;
      if (!image) return null;

      var element = /*#__PURE__*/_jsx("li", {
        "data-qa": "media-item-".concat(index.toString()),
        className: styles.media,
        children: /*#__PURE__*/_jsx(MediaItemWithRef, {
          ref: this.node // @ts-ignore
          ,
          index: index,
          image: image,
          isDragging: isDragging,
          onRemoveImage: onRemoveImage,
          onRetry: onRetry
        })
      });

      return connectDropTarget(connectDragSource(element));
    }
  }]);

  return Media;
}(Component); // eslint-disable-next-line new-cap

var mapDragSourceToProps = DragSource(MEDIA, mediaSource, function (connect, monitor) {
  return {
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}); // eslint-disable-next-line new-cap

var mapDropTargetToProps = DropTarget(MEDIA, mediaTarget, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
  };
});
export var DraggableMedia = mapDropTargetToProps(mapDragSourceToProps(Media));