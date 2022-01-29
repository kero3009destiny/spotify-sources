import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { PencilButton } from '../../../PencilButton';
import { jsx as _jsx } from "react/jsx-runtime";
export function EditButton(props) {
  var t = useT();
  return /*#__PURE__*/_jsx(PencilButton, {
    onClick: function onClick() {
      return props.onClick();
    },
    testIdPrefix: "artist-fundraising-pick-",
    "aria-label": t('artistprofile_fundraising_artistfundraisingpick_artistfundraisingpickupdate_editbutton_1', 'edit artist fundraising pick', '')
  });
}