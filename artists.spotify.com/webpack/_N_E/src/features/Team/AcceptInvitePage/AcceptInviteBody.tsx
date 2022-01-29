import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import styled from 'styled-components';
import { FormHelpText, spacer24, spacer32, spacer12, spacer8, screenXsMax, screenXsMin } from '@spotify-internal/encore-web';
import { AcceptInviteInput } from './AcceptInviteInput';
import { useT } from '@mrkt/features/i18n';
import { LoggedInAsForm } from '../../UserSettings/components/LoggedInAsForm';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var HeaderContainer = styled.div.withConfig({
  displayName: "AcceptInviteBody__HeaderContainer",
  componentId: "kx07f4-0"
})(["font-size:12px;font-weight:normal;text-align:center;@media (max-width:", "){br{display:none;}}"], screenXsMin);
var FormContainer = styled.div.withConfig({
  displayName: "AcceptInviteBody__FormContainer",
  componentId: "kx07f4-1"
})(["margin:", " auto ", " auto;width:70%;@media (max-width:", "){margin-top:", ";}"], spacer32, spacer8, screenXsMax, spacer24);
var Columns = styled.div.withConfig({
  displayName: "AcceptInviteBody__Columns",
  componentId: "kx07f4-2"
})(["display:flex;@media (max-width:", "){display:block;}"], screenXsMax);
var Column = styled.div.withConfig({
  displayName: "AcceptInviteBody__Column",
  componentId: "kx07f4-3"
})(["flex-grow:1;&:not(:last-child){margin-right:", ";}"], spacer12);
export var AcceptInviteBody = function AcceptInviteBody(_ref) {
  var pendingInvite = _ref.pendingInvite,
      _onChange = _ref.onChange,
      forceError = _ref.forceError,
      errors = _ref.errors;
  var t = useT();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!pendingInvite.isFirstTeam && /*#__PURE__*/_jsx(HeaderContainer, {
      dangerouslySetInnerHTML: {
        __html: t('ACCEPT_INVITE_HEADER', 'You’ll receive notifications at this email. Edits you make to your name <br/> or business email will update across all your Spotify for Artists teams.', 'This is your notification email. If you edit your name or email here, it will update across all of your teams in Spotify for Artists')
      }
    }), /*#__PURE__*/_jsxs(FormContainer, {
      "data-testid": "accept-invite-form",
      children: [/*#__PURE__*/_jsxs(Columns, {
        children: [/*#__PURE__*/_jsx(Column, {
          children: /*#__PURE__*/_jsx(AcceptInviteInput, {
            id: "firstName",
            label: t('ACCEPT_INVITE_FIRST_NAME_FIELD', 'First name', 'First name input field'),
            value: pendingInvite.firstName,
            error: errors.get('firstName'),
            forceError: forceError,
            onChange: function onChange(newValue) {
              return _onChange(_objectSpread(_objectSpread({}, pendingInvite), {}, {
                firstName: newValue
              }));
            }
          })
        }), /*#__PURE__*/_jsx(Column, {
          children: /*#__PURE__*/_jsx(AcceptInviteInput, {
            id: "lastName",
            label: t('ACCEPT_INVITE_LAST_NAME_FIELD', 'Last name', 'Last name input field'),
            value: pendingInvite.lastName,
            error: errors.get('lastName'),
            forceError: forceError,
            onChange: function onChange(newValue) {
              return _onChange(_objectSpread(_objectSpread({}, pendingInvite), {}, {
                lastName: newValue
              }));
            }
          })
        })]
      }), /*#__PURE__*/_jsx(AcceptInviteInput, {
        id: "businessEmail",
        label: t('ACCEPT_INVITE_BUSINESS_EMAIL_FIELD', 'Business email', 'Business email input field'),
        value: pendingInvite.businessEmail,
        error: errors.get('businessEmail'),
        forceError: forceError,
        onChange: function onChange(newValue) {
          return _onChange(_objectSpread(_objectSpread({}, pendingInvite), {}, {
            businessEmail: newValue
          }));
        }
      }), /*#__PURE__*/_jsx(LoggedInAsForm, {})]
    }), pendingInvite.submitError && /*#__PURE__*/_jsx(FormHelpText, {
      "data-testid": "invite-global-error",
      error: !!pendingInvite.submitError,
      children: pendingInvite.submitError
    })]
  });
};