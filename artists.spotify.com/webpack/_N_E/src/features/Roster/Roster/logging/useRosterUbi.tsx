import { createUbiEventLogger } from '@mrkt/features/ubi';
import { createWebRosterEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-roster';
import { PageId } from '../../../PlatformEvents';
var UBIEventLogger = createUbiEventLogger();
var spec = createWebRosterEventFactory({
  data: {
    identifier: PageId.Roster,
    uri: window.location.href
  }
});
export var useRosterPitchHeaderTooltipLogger = function useRosterPitchHeaderTooltipLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.rosterTableFactory().rosterTableHeaderRowFactory().pitchHeaderFactory().pitchColumnTooltipIconFactory().hitUiReveal());
  };
};
export var useRosterNavigateToArtistPageLogger = function useRosterNavigateToArtistPageLogger() {
  return function (id) {
    UBIEventLogger.logInteraction(spec.rosterTableFactory().rosterTableDataRowFactory().artistNameCellFactory({
      uri: "spotify:artist:".concat(id)
    }).hitUiNavigate({
      destination: "/artist/".concat(id, "/home")
    }));
  };
};
export var useRosterPitchASongButtonLogger = function useRosterPitchASongButtonLogger() {
  return function (url, id) {
    UBIEventLogger.logInteraction(spec.rosterTableFactory().rosterTableDataRowFactory().pitchCellFactory().pitchASongButtonFactory({
      uri: "spotify:artist:".concat(id)
    }).hitUiNavigate({
      destination: url
    }));
  };
};
export var useRosterSeeAPitchButtonLogger = function useRosterSeeAPitchButtonLogger() {
  return function (url, id) {
    UBIEventLogger.logInteraction(spec.rosterTableFactory().rosterTableDataRowFactory().pitchCellFactory().seeAPitchButtonFactory({
      uri: "spotify:artist:".concat(id)
    }).hitUiNavigate({
      destination: url
    }));
  };
};
export var useRosterPaginationNextLogger = function useRosterPaginationNextLogger() {
  return function (offset) {
    UBIEventLogger.logInteraction(spec.rosterTableFactory().paginationButtonNextFactory().hitUiNavigate({
      destination: "/roster?offset=".concat(offset)
    }));
  };
};
export var useRosterPaginationPreviousLogger = function useRosterPaginationPreviousLogger() {
  return function (offset) {
    UBIEventLogger.logInteraction(spec.rosterTableFactory().paginationButtonPreviousFactory().hitUiNavigate({
      destination: "/roster?offset=".concat(offset)
    }));
  };
};