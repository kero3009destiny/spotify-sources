import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { IconTrack } from '@spotify-internal/encore-web';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { numFormatting } from '../../HomeHelper';
import { useT, useNumberFormatter } from '@mrkt/features/i18n';
import * as Style from '../Style';
import StatsSubHeader from '../StatsSubHeader';
import StatsCTABtn from '../StatsCTABtn';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SongTitle = styled(Style.StatsMediaTitle).withConfig({
  displayName: "TopSongs__SongTitle",
  componentId: "sc-1b7hyde-0"
})(["padding-bottom:3px;"]);
var TopSongs = /*#__PURE__*/React.memo(function (props) {
  var topSongs = props.topSongs;
  var t = useT();
  var router = useRouter();
  var numberFormatter = useNumberFormatter();

  var TopHeader = /*#__PURE__*/_jsx(StatsSubHeader, {
    title: t('S4A_LOGGED_IN_HOME_281dba', 'Your top songs', ''),
    dataTitle: t('S4A_LOGGED_IN_HOME_590935', 'streams', '')
  });

  var AllSongsBtn = /*#__PURE__*/_jsx(StatsCTABtn, {
    url: "/artist/".concat(props.artist.id, "/music/songs?time-filter=7day"),
    action: "songs",
    label: "goToSongs",
    title: t('S4A_LOGGED_IN_HOME_6d3348', 'See songs', '')
  });

  if (router && router.query && router.query._lqa === 'showNoTopSongs') {
    return /*#__PURE__*/_jsxs(React.Fragment, {
      children: [TopHeader, /*#__PURE__*/_jsx(Style.StatsEmptyText, {
        "data-testid": "empty-songs",
        children: t('S4A_LOGGED_IN_HOME_132663', 'No stats for this time period. Stats appear when a song has at least 10 listeners within the last 7 days.', '')
      }), AllSongsBtn]
    });
  } else if (router && router.query && router.query._lqa === 'showTopSongs') {
    topSongs = [{
      trackName: 'Track 1',
      pictureUri: 'https://s4a.scdn.co/test/ghost-card.png',
      trend: 30,
      numListeners: 700,
      trackUri: 'spotify:track:cooltrack1',
      isDisabled: false
    }, {
      trackName: 'Track 1',
      pictureUri: 'https://s4a.scdn.co/test/ghost-card.png',
      trend: 30,
      numListeners: 700,
      trackUri: 'spotify:track:cooltrack1',
      isDisabled: false
    }, {
      trackName: 'Track 1',
      pictureUri: 'https://s4a.scdn.co/test/ghost-card.png',
      trend: 30,
      numListeners: 700,
      trackUri: 'spotify:track:cooltrack1',
      isDisabled: false
    }];
  }

  if (topSongs.length > 0) {
    return /*#__PURE__*/_jsxs("div", {
      "data-testid": "tsongs",
      children: [TopHeader, topSongs.slice(0, 3).map(function (track) {
        return /*#__PURE__*/_jsx(Style.StatsRowContainer, {
          "data-testid": "tsongs-row" // @ts-ignore
          ,
          hover: true,
          isDisabled: track.isDisabled,
          title: track.isDisabled ? "This song isn't part of your current catalog" : undefined,
          onClick: function onClick() {
            if (track.isDisabled) return;
            sendEvent({
              eventCategory: 'Navigate',
              eventAction: 'songs',
              eventLabel: "".concat(track.trackUri)
            });
            var segmentFilter = 'streams';
            props.history.push("/artist/".concat(props.artist.id, "/song/").concat(track.trackUri.replace("spotify:track:", ""), "?segment-filter=").concat(segmentFilter, "&time-filter=7day"));
          },
          children: /*#__PURE__*/_jsxs(Style.StatsRow, {
            children: [/*#__PURE__*/_jsxs(Style.StatsMediaEntity, {
              children: [/*#__PURE__*/_jsx(Style.StatsMediaCover, {
                imgSrc: track.pictureUri,
                size: 48
                /* is declared as 64 const upstream */
                // @ts-ignore
                ,
                defaultIcon: /*#__PURE__*/_jsx(IconTrack, {
                  size: 24
                })
              }), /*#__PURE__*/_jsx(Style.StatsMediaInfo, {
                children: /*#__PURE__*/_jsx(SongTitle, {
                  children: track.isDisabled ? track.trackName : /*#__PURE__*/_jsx(Style.StatsTextLink, {
                    href: "#",
                    children: track.trackName
                  })
                })
              })]
            }), /*#__PURE__*/_jsx(Style.StatsDeltaContainer, {
              children: /*#__PURE__*/_jsx(Style.StatsDeltaTitle, {
                children: numFormatting(track.numStreams, numberFormatter)
              })
            })]
          })
        }, track.trackUri);
      }), AllSongsBtn]
    });
  }

  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [TopHeader, /*#__PURE__*/_jsx(Style.StatsEmptyText, {
      "data-testid": "empty-songs",
      children: t('S4A_LOGGED_IN_HOME_132663', 'No stats for this time period. Stats appear when a song has at least 10 listeners within the last 7 days.', '')
    }), AllSongsBtn]
  });
});
TopSongs.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  topSongs: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    pictureUri: PropTypes.string,
    trend: PropTypes.number,
    numListeners: PropTypes.number,
    numStreams: PropTypes.number,
    trackUri: PropTypes.string,
    // @ts-ignore
    isDisabled: PropTypes.boolean
  })),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
/* eslint-disable-next-line import/no-default-export */

export default TopSongs;