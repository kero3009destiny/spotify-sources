import React from 'react';
import styled from 'styled-components';
import { Backdrop, ButtonTertiary, LoadingIndicator, Type } from '@spotify-internal/encore-web';
import { DialogAlert } from '@mrkt/features/Dialog';
import { useT } from '@mrkt/features/i18n';
import { Delay } from '../../../../../shared/components/Delay';
import { darkModeKleinBlue } from '../../../utils';
import { DarkModeLoadingIndicator } from '../../../Elements';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function DeleteConfirmation(props) {
  function onCloseBackdrop() {
    if (!props.loading) {
      props.onCancel();
    }
  }

  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: onCloseBackdrop,
    children: props.loading ? /*#__PURE__*/_jsx(Loading, {}) : /*#__PURE__*/_jsx(DeleteConfirmationDialog, {
      onCancel: props.onCancel,
      onConfirm: props.onConfirm
    })
  });
}

function Loading() {
  return /*#__PURE__*/_jsx(Delay, {
    time: 300,
    children: /*#__PURE__*/_jsx(DarkModeLoadingIndicator, {
      indicatorSize: LoadingIndicator.lg
    })
  });
}

var BlueButtonTertiary = styled(ButtonTertiary).attrs({
  buttonSize: ButtonTertiary.sm,
  condensed: true
}).withConfig({
  displayName: "DeleteConfirmation__BlueButtonTertiary",
  componentId: "sc-939lww-0"
})(["color:", ";"], darkModeKleinBlue);

function DeleteConfirmationDialog(props) {
  var t = useT();
  return /*#__PURE__*/_jsx(DialogAlert, {
    dialogId: "profile-remove-fundraising-pick-dialog",
    dialogTitle: t('artistprofile_artistfundraisingpickdelete_deleteconfirmation_1', 'Remove Artist Fundraising Pick?', 'Artist Fundraising Pick should be translated as it is in the consumer product. Refer to translation memory.'),
    body: /*#__PURE__*/_jsx(Type, {
      as: Type.p,
      condensed: true,
      children: t('artistprofile_artistfundraisingpickdelete_deleteconfirmation_2', 'This will remove the fundraising link from the top of your profile on Spotify.', '')
    }),
    footer: /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx(ButtonTertiary, {
        buttonSize: ButtonTertiary.sm,
        condensed: true,
        onClick: props.onCancel,
        children: t('artistprofile_artistfundraisingpickdelete_deleteconfirmation_3', 'Cancel', '')
      }), /*#__PURE__*/_jsx(BlueButtonTertiary, {
        onClick: props.onConfirm,
        children: t('artistprofile_artistfundraisingpickdelete_deleteconfirmation_4', 'Remove', '')
      })]
    })
  });
}