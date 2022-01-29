import { createWebTeamArtistsEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-team-artists';
import { PageId } from '../../../PlatformEvents';
import { createUbiEventLogger } from '@mrkt/features/ubi';
var UBIEventLogger = createUbiEventLogger();
var spec = createWebTeamArtistsEventFactory({
  data: {
    identifier: PageId.TeamLabelArtists,
    uri: window.location.href
  }
});
export var useArtistsTabArtistSearchLogger = function useArtistsTabArtistSearchLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.artistsSearchInputFactory().keyStrokeSearch());
  };
};
export var useArtistsTabManageArtistButtonLogger = function useArtistsTabManageArtistButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.artistTableRowFactory().manageArtistButtonFactory().hitUiReveal());
  };
};
export var useArtistsTabSeeTeamMembersButtonLogger = function useArtistsTabSeeTeamMembersButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.artistTableRowFactory().manageArtistButtonFactory().seeTeamMembersButtonFactory().hitUiReveal());
  };
};
export var useArtistsTabSearchArtistsLinkLogger = function useArtistsTabSearchArtistsLinkLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.searchArtistsLinkFactory().hitQuickScroll());
  };
};
export var useArtistsTabNoSearchResultsLogger = function useArtistsTabNoSearchResultsLogger() {
  return function () {
    UBIEventLogger.logImpression(spec.noSearchResultsMessageFactory().impression());
  };
};
export var useArtistsTabEmptyStateLogger = function useArtistsTabEmptyStateLogger() {
  return function () {
    UBIEventLogger.logImpression(spec.emptyStateMessageFactory().impression());
  };
};
export var useArtistsTabEmptyStateAddArtistLinkLogger = function useArtistsTabEmptyStateAddArtistLinkLogger(url) {
  return function () {
    UBIEventLogger.logInteraction(spec.emptyStateMessageFactory().addArtistLinkFactory().hitUiNavigate({
      destination: url
    }));
  };
};