import { Backdrop } from '@spotify-internal/encore-web';
import React from 'react';
import { TeamMembersPopover } from './TeamMembersPopover';
import { jsx as _jsx } from "react/jsx-runtime";
export var TeamMembersContainer = function TeamMembersContainer(_ref) {
  var onClose = _ref.onClose;
  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClick: onClose,
    children: /*#__PURE__*/_jsx(TeamMembersPopover, {
      onClose: onClose
    })
  });
};