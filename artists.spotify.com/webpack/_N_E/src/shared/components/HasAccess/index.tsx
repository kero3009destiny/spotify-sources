// ignore-string-externalization
import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../../features/currentUser';
import { jsx as _jsx } from "react/jsx-runtime";
export function HasAccess(props) {
  var currentUser = useCurrentUser();
  var location = useLocation();

  if (!currentUser || !currentUser.hasAccess) {
    return /*#__PURE__*/_jsx(Redirect, {
      to: "/access".concat(location.search)
    });
  }

  return props.children;
}