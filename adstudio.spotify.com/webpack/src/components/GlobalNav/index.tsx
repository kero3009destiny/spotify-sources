import { connect } from 'react-redux';
import { get } from 'lodash';
import { Dispatch } from 'redux';

import { logUserAction } from 'ducks/analytics/actions';
import {
  requestAccountHierarchyOnboarding as requestAccountHierarchyOnboardingAction,
  setAccountHierarchyOnboardingState as setAccountHierarchyOnboardingStateAction,
} from 'ducks/onboarding/actions';
import {
  getAccount,
  getSuperUserRoles,
  isImpersonating as isImpersonatingSelector,
} from 'ducks/account/selectors';
import { getReducedAccessedAccounts } from 'ducks/accountManagement/selectors';
import { getAccountById, getAccounts } from 'ducks/accounts/selectors';
import { getGAPartnerId } from 'ducks/analytics/selectors';
import { getIsAuthorized } from 'ducks/auth/selectors';
import { getSelectedLocale } from 'ducks/i18n/selectors';
import { shouldShowAccountHierarchyOnboarding } from 'ducks/onboarding/selectors';
import { getCurrentRouteLocation } from 'ducks/routes/selectors';
import { getUser } from 'ducks/user/selectors';

import GlobalNav, { DispatchProps, StateProps } from './GlobalNav';

import { MOST_FREQUENT_ACCOUNTS_LIMIT } from 'ducks/accountManagement/constants';

export const mapStateToProps = (state: TSFixMe): StateProps => {
  const account = getAccount(state);
  const accountAccesses = getReducedAccessedAccounts(state);
  // decorate accounts with the accesses
  const accounts = getAccounts(state)
    .map((thisAccount: TSFixMe) => ({
      ...thisAccount,
      accesses: accountAccesses[thisAccount.adAccountId] || 0,
    }))
    // Sort by account name, or role if account names are the same.
    // NOTE: role names in alphabetical order conveniently match rank.  If we at some point add
    // a role that does not map so nicely we'll have to fix this logic a little
    .sort((a: TSFixMe, b: TSFixMe) => {
      let rv = 0;
      if (a.adAccountName < b.adAccountName) {
        rv = -1;
      } else if (a.adAccountName > b.adAccountName) {
        rv = 1;
      } else if (a.role < b.role) {
        rv = -1;
      } else if (a.role < b.role) {
        rv = 1;
      }
      return rv;
    });
  // construct most frequently used accounts from accounts
  const frequentAccounts = [...accounts]
    // Sort by most frequently accessed to least frequently accessed
    .sort((a: TSFixMe, b: TSFixMe) => b.accesses - a.accesses)
    // And limit to only the most frequently used ones that we care about
    .slice(0, MOST_FREQUENT_ACCOUNTS_LIMIT);

  return {
    gaPartnerId: getGAPartnerId(state) || 'unknown',
    userMetadata: getUser(state),
    account,
    accountMetadata: getAccountById(state, account.id),
    locale: getSelectedLocale(state),
    accounts,
    frequentAccounts,
    currentRoute: getCurrentRouteLocation(state),
    isAuthorized: getIsAuthorized(state),
    buildAdDisabled: false,
    roles: getSuperUserRoles(state),
    isGreylisted:
      get(account, 'adAccountStatus.type', undefined) === 'GREYLISTED',
    showAccountHierarchyOnboarding: shouldShowAccountHierarchyOnboarding(state),
    isImpersonating: isImpersonatingSelector(state),
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    logUserAction: (...params) => dispatch(logUserAction(...params)),
    requestAccountHierarchyOnboarding: () =>
      dispatch(requestAccountHierarchyOnboardingAction()),
    setAccountHierarchyOnboardingState: (active: boolean) =>
      dispatch(setAccountHierarchyOnboardingStateAction(active)),
  };
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalNav);
