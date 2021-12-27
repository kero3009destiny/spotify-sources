import { Account } from 'ducks/account/types';

import { CampaignFormValues } from 'types/common/campaignHierarchy/types';
import { CreateCampaignPayload } from 'types/common/state/api/campaign';

export const mapFormValuesToCampaignPayload = (
  formState: CampaignFormValues,
  account: Account,
  hierarchyDraftId?: string,
): CreateCampaignPayload => {
  const artist = formState.artist && formState.artist[0];
  return {
    adAccountId: account.id,
    name: formState.name!,
    objective: formState.objective!,
    purchaseOrderNumber: formState.purchaseOrderNumber,
    artistId: artist ? artist.id : undefined,
    hierarchyDraftId,
  };
};
