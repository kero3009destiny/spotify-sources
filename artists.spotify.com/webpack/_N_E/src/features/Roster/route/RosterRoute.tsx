// ignore-string-externalization
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoggedIn } from '../../../shared/components/LoggedIn';
import { Roster } from '../Roster';
/* eslint-disable-next-line import/no-default-export */

import { jsx as _jsx } from "react/jsx-runtime";
export default function RosterRoute() {
  return /*#__PURE__*/_jsx(LoggedIn, {
    children: /*#__PURE__*/_jsx(Switch, {
      children: /*#__PURE__*/_jsx(Route, {
        exact: true,
        path: "/roster",
        component: Roster
      })
    })
  });
}