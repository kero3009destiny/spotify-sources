import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.acf7316e-c5eb-4849-947a-e5dd91fd7b9e/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization

/* eslint-disable react/sort-comp */
// renaming this file to index.jsx caused a *lot* of problems

/* eslint-disable react/jsx-filename-extension */
import React, { Component, Children } from 'react';
import { compose } from 'redux';
import { useRouter } from 'next/router';
import { get, S4X_DATA_API } from '../../../shared/lib/api';
import { makeCancelablePromise } from '../../../shared/components/EntityPicker/makeCancelablePromise';
import { withDeprecatedCurrentArtist } from '../../../features/artists';
import { jsx as _jsx } from "react/jsx-runtime";
export var CanonicalCheck = /*#__PURE__*/function (_Component) {
  _inherits(CanonicalCheck, _Component);

  var _super = _createSuper(CanonicalCheck);

  function CanonicalCheck() {
    var _this;

    _classCallCheck(this, CanonicalCheck);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      error: false
    });

    _defineProperty(_assertThisInitialized(_this), "cancelablePromise", void 0);

    _defineProperty(_assertThisInitialized(_this), "canonicalRedirect", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _this$props, history, artistId, _yield$_this$cancelab, contentGrouperStatus, shouldRedirect, canonicalId;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, history = _this$props.history, artistId = _this$props.artist.id;
              _this.cancelablePromise = makeCancelablePromise(get("".concat(S4X_DATA_API, "/v1/artist/").concat(_this.props.artist.id, "/recording/").concat(_this.props.songId, "/canonical")));
              _context.prev = 2;
              _context.next = 5;
              return _this.cancelablePromise.promise;

            case 5:
              _yield$_this$cancelab = _context.sent;
              contentGrouperStatus = _yield$_this$cancelab.contentGrouperStatus;
              shouldRedirect = _yield$_this$cancelab.shouldRedirect;
              canonicalId = _yield$_this$cancelab.canonicalId;

              if (!(contentGrouperStatus !== 'ok')) {
                _context.next = 11;
                break;
              }

              throw new Error('contentGrouperStatus not ok');

            case 11:
              if (shouldRedirect) {
                history.push("/artist/".concat(artistId, "/song/").concat(canonicalId));
              }

              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](2);

              if (!_context.t0.isCanceled) {
                _this.setState({
                  error: true
                });
              }

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 14]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "isComponentDestroyed", false);

    return _this;
  }

  _createClass(CanonicalCheck, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.canonicalRedirect();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelablePromise.cancel();
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var error = this.state.error; // @ts-ignore

      return Children.only(children(error));
    }
  }]);

  return CanonicalCheck;
}(Component);
/* eslint-disable-next-line import/no-default-export */

export default compose(withDeprecatedCurrentArtist)(function (props) {
  var router = useRouter();
  return /*#__PURE__*/_jsx(CanonicalCheck, _objectSpread(_objectSpread({}, props), {}, {
    history: {
      push: router.push.bind(router)
    }
  }));
});