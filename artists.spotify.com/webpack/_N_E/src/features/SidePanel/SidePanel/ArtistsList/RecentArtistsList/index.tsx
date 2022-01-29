import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _toConsumableArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
// ignore-string-externalization
import React, { useState, useEffect, Suspense, useMemo } from 'react';
import localStorageFallback from 'local-storage-fallback';
import { Route } from 'react-router'; // eslint-disable-line no-unused-vars

import { createUbiEventLogger } from '@mrkt/features/ubi';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import { useCurrentUser } from '../../../../../features/currentUser';
import ArtistEntity from '../../Entity/Artist';
import EntityList from '../../Entity/List';
import { useArtist, useInitialArtists } from '../../../../../features/artists';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var MAX_SIZE = 6;
export var RecentArtistsList = function RecentArtistsList() {
  return /*#__PURE__*/_jsx(Suspense, {
    fallback: null,
    children: /*#__PURE__*/_jsx(EntityList, {
      children: /*#__PURE__*/_jsx(Route, {
        path: ['/artist/:artistId', '/'],
        component: RecentArtistsEntities
      })
    })
  });
};

function RecentArtistsEntities(_ref) {
  var match = _ref.match;
  var recentArtistsIds = useRecentArtistsIds(match.params.artistId || '');
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [recentArtistsIds.map(function (id) {
      return /*#__PURE__*/_jsx(Suspense, {
        fallback: null,
        children: /*#__PURE__*/_jsx(RecentArtistEntity, {
          artistId: id
        })
      }, id);
    }), recentArtistsIds.length < MAX_SIZE && /*#__PURE__*/_jsx(InitialArtistsEntities, {
      exclude: recentArtistsIds,
      size: MAX_SIZE - recentArtistsIds.length
    })]
  });
}

var makeArtistRowUbiHandler = function makeArtistRowUbiHandler(uri, artistId) {
  return function (to) {
    var UBIEventLogger = createUbiEventLogger(artistId);
    var artistRowUbiSpec = createWebCommonEventFactory({
      data: {
        identifier: 's4a-side-panel-artist-row-link',
        uri: uri
      }
    });
    UBIEventLogger.logInteraction(artistRowUbiSpec.sideNavPanelFactory().artistSelectorFactory().artistRowFactory({
      uri: uri
    }).hitUiNavigate({
      destination: to
    }));
  };
};

function RecentArtistEntity(_ref2) {
  var artistId = _ref2.artistId;
  var artist = useArtist(artistId);
  var ubiHandler = makeArtistRowUbiHandler(window.location.href, artistId);
  return artist && /*#__PURE__*/_jsx(ArtistEntity, {
    onClick: function onClick(_, to) {
      return ubiHandler(to);
    },
    artist: artist
  });
}

function useRecentArtistsIds(artistId) {
  var currentUser = useCurrentUser();
  var key = "".concat(currentUser && currentUser.username, ":recentlyVisited");

  var _useState = useState(function () {
    var json = localStorageFallback.getItem(key);
    var initialIds = [];
    if (artistId) initialIds.push(artistId);
    if (json) initialIds.push.apply(initialIds, _toConsumableArray(json.split(',')));
    return Array.from(new Set(initialIds)).slice(0, MAX_SIZE);
  }),
      ids = _useState[0],
      setIds = _useState[1];

  useEffect(function () {
    if (!artistId) return;
    setIds(function (prev) {
      return Array.from(new Set([artistId].concat(_toConsumableArray(prev)))).slice(0, MAX_SIZE);
    });
  }, [artistId]);
  useEffect(function () {
    localStorageFallback.setItem(key, ids.join(','));
  }, [key, ids]);
  return ids;
}

function InitialArtistsEntities(_ref3) {
  var exclude = _ref3.exclude,
      size = _ref3.size;
  var artists = useInitialArtists();
  var uri = window.location.href;
  var itemTuples = useMemo(function () {
    var set = new Set(exclude);
    var filtered = artists.filter(function (artist) {
      return !set.has(artist.id);
    });
    return filtered.slice(0, size).map(function (item) {
      return [item, makeArtistRowUbiHandler(uri, item.id)];
    });
  }, [exclude, size, uri]); // eslint-disable-line react-hooks/exhaustive-deps

  return /*#__PURE__*/_jsx(_Fragment, {
    children: itemTuples.map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          item = _ref5[0],
          ubiEventHandler = _ref5[1];

      return /*#__PURE__*/_jsx(ArtistEntity, {
        artist: item,
        onClick: function onClick(_, to) {
          return ubiEventHandler(to);
        }
      }, item.id);
    })
  });
}