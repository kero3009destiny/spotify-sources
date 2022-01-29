// ignore-string-externalization
import React, { useState } from 'react';
import { FormGroup, FormInput, FormHelpText } from '@spotify-internal/encore-web';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var AcceptInviteInput = function AcceptInviteInput(_ref) {
  var id = _ref.id,
      label = _ref.label,
      value = _ref.value,
      error = _ref.error,
      _onChange = _ref.onChange,
      forceError = _ref.forceError;

  var _useState = useState(false),
      isTouched = _useState[0],
      setIsTouched = _useState[1];

  return /*#__PURE__*/_jsxs(FormGroup, {
    label: label,
    labelFor: id,
    children: [/*#__PURE__*/_jsx(FormInput, {
      name: id,
      onChange: function onChange(e) {
        _onChange(e.target.value);

        setIsTouched(true);
      },
      onBlur: function onBlur() {
        return setIsTouched(true);
      },
      "data-testid": "invite-input-".concat(id),
      type: "text",
      value: value
    }), /*#__PURE__*/_jsx(FormHelpText, {
      "data-testid": "invite-input-".concat(id, "-error"),
      error: (isTouched || forceError) && !!error,
      children: (isTouched || forceError) && error
    })]
  });
};