// ignore-string-externalization
import React from 'react';
import { useCurrentSongId } from './hooks/useCurrentSongId';
import ConnectedCanonicalCheck from './CanonicalCheck';
import ConnectedSong from '.';
import { jsx as _jsx } from "react/jsx-runtime";

/* eslint-disable-next-line import/no-default-export */
export default function SongRoute(props) {
  var songId = useCurrentSongId();
  return (
    /*#__PURE__*/
    // @ts-ignore
    _jsx(ConnectedCanonicalCheck, {
      songId: songId,
      children: function children(error) {
        return /*#__PURE__*/_jsx(ConnectedSong, {
          toRender: props.toRender,
          match: props.match,
          canonicalError: error,
          children: props.children
        }, songId);
      }
    }, songId)
  );
}