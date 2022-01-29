import styled from 'styled-components';
import React from 'react';
import { ButtonTertiary, FormGroup, black10, gray90, gray30, gray20, spacer24, gray95 } from '@spotify-internal/encore-web';
import { useCurrentUser } from '../../../features/currentUser';
import { useT } from '@mrkt/features/i18n';
import { IconBadgeWithText } from '../../Team/components/IconBadge/IconBadgeWithText';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ActionButton = styled(ButtonTertiary).withConfig({
  displayName: "LoggedInAsForm__ActionButton",
  componentId: "sc-10hwl8w-0"
})(["border:none 0 transparent;border-left:solid 1px ", ";border-radius:0 8px 8px 0;padding:0;"], function (props) {
  return props.theme && props.theme.theme === 'dark' ? "".concat(gray30) : "".concat(gray90);
});
var InvisibleLink = styled.a.withConfig({
  displayName: "LoggedInAsForm__InvisibleLink",
  componentId: "sc-10hwl8w-1"
})(["text-decoration:none;"]);
var Card = styled.div.withConfig({
  displayName: "LoggedInAsForm__Card",
  componentId: "sc-10hwl8w-2"
})(["align-items:center;border:", ";background-color:", ";box-shadow:0 0 0 0 ", ";display:flex;border-radius:8px;justify-content:stretch;margin-bottom:", ";max-width:", ";transition:box-shadow 0.5s;&:hover{box-shadow:0 8px 16px 0 ", ";}& > *{padding:", ";flex-basis:100%;flex-grow:0;flex-shrink:1;}", "{height:100%;text-align:center;text-transform:uppercase;width:100%;&:hover{background-color:", ";}&:active,&:focus{background-color:", ";outline:none;}}"], function (props) {
  return props.theme && props.theme.theme === 'dark' ? 'none' : "solid 1px ".concat(gray90);
}, function (props) {
  return props.theme && props.theme.theme === 'dark' ? "".concat(gray20) : 'none';
}, black10, function (props) {
  return props.theme && props.theme.theme === 'dark' || props.addTeams ? '0' : "".concat(spacer24);
}, function (props) {
  return props.theme && props.theme.theme === 'dark' || props.addTeams ? '100%' : '480px';
}, black10, spacer24, ActionButton, function (props) {
  return props.theme && props.theme.theme === 'dark' ? "".concat(gray30) : "".concat(gray95);
}, function (props) {
  return props.theme && props.theme.theme === 'dark' ? "".concat(gray30) : "".concat(gray90);
});
var Actions = styled.div.withConfig({
  displayName: "LoggedInAsForm__Actions",
  componentId: "sc-10hwl8w-3"
})(["align-self:stretch;flex-basis:88px;flex-shrink:0;padding:0;"]);
var settingsUrl = 'https://www.spotify.com/account/overview/';
export var LoggedInAsFormLayout = function LoggedInAsFormLayout(_ref) {
  var _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? undefined : _ref$theme,
      currentUser = _ref.currentUser,
      _ref$actionUrl = _ref.actionUrl,
      actionUrl = _ref$actionUrl === void 0 ? settingsUrl : _ref$actionUrl,
      _ref$actionText = _ref.actionText,
      actionText = _ref$actionText === void 0 ? 'Edit' : _ref$actionText,
      platform = _ref.platform,
      _ref$addTeams = _ref.addTeams,
      addTeams = _ref$addTeams === void 0 ? false : _ref$addTeams,
      onClick = _ref.onClick;
  var t = useT();

  if (!currentUser) {
    return null;
  }

  var loggedInAsFormLabel = t('LOGGED_IN_AS_FORM_LABEL', 'Logged in as', 'Label for the logged in as form');
  return /*#__PURE__*/_jsx(FormGroup, {
    label: loggedInAsFormLabel,
    children: /*#__PURE__*/_jsxs(Card, {
      theme: theme,
      addTeams: addTeams,
      children: [/*#__PURE__*/_jsx(IconBadgeWithText, {
        text: currentUser.name,
        secondaryText: currentUser.loginEmail
      }), platform && !platform.isApp && /*#__PURE__*/_jsx(Actions, {
        children: /*#__PURE__*/_jsx(InvisibleLink, {
          href: actionUrl,
          children: /*#__PURE__*/_jsx(ActionButton, {
            onClick: onClick,
            type: "button",
            "data-testid": "edit-invite-action",
            theme: theme,
            children: actionText
          })
        })
      })]
    })
  });
};
export var LoggedInAsForm = function LoggedInAsForm(_ref2) {
  var _ref2$theme = _ref2.theme,
      theme = _ref2$theme === void 0 ? undefined : _ref2$theme,
      onClick = _ref2.onClick;
  var currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return /*#__PURE__*/_jsx(LoggedInAsFormLayout, {
    currentUser: currentUser,
    theme: theme,
    onClick: onClick
  });
};