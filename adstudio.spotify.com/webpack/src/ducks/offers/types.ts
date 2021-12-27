import { google } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Timestamp';

export const FETCH_OFFERS_REQUESTED = 'FETCH_OFFERS_REQUESTED';
export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const FETCH_OFFERS_FAILED = 'FETCH_OFFERS_FAILED';

export type OffersAction =
  | FetchOffersRequestedAction
  | FetchOffersSuccessAction
  | FetchOffersFailedAction;

export interface FetchOffersRequestedAction {
  type: typeof FETCH_OFFERS_REQUESTED;
  payload: OffersRequestPayload;
}

export interface FetchOffersSuccessAction {
  type: typeof FETCH_OFFERS_SUCCESS;
  payload: OffersResponsePayload;
}

export interface FetchOffersFailedAction {
  type: typeof FETCH_OFFERS_FAILED;
  error: true;
}

export interface OffersRequestPayload {
  adAccountId: string;
}

export interface OffersResponsePayload {
  offerFulfillmentOrderId?: string;
  expiry?: google.protobuf.Timestamp;
  totalOfferAmountMicros?: number;
  remainingOfferAmountMicros?: number;
  currency?: string;
}
