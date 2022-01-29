// ignore-string-externalization
import { PaymentHistoryBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export var usePaymentHistoryFlag = function usePaymentHistoryFlag() {
  return useRemoteProperty(PaymentHistoryBool);
};