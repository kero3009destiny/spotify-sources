import {
  CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN,
  CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_FAILED,
  CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_SUCCEEDED,
  CreateFlightAndCreativeForCampaignErrorAction,
  CreateFlightAndCreativeForCampaignStartAction,
  CreateFlightAndCreativeForCampaignSuccessAction,
  DUPLICATE_FLIGHT_WITH_CREATIVES,
  DUPLICATE_FLIGHT_WITH_CREATIVES_FAILED,
  DUPLICATE_FLIGHT_WITH_CREATIVES_SUCCEEDED,
  DuplicateFlightWithCreativesErrorAction,
  DuplicateFlightWithCreativesStartAction,
  DuplicateFlightWithCreativesSuccessAction,
  RESET_BUILD_FLIGHT,
  ResetBuildFlightAction,
} from './types';
import {
  CreateFlightFormValues,
  DuplicateFlightWithCreativesFormValues,
} from 'types/common/campaignHierarchy/types';

export const createFlightForCampaign = (
  formValues: CreateFlightFormValues,
  analyticsCategory: string,
): CreateFlightAndCreativeForCampaignStartAction => ({
  type: CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN,
  payload: {
    formValues,
    analyticsCategory,
  },
});

export const createFlightForCampaignSuccess = (): CreateFlightAndCreativeForCampaignSuccessAction => ({
  type: CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_SUCCEEDED,
});

export const createFlightForCampaignError = (
  response: Response,
): CreateFlightAndCreativeForCampaignErrorAction => ({
  type: CREATE_FLIGHT_AND_CREATIVE_FOR_CAMPAIGN_FAILED,
  error: true,
  payload: response,
});

export const resetBuildFlight = (): ResetBuildFlightAction => ({
  type: RESET_BUILD_FLIGHT,
});

export const duplicateFlightWithCreatives = (
  accountId: string,
  values: DuplicateFlightWithCreativesFormValues,
): DuplicateFlightWithCreativesStartAction => ({
  type: DUPLICATE_FLIGHT_WITH_CREATIVES,
  payload: {
    accountId,
    values,
  },
});

export const duplicateFlightWithCreativesSuccess = (): DuplicateFlightWithCreativesSuccessAction => ({
  type: DUPLICATE_FLIGHT_WITH_CREATIVES_SUCCEEDED,
});

export const duplicateFlightWithCreativesError = (
  error: Error,
): DuplicateFlightWithCreativesErrorAction => ({
  type: DUPLICATE_FLIGHT_WITH_CREATIVES_FAILED,
  error,
});
