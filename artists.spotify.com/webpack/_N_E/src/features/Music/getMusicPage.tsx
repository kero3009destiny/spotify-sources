// ignore-string-externalization
import { MusicHooks } from '@apps/artists-spotify-com-c/src/features/Music';
import { createArtistPage } from '@apps/artists-spotify-com-c/src/features/ArtistPage';
import { withPermissionCheck } from '@apps/artists-spotify-com-c/src/features/ArtistPage/withPermissionCheck';
import { useMusicPermissionCheck } from './useMusicPermissionCheck';
export var getMusicPage = function getMusicPage(pageId) {
  return createArtistPage({
    pageId: pageId,
    body: withPermissionCheck(MusicHooks, useMusicPermissionCheck)
  });
};