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
import styled from 'styled-components';
import { Type, IconX, Backdrop, FormInput, FormGroup, FormHelpText, ButtonTertiary, ButtonPrimary, ButtonIcon, cssColorValue } from '@spotify-internal/encore-web';
import { DialogConfirmation } from '@mrkt/features/Dialog';
import styles from './index.module.scss';
import { withT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledDialogConfirmation = styled(DialogConfirmation).withConfig({
  displayName: "LinkEditor__StyledDialogConfirmation",
  componentId: "sc-1ebasyh-0"
})(["background-color:", ";"], cssColorValue('backgroundElevatedBase'));
var StyledFormInput = styled(FormInput).withConfig({
  displayName: "LinkEditor__StyledFormInput",
  componentId: "sc-1ebasyh-1"
})(["", ""], function (_ref) {
  var error = _ref.error;
  return error && "\n      &,\n      &&&,\n      &:hover,\n      &:hover:focus {\n        box-shadow: inset 0 0 0 1px ".concat(cssColorValue('essentialNegative'), "\n      }\n    ");
});
var StyledFormHelpText = styled(FormHelpText).withConfig({
  displayName: "LinkEditor__StyledFormHelpText",
  componentId: "sc-1ebasyh-2"
})(["color:", ";"], cssColorValue('textNegative'));
var CapitalizeSpan = styled.span.withConfig({
  displayName: "LinkEditor__CapitalizeSpan",
  componentId: "sc-1ebasyh-3"
})(["text-transform:capitalize;"]);
export var LinkEditorClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(LinkEditorClassComponent, _Component);

  var _super = _createSuper(LinkEditorClassComponent);

  function LinkEditorClassComponent() {
    var _this;

    _classCallCheck(this, LinkEditorClassComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "renderLinkEditorHeader", function () {
      var t = _this.props.t;
      return /*#__PURE__*/_jsx("div", {
        className: styles.social_links_editor_header,
        children: t('artistprofile_sociallinks_linkeditor_1', 'More Info', '')
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderLinkEditorBody", function () {
      var _this$props = _this.props,
          links = _this$props.links,
          formFields = _this$props.formFields,
          t = _this$props.t;
      var editorLegalCopyLink = styles.editor_legal_copy_link;
      var socialLinkField = Object.keys(formFields).map(function (type) {
        var Icon = formFields[type].icon;
        var linkObj = links && links[type];
        var inputHasError = linkObj && linkObj.error;
        var hasUsername = type !== 'wikipedia' && type !== 'soundbetter';
        return /*#__PURE__*/_jsxs("div", {
          className: styles.editor_link,
          "data-testid": "link-editor",
          children: [/*#__PURE__*/_jsxs("label", {
            className: styles.editor_link_type,
            htmlFor: "".concat(type, "-link-editor-input-label"),
            children: [/*#__PURE__*/_jsx(Icon, {
              "aria-hidden": true,
              focusable: false,
              size: 24,
              semanticColor: "textSubdued",
              className: styles.editor_link_icon
            }), /*#__PURE__*/_jsx("span", {
              className: styles.editor_link_name,
              children: type
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: styles.editor_link_input_wrapper,
            children: /*#__PURE__*/_jsxs(FormGroup, {
              children: [/*#__PURE__*/_jsxs("div", {
                className: styles.editor_link_input,
                children: [/*#__PURE__*/_jsx(StyledFormInput, {
                  id: "".concat(type, "-link-editor-input-label"),
                  value: linkObj && linkObj.link || formFields[type].defaultValue,
                  placeholder: formFields[type].placeholder,
                  onChange: function onChange(event) {
                    return _this.props.onChangeLink(event, type);
                  },
                  onBlur: function onBlur(event) {
                    return _this.props.onBlurLink(event, type);
                  },
                  error: inputHasError,
                  "aria-invalid": inputHasError,
                  "aria-describedby": inputHasError ? "link-error-".concat(type) : undefined,
                  "data-testid": "link-editor-input"
                }), inputHasError && /*#__PURE__*/_jsxs(StyledFormHelpText, {
                  error: true,
                  "data-testid": "link-error",
                  id: "link-error-".concat(type),
                  children: [hasUsername ? t('artistprofile_sociallinks_linkeditor_2', 'Please enter a valid url or username', '') : t('artistprofile_sociallinks_linkeditor_3', 'Please enter a valid url', ''), ' ', "(", /*#__PURE__*/_jsxs(CapitalizeSpan, {
                    children: [" ", type]
                  }), ")"]
                })]
              }), /*#__PURE__*/_jsx(ButtonIcon, {
                style: {
                  position: 'static'
                },
                "aria-label": "remove link",
                onClick: function onClick() {
                  return _this.props.onRemoveLink(type);
                },
                children: /*#__PURE__*/_jsx(IconX, {
                  "aria-hidden": true,
                  focusable: false // @ts-ignore
                  ,
                  size: 16,
                  semanticColor: "textSubdued",
                  className: styles.editor_link_remove,
                  "data-testid": "editor-link-remove"
                })
              })]
            })
          })]
        }, type);
      });
      return /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Type, {
          as: "p",
          semanticColor: "textSubdued",
          className: styles.editor_subtitle,
          children: t('artistprofile_sociallinks_linkeditor_4', 'Add additional links to your profile so fans can learn more about you.', 'An example of the links we might be talking about would be a social media account.')
        }), socialLinkField, /*#__PURE__*/_jsx(Type, {
          as: "p",
          semanticColor: "textSubdued",
          className: styles.editor_legal_copy,
          children: /*#__PURE__*/_jsx("span", {
            dangerouslySetInnerHTML: {
              __html: t('artistprofile_sociallinks_linkeditor_5', 'By posting links, you agree that you have all of the legal rights to do so as described in our <a className={editorLegalCopyLink} href="https://www.spotify.com/us/legal/spotify-for-artists-terms-and-conditions/"> terms</a>. For guidelines, see our<a className={editorLegalCopyLink} href="https://artists.spotify.com/faq"> FAQs</a>.', '', {
                editorLegalCopyLink: editorLegalCopyLink
              })
            }
          })
        })]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderLinkEditorFooter", function () {
      var _this$props2 = _this.props,
          links = _this$props2.links,
          t = _this$props2.t;
      var hasError = links && Object.keys(links).some(function (type) {
        return links[type].error;
      });
      return /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(ButtonTertiary // @ts-ignore
        , {
          variant: "text",
          condensed: true,
          onClick: _this.props.onCancel,
          buttonSize: ButtonTertiary.sm,
          "data-testid": "cancel-button",
          children: t('artistprofile_sociallinks_linkeditor_6', 'Cancel', '')
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          onClick: _this.props.onSave,
          disabled: hasError ? true : undefined,
          buttonSize: ButtonPrimary.sm,
          "data-testid": "save-button",
          children: t('artistprofile_sociallinks_linkeditor_7', 'Save', '')
        })]
      });
    });

    return _this;
  }

  _createClass(LinkEditorClassComponent, [{
    key: "render",
    value: function render() {
      var Editor =
      /*#__PURE__*/
      // @ts-ignore
      _jsx(Backdrop, {
        center: true,
        onClose: this.props.onCancel,
        children: /*#__PURE__*/_jsx(StyledDialogConfirmation, {
          dialogId: "profile-edit-social-links-dialog",
          dialogTitle: this.renderLinkEditorHeader(),
          body: this.renderLinkEditorBody(),
          footer: this.renderLinkEditorFooter()
        })
      });

      return Editor;
    }
  }]);

  return LinkEditorClassComponent;
}(Component);

_defineProperty(LinkEditorClassComponent, "defaultProps", {
  onChangeLink: function onChangeLink() {},
  onRemoveLink: function onRemoveLink() {},
  onBlurLink: function onBlurLink() {},
  onCancel: function onCancel() {},
  onSave: function onSave() {},
  links: {},
  formFields: {}
});

export var LinkEditor = withT(LinkEditorClassComponent);