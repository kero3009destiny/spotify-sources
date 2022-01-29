// ignore-string-externalization
import React from 'react';
import { DialogFullScreen as MrktDialogFullscreen } from '@mrkt/features/Dialog';
import { ResetLightTheme } from './ResetLightTheme';
import { jsx as _jsx } from "react/jsx-runtime";
export function DialogFullScreen(props) {
  return /*#__PURE__*/_jsx(ResetLightTheme, {
    children: /*#__PURE__*/_jsx(MrktDialogFullscreen, {
      dialogId: "profile-create-fundraising-pick-dialog",
      onClose: props.onClose,
      onEscape: props.onEscape,
      navStepper: props.navStepper,
      dialogTitle: props.dialogTitle,
      bodyTitle: props.bodyTitle,
      body: props.body,
      footer: props.footer
    })
  });
}