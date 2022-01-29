// ignore-string-externalization
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useCurrentUser, useIsEmployee } from '../../features/currentUser';
import { getLastVisitedArtist } from '../../shared/lib/lastVisitedArtist';
import { useArtists } from '../../features/artists';
/* eslint-disable-next-line import/no-default-export */

import { jsx as _jsx } from "react/jsx-runtime";
export default function Root() {
  var currentUser = useCurrentUser();
  var artists = useArtists();
  var isEmployee = useIsEmployee();
  var lastVisitedArtist = getLastVisitedArtist(currentUser.username);
  var artist = artists.find(function (item) {
    return item.id === lastVisitedArtist;
  }) || artists[0] || isEmployee && {
    id: '3FP9zWr3P1KWfvmChpnsB6'
  };

  if (artist) {
    return /*#__PURE__*/_jsx(Redirect, {
      to: "/artist/".concat(artist.id, "/home")
    });
  }

  return /*#__PURE__*/_jsx(Redirect, {
    to: "/add-artist"
  });
}