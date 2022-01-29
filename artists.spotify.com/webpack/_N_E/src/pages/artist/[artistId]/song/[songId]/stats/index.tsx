// ignore-string-externalization
import React from 'react';
import { PageId } from '@apps/artists-spotify-com-c/src/features/PlatformEvents/';
import { createArtistPage } from '@apps/artists-spotify-com-c/src/features/ArtistPage';
import { createSongPage } from '../';

var loadStatsPage = function loadStatsPage() {
  return import(
  /* webpackPreload: true, webpackChunkName: "song-stats" */
  '@apps/artists-spotify-com-c/src/features/Song/Stats').then(function (m) {
    return {
      default: m.Stats
    };
  });
};

var LazyStats = /*#__PURE__*/React.lazy(loadStatsPage);
export default createArtistPage({
  pageId: PageId.ArtistSongStats,
  body: createSongPage(loadStatsPage, LazyStats)
});