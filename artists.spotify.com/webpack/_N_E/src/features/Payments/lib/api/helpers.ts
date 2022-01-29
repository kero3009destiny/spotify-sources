import { WEBGATE_DOMAIN, S4X_DATA_API } from '../../../../shared/lib/api';
export var WALLET_API = "".concat(WEBGATE_DOMAIN, "/s4x-wallet");
export var CREATOR_PAYMENT_API = "https://creator-payment-gateway.spotify.com";
export var MARQUEE_PRODUCT_TYPE = 'S4A_MARQUEE';
export var MARQUEE_CLIENT_ID = 3;
export var buildBillingInformationUrl = function buildBillingInformationUrl(teamUri) {
  return "".concat(WALLET_API, "/v1/organization/").concat(teamUri, "/settings");
};
export var buildPaymentMethodUrl = function buildPaymentMethodUrl(teamUri) {
  return "".concat(WALLET_API, "/v1/organization/").concat(teamUri, "/card?productType=").concat(MARQUEE_PRODUCT_TYPE);
};
export var buildFetchCheckoutUrl = function buildFetchCheckoutUrl(teamUri, checkoutId) {
  return "".concat(WALLET_API, "/v1/organization/").concat(teamUri, "/checkout/").concat(checkoutId, "?productType=").concat(MARQUEE_PRODUCT_TYPE);
};
export var buildValidateCheckoutUrl = function buildValidateCheckoutUrl(teamUri) {
  return "".concat(WALLET_API, "/v1/organization/").concat(teamUri, "/checkout");
};
export var buildFetchPaymentTransactionsUrl = function buildFetchPaymentTransactionsUrl(teamUri, pageNumber) {
  return "".concat(CREATOR_PAYMENT_API, "/v1/organization/").concat(teamUri, "/payments/page/").concat(pageNumber);
};
export var buildActiveCountriesUrl = function buildActiveCountriesUrl() {
  return "".concat(S4X_DATA_API, "/v1/launched-countries");
};