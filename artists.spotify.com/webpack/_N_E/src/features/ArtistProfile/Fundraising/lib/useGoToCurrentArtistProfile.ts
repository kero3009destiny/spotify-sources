// ignore-string-externalization
import { useHistory } from 'react-router-dom';
import { useCurrentArtistIdOrNull } from '../../../artists';
export function useGoToCurrentArtistProfile() {
  var history = useHistory();
  var currentArtistId = useCurrentArtistIdOrNull();
  return function goHome() {
    if (!currentArtistId) {
      // This shouldn't happen
      history.push('/');
    } else {
      history.push("/artist/".concat(currentArtistId, "/profile/overview"));
    }
  };
}