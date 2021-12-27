import { google } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Timestamp';

import { FETCH_OFFERS_SUCCESS, OffersAction } from './types';

export interface OffersState {
  offerFulfillmentOrderId?: string;
  expiry?: google.protobuf.Timestamp;
  totalOfferAmountMicros?: number;
  remainingOfferAmountMicros?: number;
  currency?: string;
}

export const initialState: OffersState = {};

export default (state: OffersState = initialState, action: OffersAction) => {
  switch (action.type) {
    case FETCH_OFFERS_SUCCESS:
      return {
        ...state,
        offerFulfillmentOrderId: action.payload.offerFulfillmentOrderId,
        expiry: action.payload.expiry,
        totalOfferAmountMicros: action.payload.totalOfferAmountMicros,
        remainingOfferAmountMicros: action.payload.remainingOfferAmountMicros,
        currency: action.payload.currency,
      };
    default:
      return state;
  }
};
