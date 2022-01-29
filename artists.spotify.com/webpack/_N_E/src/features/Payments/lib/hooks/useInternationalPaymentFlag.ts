// ignore-string-externalization
import { InternationalPaymentBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export var useInternationalPaymentFlag = function useInternationalPaymentFlag() {
  return useRemoteProperty(InternationalPaymentBool);
};