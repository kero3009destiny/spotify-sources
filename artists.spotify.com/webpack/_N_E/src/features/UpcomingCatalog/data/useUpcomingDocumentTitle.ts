import { useCurrentArtist } from '../../../features/artists';
import { useT } from '@mrkt/features/i18n';
export function useUpcomingDocumentTitle() {
  var t = useT();
  var artist = useCurrentArtist();
  return t('URP-browser-title', 'Music – Upcoming Music – {artistName} – Spotify for Artists', '', {
    artistName: artist.name
  });
}