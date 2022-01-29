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
import { withT } from '@mrkt/features/i18n';
import classNames from 'classnames';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var MAX_COMMENT_LENGTH = 38;

var CommentComponent = /*#__PURE__*/function (_Component) {
  _inherits(CommentComponent, _Component);

  var _super = _createSuper(CommentComponent);

  function CommentComponent() {
    var _this;

    _classCallCheck(this, CommentComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      var onChange = _this.props.onChange;
      var comment = event.target.value;
      var commentTooLong = comment.length >= MAX_COMMENT_LENGTH + 1;

      if (!commentTooLong && onChange) {
        onChange({
          comment: comment
        });
      }
    });

    return _this;
  }

  _createClass(CommentComponent, [{
    key: "render",
    value: function render() {
      var _classNames;

      var _this$props = this.props,
          _this$props$image = _this$props.image,
          image = _this$props$image === void 0 ? '' : _this$props$image,
          editing = _this$props.editing,
          transparent = _this$props.transparent,
          className = _this$props.className,
          comment = _this$props.comment,
          defaultComment = _this$props.defaultComment,
          hoverText = _this$props.hoverText,
          t = _this$props.t;
      return /*#__PURE__*/_jsxs("div", {
        "data-testid": "comment",
        className: classNames(styles.comment, className, (_classNames = {}, _defineProperty(_classNames, styles.comment__editing, editing), _defineProperty(_classNames, styles.comment__transparent, transparent), _defineProperty(_classNames, styles.comment__default_text, defaultComment), _classNames)),
        title: hoverText,
        children: [/*#__PURE__*/_jsx("div", {
          "data-testid": "comment-avatar",
          className: styles.comment__avatar,
          style: {
            backgroundImage: "url(".concat(image, ")")
          }
        }), editing ? /*#__PURE__*/_jsxs("div", {
          className: styles.comment__input_wrapper,
          children: [/*#__PURE__*/_jsx("input", {
            "data-testid": "comment-input",
            type: "text",
            value: comment,
            onChange: this.handleChange,
            maxLength: MAX_COMMENT_LENGTH,
            placeholder: t('artistprofile_artistpick_comment_1', 'Add message', 'The artist can write something that goes along with their Artist Pick.'),
            className: styles.comment__input
          }), /*#__PURE__*/_jsx("div", {
            className: classNames(styles.comment__char_limit, _defineProperty({}, styles.comment__char_limit__red, comment && MAX_COMMENT_LENGTH - comment.length <= 10)),
            children: comment ? MAX_COMMENT_LENGTH - comment.length : MAX_COMMENT_LENGTH
          })]
        }) : /*#__PURE__*/_jsx("div", {
          "data-testid": "comment-text",
          className: styles.comment__text,
          children: comment
        })]
      });
    }
  }]);

  return CommentComponent;
}(Component);

export var Comment = withT(CommentComponent);