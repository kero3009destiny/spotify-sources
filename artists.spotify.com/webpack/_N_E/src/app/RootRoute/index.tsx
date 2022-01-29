// ignore-string-externalization
import React from 'react';
import { LoggedIn } from '../../shared/components/LoggedIn';
import { HasAccess } from '../../shared/components/HasAccess';
import Root from './Root';
/* eslint-disable-next-line import/no-default-export */

import { jsx as _jsx } from "react/jsx-runtime";
export default function RootRoute() {
  return /*#__PURE__*/_jsx(LoggedIn, {
    children: /*#__PURE__*/_jsx(HasAccess, {
      children: /*#__PURE__*/_jsx(Root, {})
    })
  });
}