import React from 'react';
import { ArtistFundraisingPickDelete } from '../ArtistFundraisingPickDelete';
import { EditButton } from '../ArtistFundraisingPickUpdate/EditButton';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export function TitleActions(props) {
  var t = useT();

  function stopEditing() {
    props.setIsEditing(false);
  }

  function startEditing() {
    props.setIsEditing(true);
  }

  if (props.isEditing) {
    return /*#__PURE__*/_jsx(ArtistFundraisingPickDelete, {
      onConfirm: stopEditing,
      onCancel: function onCancel() {
        /*
         * User stays in edit mode if they cancel deletion. They then have the
         * option to exit edit mode via the cancel edit mode button.
         */
      },
      onFailure: function onFailure() {
        props.setAlert({
          error: true,
          title: t('artistprofile_fundraising_artistfundraisingpick_shared_titleactions_1', 'Something went wrong. Please try again.', '')
        });
      },
      onSuccess: function onSuccess() {
        props.setAlert({
          title: t('artistprofile_fundraising_artistfundraisingpick_shared_titleactions_2', 'We removed your fundraising link. It may take up to 24 hours to update on Spotify.', '')
        });
      }
    });
  }

  return /*#__PURE__*/_jsx(EditButton, {
    onClick: startEditing
  });
}