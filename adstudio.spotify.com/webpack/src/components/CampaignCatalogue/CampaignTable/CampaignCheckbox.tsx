import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormCheckbox } from '@spotify-internal/encore-web';

import { deselectCampaigns, selectCampaigns } from 'ducks/dashboard/actions';
import { getCampaignsAreSelected } from 'ducks/dashboard/selectors';

interface CampaignCheckboxProps {
  campaignIds: string[];
  checkboxId: string;
}

export const CampaignCheckbox = ({
  campaignIds,
  checkboxId,
}: CampaignCheckboxProps) => {
  const dispatch = useDispatch();
  const checked = useSelector(state =>
    getCampaignsAreSelected(state, campaignIds),
  );

  return (
    <FormCheckbox
      id={checkboxId}
      // eslint-disable-next-line i18next/no-literal-string
      name="dashboard-multiselect"
      checked={!!campaignIds.length && checked}
      onChange={() => {
        if (checked) {
          dispatch(deselectCampaigns(campaignIds));
        } else {
          dispatch(selectCampaigns(campaignIds));
        }
      }}
    />
  );
};
