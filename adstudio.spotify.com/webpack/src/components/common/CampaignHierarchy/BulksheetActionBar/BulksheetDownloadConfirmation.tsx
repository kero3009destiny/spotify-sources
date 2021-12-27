import React from 'react';
import i18n from 'i18next';

import {
  addColorSet,
  Backdrop,
  ButtonPrimary,
  ButtonTertiary,
  Tag,
  Type,
} from '@spotify-internal/encore-web';

import { BulksheetModalHeader } from '../styles';
import { CountryTargeting } from './CountryTargeting';
import { StyledDialogConfirmation } from './styles';

import {
  BULKSHEET_CANCEL_DOWNLOAD_BTN_TEST_ID,
  BULKSHEET_CONFIRM_DOWNLOAD_BTN_TEST_ID,
  BULKSHEET_CONFIRMATION_MODAL_TEST_ID,
} from './constants';

export interface BulksheetDownloadConfirmationProps {
  onCancel: () => void;
  onDownload: () => void;
}

export const BulksheetDownloadConfirmation = (
  props: BulksheetDownloadConfirmationProps,
) => {
  return (
    <Backdrop center>
      <StyledDialogConfirmation
        data-test={BULKSHEET_CONFIRMATION_MODAL_TEST_ID}
        dialogTitle={
          <BulksheetModalHeader variant={Type.heading3}>
            {i18n.t(
              'I18N_DOWNLOAD_CAMPAIGN_DATA_PLURAL',
              'Download your selections',
            )}
            <Tag>{i18n.t('I18N_BETA', 'Beta')}</Tag>
          </BulksheetModalHeader>
        }
        body={
          <>
            <Type as="p" variant={Type.body2}>
              {i18n.t(
                'I18N_DOWNLOAD_BULKSHEET_DESCRIPTION_TEXT',
                "You can edit or duplicate your selections offline in a CSV. Your CSV won't include podcast ad sets and ads. Once you're done making changes, upload your edited CSV from the campaign dashboard.",
              )}
            </Type>
            <CountryTargeting />
          </>
        }
        footer={
          <>
            <ButtonTertiary
              data-test={BULKSHEET_CANCEL_DOWNLOAD_BTN_TEST_ID}
              onClick={props.onCancel}
              className={addColorSet('base')}
            >
              {i18n.t('I18N_CANCEL', 'Cancel')}
            </ButtonTertiary>
            <ButtonPrimary
              onClick={() => props.onDownload()}
              data-test={BULKSHEET_CONFIRM_DOWNLOAD_BTN_TEST_ID}
            >
              {i18n.t('I18N_DOWNLOAD_CSV', 'Download CSV')}
            </ButtonPrimary>
          </>
        }
      />
    </Backdrop>
  );
};
