import React from 'react';
import { FormCheckbox } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { getTermsUrl } from '../../getTermsUrl';
import { RequiredFieldsAsterisk, StyledTextLink, TermsAndConditionsWrapper, ErrorText } from '../TermsAndConditions';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var TermsAndConditionsCheckbox = function TermsAndConditionsCheckbox(_ref) {
  var _ref$termsAndConditio = _ref.termsAndConditionsAgreement,
      termsAndConditionsAgreement = _ref$termsAndConditio === void 0 ? false : _ref$termsAndConditio,
      onChange = _ref.onChange,
      visibleTermsConditionsError = _ref.visibleTermsConditionsError;
  var t = useT();
  return /*#__PURE__*/_jsxs(TermsAndConditionsWrapper, {
    children: [/*#__PURE__*/_jsxs(FormCheckbox, {
      small: true,
      "data-testid": "terms-and-conditions-checkbox",
      "data-slo-id": "terms-and-conditions-checkbox",
      id: "terms-and-conditions",
      checked: termsAndConditionsAgreement,
      onChange: onChange,
      children: [/*#__PURE__*/_jsx(StyledTextLink, {
        href: getTermsUrl(),
        target: "blank",
        rel: "noopener noreferrer",
        children: t('ADD_CONTENT_FORM_TERMS_ACCEPT_CHECKBOX', 'I accept Spotify for Artists Terms and Conditions', 'Text of link to full terms and conditions text.')
      }), /*#__PURE__*/_jsx(RequiredFieldsAsterisk, {
        children: "*"
      })]
    }), /*#__PURE__*/_jsx(ErrorText, {
      id: "terms-conditions-error",
      "data-testid": "terms-conditions-error",
      error: !!visibleTermsConditionsError,
      children: visibleTermsConditionsError
    })]
  });
};