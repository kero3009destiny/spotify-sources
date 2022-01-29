import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React, { Component } from 'react';
import { NavBarListItem, TooltipTrigger, Tooltip, screenXxsMax, spacer8, spacer16 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { isTouchDevice } from '../../../shared/lib/isTouchDevice';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledTooltipTrigger = styled(TooltipTrigger).withConfig({
  displayName: "DisabledNavigationTab__StyledTooltipTrigger",
  componentId: "mt8pl5-0"
})(["a:hover,li:hover,span{cursor:not-allowed;}"]);
var StyledNavBarListItem = styled(function (props) {
  return /*#__PURE__*/_jsx(NavBarListItem, _objectSpread({
    sentenceCase: true
  }, props));
}).withConfig({
  displayName: "DisabledNavigationTab__StyledNavBarListItem",
  componentId: "mt8pl5-1"
})(["li:last-child > &{padding-left:", ";padding-right:", ";}@media (max-width:", "){padding-left:", ";padding-right:", ";}"], spacer16, spacer16, screenXxsMax, spacer8, spacer8);

var DisabledNavigationTab = /*#__PURE__*/function (_Component) {
  _inherits(DisabledNavigationTab, _Component);

  var _super = _createSuper(DisabledNavigationTab);

  function DisabledNavigationTab() {
    var _this;

    _classCallCheck(this, DisabledNavigationTab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      showTooltip: false
    });

    return _this;
  }

  _createClass(DisabledNavigationTab, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var tab = this.props.tab;
      return /*#__PURE__*/_jsx(StyledTooltipTrigger, {
        overlay: this.state.showTooltip && /*#__PURE__*/_jsx(Tooltip, {
          children: "Coming soon"
        }),
        placement: TooltipTrigger.bottom,
        onShow: function onShow() {
          return _this2.setState({
            showTooltip: true
          });
        },
        onHide: function onHide() {
          return _this2.setState({
            showTooltip: false
          });
        },
        isTouch: isTouchDevice(),
        children: /*#__PURE__*/_jsx(StyledNavBarListItem, {
          disabled: true,
          "data-testid": "tab-".concat(tab.label, "-disabled").toLowerCase(),
          label: tab.label,
          component: "span"
        })
      }, tab.id);
    }
  }]);

  return DisabledNavigationTab;
}(Component);
/* eslint-disable-next-line import/no-default-export */


export default DisabledNavigationTab;