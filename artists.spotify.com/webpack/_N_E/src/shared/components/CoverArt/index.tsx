import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { Component } from 'react';
import styled from 'styled-components';
import { IconPlaylist, Image as _EncoreImage, cssColorValue } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var EncoreImage = _EncoreImage; // cast as any because of importance prop which doesn't seem to be on type, but am leaving to be safe

var Container = styled.div.withConfig({
  displayName: "CoverArt__Container",
  componentId: "sc-1ranx50-0"
})(["position:relative;width:", ";min-width:", ";height:", ";margin:", ";"], function (props) {
  return "".concat(props.size, "px");
}, function (props) {
  return "".concat(props.size, "px");
}, function (props) {
  return "".concat(props.size, "px");
}, function (props) {
  return props.stacked ? '0 auto' : null;
});
var DisplayWrapper = styled.div.withConfig({
  displayName: "CoverArt__DisplayWrapper",
  componentId: "sc-1ranx50-1"
})(["position:absolute;top:0;bottom:0;left:0;right:0;opacity:", ";transition:opacity 300ms ease;display:flex;align-items:center;justify-content:center;background-color:", ";color:", ";"], function (props) {
  return props.show ? 1 : 0;
}, function (props) {
  return props.transparent ? 'transparent' : cssColorValue('decorativeSubdued');
}, cssColorValue('textSubdued'));
export var CoverArt = /*#__PURE__*/function (_Component) {
  _inherits(CoverArt, _Component);

  var _super = _createSuper(CoverArt);

  function CoverArt() {
    var _this;

    _classCallCheck(this, CoverArt);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasValidImageURI: false
    });

    _defineProperty(_assertThisInitialized(_this), "isComponentDestroyed", false);

    _defineProperty(_assertThisInitialized(_this), "checkImageURI", function (imgSrc) {
      if (!imgSrc) return;
      var img = new Image();

      img.onload = function () {
        if (!_this.isComponentDestroyed) {
          _this.setState({
            hasValidImageURI: true
          });
        }
      };

      img.onerror = function () {
        if (!_this.isComponentDestroyed) {
          _this.setState({
            hasValidImageURI: false
          });
        }
      };

      img.src = imgSrc;
    });

    return _this;
  }

  _createClass(CoverArt, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.imgSrc) {
        this.checkImageURI(this.props.imgSrc);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isComponentDestroyed = true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          imgSrc = _this$props.imgSrc,
          size = _this$props.size,
          stacked = _this$props.stacked,
          defaultIcon = _this$props.defaultIcon;
      return /*#__PURE__*/_jsxs(Container, {
        "data-testid": "cover-art",
        className: className,
        size: size,
        stacked: stacked,
        children: [/*#__PURE__*/_jsx(DisplayWrapper, {
          show: true,
          children: defaultIcon
        }), /*#__PURE__*/_jsx(DisplayWrapper, {
          show: this.state.hasValidImageURI,
          transparent: true,
          children: /*#__PURE__*/_jsx(EncoreImage, {
            placeholderSrc: "data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==",
            width: size,
            height: size,
            src: imgSrc,
            importance: "low",
            crop: true
          })
        })]
      });
    }
  }]);

  return CoverArt;
}(Component);

_defineProperty(CoverArt, "defaultProps", {
  size: 64,
  defaultIcon: /*#__PURE__*/_jsx(IconPlaylist, {
    iconSize: 24,
    "data-testid": "playlist-icon"
  })
});