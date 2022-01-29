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
import { VisuallyHidden } from '@spotify-internal/encore-web';
import { withT } from '@mrkt/features/i18n';
import { sanitizeHTML } from '../lib/htmlHelpers';
import { pasteHtmlAtCaret, removeLinkOnEntityChange, makeLinkRemovable } from '../lib/selectionHelper';
import { matchUri } from '../lib/urlHelpers';
import styles from './ContentEditable.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ContentEditableComponent = /*#__PURE__*/function (_Component) {
  _inherits(ContentEditableComponent, _Component);

  var _super = _createSuper(ContentEditableComponent);

  function ContentEditableComponent() {
    var _this;

    _classCallCheck(this, ContentEditableComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "htmlElem", null);

    _defineProperty(_assertThisInitialized(_this), "lastHTML", null);

    _defineProperty(_assertThisInitialized(_this), "handlePasteEvent", function (event) {
      var _event$clipboardData;

      event.preventDefault();

      if (event !== null && event !== void 0 && (_event$clipboardData = event.clipboardData) !== null && _event$clipboardData !== void 0 && _event$clipboardData.getData('text').length) {
        var pastedText = event.clipboardData.getData('text');
        var uriMatch = matchUri(pastedText);

        if (uriMatch) {
          _this.props.onPasteLinkOrUri(uriMatch);
        }

        _this.handlePastedHtml(pastedText);

        _this.emitChange(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePastedHtml", function (userInputHTML) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(userInputHTML));
      pasteHtmlAtCaret(div.innerHTML);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      removeLinkOnEntityChange();

      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyPress", function (event) {
      if (_this.props.onKeyPress) {
        _this.props.onKeyPress(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "emitChange", function (event) {
      if (!_this.htmlElem) return;
      var sanitizedHTML = sanitizeHTML(_this.htmlElem.innerHTML);
      var text = _this.htmlElem.innerText;

      if (_this.props.onChange && sanitizedHTML !== _this.lastHTML) {
        _this.props.onChange(_objectSpread(_objectSpread({}, event), {}, {
          target: event.target,
          customTarget: {
            innerHTML: sanitizedHTML,
            innerText: text
          }
        }));
      }

      _this.lastHTML = sanitizedHTML;
    });

    return _this;
  }

  _createClass(ContentEditableComponent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return (// Rerender if there is no element yet... (somehow?)
        !this.htmlElem || nextProps.html !== this.htmlElem.innerHTML && nextProps.html !== this.props.html
      );
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.htmlElem && this.props.html !== this.htmlElem.innerHTML) {
        // Perhaps React (whose VDOM gets outdated because we often prevent
        // rerendering) did not update the DOM. So we update it manually now.
        this.htmlElem.innerHTML = this.props.html;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          html = _this$props.html,
          t = _this$props.t;
      var sanitizedHTML = html;
      return /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(VisuallyHidden, {
          id: "edit-bio-label",
          as: "label",
          htmlFor: "edit-bio",
          children: t('artistprofile_biographywithimages_mention_contenteditable_1', 'edit bio', '')
        }), /*#__PURE__*/_jsx("div", {
          id: "edit-bio",
          role: "textbox",
          "aria-labelledby": "edit-bio-label",
          tabIndex: 0,
          className: styles['content-editable'],
          ref: function ref(elem) {
            return _this2.htmlElem = elem;
          },
          onInput: function onInput(event) {
            makeLinkRemovable(_this2.htmlElem);

            _this2.emitChange(event);
          },
          onBlur: this.emitChange,
          onKeyDown: this.onKeyDown,
          onKeyPress: this.onKeyPress,
          onKeyUp: this.onKeyUp,
          onClick: this.props.onClick,
          onPaste: this.handlePasteEvent,
          contentEditable: true,
          dangerouslySetInnerHTML: {
            __html: sanitizedHTML
          },
          "data-testid": "bio-contenteditable"
        })]
      });
    }
  }]);

  return ContentEditableComponent;
}(Component); // @ts-ignore I think the way prop types are handled is causing an issue here

_defineProperty(ContentEditableComponent, "defaultProps", {
  html: '',
  onChange: function onChange() {},
  onKeyDown: function onKeyDown() {},
  onKeyPress: function onKeyPress() {},
  onKeyUp: function onKeyUp() {},
  onClick: function onClick() {},
  onPasteLinkOrUri: function onPasteLinkOrUri() {}
});

export var ContentEditable = withT(ContentEditableComponent);