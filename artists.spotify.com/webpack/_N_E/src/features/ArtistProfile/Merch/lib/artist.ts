// ignore-string-externalization
import { useArtists, useCurrentArtist as _useCurrentArtist } from '../../../../features/artists';
import { useCurrentUser, useIsEmployee } from '../../../../features/currentUser';
import { getLastVisitedArtist } from '../../../../shared/lib/lastVisitedArtist';
export function useCurrentArtist() {
  var bestGuessCurrentArtist = useBestGuessCurrentArtist();

  try {
    return _useCurrentArtist();
  } catch (_unused) {
    return bestGuessCurrentArtist;
  }
}

function useBestGuessCurrentArtist() {
  var currentUser = useCurrentUser();
  var artists = useArtists();
  var isEmployee = useIsEmployee();
  var lastVisitedArtist = getLastVisitedArtist(currentUser === null || currentUser === void 0 ? void 0 : currentUser.username);
  var artist = artists.find(function (item) {
    return item.id === lastVisitedArtist;
  }) || artists[0] || isEmployee && {
    id: '3FP9zWr3P1KWfvmChpnsB6'
  };
  return artist;
}