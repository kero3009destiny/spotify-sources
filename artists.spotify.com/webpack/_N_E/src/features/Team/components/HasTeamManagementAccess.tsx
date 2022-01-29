// ignore-string-externalization
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCanManageTeams } from '../lib/api/useCanManageTeams';
import { jsx as _jsx } from "react/jsx-runtime";
export var HasTeamManagementAccess = function HasTeamManagementAccess(_ref) {
  var children = _ref.children;
  return useCanManageTeams() ? children : /*#__PURE__*/_jsx(Redirect, {
    to: "/"
  });
};