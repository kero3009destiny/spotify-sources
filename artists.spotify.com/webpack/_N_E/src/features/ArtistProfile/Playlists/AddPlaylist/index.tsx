import React from 'react';
import styled from 'styled-components';
import { normalizeImageWithMinimumSize } from '@mrkt/features/mediahelpers';
import { useT } from '@mrkt/features/i18n';
import { MediaWithSearch } from '../../Card/Horizontal/MediaWithSearch/index';
import { jsx as _jsx } from "react/jsx-runtime";
var MIN_IMAGE_WIDTH = 130;
var AddPlaylistWrapper = styled.div.withConfig({
  displayName: "AddPlaylist__AddPlaylistWrapper",
  componentId: "sc-4wplfy-0"
})(["display:block;flex-grow:1;padding-bottom:24px;width:100%;"]);
export var AddPlaylist = function AddPlaylist(_ref) {
  var onAddPlaylist = _ref.onAddPlaylist;
  var t = useT();
  var messages = {
    placeholder: {
      id: 'app.components.Playlists.AddPlaylist.placeholder',
      defaultMessage: t('artistprofile_playlists_addplaylist_1', 'Choose a playlist', '')
    }
  };

  var onSelectPlaylist = function onSelectPlaylist(_ref2) {
    var uri = _ref2.uri,
        name = _ref2.name,
        images = _ref2.images;
    onAddPlaylist({
      uri: uri,
      subtitle: name,
      title: name,
      image: normalizeImageWithMinimumSize(images, MIN_IMAGE_WIDTH)
    });
  };

  return /*#__PURE__*/_jsx(AddPlaylistWrapper, {
    "data-testid": "add-playlist-wrapper",
    children: /*#__PURE__*/_jsx(MediaWithSearch, {
      placeholder: messages.placeholder.defaultMessage,
      onSelect: onSelectPlaylist,
      qaId: "artist-playlists-picker-input"
    })
  });
};