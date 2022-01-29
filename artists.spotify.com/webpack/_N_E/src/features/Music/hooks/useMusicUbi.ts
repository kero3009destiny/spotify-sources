import { createUbiEventLogger, useImpressionUBILogger } from '@mrkt/features/ubi';
import { createWebMusicEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-music';
import { useCurrentArtist } from '../../artists';
import { PageId } from '../../PlatformEvents';

function useMusicSpec(pageId) {
  var spec = createWebMusicEventFactory({
    data: {
      identifier: pageId,
      uri: window.location.href
    }
  });
  return spec;
}

function useSongsTabSelectLogger() {
  var _useCurrentArtist = useCurrentArtist(),
      artistId = _useCurrentArtist.id;

  var spec = useMusicSpec(PageId.ArtistMusic);
  var factory = spec.headerFactory().songsButtonFactory();
  var UBIEventLogger = createUbiEventLogger(artistId);
  return function () {
    return UBIEventLogger.logInteraction(factory.hitUiReveal());
  };
}

function useReleasesTabSelectLogger() {
  var _useCurrentArtist2 = useCurrentArtist(),
      artistId = _useCurrentArtist2.id;

  var spec = useMusicSpec(PageId.ArtistMusic);
  var factory = spec.headerFactory().releasesButtonFactory();
  var UBIEventLogger = createUbiEventLogger(artistId);
  return function () {
    return UBIEventLogger.logInteraction(factory.hitUiReveal());
  };
}

function useUpcomingTabSelectLogger() {
  var _useCurrentArtist3 = useCurrentArtist(),
      artistId = _useCurrentArtist3.id;

  var spec = useMusicSpec(PageId.ArtistMusic);
  var factory = spec.headerFactory().upcomingButtonFactory();
  var UBIEventLogger = createUbiEventLogger(artistId);
  return function () {
    return UBIEventLogger.logInteraction(factory.hitUiReveal());
  };
}

function usePlaylistsTabSelectLogger() {
  var _useCurrentArtist4 = useCurrentArtist(),
      artistId = _useCurrentArtist4.id;

  var spec = useMusicSpec(PageId.ArtistMusic);
  var factory = spec.headerFactory().playlistsButtonFactory();
  var UBIEventLogger = createUbiEventLogger(artistId);
  return function () {
    return UBIEventLogger.logInteraction(factory.hitUiReveal());
  };
}

export function useMusicTabsLoggers() {
  var songs = useSongsTabSelectLogger();
  var releases = useReleasesTabSelectLogger();
  var upcoming = useUpcomingTabSelectLogger();
  var playlists = usePlaylistsTabSelectLogger();
  return {
    songs: songs,
    releases: releases,
    upcoming: upcoming,
    playlists: playlists
  };
} // SONGS TAB

export function useSongRowSelectLogger() {
  var _useCurrentArtist5 = useCurrentArtist(),
      artistId = _useCurrentArtist5.id;

  var spec = useMusicSpec(PageId.ArtistSongs);
  var factory = spec.songsTabFactory();
  var UBIEventLogger = createUbiEventLogger(artistId);
  return function (trackUri, rowIndex) {
    var data = {
      uri: trackUri,
      position: rowIndex
    };
    var dest = {
      destination: trackUri
    };
    UBIEventLogger.logInteraction(factory.songRowFactory(data).hitUiNavigate(dest));
  };
} // RELEASES TAB

export function useReleaseSongRowSelectLogger() {
  var _useCurrentArtist6 = useCurrentArtist(),
      artistId = _useCurrentArtist6.id;

  var spec = useMusicSpec(PageId.ArtistReleases);
  var factory = spec.releasesTabFactory();
  var UBIEventLogger = createUbiEventLogger(artistId);
  return function (album, track) {
    var albumData = {
      uri: album.albumUri,
      position: album.albumRowIndex
    };
    var trackData = {
      uri: track.trackUri,
      position: track.trackRowIndex
    };
    var dest = {
      destination: track.trackUri
    };
    UBIEventLogger.logInteraction(factory.releaseRowFactory(albumData).songRowFactory(trackData).hitUiNavigate(dest));
  };
}
export function useReleaseRowSelectLogger() {
  var _useCurrentArtist7 = useCurrentArtist(),
      artistId = _useCurrentArtist7.id;

  var spec = useMusicSpec(PageId.ArtistReleases);
  var factory = spec.releasesTabFactory();
  var UBIEventLogger = createUbiEventLogger(artistId);
  return function (albumUri, albumRowIndex) {
    var data = {
      uri: albumUri,
      position: albumRowIndex
    };
    var dest = {
      destination: albumUri
    };
    UBIEventLogger.logInteraction(factory.releaseRowFactory(data).hitUiNavigate(dest));
  };
}
export function useReleaseErrorStateLogger() {
  var _useCurrentArtist8 = useCurrentArtist(),
      artistId = _useCurrentArtist8.id;

  var spec = useMusicSpec(PageId.ArtistReleases);
  var impression = spec.releasesTabFactory().errorStateFactory();
  return useImpressionUBILogger(impression, artistId);
}
export function useReleaseStatsPageModalImpressionLogger() {
  var _useCurrentArtist9 = useCurrentArtist(),
      artistId = _useCurrentArtist9.id;

  var spec = useMusicSpec(PageId.ArtistMusic);
  var impression = spec.headerFactory().announcementModalFactory({
    identifier: 'RELEASE_PAGE_ANNOUNCEMENT_MODAL'
  });
  return useImpressionUBILogger(impression, artistId);
}