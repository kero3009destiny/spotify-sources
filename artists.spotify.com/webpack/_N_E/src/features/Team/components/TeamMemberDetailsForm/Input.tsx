import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import { FormHelpText, FormInput, FormPopoverTrigger, spacer8 } from '@spotify-internal/encore-web';
import React, { useState } from 'react';
import styled from 'styled-components';
import { InputFormGroup, ErrorText } from './sharedStyles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledFormHelpText = styled(FormHelpText).withConfig({
  displayName: "Input__StyledFormHelpText",
  componentId: "sc-1o12fmf-0"
})(["margin-top:", ";margin-bottom:", ";"], spacer8, spacer8);
var StyledInputFormGroup = styled(InputFormGroup).withConfig({
  displayName: "Input__StyledInputFormGroup",
  componentId: "sc-1o12fmf-1"
})(["div{span:last-child{margin-left:auto;}}"]);
export var Input = function Input(_ref) {
  var _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      error = _ref.error,
      _ref$forceShowErrors = _ref.forceShowErrors,
      forceShowErrors = _ref$forceShowErrors === void 0 ? false : _ref$forceShowErrors,
      _ref$helpText = _ref.helpText,
      helpText = _ref$helpText === void 0 ? undefined : _ref$helpText,
      id = _ref.id,
      label = _ref.label,
      _onChange = _ref.onChange,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? undefined : _ref$placeholder,
      _ref$popover = _ref.popover,
      popover = _ref$popover === void 0 ? undefined : _ref$popover,
      _ref$popoverPlacement = _ref.popoverPlacement,
      popoverPlacement = _ref$popoverPlacement === void 0 ? undefined : _ref$popoverPlacement,
      title = _ref.title,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      _ref$required = _ref.required,
      required = _ref$required === void 0 ? false : _ref$required,
      onFocus = _ref.onFocus;

  var _useState = useState(false),
      isTouched = _useState[0],
      setIsTouched = _useState[1];

  var showError = (isTouched || forceShowErrors) && !!error;
  var visibleError = showError && error;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      popoverVisible = _React$useState2[0],
      setPopoverVisible = _React$useState2[1];

  return /*#__PURE__*/_jsxs(StyledInputFormGroup, {
    label: label,
    labelFor: id,
    indicator: required ? 'required' : undefined,
    popover: popover && /*#__PURE__*/_jsx(FormPopoverTrigger, {
      "aria-label": "help",
      placement: popoverPlacement,
      overlay: popoverVisible && popover,
      onShow: function onShow() {
        return setPopoverVisible(true);
      },
      onHide: function onHide() {
        return setPopoverVisible(false);
      }
    }),
    children: [/*#__PURE__*/_jsx(FormInput, {
      title: title,
      id: id,
      onChange: function onChange(e) {
        _onChange(e.target.value);
      },
      onFocus: onFocus,
      onBlur: function onBlur(e) {
        var newValue = e.target.value.trim();

        if (value !== newValue) {
          _onChange(newValue);
        }

        setIsTouched(true);
      },
      "data-testid": id,
      "data-slo-id": id,
      type: "text",
      value: value,
      placeholder: placeholder,
      disabled: disabled,
      error: showError,
      "aria-invalid": showError,
      "aria-describedby": showError ? "".concat(id, "-error") : undefined,
      "aria-required": required
    }), helpText && /*#__PURE__*/_jsx(StyledFormHelpText, {
      id: "".concat(id, "-help-text"),
      "data-testid": "".concat(id, "-help-text"),
      children: helpText
    }), !disabled && /*#__PURE__*/_jsx(ErrorText, {
      id: "".concat(id, "-error"),
      "data-testid": "".concat(id, "-error"),
      error: !!visibleError,
      children: visibleError
    })]
  });
};