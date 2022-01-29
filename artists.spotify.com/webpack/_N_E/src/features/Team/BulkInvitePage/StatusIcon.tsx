// ignore-string-externalization
import { IconCheck, IconClock, IconX, LoadingIndicator } from '@spotify-internal/encore-web';
import React from 'react';
import { InviteState } from './store/BulkInviteState';
import { jsx as _jsx } from "react/jsx-runtime";
export var StatusIcon = function StatusIcon(_ref) {
  var status = _ref.status,
      hasErrors = _ref.hasErrors;

  if (hasErrors && status !== InviteState.ALREADY_EXISTS) {
    return /*#__PURE__*/_jsx(IconX, {
      semanticColor: "textNegative",
      "data-testid": "status-error"
    });
  }

  switch (status) {
    case InviteState.INVITING:
      return /*#__PURE__*/_jsx(LoadingIndicator, {
        "data-testid": "status-inviting",
        indicatorSize: LoadingIndicator.sm,
        style: {
          marginLeft: '-8px'
        }
      });

    case InviteState.INVITED:
      return /*#__PURE__*/_jsx(IconCheck, {
        iconSize: 32,
        style: {
          strokeWidth: '2px'
        },
        "data-testid": "status-invited",
        semanticColor: "textPositive"
      });

    case InviteState.ALREADY_EXISTS:
      return /*#__PURE__*/_jsx(IconCheck, {
        iconSize: 32,
        style: {
          strokeWidth: '2px'
        },
        "data-testid": "status-invited",
        semanticColor: "textPositive"
      });

    default:
      return /*#__PURE__*/_jsx(IconClock, {
        semanticColor: "textSubdued",
        iconSize: 32,
        "data-testid": "status-pending"
      });
  }
};