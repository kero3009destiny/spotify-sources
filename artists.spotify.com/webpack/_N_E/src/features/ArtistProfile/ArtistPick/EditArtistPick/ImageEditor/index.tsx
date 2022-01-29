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

import React, { Component } from 'react';
import { ButtonTertiary } from '@spotify-internal/encore-web';
import { calculateFixedViewportOffset, ImageCapture, Instructions } from '@mrkt/features/imagecapture';
import { Comment } from '../../Comment';
import cardStyles from '../../Card/index.module.scss';
import { ImageArrows, ImageArrowsInner, ImageControls } from './styles';
import { withT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ImageEditorClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(ImageEditorClassComponent, _Component);

  var _super = _createSuper(ImageEditorClassComponent);

  function ImageEditorClassComponent(props) {
    var _this;

    _classCallCheck(this, ImageEditorClassComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "capturedImageData", void 0);

    _defineProperty(_assertThisInitialized(_this), "componentWrapper", void 0);

    _defineProperty(_assertThisInitialized(_this), "setComponentWidth", function () {
      var componentWrapper = _this.componentWrapper.current;

      if (componentWrapper) {
        _this.setState({
          componentWidth: componentWrapper.offsetWidth
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setImage", function () {
      var currentCaptured = _this.capturedImageData.current;

      if (currentCaptured) {
        var offset = currentCaptured.offset,
            originalSource = currentCaptured.originalSource,
            backgroundImage = currentCaptured.url;

        _this.props.setImage({
          backgroundImage: backgroundImage,
          originalSource: originalSource,
          offset: offset
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getImageCaptureHeight", function () {
      var _this$props = _this.props,
          desiredWidth = _this$props.desiredWidth,
          desiredHeight = _this$props.desiredHeight;
      return _this.state.componentWidth / (desiredWidth / desiredHeight);
    });

    _defineProperty(_assertThisInitialized(_this), "captureImage", function (capturedImage) {
      var _this$props2 = _this.props,
          imageWidth = _this$props2.imageWidth,
          imageHeight = _this$props2.imageHeight,
          imageSource = _this$props2.imageSource;
      if (!imageSource) return null;

      var viewportHeight = _this.getImageCaptureHeight();

      var viewportWidth = _this.state.componentWidth;
      var viewportRatio = viewportWidth / viewportHeight;
      var offset = calculateFixedViewportOffset({
        position: _objectSpread({}, capturedImage.position),
        sourceImage: {
          width: imageWidth,
          height: imageHeight
        },
        viewport: {
          height: viewportHeight,
          ratio: viewportRatio,
          width: viewportWidth
        },
        zoom: capturedImage.zoom
      });
      var capturedImageData = {
        url: capturedImage.url,
        offset: offset,
        originalSource: imageSource
      };
      _this.capturedImageData.current = capturedImageData;
      return capturedImageData;
    });

    _this.state = {
      componentWidth: 0
    };
    _this.capturedImageData = /*#__PURE__*/React.createRef();
    _this.componentWrapper = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(ImageEditorClassComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.setComponentWidth);
      this.setComponentWidth();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.setComponentWidth);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          imageSource = _this$props3.imageSource,
          imageWidth = _this$props3.imageWidth,
          imageHeight = _this$props3.imageHeight,
          desiredWidth = _this$props3.desiredWidth,
          desiredHeight = _this$props3.desiredHeight,
          onComment = _this$props3.onComment,
          comment = _this$props3.comment,
          artist = _this$props3.artist,
          t = _this$props3.t;
      return /*#__PURE__*/_jsxs("div", {
        ref: this.componentWrapper,
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx("div", {
            className: cardStyles.card__top,
            children: /*#__PURE__*/_jsx(Comment, {
              editing: true,
              comment: comment || '',
              image: artist.imageUrl,
              onChange: onComment
            })
          }), /*#__PURE__*/_jsx(ImageCapture, {
            name: "artist-pick",
            image: {
              source: imageSource,
              height: imageHeight,
              width: imageWidth
            },
            width: this.state.componentWidth || 0,
            height: this.getImageCaptureHeight() || 0,
            desiredAspectRatio: desiredWidth / desiredHeight,
            sendImageToParent: this.captureImage,
            renderChildren: function renderChildren() {
              return /*#__PURE__*/_jsx(ImageArrows, {
                children: /*#__PURE__*/_jsx(ImageArrowsInner, {})
              });
            },
            editable: true
          })]
        }), /*#__PURE__*/_jsxs(ImageControls, {
          className: "encore-muted-accent-set",
          children: [/*#__PURE__*/_jsx(ButtonTertiary, {
            "data-testid": "image__controls_cancel",
            condensed: true,
            onClick: this.props.cancelImageEditing,
            children: t('artistprofile_artistpick_imageeditor_1', 'Cancel', 'Refers to cancelling or discarding changes made to an image')
          }), /*#__PURE__*/_jsx(ButtonTertiary, {
            "data-testid": "image__controls_done",
            condensed: true,
            semanticColor: "textBrightAccent",
            onClick: this.setImage,
            children: t('artistprofile_artistpick_imageeditor_2', 'Done', 'Refers to saving changes made to an image')
          })]
        }), /*#__PURE__*/_jsx(Instructions, {
          desiredHeight: desiredHeight,
          desiredWidth: desiredWidth
        })]
      });
    }
  }]);

  return ImageEditorClassComponent;
}(Component);
export var ImageEditor = withT(ImageEditorClassComponent);