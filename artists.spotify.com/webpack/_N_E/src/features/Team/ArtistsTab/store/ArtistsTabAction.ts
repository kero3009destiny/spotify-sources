// ignore-string-externalization
export var ArtistsTabActionType;

(function (ArtistsTabActionType) {
  ArtistsTabActionType["ARTISTS_TAB_UPDATE_STATE"] = "ARTISTS_TAB_UPDATE_STATE";
})(ArtistsTabActionType || (ArtistsTabActionType = {}));

export var createArtistsTabActionDispatchers = function createArtistsTabActionDispatchers(dispatch) {
  return {
    setArtistsTabSearchQuery: function setArtistsTabSearchQuery(searchQuery) {
      return dispatch({
        type: ArtistsTabActionType.ARTISTS_TAB_UPDATE_STATE,
        state: {
          searchQuery: searchQuery
        }
      });
    },
    setArtistsTabCurrentTeam: function setArtistsTabCurrentTeam(currentArtistTeam) {
      return dispatch({
        type: ArtistsTabActionType.ARTISTS_TAB_UPDATE_STATE,
        state: {
          currentArtistTeam: currentArtistTeam
        }
      });
    },
    setArtistsTabTeams: function setArtistsTabTeams(artistTeams) {
      return dispatch({
        type: ArtistsTabActionType.ARTISTS_TAB_UPDATE_STATE,
        state: {
          artistTeams: artistTeams
        }
      });
    },
    setArtistsTabCurrentTeamMembers: function setArtistsTabCurrentTeamMembers(artistTeamMembers) {
      return dispatch({
        type: ArtistsTabActionType.ARTISTS_TAB_UPDATE_STATE,
        state: {
          artistTeamMembers: artistTeamMembers
        }
      });
    }
  };
};
export var isArtistsTabActionType = function isArtistsTabActionType(action) {
  return action.type && action.type in ArtistsTabActionType;
};