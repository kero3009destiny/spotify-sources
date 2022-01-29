import React, { useState } from 'react';
import { Backdrop, ButtonPrimary, ButtonTertiary } from '@spotify-internal/encore-web';
import { DialogConfirmation } from '@mrkt/features/Dialog';
import { TeamSwitcher } from '@mrkt/features/teamswitcher';
import { useT } from '@mrkt/features/i18n';
import { useCurrentArtist } from '../../../features/artists';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ProfileSwitcheroo = function ProfileSwitcheroo(props) {
  var artist = useCurrentArtist();
  var t = useT();

  var _useState = useState(),
      selected = _useState[0],
      setSelected = _useState[1];

  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: props.onClose,
    children: /*#__PURE__*/_jsx(DialogConfirmation, {
      dialogId: "profile-confirm-team-dialog",
      dialogTitle: t('artistprofile_profileswitcheroo_1', 'Confirm your team', ''),
      body: /*#__PURE__*/_jsx(TeamSwitcher, {
        selectedTeam: selected,
        action: "artistidentity.edit.v1",
        resourceUri: "spotify:artist:".concat(artist.id),
        onSelect: function onSelect(team, skipConfirmation) {
          setSelected(team);

          if (skipConfirmation) {
            props.onSubmit(team);
          }
        },
        switcherTitle: t('artistprofile_profileswitcheroo_2', 'You’re acting on behalf of this team. Is that correct?', '')
      }),
      footer: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(ButtonTertiary, {
          onClick: props.onClose,
          buttonSize: ButtonTertiary.sm,
          condensed: true,
          "data-testid": "profile-switcheroo-cancel",
          children: t('artistprofile_profileswitcheroo_3', 'Cancel', '')
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          onClick: function onClick() {
            return props.onSubmit(selected);
          },
          buttonSize: ButtonPrimary.sm,
          disabled: !selected,
          "data-testid": "profile-switcheroo-confirm",
          children: t('artistprofile_profileswitcheroo_4', 'Confirm', '')
        })]
      })
    })
  });
};