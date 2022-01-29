import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useT } from '@mrkt/features/i18n';
import { setAlert, clearAlert } from '../../../shared/store';
import { jsx as _jsx } from "react/jsx-runtime";
export function useSongPermissionAlert(artistId, status) {
  var dispatch = useDispatch();
  var t = useT();
  useEffect(function () {
    if (status === 403) {
      dispatch(setAlert({
        title: t('SONG_PERMISSION_da2bdc', 'You don’t have access to this song because it’s not in your catalog.', ''),
        subtitle: /*#__PURE__*/_jsx("a", {
          href: "/c/artist/".concat(artistId, "/catalog"),
          title: "back to music",
          children: t('SONG_PERMISSION_47bc85', 'Back to Music', '')
        }),
        error: true
      }));
    }
  }, [artistId, status]); // eslint-disable-line react-hooks/exhaustive-deps

  return function () {
    dispatch(clearAlert());
  };
}