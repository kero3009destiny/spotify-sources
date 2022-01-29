import _slicedToArray from "/var/jenkins_home/workspace/tingle.95d1c772-977c-47f0-ae13-caaa6a239f46/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
var storedArtistId = '';

function getStoredArtistId() {
  return storedArtistId;
}

export function usePitchActionArtistId() {
  var _React$useState = React.useState(getStoredArtistId),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      artistId = _React$useState2[0],
      setId = _React$useState2[1];

  function setArtistId(id) {
    storedArtistId = id;
    setId(id);
  }

  function clearId() {
    storedArtistId = '';
  }

  return {
    artistId: artistId,
    setArtistId: setArtistId,
    clearId: clearId
  };
}