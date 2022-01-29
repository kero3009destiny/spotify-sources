// ignore-string-externalization
import { PageId } from '@apps/artists-spotify-com-c/src/features/PlatformEvents/';
import dynamic from 'next/dynamic';
import { createAudiencePage } from '@apps/artists-spotify-com-c/src/features/ArtistAudience/CreateAudiencePage';
// Audience page is not SSR friendly
var LazyAudiencePage = dynamic(function () {
  return import(
  /* webpackChunkName: "artist-audience-stats" */
  '@apps/artists-spotify-com-c/src/features/ArtistAudience/Stats').then(function (m) {
    return m.Stats;
  });
}, {
  ssr: false,
  loadableGenerated: {
    webpack: function webpack() {
      return [require.resolveWeak('@apps/artists-spotify-com-c/src/features/ArtistAudience/Stats')];
    },
    modules: ["artist/[artistId]/audience/stats/index.tsx -> " + '@apps/artists-spotify-com-c/src/features/ArtistAudience/Stats']
  }
});

var useArtistAudienceSecurityCheck = function useArtistAudienceSecurityCheck() {
  return true;
};

export default createAudiencePage({
  body: LazyAudiencePage,
  permissionCheck: useArtistAudienceSecurityCheck,
  pageId: PageId.ArtistAudience
});