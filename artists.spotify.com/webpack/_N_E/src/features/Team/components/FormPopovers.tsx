import { Popover } from '@spotify-internal/encore-web';
import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export var AccessLevelPopover = function AccessLevelPopover() {
  var t = useT();
  return /*#__PURE__*/_jsx(Popover, {
    large: true,
    arrow: Popover.topRight,
    popoverTitle: t('ADMIN_POPOVER_TITLE', "You're the admin by default", 'Your access level is admin by default'),
    children: t('ADMIN_POPOVER_BODY', 'Admins can add, update, and remove team members, billing info, and artist info.', 'The admin access level has the most functionality.')
  });
};
export var RolePopover = function RolePopover() {
  var t = useT();
  return /*#__PURE__*/_jsx(Popover, {
    large: true,
    arrow: Popover.topRight,
    children: t('ROLE_POPOVER_BODY', 'Help collaborators understand what everyone does within your organization.', 'What is your role in this organization?')
  });
};