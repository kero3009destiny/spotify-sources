import React, { FunctionComponent, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';

import {
  addColorSet,
  Backdrop,
  ButtonPrimary,
  ButtonTertiary,
  semanticColors,
  Tag,
  Type,
} from '@spotify-internal/encore-web';

import { logUserAction } from 'ducks/analytics/actions';
import { resetBulksheets, validateBulkCSV } from 'ducks/bulksheets/actions';
import { getAccountId } from 'ducks/account/selectors';
import {
  getCSVUploadFailed,
  getCSVValidationErrorRows,
  getCSVValidationFailed,
  getCSVValidationInProgress,
  getCSVValidationRequestErrorMessages,
  getCurrentBulkSheetId,
} from 'ducks/bulksheets/selectors';

import { AnalyticsContext } from 'components/common/AnalyticsContext';

import { BulksheetModalHeader } from '../styles';
import { BulksheetErrorMessage } from './BulksheetErrorMessage';
import { BulksheetUploader } from './BulksheetUploader';
import { BulksheetValidationErrors } from './BulksheetValidationErrors';
import { ModalSection, StyledDialogConfirmation } from './styles';

import { TRY_AGAIN_BTN_TEST_ID } from './constants';
import { EXTERNAL_FAQ_ADDRESS } from 'config/routes';

const FAQ =
  EXTERNAL_FAQ_ADDRESS[i18n.language]?.BULKSHEETS ||
  EXTERNAL_FAQ_ADDRESS.en_US.BULKSHEETS;

export interface BulksheetUploadModalProps {
  onClose: () => void;
}

export const BulksheetUploadModal: FunctionComponent<BulksheetUploadModalProps> = ({
  onClose,
}) => {
  const dispatch = useDispatch();
  const { category } = useContext(AnalyticsContext);
  const adAccountId: string = useSelector(getAccountId);
  const bulkSheetId = useSelector(getCurrentBulkSheetId);
  const uploadFailure = useSelector(getCSVUploadFailed);
  const validationFailure = useSelector(getCSVValidationFailed);
  const validationRequestErrorMessages = useSelector(
    getCSVValidationRequestErrorMessages,
  );
  const validationErrorRows = useSelector(getCSVValidationErrorRows);
  const validationInProgress = useSelector(getCSVValidationInProgress);

  useEffect(() => {
    if (bulkSheetId) {
      dispatch(
        logUserAction({
          category,
          label: 'Successfully_uploaded_csv_in_upload_bulksheet_modal',
        }),
      );
    }
  }, [dispatch, category, bulkSheetId]);

  useEffect(() => {
    if (uploadFailure) {
      dispatch(
        logUserAction({
          category,
          label: 'Invalid_file_uploaded_error_in_upload_bulksheet_modal',
        }),
      );
    }
  }, [dispatch, category, uploadFailure]);

  useEffect(() => {
    if (validationFailure) {
      dispatch(
        logUserAction({
          category,
          label: 'File_errors_uploaded_in_upload_bulksheet_modal',
          params: {
            gainzValidation: validationRequestErrorMessages
              ? JSON.stringify(validationRequestErrorMessages)
              : '',
            campaignServiceValidation: validationErrorRows
              ? JSON.stringify(validationErrorRows)
              : '',
          },
        }),
      );
    }
  }, [
    dispatch,
    category,
    validationFailure,
    validationRequestErrorMessages,
    validationErrorRows,
  ]);

  return (
    <Backdrop onClose={onClose} center>
      <StyledDialogConfirmation
        dialogTitle={
          <BulksheetModalHeader variant={Type.heading3}>
            {i18n.t('I18N_UPLOAD_CSV', 'Upload changes in bulk')}
            <Tag>{i18n.t('I18N_BETA', 'Beta')}</Tag>
          </BulksheetModalHeader>
        }
        body={
          <>
            {!validationFailure && (
              <>
                <ModalSection>
                  {uploadFailure && (
                    <BulksheetErrorMessage>
                      {i18n.t(
                        'I18N_UPLOAD_BULKSHEET_ALERT_FILE_TYPE',
                        'Only CSV files are supported.',
                      )}
                    </BulksheetErrorMessage>
                  )}
                  <Type
                    as="p"
                    condensed
                    semanticColor={semanticColors.textSubdued}
                    variant={Type.body2}
                  >
                    {i18n.t(
                      'I18N_UPLOAD_CSV_BODY',
                      'To get a CSV, select and download items you’d like to edit from the overview page.',
                    )}{' '}
                    <Type
                      as="a"
                      target="_blank"
                      semanticColor={semanticColors.textBrightAccent}
                      href={FAQ}
                    >
                      {i18n.t(
                        'I18N_BULKSHEETS_LEARN_MORE',
                        'Learn more about bulk changes',
                      )}
                    </Type>
                  </Type>
                </ModalSection>
                <BulksheetUploader />
              </>
            )}

            {validationFailure && (
              <BulksheetErrorMessage>
                {i18n.t(
                  'I18N_UPLOAD_BULKSHEET_VALIDATION_ERROR_TEXT',
                  'Address the errors below, then try uploading your CSV again.',
                )}
              </BulksheetErrorMessage>
            )}

            {validationFailure && validationRequestErrorMessages && (
              <ModalSection>
                {validationRequestErrorMessages.map((errorMessage, idx) => (
                  <Type
                    key={`validation-error-msg-${idx}`}
                    as="p"
                    condensed
                    semanticColor={semanticColors.textSubdued}
                    variant={Type.body2}
                  >
                    {errorMessage}
                  </Type>
                ))}
              </ModalSection>
            )}

            {validationFailure && validationErrorRows && (
              <ModalSection>
                <BulksheetValidationErrors errorRows={validationErrorRows} />
              </ModalSection>
            )}
          </>
        }
        footer={
          <>
            <ButtonTertiary
              onClick={onClose}
              disabled={validationInProgress}
              className={addColorSet('base')}
            >
              {i18n.t('I18N_CANCEL', 'Cancel')}
            </ButtonTertiary>

            {!validationFailure && (
              <ButtonPrimary
                disabled={!bulkSheetId || validationInProgress}
                onClick={() => {
                  dispatch(
                    validateBulkCSV({
                      adAccountId,
                      bulkSheetId: bulkSheetId!,
                    }),
                  );
                  logUserAction({
                    category: category,
                    label: 'Clicked_upload_button_in_upload_bulksheet_modal',
                  });
                }}
              >
                {i18n.t('I18N_BULK_UPLOAD', 'Upload CSV')}
              </ButtonPrimary>
            )}

            {validationFailure && (
              <ButtonPrimary
                data-test={TRY_AGAIN_BTN_TEST_ID}
                onClick={() => dispatch(resetBulksheets())}
              >
                {i18n.t('I18N_TRY_AGAIN', 'Try again')}
              </ButtonPrimary>
            )}
          </>
        }
      />
    </Backdrop>
  );
};
