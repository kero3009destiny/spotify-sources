// ignore-string-externalization
import { PageId } from '@apps/artists-spotify-com-c/src/features/PlatformEvents/';
import { ArtistProfileLayout } from '@apps/artists-spotify-com-c/src/features/ArtistProfile/ArtistProfileLayout';
import { getArtistProfilePage } from '@apps/artists-spotify-com-c/src/features/ArtistProfile/getArtistProfilePage';
export default getArtistProfilePage({
  pageId: PageId.ArtistProfileAbout,
  body: ArtistProfileLayout
});