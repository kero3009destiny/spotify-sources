import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import cn from 'classnames';
import React, { Component } from 'react';
import styles from './index.module.scss';
import { jsxs as _jsxs } from "react/jsx-runtime";
export var MediaObject = /*#__PURE__*/function (_Component) {
  _inherits(MediaObject, _Component);

  var _super = _createSuper(MediaObject);

  function MediaObject() {
    _classCallCheck(this, MediaObject);

    return _super.apply(this, arguments);
  }

  _createClass(MediaObject, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          alignment = _this$props.alignment,
          className = _this$props.className,
          compressed = _this$props.compressed,
          text = _this$props.text,
          thumbnail = _this$props.thumbnail,
          title = _this$props.title,
          stacked = _this$props.stacked,
          subtitle = _this$props.subtitle;
      return /*#__PURE__*/_jsxs("div", {
        "data-testid": "media-object",
        className: cn(className, styles.container, styles["align-".concat(alignment)], stacked && styles.container__stacked),
        children: [thumbnail, /*#__PURE__*/_jsxs("div", {
          className: cn(styles.content, compressed && styles.compressed),
          children: [title, subtitle, text]
        })]
      });
    }
  }]);

  return MediaObject;
}(Component);

_defineProperty(MediaObject, "defaultProps", {
  alignment: 'top'
});