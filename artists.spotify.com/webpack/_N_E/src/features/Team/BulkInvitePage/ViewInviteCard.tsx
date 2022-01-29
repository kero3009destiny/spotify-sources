import React from 'react';
import { Card, EditButton } from './layout';
import { StatusIcon } from './StatusIcon';
import { WarnSpan } from './layout/ErrSpan';
import { accessLevelName } from '../lib/model/AccessLevel';
import { useT } from '@mrkt/features/i18n';
import { InviteState } from './store/BulkInviteState';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var cardClass = function cardClass(invite) {
  if (invite.state === InviteState.INVITED || invite.state === InviteState.ALREADY_EXISTS) {
    return 'success';
  }

  if (invite.validationErrors.length > 0) {
    return 'error';
  }

  if (invite.serverErrors.length > 0) {
    return 'warning';
  }

  return '';
};

export var ViewInviteCard = function ViewInviteCard(_ref) {
  var invite = _ref.invite,
      onEdit = _ref.onEdit;
  var canEdit = !!onEdit;
  var details = invite.details;
  var t = useT();
  return /*#__PURE__*/_jsxs(Card, {
    className: "truncate ".concat(cardClass(invite)),
    raisesOnHover: canEdit,
    "data-testid": "view-invite-card",
    onClick: onEdit,
    children: [/*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("div", {
        "data-testid": "name",
        className: "name",
        children: /*#__PURE__*/_jsx("b", {
          children: details.fullName
        })
      }), /*#__PURE__*/_jsx("div", {
        "data-testid": "businessEmail",
        className: "businessEmail",
        children: details.businessEmail
      }), invite.serverErrors.length > 0 ? /*#__PURE__*/_jsx(WarnSpan, {
        children: invite.serverErrors.join(', ')
      }) : null]
    }), /*#__PURE__*/_jsx("div", {
      "data-testid": "role",
      className: "role",
      children: details.role
    }), /*#__PURE__*/_jsx("div", {
      "data-testid": "access",
      className: "access",
      children: accessLevelName(details.accessLevel, t)
    }), canEdit ? /*#__PURE__*/_jsx("div", {
      "data-testid": "status",
      className: "status editing ",
      children: /*#__PURE__*/_jsx(EditButton, {
        type: "button",
        onClick: onEdit,
        "data-testid": "edit-invite-action",
        children: t('BULK_INVITE_EDIT_INVITE_CARD', 'Edit', 'Edit')
      })
    }) : /*#__PURE__*/_jsx("div", {
      "data-testid": "status",
      className: "status",
      children: /*#__PURE__*/_jsx(StatusIcon, {
        status: invite.state,
        hasErrors: invite.validationErrors.length > 0
      })
    })]
  });
};