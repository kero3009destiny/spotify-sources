import { createWebTeamBillingEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-team-billing';
import { PageId } from '../../PlatformEvents';
import { createUbiEventLogger } from '@mrkt/features/ubi';
import { useCurrentArtistIdOrNull } from '../../artists';

var usePaymentsUbiSpec = function usePaymentsUbiSpec() {
  var spec = createWebTeamBillingEventFactory({
    data: {
      identifier: window.location.href.includes('/campaigns/') ? PageId.ArtistCampaignsBilling : PageId.Billing,
      uri: window.location.href
    }
  });
  return spec;
};

export var usePaymentModalCloseLogger = function usePaymentModalCloseLogger(orgUri) {
  var artistId = useCurrentArtistIdOrNull();
  var spec = usePaymentsUbiSpec();
  var UBIEventLogger = createUbiEventLogger(artistId, orgUri);
  return function () {
    return UBIEventLogger.logInteraction(spec.addPaymentModalFactory().closeButtonFactory().hitUiHide());
  };
};
export var usePaymentModalUpdateCardLogger = function usePaymentModalUpdateCardLogger(orgUri, isNew) {
  var artistId = useCurrentArtistIdOrNull();
  var spec = usePaymentsUbiSpec();
  var UBIEventLogger = createUbiEventLogger(artistId, orgUri);
  return function (checkoutId) {
    return UBIEventLogger.logInteraction(spec.addPaymentModalFactory().updateCardButtonFactory().hitEditCreditCardInfo({
      checkoutId: checkoutId,
      isNew: String(isNew)
    }));
  };
};
export var usePaymentMethodAddCardLogger = function usePaymentMethodAddCardLogger(orgUri) {
  var artistId = useCurrentArtistIdOrNull();
  var spec = usePaymentsUbiSpec();
  var UBIEventLogger = createUbiEventLogger(artistId, orgUri);
  return function () {
    return UBIEventLogger.logInteraction(spec.paymentMethodFactory().addCardButtonFactory().hitUiReveal());
  };
};
export var usePaymentMethodUpdateCardLogger = function usePaymentMethodUpdateCardLogger(orgUri) {
  var artistId = useCurrentArtistIdOrNull();
  var spec = usePaymentsUbiSpec();
  var UBIEventLogger = createUbiEventLogger(artistId, orgUri);
  return function () {
    return UBIEventLogger.logInteraction(spec.paymentMethodFactory().updateButtonFactory().hitUiReveal());
  };
};
export var useBillingContactDropdownLogger = function useBillingContactDropdownLogger(orgUri) {
  var artistId = useCurrentArtistIdOrNull();
  var spec = usePaymentsUbiSpec();
  var UBIEventLogger = createUbiEventLogger(artistId, orgUri);
  return function () {
    return UBIEventLogger.logInteraction(spec.billingInformationFactory().contactEmailDropdownFactory().hitUiReveal());
  };
};
export var useBillingUserSelectionLogger = function useBillingUserSelectionLogger(orgUri) {
  var artistId = useCurrentArtistIdOrNull();
  var spec = usePaymentsUbiSpec();
  var UBIEventLogger = createUbiEventLogger(artistId, orgUri);
  return function (userId) {
    return UBIEventLogger.logInteraction(spec.billingInformationFactory().contactEmailDropdownFactory().userSelectionFactory({
      identifier: userId
    }).hitUiSelect());
  };
};
export var useBillingCountrySelectionLogger = function useBillingCountrySelectionLogger(orgUri) {
  var artistId = useCurrentArtistIdOrNull();
  var spec = usePaymentsUbiSpec();
  var UBIEventLogger = createUbiEventLogger(artistId, orgUri);
  return function (countryName) {
    return UBIEventLogger.logInteraction(spec.billingInformationFactory().countryDropdownFactory().countrySelectionFactory({
      identifier: countryName
    }).hitUiSelect());
  };
};
export var useBillingCountryDropdownLogger = function useBillingCountryDropdownLogger(orgUri) {
  var artistId = useCurrentArtistIdOrNull();
  var spec = usePaymentsUbiSpec();
  var UBIEventLogger = createUbiEventLogger(artistId, orgUri);
  return function () {
    return UBIEventLogger.logInteraction(spec.billingInformationFactory().countryDropdownFactory().hitUiReveal());
  };
};
export var useBillingSaveButtonLogger = function useBillingSaveButtonLogger(orgUri) {
  var artistId = useCurrentArtistIdOrNull();
  var spec = usePaymentsUbiSpec();
  var UBIEventLogger = createUbiEventLogger(artistId, orgUri);
  return function (_ref) {
    var hasCountry = _ref.hasCountry,
        hasEmail = _ref.hasEmail;
    return UBIEventLogger.logInteraction(spec.billingInformationFactory().saveButtonFactory().hitSaveBillingInfo({
      hasCountry: String(hasCountry),
      hasEmail: String(hasEmail)
    }));
  };
};