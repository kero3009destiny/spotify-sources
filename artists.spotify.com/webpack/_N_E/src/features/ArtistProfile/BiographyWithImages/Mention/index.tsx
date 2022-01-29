import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { Component } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import createDeug from 'debug';
import { SearchEntityPicker } from '@mrkt/features/combobox/EntityPicker';
import { white } from '@spotify-internal/encore-web';
import { sanitizeHTML } from '../lib/htmlHelpers';
import { getCaretIndex, getCaretCoordinatesRelativeTo, replaceMentionWithLink, getTextAfterPosition, focusOn, findLastMention } from '../lib/selectionHelper';
import { ContentEditable } from './ContentEditable';
import styles from './Mention.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var HiddenSearchEntityPicker = styled(SearchEntityPicker).withConfig({
  displayName: "Mention__HiddenSearchEntityPicker",
  componentId: "e9rj5p-0"
})(["& > *:not([data-popover-root]){visibility:hidden;}& input{height:0;}& ul{background-color:", ";}"], white);
var debug = createDeug('components:Mention');
var TYPES = ['artist', 'album', 'track', 'playlist'];
var HIDE_SEARCH = 'HIDE_SEARCH';
var SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
var START_MENTION = 'START_MENTION';
var RESET_MENTION = 'RESET_MENTION';
var SET_HTML = 'SET_HTML';
var KEYCODE = {
  AT: 64,
  ESC: 27,
  ENTER: 13,
  KEYDOWN: 40,
  KEYUP: 38
};
export var Mention = /*#__PURE__*/function (_Component) {
  _inherits(Mention, _Component);

  var _super = _createSuper(Mention);

  function Mention() {
    var _this;

    _classCallCheck(this, Mention);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "entityPickerRef", null);

    _defineProperty(_assertThisInitialized(_this), "mentionElem", null);

    _defineProperty(_assertThisInitialized(_this), "searchElem", null);

    _defineProperty(_assertThisInitialized(_this), "state", {
      text: '',
      searchQuery: '',
      atCoordinates: {
        TOP: 0,
        LEFT: 0
      },
      lastAtPosition: 0,
      searchIsVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "isShifted", false);

    _defineProperty(_assertThisInitialized(_this), "onChange", function (contentEditableEvent) {
      var _contentEditableEvent;

      var searchIsVisible = _this.state.searchIsVisible;
      var newHTML = contentEditableEvent === null || contentEditableEvent === void 0 ? void 0 : (_contentEditableEvent = contentEditableEvent.customTarget) === null || _contentEditableEvent === void 0 ? void 0 : _contentEditableEvent.innerHTML;
      if (newHTML) _this.handleAction(SET_HTML, newHTML);

      if (searchIsVisible) {
        _this.setSearchPosition();

        var searchQuery = _this.getSearchQuery();

        _this.handleAction(SET_SEARCH_QUERY, searchQuery);

        var oldCoordinates = _this.state.atCoordinates;

        var newCoordinates = _this.getNewCoordinates();

        if (newCoordinates.TOP !== oldCoordinates.TOP) {
          _this.handleAction(RESET_MENTION);
        }
      }

      if (_this.props.onUpdate) {
        _this.props.onUpdate('change', contentEditableEvent);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDownOrKeyUp", function (event) {
      var searchIsVisible = _this.state.searchIsVisible;

      if (!(event.keyCode === KEYCODE.KEYDOWN || event.keyCode === KEYCODE.KEYUP || event.keyCode === KEYCODE.ENTER)) {
        return;
      }

      if (searchIsVisible) {
        var _this$entityPickerRef;

        event.preventDefault();
        (_this$entityPickerRef = _this.entityPickerRef) === null || _this$entityPickerRef === void 0 ? void 0 : _this$entityPickerRef.sendKeyDown(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      var _this$state = _this.state,
          searchIsVisible = _this$state.searchIsVisible,
          lastAtPosition = _this$state.lastAtPosition;
      var caretPosition = getCaretIndex() || 0;

      if (_this.props.onUpdate) {
        // Type cast is to cast event.target from EventTarget to HTMLElement
        _this.props.onUpdate('keyup', event);
      }

      if (event.shiftKey) {
        if (event.keyCode === 50) {
          return _this.handleAction(START_MENTION, caretPosition);
        }
      }

      if (event.key.charCodeAt(0) === KEYCODE.AT) {
        return _this.handleAction(START_MENTION, caretPosition);
      }

      if (event.key === 'Shift') {
        _this.isShifted = true;
        setTimeout(function () {
          _this.isShifted = false;
        }, 50);
      }

      if (event.key === '2' && _this.isShifted) {
        return _this.handleAction(START_MENTION, caretPosition);
      }

      if (caretPosition && caretPosition < lastAtPosition) {
        return _this.handleAction(HIDE_SEARCH);
      }

      if (searchIsVisible && event.keyCode === KEYCODE.ENTER) {
        return _this.handleAction(HIDE_SEARCH);
      }

      if (searchIsVisible && event.keyCode === KEYCODE.ESC) {
        return _this.handleAction(HIDE_SEARCH);
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (event) {
      var searchIsVisible = _this.state.searchIsVisible;

      if (searchIsVisible) {
        _this.handleAction(HIDE_SEARCH);
      }

      if (_this.props.onUpdate) {
        _this.props.onUpdate('click', event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (entityPacket) {
      var entity = entityPacket.entity;
      var searchQuery = _this.state.searchQuery;
      var content = replaceMentionWithLink(searchQuery, entity);
      var newHtml = content === null || content === void 0 ? void 0 : content.html;
      var newText = content === null || content === void 0 ? void 0 : content.text;

      _this.handleAction(HIDE_SEARCH);

      _this.handleAction(SET_HTML, newHtml);

      if (_this.props.onUpdate) {
        _this.props.onUpdate('select', {
          html: newHtml,
          text: newText
        });
      }

      focusOn(_this.mentionElem && findLastMention());
    });

    _defineProperty(_assertThisInitialized(_this), "setSearchPosition", function () {
      var atCoordinates = _this.state.atCoordinates;

      if (_this.searchElem) {
        _this.searchElem.style.left = "".concat(atCoordinates.LEFT, "px");
        _this.searchElem.style.top = "".concat(atCoordinates.TOP, "px");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getSearchQuery", function () {
      var lastAtPosition = _this.state.lastAtPosition;
      return getTextAfterPosition(lastAtPosition);
    });

    _defineProperty(_assertThisInitialized(_this), "handleNativeClickEvent", function (event) {
      var clickOutsideMention = _this.mentionElem && !_this.mentionElem.contains(event.target);

      if (event.type === 'focusout' && clickOutsideMention) {
        _this.handleAction(HIDE_SEARCH);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getNewCoordinates", function () {
      var newCoordinates = getCaretCoordinatesRelativeTo(_this.mentionElem);
      newCoordinates.TOP -= 5; // I hate magic numbers, but this undoes the hard coded adjustment from this function call, and fixes the layout issue here

      return newCoordinates;
    });

    _defineProperty(_assertThisInitialized(_this), "handleAction", function (actionType, payload) {
      switch (actionType) {
        case START_MENTION:
          {
            if (_this.mentionElem) {
              var newCoordinates = _this.getNewCoordinates();

              _this.setState({
                searchQuery: '',
                lastAtPosition: payload,
                atCoordinates: newCoordinates,
                searchIsVisible: true
              });
            }

            break;
          }

        case RESET_MENTION:
          {
            if (_this.mentionElem) {
              var _newCoordinates = _this.getNewCoordinates();

              _this.setState({
                atCoordinates: _newCoordinates
              }, function () {
                _this.setSearchPosition();
              });
            }

            break;
          }

        case HIDE_SEARCH:
          {
            _this.setState({
              searchIsVisible: false,
              lastAtPosition: 0,
              atCoordinates: {
                TOP: 0,
                LEFT: 0
              },
              searchQuery: ''
            });

            break;
          }

        case SET_SEARCH_QUERY:
          {
            _this.setState({
              searchQuery: payload || ''
            });

            break;
          }

        case SET_HTML:
          {
            _this.setState({
              text: payload || ''
            });

            break;
          }

        default:
          debug("".concat(actionType, " not handled"));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handlePasteLinkOrUri", function (entityInfo) {
      var caretIndex = getCaretIndex();
      if (caretIndex != null) _this.handleAction(START_MENTION, caretIndex);
      if (entityInfo) _this.handleAction(SET_SEARCH_QUERY, entityInfo.uri);

      _this.setSearchPosition();
    });

    return _this;
  }

  _createClass(Mention, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this.handleNativeClickEvent);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleNativeClickEvent);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          searchIsVisible = _this$state2.searchIsVisible,
          searchQuery = _this$state2.searchQuery,
          text = _this$state2.text;
      var initialValue = this.props.initialValue;
      var sanitizedHTML = sanitizeHTML(text || initialValue);
      return /*#__PURE__*/_jsxs("div", {
        className: styles.mention,
        children: [/*#__PURE__*/_jsx("div", {
          ref: function ref(elem) {
            return _this2.mentionElem = elem;
          },
          className: classNames(styles['form-control'], styles.content_editable_wrapper),
          children: /*#__PURE__*/_jsx(ContentEditable, {
            html: sanitizedHTML,
            onKeyDown: this.onKeyDownOrKeyUp,
            onKeyPress: this.onKeyDownOrKeyUp,
            onKeyUp: this.onKeyUp,
            onChange: this.onChange,
            onClick: this.onClick,
            onPasteLinkOrUri: this.handlePasteLinkOrUri
          })
        }), /*#__PURE__*/_jsx("div", {
          ref: function ref(elem) {
            _this2.searchElem = elem;

            _this2.setSearchPosition();
          },
          className: styles.mention_search,
          children: searchIsVisible && /*#__PURE__*/_jsx(HiddenSearchEntityPicker, {
            value: searchQuery,
            entityTypes: TYPES,
            onSelect: this.onSelect,
            isOpen: true,
            ref: function ref(Comp) {
              return _this2.entityPickerRef = Comp;
            }
          })
        })]
      });
    }
  }]);

  return Mention;
}(Component);

_defineProperty(Mention, "defaultProps", {
  initialValue: '',
  onUpdate: function onUpdate() {}
});