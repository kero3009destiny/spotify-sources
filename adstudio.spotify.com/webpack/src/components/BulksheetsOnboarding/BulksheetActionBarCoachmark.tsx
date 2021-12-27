import React from 'react';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';

import { ButtonTertiary, Popover, Type } from '@spotify-internal/encore-web';

import { BulksheetOnboardingPhase } from 'ducks/onboarding/types';
import { showBulksheetOnboardingPhase } from 'ducks/onboarding/actions';

import { ButtonContainer, FixedPopover } from './styles';

export const BulksheetActionBarCoachmark = () => {
  const dispatch = useDispatch();

  return (
    <FixedPopover arrow={Popover.bottom}>
      <Type as="p" variant={Type.body2} weight={Type.bold}>
        {i18n.t('I18N_BULKSHEETS_COACHMARK_DOWNLOAD_HEADER', 'Edit in bulk')}
      </Type>
      <Type as="p" variant={Type.body2}>
        {i18n.t(
          'I18N_BULKSHEETS_COACHMARK_DOWNLOAD_BODY',
          'Upload your edited CSV file to make changes in bulk. You get to preview any changes before submitting them.',
        )}
      </Type>
      <ButtonContainer>
        <ButtonTertiary
          condensed
          buttonSize={ButtonTertiary.sm}
          onClick={() =>
            dispatch(
              showBulksheetOnboardingPhase(BulksheetOnboardingPhase.UPLOAD_BTN),
            )
          }
          buttonLegacy
        >
          {i18n.t('I18N_NEXT', 'Next')}
        </ButtonTertiary>
      </ButtonContainer>
    </FixedPopover>
  );
};
