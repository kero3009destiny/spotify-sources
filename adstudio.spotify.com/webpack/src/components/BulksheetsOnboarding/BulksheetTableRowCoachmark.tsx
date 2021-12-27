import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';

import { ButtonTertiary, Popover, Type } from '@spotify-internal/encore-web';

import { BulksheetOnboardingPhase } from 'ducks/onboarding/types';
import { selectCampaigns } from 'ducks/dashboard/actions';
import { showBulksheetOnboardingPhase } from 'ducks/onboarding/actions';

import { ButtonContainer, StyledPopover } from './styles';

export interface BulksheetTableRowCoachmarkProps {
  campaignId: string;
}

export const BulksheetTableRowCoachmark = ({
  campaignId,
}: BulksheetTableRowCoachmarkProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectCampaigns([campaignId]));
  }, [dispatch, campaignId]);

  return (
    <StyledPopover top="85px" arrow={Popover.topLeft}>
      <Type as="p" variant={Type.body2} weight={Type.bold}>
        {i18n.t(
          'I18N_BULKSHEETS_COACHMARK_MULTISELECT_HEADER',
          'Select 1 or more',
        )}
      </Type>
      <Type as="p" variant={Type.body2}>
        {i18n.t(
          'I18N_BULKSHEETS_COACHMARK_MULTISELECT_BODY',
          'Now, you can select more than 1 item to manage, view, or download.',
        )}
      </Type>
      <ButtonContainer>
        <ButtonTertiary
          condensed
          buttonSize={ButtonTertiary.sm}
          onClick={() =>
            dispatch(
              showBulksheetOnboardingPhase(BulksheetOnboardingPhase.ACTION_BAR),
            )
          }
          buttonLegacy
        >
          {i18n.t('I18N_NEXT', 'Next')}
        </ButtonTertiary>
      </ButtonContainer>
    </StyledPopover>
  );
};
