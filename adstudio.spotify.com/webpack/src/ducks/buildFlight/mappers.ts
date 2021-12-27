import { Account } from 'ducks/account/types';

import {
  mapFlightFormTargeting,
  parseDateValue,
} from 'utils/campaignHierarchy/mapperHelpers';

import { ARTIST_PROMO } from 'config/adCreation';
import { FREQUENCY_CAP_DEFAULT_VALUE } from 'config/frequencyCaps';

import { FlightFormValues } from 'types/common/campaignHierarchy/types';
import { DuplicationType } from 'types/common/state/api/bff';
import { CampaignDetails } from 'types/common/state/api/campaign';
import { CreateFlightPayload } from 'types/common/state/api/flight';

export type FlightRelevantCampaignDetails = Pick<
  CampaignDetails,
  'campaignId' | 'objective' | 'artistId' | 'purchaseOrderNumber'
>;

interface FlightMetadata {
  draftId?: string;
  duplicatedFlightId?: string;
  hierarchyDraftId?: string;
  duplicationType?: DuplicationType;
}

export const mapFormValuesToFlightPayload = (
  formState: FlightFormValues,
  account: Account,
  campaignDetails: FlightRelevantCampaignDetails,
  flightMetadata?: FlightMetadata,
): CreateFlightPayload => {
  const targeting = mapFlightFormTargeting(formState);
  const totalBudget = Number(formState.totalBudget!);
  const fixedFinalBudget = totalBudget.toFixed(2);
  return {
    adAccountId: account.id,
    campaignId: campaignDetails.campaignId!,
    name: formState.name!,
    dateBegin: parseDateValue(formState.dateRange!, 'begin'),
    dateEnd: parseDateValue(formState.dateRange!, 'end'),
    targeting,
    totalBudget: {
      amount: Number(fixedFinalBudget),
      currency: account.countryAttributes.countryCurrency!.code!,
    },
    objective: campaignDetails.objective!,
    artistId:
      campaignDetails.objective === ARTIST_PROMO
        ? campaignDetails.artistId
        : undefined,
    purchaseOrderNumber: campaignDetails.purchaseOrderNumber,
    format: formState.format!,
    aspectRatio: formState.aspectRatio!,
    draftId: flightMetadata?.draftId,
    duplicatedFlightId: flightMetadata?.duplicatedFlightId,
    copiedFlightId: formState.copiedFlightId,
    audienceMatchIds: formState.customAudiences,
    frequencyCap: formState.withFrequencyCap
      ? formState.frequencyCap! || FREQUENCY_CAP_DEFAULT_VALUE
      : FREQUENCY_CAP_DEFAULT_VALUE,
    hierarchyDraftId: flightMetadata?.hierarchyDraftId || undefined,
    duplicationType: flightMetadata?.duplicationType || undefined,
    serveOnMegaphone: !!formState.serveOnMegaphone,
  };
};
