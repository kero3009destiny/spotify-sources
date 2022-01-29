// ignore-string-externalization
import { useEffect } from 'react';
import { artistTeamsLoader } from '../api/artistTeamsLoader';
/* sets the artist teams associated with the current label team
when ArtistsTab is loaded and there is no query */

export var useSetArtistTeamsBackgroundTask = function useSetArtistTeamsBackgroundTask(_ref, _ref2) {
  var setArtistsTabTeams = _ref.setArtistsTabTeams;
  var currentTeamDetails = _ref2.currentTeamDetails,
      artistsTab = _ref2.artistsTab;
  useEffect(function () {
    var isActive = true;
    /* only call other setState hooks if this component is still "mounted" or "active"
    if you don't check this, then you'll at best get the
    "component called setState even though it was unmounted"
    at worst you'll have a race condition where you'll be showing
    the wrong teams due to network timings.
     more info + possible refactoring opportunity: https://ghe.spotify.net/creator/mrkt-web/pull/3579/files#r1256947*/

    if (artistsTab.searchQuery === '' && currentTeamDetails) {
      artistTeamsLoader.load({
        labelUri: currentTeamDetails.uri
      }).then(function (teams) {
        return isActive && setArtistsTabTeams(teams);
      });
    }

    return function () {
      isActive = false;
    };
  }, [setArtistsTabTeams, artistsTab.artistTeams, artistsTab.searchQuery, currentTeamDetails]);
};