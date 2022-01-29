// ignore-string-externalization
import { PageId } from '@apps/artists-spotify-com-c/src/features/PlatformEvents/';
import { ArtistProfileLayout } from '@apps/artists-spotify-com-c/src/features/ArtistProfile/ArtistProfileLayout';
import { getArtistProfilePage } from '@apps/artists-spotify-com-c/src/features/ArtistProfile/getArtistProfilePage'; // Catchall route falls back to 'overview'

export default getArtistProfilePage({
  pageId: PageId.ArtistProfile,
  body: ArtistProfileLayout
});