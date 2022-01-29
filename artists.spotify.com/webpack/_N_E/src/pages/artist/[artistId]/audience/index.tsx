// ignore-string-externalization
import { AudienceRedirect } from '@apps/artists-spotify-com-c/src/features/ArtistAudience/AudienceRedirect';
import { createArtistPage } from '@apps/artists-spotify-com-c/src/features/ArtistPage';
import { PageId } from '@apps/artists-spotify-com-c/src/features/PlatformEvents';
export default createArtistPage({
  body: AudienceRedirect,
  pageId: PageId.ArtistAudience
});