import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { EditControls } from '../../EditControls';
import { Mention } from '../Mention';
import { sanitizeHTML } from '../lib/htmlHelpers';
import { withT } from '@mrkt/features/i18n';
import { EditorSection, EditorControlsWrapper, EditorFooter, EditorCharLimit } from './index.styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var MAX_CHARACTER_LENGTH = 1500;
export var EditorClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(EditorClassComponent, _Component);

  var _super = _createSuper(EditorClassComponent);

  function EditorClassComponent(props) {
    var _this;

    _classCallCheck(this, EditorClassComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleEvent", function (type, event) {
      if (type === 'change') _this.onChange(event);
      if (type === 'select') _this.onSelect(event);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var _event$target, _event$customTarget, _event$target2, _event$customTarget2;

      var newText = ((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.innerText) || ((_event$customTarget = event.customTarget) === null || _event$customTarget === void 0 ? void 0 : _event$customTarget.innerText);
      var newHTML = ((_event$target2 = event.target) === null || _event$target2 === void 0 ? void 0 : _event$target2.innerHTML) || ((_event$customTarget2 = event.customTarget) === null || _event$customTarget2 === void 0 ? void 0 : _event$customTarget2.innerHTML);
      var sanitizedHTML = sanitizeHTML(newHTML);
      var link = _this.state.link;

      if (newHTML != null && newText != null) {
        _this.setState({
          html: sanitizedHTML,
          characterCount: newText.length,
          saveable: _this.isSaveable(link, newHTML, newText.length)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (event) {
      var link = _this.state.link;
      var html = event.html,
          text = event.text;

      if (html != null && text != null) {
        _this.setState({
          html: html,
          characterCount: text.length,
          saveable: _this.isSaveable(link, html, text.length)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isSaveable", function (newLink, newHtml, characterCount) {
      var _this$props = _this.props,
          initialLink = _this$props.initialLink,
          initialText = _this$props.initialText;
      return characterCount <= MAX_CHARACTER_LENGTH && (initialText !== newHtml || initialLink !== newLink);
    });

    _defineProperty(_assertThisInitialized(_this), "save", function () {
      var _this$state = _this.state,
          link = _this$state.link,
          html = _this$state.html;

      _this.props.save(link, html);
    });

    _this.state = {
      html: props.initialText || '',
      characterCount: props.initialCount,
      saveable: false,
      link: props.initialLink,
      validWikiLink: true
    };
    return _this;
  }

  _createClass(EditorClassComponent, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          html = _this$state2.html,
          saveable = _this$state2.saveable,
          characterCount = _this$state2.characterCount;
      var t = this.props.t;
      return /*#__PURE__*/_jsxs(EditorSection, {
        "data-qa": "bio-editor",
        children: [/*#__PURE__*/_jsx(Mention, {
          onUpdate: this.handleEvent,
          initialValue: html
        }), /*#__PURE__*/_jsxs(EditorFooter, {
          children: [/*#__PURE__*/_jsx("div", {
            children: t('artistprofile_biographywithimages_editor_1', 'Type @ or paste a link to any artist, album, playlist or track.', 'Refers to special linking functionality when using @ or pasting a Spotify URI link')
          }), MAX_CHARACTER_LENGTH - characterCount < 0 ? /*#__PURE__*/_jsx(EditorCharLimit, {
            error: Boolean(html && MAX_CHARACTER_LENGTH - characterCount <= 10),
            children: MAX_CHARACTER_LENGTH - characterCount
          }) : null]
        }), /*#__PURE__*/_jsxs(EditorControlsWrapper, {
          children: [/*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx("span", {
              dangerouslySetInnerHTML: {
                __html: t('artistprofile_biographywithimages_editor_2', "By posting images, links, or a bio, you agree that you have all of the legal rights to do so as described in our\n                      <a\n                        href=\"https://www.spotify.com/us/legal/spotify-for-artists-terms-and-conditions/\"\n                        target=\"_blank\"\n                        rel=\"noopener noreferrer\"\n                      >terms</a>. For guidelines, see our <a\n                        href=\"https://artists.spotify.com/faq\"\n                        target=\"_blank\"\n                        rel=\"noopener noreferrer\"\n                      >FAQs</a>.", 'Refers to images, links or a bio that the user is posting to an Artist Profile')
              }
            })
          }), /*#__PURE__*/_jsx(EditControls, {
            category: "EditBio",
            onCancel: this.props.cancel,
            onSave: this.save,
            saveable: saveable
          })]
        })]
      });
    }
  }]);

  return EditorClassComponent;
}(Component);
export var Editor = withT(EditorClassComponent);