// ignore-string-externalization
import { InvoicingPaymentMethodBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
export var useInvoicingPaymentMethod = function useInvoicingPaymentMethod() {
  return useRemoteProperty(InvoicingPaymentMethodBool);
};