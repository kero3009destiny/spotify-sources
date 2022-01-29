import { useInternationalPaymentFlag } from './useInternationalPaymentFlag';
export function useBillingCountry(country) {
  var internationalPaymentEnabled = useInternationalPaymentFlag();

  if (!internationalPaymentEnabled) {
    return 'US';
  }

  return country || 'US';
}