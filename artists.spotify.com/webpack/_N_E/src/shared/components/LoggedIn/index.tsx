// ignore-string-externalization
import React from 'react';
import { useCurrentUser } from '../../../features/currentUser';
import { LoginRedirect } from './LoginRedirect';
import { jsx as _jsx } from "react/jsx-runtime";
export function LoggedIn(props) {
  var currentUser = useCurrentUser();

  if (!currentUser) {
    return /*#__PURE__*/_jsx(LoginRedirect, {});
  }

  return props.children;
}