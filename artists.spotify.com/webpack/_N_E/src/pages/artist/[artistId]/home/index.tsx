// ignore-string-externalization
import { PageId } from '@apps/artists-spotify-com-c/src/features/PlatformEvents/';
import { ArtistHome } from '@apps/artists-spotify-com-c/src/features/ArtistHome';
import { createArtistPage } from '@apps/artists-spotify-com-c/src/features/ArtistPage';
import { useIsHomeEnabledForCurrentUser } from '@apps/artists-spotify-com-c/src/features/ArtistHome';
import { withPermissionCheck } from '@apps/artists-spotify-com-c/src/features/ArtistPage/withPermissionCheck';
export default createArtistPage({
  pageId: PageId.ArtistHome,
  body: withPermissionCheck(ArtistHome, useIsHomeEnabledForCurrentUser)
});