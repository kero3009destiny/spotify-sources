import { useRead, usePut } from '@spotify-internal/creator-data-loading';
import { PaymentMethodLoader } from '../loaders/PaymentMethodLoader';
export var usePaymentMethod = function usePaymentMethod(teamUri) {
  return {
    cards: useRead(PaymentMethodLoader, teamUri),
    setCards: usePut(PaymentMethodLoader, teamUri)
  };
};