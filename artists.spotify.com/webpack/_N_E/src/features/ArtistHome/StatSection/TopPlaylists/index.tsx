import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { IconPlaylist, spacer4 } from '@spotify-internal/encore-web';
import { numFormatting, numFollowersFormatting, playlistLinksOut, goToPlaylist } from '../../HomeHelper';
import { useT, useNumberFormatter } from '@mrkt/features/i18n';
import * as Style from '../Style';
import StatsSubHeader from '../StatsSubHeader';
import StatsCTABtn from '../StatsCTABtn';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var PlaylistRow = styled(Style.StatsRowContainer).withConfig({
  displayName: "TopPlaylists__PlaylistRow",
  componentId: "sc-1q9kd2i-0"
})(["position:relative;"]);
var StyledLink = styled(Style.StatsTextLink).withConfig({
  displayName: "TopPlaylists__StyledLink",
  componentId: "sc-1q9kd2i-1"
})(["&::after{content:url('data:image/svg+xml, %3Csvg%20data-name%3D%22Icons%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%234100f5%22%20stroke-width%3D%22.8pt%22%20vector-effect%3D%22non-scaling-stroke%22%20d%3D%22M5.47%2018.53L18.69%205.31M8%205.3l10.69.01.02%2010.69%22%2F%3E%3C%2Fsvg%3E');margin-left:", ";vertical-align:middle;}"], spacer4);
var TopPlaylists = /*#__PURE__*/React.memo(function (props) {
  var topPlaylists = props.topPlaylists;
  var t = useT();
  var router = useRouter();
  var numberFormatter = useNumberFormatter();

  var TopPlaylistsHeader = /*#__PURE__*/_jsx(StatsSubHeader, {
    title: t('S4A_LOGGED_IN_HOME_cdc053', 'Your top playlists', ''),
    dataTitle: t('S4A_LOGGED_IN_HOME_590935', 'streams', '')
  });

  var AllPlaylistsBtn = /*#__PURE__*/_jsx(StatsCTABtn, {
    title: t('S4A_LOGGED_IN_HOME_f382cc', 'See playlists', ''),
    url: "/artist/".concat(props.artist.id, "/music/playlists?time-filter=7day"),
    action: "playlists",
    label: "goToPlaylists"
  });

  if (router && router.query && router.query._lqa === 'showNoTopPlaylists') {
    return /*#__PURE__*/_jsxs(React.Fragment, {
      children: [TopPlaylistsHeader, /*#__PURE__*/_jsx(Style.StatsEmptyText, {
        "data-testid": "empty-playlists",
        children: t('S4A_LOGGED_IN_HOME_0cd2d9', 'No stats for this time period. Stats appear the day after you get streams from a playlist.', '')
      }), AllPlaylistsBtn]
    });
  } else if (router && router.query && router.query._lqa === 'showTopPlaylists') {
    topPlaylists = [{
      title: 'Discover Weekly',
      followers: 30,
      listeners: 700,
      streams: 500,
      uri: 'spotify:playlist:playlist1',
      isPersonalized: true
    }];
  }

  if (topPlaylists.length > 0) {
    var sortedPlaylists = topPlaylists.sort(function (a, b) {
      if (a.streams === b.streams) return 0;
      return a.streams > b.streams ? -1 : 1;
    });
    return /*#__PURE__*/_jsxs("div", {
      "data-testid": "tplaylists",
      children: [TopPlaylistsHeader, sortedPlaylists.slice(0, 3).map(function (playlist) {
        return /*#__PURE__*/_jsx(PlaylistRow, {
          "data-testid": "tplaylists-row",
          isDisabled: !playlistLinksOut(playlist.uri, playlist.isPersonalized),
          onClick: playlistLinksOut(playlist.uri, playlist.isPersonalized) ? function () {
            return goToPlaylist(playlist.uri);
          } : null,
          children: /*#__PURE__*/_jsxs(Style.StatsRow, {
            children: [/*#__PURE__*/_jsxs(Style.StatsMediaEntity, {
              children: [/*#__PURE__*/_jsx(Style.StatsMediaCover, {
                imgSrc: playlist.thumbnailUrl,
                size: 48
                /* is declared as const 64 upstream ... */
                ,
                defaultIcon: /*#__PURE__*/_jsx(IconPlaylist, {
                  iconSize: 24
                })
              }), /*#__PURE__*/_jsxs(Style.StatsMediaInfo, {
                children: [/*#__PURE__*/_jsx(Style.CenteredFlexDiv, {
                  children: /*#__PURE__*/_jsx(Style.StatsMediaTitle, {
                    children: playlistLinksOut(playlist.uri, playlist.isPersonalized) ? /*#__PURE__*/_jsx(StyledLink, {
                      href: "#",
                      children: playlist.title
                    }) : playlist.title
                  })
                }), /*#__PURE__*/_jsx(Style.StatsDeltaTitle, {
                  children: numFollowersFormatting(playlist.followers, t, numberFormatter)
                })]
              })]
            }), /*#__PURE__*/_jsx(Style.StatsDeltaContainer, {
              children: /*#__PURE__*/_jsx(Style.StatsDeltaTitle, {
                children: numFormatting(playlist.streams, numberFormatter)
              })
            })]
          })
        }, playlist.uri);
      }), AllPlaylistsBtn]
    });
  }

  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [TopPlaylistsHeader, /*#__PURE__*/_jsx(Style.StatsEmptyText, {
      "data-testid": "empty-playlists",
      children: t('S4A_LOGGED_IN_HOME_0cd2d9', 'No stats for this time period. Stats appear the day after you get streams from a playlist.', '')
    }), AllPlaylistsBtn]
  });
});
TopPlaylists.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  topPlaylists: PropTypes.arrayOf(PropTypes.shape({
    followers: PropTypes.number,
    listeners: PropTypes.number,
    thumbnailUrl: PropTypes.string,
    uri: PropTypes.string,
    title: PropTypes.string,
    isPersonalized: PropTypes.bool
  }))
};
/* eslint-disable-next-line import/no-default-export */

export default TopPlaylists;