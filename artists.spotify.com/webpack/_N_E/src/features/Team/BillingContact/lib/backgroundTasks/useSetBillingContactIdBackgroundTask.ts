import { useEffect } from 'react';
import { useT } from '@mrkt/features/i18n';
import { useBillingInformation } from '../../../../Payments/lib/hooks/useBillingInformation';
var BANNER_ID = 'set-billing-contact-id';
export var useSetBillingContactIdBackgroundTask = function useSetBillingContactIdBackgroundTask(_ref, _ref2) {
  var setBillingInformation = _ref.setBillingInformation,
      showErrorBanner = _ref.showErrorBanner;
  var currentTeam = _ref2.currentTeam;
  var t = useT();

  var _useBillingInformatio = useBillingInformation((currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.uri) || ''),
      billingSettings = _useBillingInformatio.billingSettings;

  useEffect(function () {
    var isActive = true;

    if (!currentTeam) {
      return function () {};
    }

    try {
      if (billingSettings.billingContactId && isActive) {
        setBillingInformation(billingSettings.billingContactId, billingSettings.country);
      }
    } catch (e) {
      showErrorBanner(t('BILLING_CONTACT_ERROR_BANNER', 'Something went wrong', 'Something went wrong setting the billing contact.'), {
        id: BANNER_ID
      });
    }

    return function () {
      isActive = false;
    };
  }, [currentTeam, setBillingInformation, showErrorBanner, t, billingSettings]);
};