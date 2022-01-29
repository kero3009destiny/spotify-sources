import React, { useState, Fragment } from 'react';
import { PopoverTrigger, Popover, OverlayTrigger, Type, TextLink, spacer8, spacer12, gray10, gray75, gray40, gray85, azure } from '@spotify-internal/encore-web-v3';
import styled from 'styled-components';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useT } from '@mrkt/features/i18n';
import { textOverflow } from '../../../../shared/styles/mixins/textOverflow';
import ConnectedSongsInPlaylistTable from '../SongsInPlaylistTable';
import { useCurrentArtist } from '../../../../features/artists';
import { generateSongDetailUrl } from '../../../../features/CatalogUtils/urls';
import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
import { TextLinkAsLink } from '../../../EncoreCreatorWebHelpers'; // for using component={Link}
// ensures typing works properly

import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledTrackMetaLink = styled(TextLinkAsLink).withConfig({
  displayName: "PlaylistTopSongs__StyledTrackMetaLink",
  componentId: "sc-1eha4zw-0"
})(["", ""], textOverflow()); // uses default TextLink encore component

var StyledTrackMetaLinkButton = styled(TextLink).withConfig({
  displayName: "PlaylistTopSongs__StyledTrackMetaLinkButton",
  componentId: "sc-1eha4zw-1"
})(["", ""], textOverflow());
var StyledPopoverTitle = styled.span.withConfig({
  displayName: "PlaylistTopSongs__StyledPopoverTitle",
  componentId: "sc-1eha4zw-2"
})(["margin-bottom:", ";padding-left:5px;"], spacer8);
var StyledPopover = styled(Popover).withConfig({
  displayName: "PlaylistTopSongs__StyledPopover",
  componentId: "sc-1eha4zw-3"
})(["overflow:visible;"]);
var StyledTrackTitle = styled(Type.h4).attrs({
  variant: Type.body2,
  condensed: true
}).withConfig({
  displayName: "PlaylistTopSongs__StyledTrackTitle",
  componentId: "sc-1eha4zw-4"
})(["display:flex;"]);
var StyledTrackMeta = styled.span.withConfig({
  displayName: "PlaylistTopSongs__StyledTrackMeta",
  componentId: "sc-1eha4zw-5"
})(["", " color:", ";display:inline-block;opacity:", ";"], textOverflow(), gray40, function (props) {
  return props.isDisabled ? 0.5 : 1;
});
var StyledTrackMetaMissing = styled(StyledTrackMeta).withConfig({
  displayName: "PlaylistTopSongs__StyledTrackMetaMissing",
  componentId: "sc-1eha4zw-6"
})(["color:", ";"], gray75);
var StyledDot = styled.span.withConfig({
  displayName: "PlaylistTopSongs__StyledDot",
  componentId: "sc-1eha4zw-7"
})(["padding:0 3px;"]);
var StyledType = styled(Type).withConfig({
  displayName: "PlaylistTopSongs__StyledType",
  componentId: "sc-1eha4zw-8"
})(["width:", ";height:", ";background:", ";display:inline-flex;justify-content:center;align-items:center;margin-left:4px;margin-top:5px;border-radius:3px;"], spacer12, spacer12, gray85);

var trackPopoverEvent = function trackPopoverEvent(uri) {
  sendEvent({
    eventCategory: 'PlaylistPopover',
    eventAction: 'load-playlist',
    eventLabel: uri
  });
};

export var PlaylistTopSongs = function PlaylistTopSongs(props) {
  var _useState = useState(false),
      popover = _useState[0],
      setPopover = _useState[1];

  var data = props.data;
  var artist = useCurrentArtist();
  var viewport = useViewport();
  var singleTrack = data.formatted.trackStats && data.formatted.numTracks === 1 ? data.formatted.trackStats[0] : null;
  var t = useT();

  function renderTrackMetaText() {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: t('MUSIC_PLAYLISTS_c1401c', "{data, plural,\n            one {1 song}\n            other {{data} songs}\n          }", 'This string shows the amount of songs an artist has on an algorithmic playlist. When the user clicks on the link (ex: "10 songs"), they would see a popover with a listing of 10 songs that have been added to these special playlists. This text only appears if an artist has more than 1 track on a playlist. Example Usage: 3 songs', {
        data: data.formatted.numTracks
      })
    });
  }

  return /*#__PURE__*/_jsxs(StyledTrackTitle, {
    children: [!data.formatted.trackStats && /*#__PURE__*/_jsx(StyledTrackMetaMissing, {
      children: /*#__PURE__*/_jsx("span", {
        children: t('MUSIC_PLAYLISTS_c1e0c4', 'Song title not available', '')
      })
    }), singleTrack && (viewport !== Viewport.XS && !singleTrack.isDisabled ? /*#__PURE__*/_jsxs(Fragment, {
      children: [/*#__PURE__*/_jsx(StyledTrackMetaLink, {
        to: generateSongDetailUrl(singleTrack, artist.id),
        children: singleTrack.trackName
      }), singleTrack.showSplitRightsBadge && /*#__PURE__*/_jsx(StyledType, {
        title: t('MUSIC_PLAYLISTS_34d482', 'You have split rights to this song', ''),
        color: gray10,
        weight: Type.bold,
        variant: Type.body4,
        children: "S"
      })]
    }) : /*#__PURE__*/_jsx(StyledTrackMeta, {
      isDisabled: singleTrack.isDisabled,
      title: singleTrack.isDisabled ? t('MUSIC_PLAYLISTS_73b3f3', "This song isn't part of your current catalog", '') : undefined,
      children: singleTrack.trackName
    })), data.formatted.trackStats && data.formatted.numTracks > 1 && (viewport !== Viewport.XS ? /*#__PURE__*/_jsx(PopoverTrigger, {
      placement: OverlayTrigger.bottomRight,
      onShow: function onShow() {
        return setPopover(true);
      },
      onHide: function onHide() {
        return setPopover(false);
      },
      overlay: popover && /*#__PURE__*/_jsx(StyledPopover, {
        large: true,
        popoverTitle: /*#__PURE__*/_jsx(StyledPopoverTitle, {
          children: t('MUSIC_PLAYLISTS_e666ad', 'Top Songs', '')
        }),
        arrow: Popover.topLeft,
        children: /*#__PURE__*/_jsx(ConnectedSongsInPlaylistTable, {
          artistId: artist.id,
          data: data
        })
      }),
      children: /*#__PURE__*/_jsx(StyledTrackMetaLinkButton, {
        type: "button",
        onClick: function onClick() {
          return trackPopoverEvent(data.uri);
        },
        children: /*#__PURE__*/_jsx("span", {
          children: renderTrackMetaText()
        })
      })
    }) : /*#__PURE__*/_jsx(StyledTrackMeta, {
      children: renderTrackMetaText()
    })), data.isAlgotorial && /*#__PURE__*/_jsxs(Fragment, {
      children: [/*#__PURE__*/_jsx(StyledDot, {
        children: "\u2022"
      }), /*#__PURE__*/_jsx(Type, {
        color: azure,
        children: t('MUSIC_PLAYLISTS_9f1667', 'Personalized', '')
      })]
    })]
  });
};