import { createUbiEventLogger } from '@mrkt/features/ubi';
import { createWebTeamsEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-teams';
import { PageId } from '../../../PlatformEvents';
var UBIEventLogger = createUbiEventLogger();
var spec = createWebTeamsEventFactory({
  data: {
    identifier: PageId.TeamManagementYourTeams,
    uri: window.location.href
  }
});
export var useWebTeamsAddTeamButtonLogger = function useWebTeamsAddTeamButtonLogger(url) {
  return function () {
    UBIEventLogger.logInteraction(spec.addTeamButtonFactory().hitUiNavigate({
      destination: url
    }));
  };
};
export var useWebTeamsTableGridViewToggleButtonLogger = function useWebTeamsTableGridViewToggleButtonLogger(id) {
  return function () {
    UBIEventLogger.logInteraction(spec.tableOrGridViewToggleFactory({
      identifier: id
    }).hitUiElementToggle());
  };
};
export var useWebTeamsSearchBoxLogger = function useWebTeamsSearchBoxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.searchBoxFactory().keyStrokeSearch());
  };
};
export var useWebTeamsClearSearchBoxLogger = function useWebTeamsClearSearchBoxLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.searchBoxFactory().clearTextBoxButtonFactory().hitTextClear());
  };
};
export var useWebTeamsNameHeaderSortLogger = function useWebTeamsNameHeaderSortLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.yourTeamsTableFactory().tableHeaderRowFactory().teamNameHeaderFactory().hitSort());
  };
};
export var useWebTeamsTypeHeaderSortLogger = function useWebTeamsTypeHeaderSortLogger() {
  return function () {
    UBIEventLogger.logInteraction(spec.yourTeamsTableFactory().tableHeaderRowFactory().teamTypeHeaderFactory().hitSort());
  };
};
export var useWebTeamsTableDataRowClickLogger = function useWebTeamsTableDataRowClickLogger(url) {
  return function () {
    UBIEventLogger.logInteraction(spec.yourTeamsTableFactory().tableDataRowFactory({
      uri: url
    }).hitUiNavigate({
      destination: url
    }));
  };
};
export var useWebTeamsTableDataRowAdminCellRevealLogger = function useWebTeamsTableDataRowAdminCellRevealLogger(url) {
  return function () {
    UBIEventLogger.logInteraction(spec.yourTeamsTableFactory().tableDataRowFactory({
      uri: url
    }).adminCellFactory().hitUiReveal());
  };
};