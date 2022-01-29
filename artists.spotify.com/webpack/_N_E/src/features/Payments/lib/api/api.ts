import { buildBillingInformationUrl, buildPaymentMethodUrl, buildFetchCheckoutUrl, buildValidateCheckoutUrl, buildActiveCountriesUrl, buildFetchPaymentTransactionsUrl } from './helpers';
import { useCurrentTeamOrNull, useCurrentTeamDetails, useCurrentTeamMembers, useCanManageCurrentTeam } from '../../../Team/hooks';
import { webgateFetchJson, webgateFetch } from '@mrkt/features/webgate-fetch';
export var fetchBillingInformation = function fetchBillingInformation(teamUri) {
  return webgateFetch(buildBillingInformationUrl(teamUri));
};
export var saveBillingInformation = function saveBillingInformation(teamUri, newBillingInformation) {
  return webgateFetch(buildBillingInformationUrl(teamUri), {
    body: JSON.stringify(newBillingInformation),
    headers: {
      'content-type': 'application/json'
    },
    method: 'PUT'
  });
};
export var fetchPaymentMethod = function fetchPaymentMethod(teamUri) {
  return webgateFetch(buildPaymentMethodUrl(teamUri));
};
export var fetchCheckout = function fetchCheckout(teamUri, checkoutId) {
  return webgateFetch(buildFetchCheckoutUrl(teamUri, checkoutId));
};
export var validateCheckout = function validateCheckout(teamUri) {
  return webgateFetchJson(buildValidateCheckoutUrl(teamUri), {
    body: JSON.stringify({
      redirectTarget: 2 // no longer being used but required for backend so hard-coded

    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  });
};
export var fetchActiveCountries = function fetchActiveCountries() {
  return webgateFetch(buildActiveCountriesUrl());
};
export var fetchPaymentTransactions = function fetchPaymentTransactions(teamUri) {
  var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return webgateFetch(buildFetchPaymentTransactionsUrl(teamUri, pageNumber));
};
export var useCurrentTeamUri = function useCurrentTeamUri() {
  var _useCurrentTeamOrNull;

  return (_useCurrentTeamOrNull = useCurrentTeamOrNull()) === null || _useCurrentTeamOrNull === void 0 ? void 0 : _useCurrentTeamOrNull.uri;
};
export var useIsAdmin = function useIsAdmin(team) {
  return useCanManageCurrentTeam(team);
};
export var useTeamMembers = function useTeamMembers(teamUri) {
  return useCurrentTeamMembers(teamUri);
};
export var useTeamName = function useTeamName(teamUri) {
  var currentTeamDetails = useCurrentTeamDetails(teamUri);

  if (currentTeamDetails === null) {
    return '';
  }

  return currentTeamDetails.name;
};