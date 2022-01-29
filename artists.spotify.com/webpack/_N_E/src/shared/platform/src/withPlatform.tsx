import _classCallCheck from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import qs from 'query-string';
import { PLATFORM_WEB, PLATFORM_ANDROID, PLATFORM_IOS } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
var platforms = [PLATFORM_WEB, PLATFORM_ANDROID, PLATFORM_IOS];
var query = 'container-platform';
var queryString = qs.parse(window.location && window.location.search || '');
var name = query in queryString && platforms.includes(queryString[query]) ? queryString[query] : PLATFORM_WEB;
var isApp = [PLATFORM_IOS, PLATFORM_ANDROID].includes(name);
export var Context = /*#__PURE__*/React.createContext({
  name: name,
  isApp: isApp
});
export function withPlatform(C) {
  var _class, _temp;

  return hoistNonReactStatics((_temp = _class = /*#__PURE__*/function (_React$Component) {
    _inherits(Platform, _React$Component);

    var _super = _createSuper(Platform);

    function Platform() {
      _classCallCheck(this, Platform);

      return _super.apply(this, arguments);
    }

    _createClass(Platform, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/_jsx(C, _objectSpread(_objectSpread({}, this.props), {}, {
          platform: this.context
        }));
      }
    }]);

    return Platform;
  }(React.Component), _defineProperty(_class, "contextType", Context), _defineProperty(_class, "displayName", "Platform(".concat(C.displayName || C.name || 'Component', ")")), _temp), C);
}