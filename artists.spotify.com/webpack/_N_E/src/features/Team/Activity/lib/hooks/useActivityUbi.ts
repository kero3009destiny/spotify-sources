import { createWebTeamActivityEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-team-activity';
import { PageId } from '../../../../PlatformEvents';
import { createUbiEventLogger } from '@mrkt/features/ubi';
var UBIEventLogger = createUbiEventLogger();
var spec = createWebTeamActivityEventFactory({
  data: {
    identifier: PageId.Activity,
    uri: window.location.href
  }
});
export var useActivityTeamMemberSearchLogger = function useActivityTeamMemberSearchLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.teamMemberSearchBarFactory().searchInputFactory().keyStrokeSearch());
    UBIEventLogger.logInteraction(spec.teamMemberSearchBarFactory().searchInputFactory().keyStrokeUiReveal());
  };
};
export var useActivityTeamMemberFilterLogger = function useActivityTeamMemberFilterLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.teamMemberSearchBarFactory().searchResultsFactory().hitFilter());
  };
};
export var useActivityTeamMemberClearFilterLogger = function useActivityTeamMemberClearFilterLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.teamMemberSearchBarFactory().searchInputFactory().clearButtonFactory().hitClearFilter());
  };
};
export var useActivityTeamMemberContextMenuLogger = function useActivityTeamMemberContextMenuLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.activityLogTableFactory().tableRowActivityRecordFactory().teamMemberTableCellFactory().contextMenuFactory().hitUiReveal());
    UBIEventLogger.logImpression(spec.activityLogTableFactory().tableRowActivityRecordFactory().teamMemberTableCellFactory().contextMenuFactory().editTeamMemberButtonFactory().impression());
  };
};
export var useActivityEditTeamMemberNavigateLogger = function useActivityEditTeamMemberNavigateLogger(url) {
  return function () {
    UBIEventLogger.logInteraction(spec.activityLogTableFactory().tableRowActivityRecordFactory().teamMemberTableCellFactory().contextMenuFactory().editTeamMemberButtonFactory().hitUiNavigate({
      destination: url
    }));
  };
};
export var useActivityLoadMoreButtonLogger = function useActivityLoadMoreButtonLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.loadMoreButtonFactory().hitUiReveal());
    UBIEventLogger.logImpression(spec.loadMoreButtonFactory().impression());
  };
};