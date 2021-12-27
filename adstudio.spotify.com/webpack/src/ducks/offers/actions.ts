import {
  FETCH_OFFERS_FAILED,
  FETCH_OFFERS_REQUESTED,
  FETCH_OFFERS_SUCCESS,
  FetchOffersFailedAction,
  FetchOffersRequestedAction,
  FetchOffersSuccessAction,
  OffersRequestPayload,
  OffersResponsePayload,
} from './types';

export const fetchOffers = (
  payload: OffersRequestPayload,
): FetchOffersRequestedAction => ({
  type: FETCH_OFFERS_REQUESTED,
  payload: payload,
});

export const fetchOffersSuccess = (
  payload: OffersResponsePayload,
): FetchOffersSuccessAction => ({
  type: FETCH_OFFERS_SUCCESS,
  payload: payload,
});

export const fetchOffersFailed = (): FetchOffersFailedAction => ({
  type: FETCH_OFFERS_FAILED,
  error: true,
});
