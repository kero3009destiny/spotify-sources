import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { routerActions } from 'react-router-redux';

import { useBool } from '@spotify-internal/remote-config-resolver-react';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import { pauseResumeFlightLink as pauseResumeFlightLinkAC } from 'ducks/flightlinks/actions';
import { displayNotification as displayNotificationAC } from 'ducks/notifications/actions';
import {
  advertiserHasDraftImpersonation as advertiserHasDraftImpersonationSelector,
  canAccessPodcastBooking,
  canCreate,
  getAccount,
  isSuperUserAccountActive as getIsSuperUserAccountActive,
  isSuperviewer as getIsSuperviewer,
} from 'ducks/account/selectors';
import { getSelectedColumns } from 'ducks/columns/selectors';
import { getCreativeCatalogueServerError } from 'ducks/creatives/selectors';
import { getSelectedFlights } from 'ducks/dashboard/selectors';
import {
  getPauseOrResumeFlightLinkError,
  getPausingOrResumingFlightLink,
} from 'ducks/flightlinks/selectors';
import {
  getFetchFlightState,
  getFlightFormat,
  getFlightIsInTerminalState,
  getFlightState,
} from 'ducks/flights/selectors';

import { isMusicFormatType } from 'utils/creativeHelpers';

import { CreativeTable, CreativeTableProps } from './CreativeTable';

import { ANALYTICS_CATEGORY } from '../constants';
import { SELECTED_CREATIVE_COLUMNS } from 'ducks/columns/constants';
import { routeFragmentLiterals, routes } from 'config/routes';

import { FlightLinkPauseResumeActionType } from 'types/common/state/api/flightLink';

export type OwnProps = Omit<
  CreativeTableProps,
  | 'selectedColumns'
  | 'displayNotification'
  | 'createNewCreative'
  | 'pauseResumeFlightLink'
  | 'isPausingOrResuming'
  | 'pauseOrResumeError'
  | 'flightId'
  | 'showSecondaryActions'
  | 'showAddCreativePrompt'
  | 'selectedFlightIsLinkable'
  | 'createNewCampaign'
  | 'showAddCampaignPrompt'
  | 'catalogueServerError'
  | 'isSuperviewer'
  | 'currentUserAdAccountId'
  | 'hasAccountWritePermissions'
  | 'advertiserHasDraftImpersonation'
  | 'hasImpersonation'
  | 'isSuperUserAccountActive'
  | 'isSpanEnabled'
>;

// TODO: Refactor CreativeTable to be a function component so that we don't necessarily need these two separate layers.
export const ConnectedCreativeTable = (ownProps: OwnProps) => {
  // feature flags
  const hasImpersonation = useBool('impersonation');

  // state props
  const selectedFlights = useSelector(getSelectedFlights);
  const flightId =
    selectedFlights.length === 1 ? selectedFlights[0] : undefined;
  const showSecondaryActions = !matchPath(window.location.pathname, {
    path: routes.FLIGHT_ENTITY_ADS,
    exact: true,
  });
  const flightIsTerminal = useSelector(getFlightIsInTerminalState);
  const fetchFlightState = useSelector(getFetchFlightState);
  const selectedFlightIsLinkable =
    !!flightId && !flightIsTerminal && fetchFlightState.fetchFlightSuccess;
  const flightFormat = useSelector(getFlightFormat);

  const showAddCreativePrompt =
    !!flightId &&
    !ownProps.params.creativeState &&
    !ownProps.params.searchWord &&
    ownProps.params.offset === '0' &&
    selectedFlightIsLinkable &&
    isMusicFormatType(flightFormat);

  const showAddCampaignPrompt =
    !flightId &&
    ownProps.params.offset === '0' &&
    !ownProps.params.creativeState &&
    !ownProps.params.searchWord &&
    !ownProps.params.dateBegin &&
    !ownProps.params.dateEnd;
  const isSpanEnabled = useSelector(canAccessPodcastBooking);

  const flightState = useSelector(getFlightState);
  const selectedColumns = useSelector(state =>
    getSelectedColumns(state, SELECTED_CREATIVE_COLUMNS),
  );
  const isPausingOrResuming = useSelector(getPausingOrResumingFlightLink);
  const pauseOrResumeError = useSelector(getPauseOrResumeFlightLinkError);
  const isSuperviewer = useSelector(getIsSuperviewer);
  const isSuperUserAccountActive = useSelector(getIsSuperUserAccountActive);
  const account = useSelector(getAccount);
  const catalogueServerError = useSelector(getCreativeCatalogueServerError);
  const hasAccountWritePermissions = useSelector(canCreate);
  const advertiserHasDraftImpersonation = useSelector(
    advertiserHasDraftImpersonationSelector,
  );

  // dispatch props
  const dispatch = useDispatch();
  const createNewCreative = (fid: string) =>
    dispatch(
      routerActions.push(
        routes.BUILD_CREATIVE.replace(
          routeFragmentLiterals.ACCOUNT_ID,
          flightState.adAccountId!,
        ).replace(routeFragmentLiterals.FLIGHT_ID, fid),
      ),
    );
  const displayNotification = (
    notificationText: string,
    notificationType: string,
  ): void => {
    dispatch(displayNotificationAC(notificationText, notificationType));
  };

  const pauseResumeFlightLink = (
    action: FlightLinkPauseResumeActionType,
    pauseFlightId: string,
    creativeId: string,
    creativeAdAccountId: string,
  ): void => {
    dispatch(
      pauseResumeFlightLinkAC({
        adAccountId: creativeAdAccountId,
        flightId: pauseFlightId,
        creativeId,
        action,
      }),
    );
  };

  const createNewCampaign = () => {
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
          account.id,
        ),
      ),
    );
  };

  return (
    <CreativeTable
      {...ownProps}
      hasImpersonation={hasImpersonation}
      selectedColumns={selectedColumns}
      isPausingOrResuming={isPausingOrResuming}
      pauseOrResumeError={pauseOrResumeError}
      flightId={flightId}
      showSecondaryActions={showSecondaryActions}
      showAddCreativePrompt={showAddCreativePrompt}
      selectedFlightIsLinkable={selectedFlightIsLinkable}
      showAddCampaignPrompt={showAddCampaignPrompt}
      isSuperviewer={isSuperviewer}
      isSuperUserAccountActive={isSuperUserAccountActive}
      currentUserAdAccountId={account.id}
      catalogueServerError={catalogueServerError}
      hasAccountWritePermissions={hasAccountWritePermissions}
      advertiserHasDraftImpersonation={advertiserHasDraftImpersonation}
      createNewCreative={createNewCreative}
      displayNotification={displayNotification}
      pauseResumeFlightLink={pauseResumeFlightLink}
      createNewCampaign={createNewCampaign}
      isSpanEnabled={isSpanEnabled}
    />
  );
};
