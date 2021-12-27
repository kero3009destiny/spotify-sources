import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { routerActions } from 'react-router-redux';
import { window } from 'global';
import get from 'lodash/get';
import qs from 'query-string';
// eslint-disable-next-line import/named
import { Dispatch } from 'redux';

import { withRemoteConfig } from '@spotify-internal/remote-config-resolver-react';

import { BulksheetOnboardingPhase } from 'ducks/onboarding/types';
import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import {
  advertiserHasDraftImpersonation as advertiserHasDraftImpersonationSelector,
  canAccessPodcastBooking,
  canCreate,
  getAccount,
  isSuperUserAccountActive,
  isSuperviewer,
} from 'ducks/account/selectors';
import { getCampaignCatalogueServerError } from 'ducks/campaigns/selectors';
import { getSelectedColumns } from 'ducks/columns/selectors';
import { getBulksheetOnboardingPhase } from 'ducks/onboarding/selectors';

import { CampaignTable, CampaignTableProps } from './CampaignTable';

import { ANALYTICS_CATEGORY } from '../constants';
import { SELECTED_CAMPAIGN_COLUMNS } from 'ducks/columns/constants';
import { routeFragmentLiterals, routes, routeTokens } from 'config/routes';

export type OwnProps = Omit<
  CampaignTableProps,
  | 'seeDetails'
  | 'selectedColumns'
  | 'createNewCampaign'
  | 'showAddCampaignPrompt'
  | 'selectedCampaignIds'
  | 'catalogueServerError'
  | 'isSuperviewer'
  | 'currentUserAdAccountId'
  | 'hasAccountWritePermissions'
  | 'advertiserHasDraftImpersonation'
  | 'hasImpersonation'
  | 'isSuperUserAccountActive'
  | 'shouldShowBulksheetsOnboarding'
  | 'isSpanEnabled'
>;

export type StateProps = Omit<
  CampaignTableProps,
  | 'rows'
  | 'isLoading'
  | 'empty'
  | 'onChangeParams'
  | 'params'
  | 'seeDetails'
  | 'createNewCampaign'
  | 'hasImpersonation'
>;

export const mapStateToProps = (
  state: TSFixMe,
  ownProps: OwnProps,
): StateProps => {
  // If we ever allow multiple campaign ids to be selected, this will need to change
  const selectedCampaignId = qs.parse(window.location.search)
    .campaignId as string;
  const showAddCampaignPrompt =
    ownProps.params.offset === '0' &&
    !ownProps.params.searchWord &&
    !ownProps.params.dateBegin &&
    !ownProps.params.dateEnd;

  return {
    selectedColumns: getSelectedColumns(state, SELECTED_CAMPAIGN_COLUMNS),
    showAddCampaignPrompt,
    selectedCampaignIds: selectedCampaignId ? [selectedCampaignId] : [],
    catalogueServerError: getCampaignCatalogueServerError(state),
    isSuperviewer: isSuperviewer(state),
    isSuperUserAccountActive: isSuperUserAccountActive(state),
    currentUserAdAccountId: getAccount(state).id,
    hasAccountWritePermissions: canCreate(state),
    advertiserHasDraftImpersonation: advertiserHasDraftImpersonationSelector(
      state,
    ),
    shouldShowBulksheetsOnboarding:
      getBulksheetOnboardingPhase(state) ===
        BulksheetOnboardingPhase.TABLE_ROW && ownProps.rows.length > 0,
    isSpanEnabled: canAccessPodcastBooking(state),
  };
};

export type DispatchProps = Omit<
  CampaignTableProps,
  | 'rows'
  | 'isLoading'
  | 'empty'
  | 'onChangeParams'
  | 'params'
  | 'selectedColumns'
  | 'showAddCampaignPrompt'
  | 'selectedCampaignIds'
  | 'catalogueServerError'
  | 'isSuperviewer'
  | 'currentUserAdAccountId'
  | 'hasAccountWritePermissions'
  | 'advertiserHasDraftImpersonation'
  | 'hasImpersonation'
  | 'isSuperUserAccountActive'
  | 'shouldShowBulksheetsOnboarding'
  | 'isSpanEnabled'
>;

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const match = matchPath(window.location.pathname, {
    path: routes.CAMPAIGN_CATALOGUE,
    exact: true,
  });
  const adAccountId: string = get(match, `params[${routeTokens.ACCOUNT_ID}]`);
  return {
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
            adAccountId,
          ),
        ),
      );
    },
  };
};

export type ResolvedProps = Pick<CampaignTableProps, 'hasImpersonation'>;

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
)(CampaignTable);

export const ConnectedCampaignTable = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedWithRemoteConfig);
