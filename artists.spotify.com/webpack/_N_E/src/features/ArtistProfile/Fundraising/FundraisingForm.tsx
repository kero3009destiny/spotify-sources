// ignore-string-externalization
import React from 'react';
import { ErrorBoundary } from '@mrkt/features/Platform';
import { DialogFullScreen } from './components/DialogFullScreen';
import { useFundraisingWizard } from './lib/useFundraisingWizard';
import { jsx as _jsx } from "react/jsx-runtime";

function FundraisingWizardForm() {
  var _useFundraisingWizard = useFundraisingWizard(),
      dialogBody = _useFundraisingWizard.dialogBody,
      dialogBodyTitle = _useFundraisingWizard.dialogBodyTitle,
      dialogFooter = _useFundraisingWizard.dialogFooter,
      dialogNavStepper = _useFundraisingWizard.dialogNavStepper,
      dialogOnClose = _useFundraisingWizard.dialogOnClose,
      dialogOnEscape = _useFundraisingWizard.dialogOnEscape,
      dialogTitle = _useFundraisingWizard.dialogTitle;

  return /*#__PURE__*/_jsx(DialogFullScreen, {
    onClose: dialogOnClose,
    onEscape: dialogOnEscape,
    navStepper: dialogNavStepper,
    dialogTitle: dialogTitle,
    bodyTitle: dialogBodyTitle,
    body: dialogBody,
    footer: dialogFooter
  });
}

export function FundraisingForm() {
  return /*#__PURE__*/_jsx(ErrorBoundary, {
    fallback: null,
    name: "artist-fundraising-pick",
    children: /*#__PURE__*/_jsx(FundraisingWizardForm, {})
  });
}