import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { window } from 'global';
import qs from 'query-string';

import { withRemoteConfig } from '@spotify-internal/remote-config-resolver-react';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import { pauseResumeFlight as pauseResumeFlightAC } from 'ducks/flights/actions';
import { displayNotification } from 'ducks/notifications/actions';
import {
  advertiserHasDraftImpersonation as advertiserHasDraftImpersonationSelector,
  canAccessPodcastBooking,
  canCreate,
  getAccount,
  isSuperUserAccountActive,
  isSuperviewer,
} from 'ducks/account/selectors';
import { getCampaignState } from 'ducks/campaigns/selectors';
import { getSelectedColumns } from 'ducks/columns/selectors';
import {
  getFlightsCatalogueServerError,
  isPausingOrResuming,
  pauseOrResumeError,
  pauseOrResumeSucceeded,
} from 'ducks/flights/selectors';

import { FlightTable, FlightTableProps } from './FlightTable';

import { ANALYTICS_CATEGORY } from '../constants';
import { SELECTED_FLIGHT_COLUMNS } from 'ducks/columns/constants';
import { routeFragmentLiterals, routes } from 'config/routes';

import { PauseResumeFlightActionType } from 'types/common/state/api/flight';

export type OwnProps = Omit<
  FlightTableProps,
  | 'selectedColumns'
  | 'pauseOrResumeFlight'
  | 'isPausingOrResuming'
  | 'pauseOrResumeSucceeded'
  | 'displayNotification'
  | 'pauseOrResumeError'
  | 'createNewFlight'
  | 'createNewCampaign'
  | 'showAddFlightPrompt'
  | 'showAddCampaignPrompt'
  | 'selectedFlightIds'
  | 'catalogueServerError'
  | 'isSuperviewer'
  | 'currentUserAdAccountId'
  | 'hasAccountWritePermissions'
  | 'advertiserHasDraftImpersonation'
  | 'hasImpersonation'
  | 'isSuperUserAccountActive'
  | 'isSpanEnabled'
>;

type StateProps = Omit<
  FlightTableProps,
  | 'rows'
  | 'isLoading'
  | 'empty'
  | 'onChangeParams'
  | 'params'
  | 'pauseOrResumeFlight'
  | 'displayNotification'
  | 'createNewFlight'
  | 'createNewCampaign'
  | 'hasImpersonation'
> & { selectedCampaignAdAccountId: string };

export const mapStateToProps = (
  state: TSFixMe,
  ownProps: OwnProps,
): StateProps => {
  const showAddFlightPrompt =
    !!ownProps.params.campaignId &&
    ownProps.params.offset === '0' &&
    !ownProps.params.flightState &&
    !ownProps.params.searchWord;

  const showAddCampaignPrompt =
    !ownProps.params.campaignId &&
    ownProps.params.offset === '0' &&
    !ownProps.params.flightState &&
    !ownProps.params.searchWord &&
    !ownProps.params.dateBegin &&
    !ownProps.params.dateEnd;

  // If we ever allow multiple campaign ids to be selected, this will need to change
  const selectedFlightId = qs.parse(window.location.search).flightId as string;

  return {
    currentUserAdAccountId: getAccount(state).id,
    selectedColumns: getSelectedColumns(state, SELECTED_FLIGHT_COLUMNS),
    isPausingOrResuming: isPausingOrResuming(state),
    pauseOrResumeSucceeded: pauseOrResumeSucceeded(state),
    pauseOrResumeError: pauseOrResumeError(state),
    selectedCampaignAdAccountId: getCampaignState(state).adAccountId!,
    showAddFlightPrompt,
    showAddCampaignPrompt,
    selectedFlightIds: selectedFlightId ? [selectedFlightId] : [],
    catalogueServerError: getFlightsCatalogueServerError(state),
    isSuperviewer: isSuperviewer(state),
    isSuperUserAccountActive: isSuperUserAccountActive(state),
    hasAccountWritePermissions: canCreate(state),
    advertiserHasDraftImpersonation: advertiserHasDraftImpersonationSelector(
      state,
    ),
    isSpanEnabled: canAccessPodcastBooking(state),
  };
};

export const mergeProps = (
  stateProps: StateProps,
  { dispatch }: TSFixMe,
  ownProps: OwnProps,
) => {
  const {
    currentUserAdAccountId,
    selectedCampaignAdAccountId,
    ...restState
  } = stateProps;

  return {
    ...restState,
    ...ownProps,
    currentUserAdAccountId,
    createNewFlight: (cid: string) =>
      dispatch(
        routerActions.push(
          routes.BUILD_FLIGHT.replace(
            routeFragmentLiterals.ACCOUNT_ID,
            selectedCampaignAdAccountId,
          ).replace(routeFragmentLiterals.CAMPAIGN_ID, cid),
        ),
      ),
    pauseOrResumeFlight: (
      flightId: string,
      action: PauseResumeFlightActionType,
    ) => {
      dispatch(
        pauseResumeFlightAC({
          flightId,
          adAccountId: currentUserAdAccountId,
          action,
        }),
      );
    },
    displayNotification: (notificationText: string, notificationType: string) =>
      dispatch(displayNotification(notificationText, notificationType)),
    createNewCampaign: () => {
      dispatch(
        logUserActionAC({
          label: 'create_new_campaign',
          category: ANALYTICS_CATEGORY,
        }),
      );
      dispatch(
        routerActions.push(
          routes.BUILD_CAMPAIGN_ADACCOUNT.replace(
            routeFragmentLiterals.ACCOUNT_ID,
            currentUserAdAccountId,
          ),
        ),
      );
    },
  };
};

export type ResolvedProps = Pick<FlightTableProps, 'hasImpersonation'>;

const mapResolverToProps = (resolver: {
  getBool: (arg: string) => boolean;
}): ResolvedProps => ({
  hasImpersonation: resolver && resolver.getBool('impersonation'),
});

const WrappedWithRemoteConfig = withRemoteConfig<ResolvedProps>(
  mapResolverToProps,
  {
    blockRendering: true,
  },
)(FlightTable);

export const ConnectedFlightTable = connect(
  mapStateToProps,
  null,
  mergeProps,
)(WrappedWithRemoteConfig);
