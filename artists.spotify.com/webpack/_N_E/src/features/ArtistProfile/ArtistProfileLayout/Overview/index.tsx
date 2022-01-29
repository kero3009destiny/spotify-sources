import React from 'react';
import classNames from 'classnames';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { useT } from '@mrkt/features/i18n';
import { EditArtistPick } from '../../ArtistPick/EditArtistPick';
import Catalog from '../../Catalog';
import { ArtistFundraisingPick } from '../../Fundraising';
import { useAuthorized as useIsAFPAuthorized } from '../../Fundraising/lib/useAuthorized';
import NewRelease from '../../NewRelease';
import { default as Playlists } from '../../Playlists';
import Popular from '../../Popular';
import { GapCol, GapRow } from './Elements';
import styles from './index.module.scss'; // eslint-disable-next-line @typescript-eslint/no-redeclare

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

/*
  We need to massage the playlists data to make it compatible for
  selection as an entity for EntityPicker
*/
function formatPlaylistsForSearch(playlists, t) {
  try {
    return playlists.map(function (playlist) {
      return {
        images: playlist.image,
        id: playlist.uri,
        name: playlist.title,
        title: playlist.title,
        subtitle: t('artistprofile_artistprofilelayout_overview_1', 'Playlist', ''),
        type: 'playlist',
        uri: playlist.uri,
        meta: [playlist.subtitle]
      };
    });
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
}

/* eslint-disable-next-line import/no-default-export */
export default function Overview(props) {
  var _data$artistPick, _data$artistPick2, _data$concertsMetadat, _data$concertsMetadat2, _data$playlists;

  var artist = props.artist,
      authorized = props.authorized,
      data = props.data,
      setAlert = props.setAlert,
      updateArtistPick = props.updateArtistPick,
      updatePlaylists = props.updatePlaylists,
      user = props.user,
      viewport = props.viewport;
  var location = useLocation();
  var t = useT();

  var _qs$parse = qs.parse(location.search),
      defaultArtistPick = _qs$parse.defaultArtistPick,
      concertPick = _qs$parse.concertPick;

  var artistPickDefaultSearchData = data && data.playlists && data.playlists.data ? formatPlaylistsForSearch(data.playlists.data, t) : [];
  var shouldRenderCatalog = (data === null || data === void 0 ? void 0 : data.catalog) && Object.keys(data.catalog).length !== 0;
  var shouldRenderNewRelease = (data === null || data === void 0 ? void 0 : data.newRelease) || false;
  var shouldRenderPopular = Array.isArray(data === null || data === void 0 ? void 0 : data.topTracks) && ((data === null || data === void 0 ? void 0 : data.topTracks) || []).length >= 1;
  var shouldRenderAFP = useIsAFPAuthorized();
  return /*#__PURE__*/_jsxs("div", {
    className: classNames(styles.overview, styles.with_artist_pick_2),
    "data-testid": "overview",
    children: [/*#__PURE__*/_jsxs("div", {
      className: styles.overview__main,
      children: [(shouldRenderAFP || shouldRenderNewRelease) && /*#__PURE__*/_jsxs(GapRow, {
        children: [shouldRenderAFP && /*#__PURE__*/_jsx(GapCol, {
          children: /*#__PURE__*/_jsx(ArtistFundraisingPick, {
            setAlert: setAlert
          })
        }), shouldRenderNewRelease && /*#__PURE__*/_jsx(GapCol, {
          children: /*#__PURE__*/_jsx(NewRelease, {
            artist: artist,
            newRelease: data === null || data === void 0 ? void 0 : data.newRelease,
            user: user
          })
        })]
      }), shouldRenderPopular && /*#__PURE__*/_jsx(Popular, {
        artist: artist,
        topTracks: data === null || data === void 0 ? void 0 : data.topTracks
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: styles.overview__aside,
      children: /*#__PURE__*/_jsx(EditArtistPick // Use the updateID as an incrementing key so that a new instance is
      // created after an artist pick update. Since the state of
      // EditArtistPick is initialized by props, it's important to reset it
      // after an update. See this blog post for more details on
      // the technique: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
      , {
        artistPick: (_data$artistPick2 = data === null || data === void 0 ? void 0 : data.artistPick) !== null && _data$artistPick2 !== void 0 ? _data$artistPick2 : null,
        artist: artist,
        updateArtistPick: updateArtistPick,
        setAlert: setAlert,
        viewport: viewport,
        authorizedUser: authorized,
        defaultSearchData: // FIXME type inconsistencies
        artistPickDefaultSearchData,
        defaultArtistPick: defaultArtistPick,
        defaultConcertPick: concertPick === 'true' && ((_data$concertsMetadat = data === null || data === void 0 ? void 0 : (_data$concertsMetadat2 = data.concertsMetadata) === null || _data$concertsMetadat2 === void 0 ? void 0 : _data$concertsMetadat2.concertsCount) !== null && _data$concertsMetadat !== void 0 ? _data$concertsMetadat : 0) > 0,
        concertsMetadata: data === null || data === void 0 ? void 0 : data.concertsMetadata
      }, data === null || data === void 0 ? void 0 : (_data$artistPick = data.artistPick) === null || _data$artistPick === void 0 ? void 0 : _data$artistPick.updateID)
    }), /*#__PURE__*/_jsxs("div", {
      className: styles.overview__catalog,
      children: [shouldRenderCatalog && /*#__PURE__*/_jsx(Catalog, {
        artist: artist,
        authorizedUser: authorized,
        catalog: data === null || data === void 0 ? void 0 : data.catalog,
        user: user
      }), /*#__PURE__*/_jsx(Playlists, {
        playlists: data === null || data === void 0 ? void 0 : (_data$playlists = data.playlists) === null || _data$playlists === void 0 ? void 0 : _data$playlists.data,
        isLoading: !!data,
        artistId: artist.id,
        viewport: viewport,
        authorizedUser: authorized,
        setAlert: setAlert,
        updatePlaylists: updatePlaylists
      })]
    })]
  });
}