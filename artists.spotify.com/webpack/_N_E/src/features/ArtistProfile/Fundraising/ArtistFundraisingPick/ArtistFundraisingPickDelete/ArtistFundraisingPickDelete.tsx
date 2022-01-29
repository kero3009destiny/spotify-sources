import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import React from 'react';
import { ButtonTertiary } from '@spotify-internal/encore-web';
import { DeleteConfirmation } from './DeleteConfirmation';
import { useConfirmationDialog } from './useConfirmationDialog';
import { useDelete } from './useDelete';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function ArtistFundraisingPickDelete(props) {
  var t = useT();

  var _useConfirmationDialo = useConfirmationDialog(),
      closeConfirmationDialog = _useConfirmationDialo.close,
      confirmationDialogIsOpen = _useConfirmationDialo.isOpen,
      openConfirmationDialog = _useConfirmationDialo.open;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      shouldShowLoadingOverlay = _React$useState2[0],
      setLoading = _React$useState2[1];

  var sendDeleteRequest = useDelete(props.onSuccess, props.onFailure);

  function onConfirm() {
    return _onConfirm.apply(this, arguments);
  }

  function _onConfirm() {
    _onConfirm = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(true);
              _context.next = 3;
              return sendDeleteRequest();

            case 3:
              setLoading(false); // Don't close confirmation dialog until after loading is complete since the
              // loading indicator lives in the DeleteConfirmation component subtree

              closeConfirmationDialog();
              props.onConfirm();

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _onConfirm.apply(this, arguments);
  }

  function onCancel() {
    closeConfirmationDialog();
    props.onCancel();
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ButtonTertiary, {
      buttonSize: ButtonTertiary.sm,
      onClick: function onClick() {
        openConfirmationDialog();
      },
      className: "encore-muted-accent-set",
      condensed: true,
      children: t('artistprofile_fundraising_artistfundraisingpick_artistfundraisingpickdelete_1', 'Remove', 'CTA to remove Fundraising pick')
    }), confirmationDialogIsOpen ? /*#__PURE__*/_jsx(DeleteConfirmation, {
      loading: shouldShowLoadingOverlay,
      onCancel: onCancel,
      onConfirm: onConfirm
    }) : null]
  });
}