import React from 'react';
import { ArtistFundraisingPickCreate } from './ArtistFundraisingPickCreate';
import { ArtistFundraisingPickUpdate } from './ArtistFundraisingPickUpdate';
import { useCurrentArtistProfile } from '../../utils';
import { useAuthorized } from '../lib';
import { jsx as _jsx } from "react/jsx-runtime";
export function ArtistFundraisingPick(props) {
  var shouldShow = useAuthorized();
  var artistProfile = useCurrentArtistProfile();
  if (!shouldShow) return null;
  var artistFundraisingPick = artistProfile === null || artistProfile === void 0 ? void 0 : artistProfile.artistFundraisingPick;

  if (artistFundraisingPick == null) {
    return /*#__PURE__*/_jsx(ArtistFundraisingPickCreate, {});
  }

  return /*#__PURE__*/_jsx(ArtistFundraisingPickUpdate, {
    url: artistFundraisingPick.url,
    partner: artistFundraisingPick.channel,
    setAlert: props.setAlert
  });
}