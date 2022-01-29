// ignore-string-externalization
import React from 'react';
import { useCurrentUser } from '../../../features/currentUser';
import { LoginRedirect } from '../../../shared/components/LoggedIn/LoginRedirect';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export function LoginCheck(_ref) {
  var children = _ref.children,
      _ref$allowUnauthentic = _ref.allowUnauthenticated,
      allowUnauthenticated = _ref$allowUnauthentic === void 0 ? false : _ref$allowUnauthentic;
  var currentUser = useCurrentUser();
  var loggedOut = currentUser === null;
  var shouldLogin = loggedOut && !allowUnauthenticated;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: shouldLogin ? /*#__PURE__*/_jsx(LoginRedirect, {}) : children
  });
}