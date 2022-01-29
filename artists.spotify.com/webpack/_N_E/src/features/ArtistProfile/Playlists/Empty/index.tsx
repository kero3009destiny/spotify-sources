import React from 'react';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useT } from '@mrkt/features/i18n';
import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
import { AddToProfile, VSpacer48 } from '../../Elements';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Empty(_ref) {
  var onClick = _ref.onClick,
      authorizedUser = _ref.authorizedUser;
  var viewport = useViewport();
  var isMobile = viewport === Viewport.XS;
  var t = useT();
  var messages = {
    subtitle: {
      id: 'app.components.Playlists.AddPlaylist.Empty.subtitle',
      defaultMessage: t('artistprofile_playlists_empty_1', 'Choose playlists you made on Spotify to feature on your profile', '')
    }
  };

  var handleClick = function handleClick() {
    sendEvent({
      eventCategory: 'Playlists',
      eventAction: 'click',
      eventLabel: 'Edit Playlist'
    });
    onClick();
  };

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(AddToProfile, {
      dataTestId: "empty-playlist",
      disabled: !authorizedUser,
      onClick: handleClick,
      text: messages.subtitle.defaultMessage
    }), isMobile ? /*#__PURE__*/_jsx(VSpacer48, {}) : null]
  });
}