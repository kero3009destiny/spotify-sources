import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonPrimary, ButtonTertiary } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useCurrentArtistIdOrNull } from '../../../../artists';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Box = styled.div.withConfig({
  displayName: "ArtistFundraisingPickUpdateFooter__Box",
  componentId: "h9igsa-0"
})(["display:flex;justify-content:flex-end;"]);
export function ArtistFundraisingPickUpdateFooter(props) {
  var currentArtistId = useCurrentArtistIdOrNull();
  var history = useHistory();
  var t = useT();
  if (!props.isEditing) return null;

  function onCancel() {
    props.setIsEditing(false);
  }

  function onEditLink(e) {
    if (currentArtistId) {
      history.push({
        pathname: "/artist/".concat(currentArtistId, "/profile/fundraising"),
        search: '?editing'
      });
    }

    e.preventDefault();
  }

  return /*#__PURE__*/_jsxs(Box, {
    children: [/*#__PURE__*/_jsx(ButtonTertiary, {
      onClick: onCancel,
      children: t('artistprofile_fundraising_artistfundraisingpickupdatefooter_1', 'cancel', '')
    }), /*#__PURE__*/_jsx(ButtonPrimary, {
      onClick: onEditLink,
      children: t('artistprofile_fundraising_artistfundraisingpickupdatefooter_2', 'edit link', '')
    })]
  });
}