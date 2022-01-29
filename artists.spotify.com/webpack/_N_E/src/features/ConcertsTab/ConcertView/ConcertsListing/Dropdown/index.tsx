import _classCallCheck from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { Component, Children } from 'react';
import cn from 'classnames';
import { // @ts-ignore
dropdown, // @ts-ignore
menu, // @ts-ignore
trigger, // @ts-ignore
active, // @ts-ignore
list, // @ts-ignore
item, // @ts-ignore
dismiss } from './index.module.scss';
/* eslint-disable-next-line import/no-default-export */

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var Dropdown = /*#__PURE__*/function (_Component) {
  _inherits(Dropdown, _Component);

  var _super = _createSuper(Dropdown);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "root", void 0);

    _this.root = null;
    _this.state = {
      show: false
    };
    _this.handleOutsideClick = _this.handleOutsideClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var show = this.state.show;
      /* istanbul ignore next */

      return show ? document.body.addEventListener('click', this.handleOutsideClick) : document.body.removeEventListener('click', this.handleOutsideClick);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      /* istanbul ignore next */
      document.body.removeEventListener('click', this.handleOutsideClick);
      /* istanbul ignore next */

      this.root = null;
    }
  }, {
    key: "handleClick",
    value: function handleClick(ev) {
      var show = this.state.show;
      /* istanbul ignore next */

      ev.stopPropagation();
      /* istanbul ignore next */

      ev.preventDefault();
      this.setState({
        show: !show
      });
    }
  }, {
    key: "handleOutsideClick",
    value: function handleOutsideClick(ev) {
      if (!this.root) return;

      if (!this.root.contains(ev.target)) {
        this.setState({
          show: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _cn,
          _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          isMobile = _this$props.isMobile;
      var show = this.state.show;
      var menuCss = cn((_cn = {}, _defineProperty(_cn, menu, true), _defineProperty(_cn, active, show), _cn));
      return /*#__PURE__*/_jsxs("div", {
        "data-showing": show,
        children: [/*#__PURE__*/_jsxs("div", {
          ref: function ref(el) {
            return _this2.root = el;
          },
          className: dropdown,
          children: [/*#__PURE__*/_jsx("button", {
            type: "button",
            className: trigger,
            onClick: function onClick(e) {
              return _this2.handleClick(e);
            },
            children: this.props.trigger
          }), /*#__PURE__*/_jsx("div", {
            className: menuCss,
            children: /*#__PURE__*/_jsx("ul", {
              className: list,
              role: "presentation",
              onMouseUp: function onMouseUp(e) {
                return _this2.handleClick(e);
              },
              children: Children.map(children, function (child, idx) {
                return /*#__PURE__*/_jsx("li", {
                  className: item,
                  children: child
                }, idx);
              })
            })
          })]
        }), show && isMobile && /*#__PURE__*/_jsx("div", {
          className: dismiss,
          role: "presentation",
          onMouseDown: function onMouseDown(e) {
            return _this2.handleOutsideClick(e);
          }
        })]
      });
    }
  }]);

  return Dropdown;
}(Component);

_defineProperty(Dropdown, "defaultProps", {
  isMobile: false
});

export { Dropdown as default };