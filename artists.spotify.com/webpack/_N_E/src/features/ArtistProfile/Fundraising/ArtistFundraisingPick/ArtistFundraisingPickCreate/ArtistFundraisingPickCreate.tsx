import React from 'react';
import { useHistory } from 'react-router-dom';
import { useT } from '@mrkt/features/i18n';
import { useCurrentArtistIdOrNull } from '../../../../artists';
import { Title } from '../shared/Title';
import { AddToProfile, VSpacer48 } from '../../../Elements';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export function ArtistFundraisingPickCreate() {
  return /*#__PURE__*/_jsxs("div", {
    "data-testid": "afp-create",
    children: [/*#__PURE__*/_jsx(Title, {}), /*#__PURE__*/_jsx(AddLink, {})]
  });
}

function AddLink() {
  var t = useT();
  var currentArtistId = useCurrentArtistIdOrNull();
  var history = useHistory();
  var fundraisingFormHref = currentArtistId ? "".concat(window.location.origin, "/c/artist/").concat(currentArtistId, "/profile/fundraising") : '';

  function onClick(e) {
    history.push("/artist/".concat(currentArtistId, "/profile/fundraising"));
    e.preventDefault();
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(AddToProfile, {
      text: t('artistprofile_fundraising_artistfundraisingpick_artistfundraisingpickcreate_1', 'Get support directly from fans', ''),
      textHref: fundraisingFormHref,
      onClick: onClick
    }), /*#__PURE__*/_jsx(VSpacer48, {})]
  });
}