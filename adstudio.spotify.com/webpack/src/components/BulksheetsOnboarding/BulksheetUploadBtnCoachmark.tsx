import React from 'react';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';

import {
  ButtonTertiary,
  Popover,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import { setUserHasSeenBulksheetsOnboarding } from 'ducks/onboarding/actions';

import { ButtonContainer, StyledPopover } from './styles';

import { EXTERNAL_FAQ_ADDRESS } from 'config/routes';

const FAQ =
  EXTERNAL_FAQ_ADDRESS[i18n.language]?.BULKSHEETS ||
  EXTERNAL_FAQ_ADDRESS.en_US.BULKSHEETS;

export const BulksheetUploadBtnCoachmark = () => {
  const dispatch = useDispatch();

  return (
    <StyledPopover top="70px" arrow={Popover.topLeft}>
      <Type as="p" variant={Type.body2} weight={Type.bold}>
        {i18n.t(
          'I18N_BULKSHEETS_COACHMARK_UPLOAD_HEADER',
          'Upload your changes',
        )}
      </Type>
      <Type as="p" variant={Type.body2}>
        {i18n.t(
          'I18N_BULKSHEETS_COACHMARK_UPLOAD_BODY_P1',
          'Upload your edited CSV file to make changes in bulk. You get to preview any changes before submitting them.',
        )}
      </Type>
      <Type
        as="a"
        target="_blank"
        semanticColor={semanticColors.textBrightAccent}
        href={FAQ}
        variant={Type.body2}
      >
        {i18n.t('I18N_BULKSHEETS_LEARN_MORE', 'Learn more about bulk changes')}
      </Type>
      <ButtonContainer>
        <ButtonTertiary
          condensed
          buttonSize={ButtonTertiary.sm}
          onClick={() => dispatch(setUserHasSeenBulksheetsOnboarding())}
          buttonLegacy
        >
          {i18n.t('I18N_DONE', 'Done')}
        </ButtonTertiary>
      </ButtonContainer>
    </StyledPopover>
  );
};
