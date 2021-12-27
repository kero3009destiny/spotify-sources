import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import { selectFromSavedFilter } from 'ducks/dashboard/actions';
import {
  clearRecentlyCreated as clearRecentlyCreatedAC,
  createSavedQuery as createSavedQueryAC,
  deleteSavedQuery,
  fetchUserHasSeenSavedQueries,
  getSavedQueries as getSavedQueriesAction,
  restoreSavedQuery,
  selectSavedQuery as selectSavedQueryAC,
  toggleSavedQueries as toggleSavedQueriesAC,
} from 'ducks/savedQueries/actions';
import { getAccount } from 'ducks/account/selectors';
import {
  getSelectedCampaigns,
  getSelectedFlights,
} from 'ducks/dashboard/selectors';
import {
  getCurrentRouteKey,
  getCurrentRouteSearch,
} from 'ducks/routes/selectors';
import { getSavedQueries } from 'ducks/savedQueries/selectors';

import {
  DispatchProps,
  OwnProps,
  SavedQueries,
  StateProps,
} from './SavedQueries';

import { SavedQuery } from 'types/common/state/api/savedQueries';

export const mapStateToProps = (state: TSFixMe): StateProps => {
  const savedQueriesState = getSavedQueries(state);
  return {
    iamDomain: getAccount(state).iamDomain,
    savedQueries: savedQueriesState.savedQueries,
    nextPageToken: savedQueriesState.nextPageToken,
    loading: savedQueriesState.loading,
    error: savedQueriesState.error,
    currentIamDomain: savedQueriesState.currentIamDomain,
    isOpen: savedQueriesState.isOpen,
    currentSelection: savedQueriesState.currentSelection,
    accountId: getAccount(state).id,
    currentRouteParams: getCurrentRouteSearch(state),
    currentLocationKey: getCurrentRouteKey(state),
    creating: savedQueriesState.creating,
    createSuccess: savedQueriesState.createSuccess,
    createError: savedQueriesState.createError,
    recentlyCreated: savedQueriesState.recentlyCreated,
    deleting: savedQueriesState.deleting,
    deleteError: savedQueriesState.deleteError,
    recentlyDeleted: savedQueriesState.recentlyDeleted,
    restoring: savedQueriesState.restoring,
    restoreError: savedQueriesState.restoreError,
    showNewTag: savedQueriesState.showNewTag,
    selectedCampaigns: getSelectedCampaigns(state),
    selectedFlights: getSelectedFlights(state),
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    getSavedQueries: (iamDomain: string) =>
      dispatch(getSavedQueriesAction(iamDomain)),
    logUserAction: options => dispatch(logUserActionAC(options)),
    toggleSavedQueries: (isOpen: boolean) =>
      dispatch(toggleSavedQueriesAC(isOpen)),
    selectSavedQuery: (
      uuid: string,
      params: string,
      campaignIds: string[],
      flightIds: string[],
    ) => dispatch(selectSavedQueryAC(uuid, params, campaignIds, flightIds)),
    createSavedQuery: (savedQuery: SavedQuery, params: string) =>
      dispatch(createSavedQueryAC(savedQuery, params)),
    clearRecentlyCreated: () => dispatch(clearRecentlyCreatedAC()),
    deleteSavedQuery: (uuid: string, iamDomain: string) =>
      dispatch(deleteSavedQuery(uuid, iamDomain)),
    restoreSavedQuery: (uuid: string, iamDomain: string) =>
      dispatch(restoreSavedQuery(uuid, iamDomain)),
    fetchUserHasSeenSavedQueries: () =>
      dispatch(fetchUserHasSeenSavedQueries()),
    selectFromSavedFilter: (payload: {
      campaignIds: string[];
      flightIds: string[];
    }) => dispatch(selectFromSavedFilter(payload)),
  };
};

export const ConnectedSavedQueries = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(SavedQueries);
