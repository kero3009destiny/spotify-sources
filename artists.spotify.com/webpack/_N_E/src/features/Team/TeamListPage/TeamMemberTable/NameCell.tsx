// ignore-string-externalization
import React from 'react';
import { IconBadgeWithText } from '../../components/IconBadge/IconBadgeWithText';
import { jsx as _jsx } from "react/jsx-runtime";
export var NameCell = function NameCell(_ref) {
  var teamMember = _ref.teamMember;
  var fullName = teamMember.fullName,
      businessEmail = teamMember.businessEmail;
  var name = (fullName || '').trim() || (teamMember.status === 'active' ? teamMember.username : null) || '—';
  return /*#__PURE__*/_jsx(IconBadgeWithText, {
    text: name,
    secondaryText: businessEmail || '—'
  });
};