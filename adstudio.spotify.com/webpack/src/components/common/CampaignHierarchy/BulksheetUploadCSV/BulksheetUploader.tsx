import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';

import { LegacyUploader } from '@spotify-internal/encore-advertising-web';
import { ButtonTertiary, Type } from '@spotify-internal/encore-web';
import { LoadingSpinner } from '@spotify-internal/encore-web/advertising/components/LoadingSpinner';

import {
  resetBulksheets,
  uploadBulkCSVFailed,
  uploadBulkCSVSucceeded,
} from 'ducks/bulksheets/actions';
import { getAccountId } from 'ducks/account/selectors';
import { getCSVValidationInProgress } from 'ducks/bulksheets/selectors';

import { CsvIMG, FileIcon } from 'components/common/Icons';

import { getBulkCSVSignedUrl } from 'api/bulksheets';

import { useUploader } from 'utils/hooks/useUploader';

import {
  BulksheetUploadDisplayContainer,
  BulksheetUploadFileMetadataContainer,
} from './styles';

export const BulksheetUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, uploadFile] = useUploader();
  const dispatch = useDispatch();
  const validationStarted = useSelector(getCSVValidationInProgress);
  const adAccountId = useSelector(getAccountId);

  return (
    <LegacyUploader
      id="uploader"
      onClickDelete={() => {}} // fake prop to please the Uploader component
      displayIcon={CsvIMG}
      onUpload={async uploadedFile => {
        try {
          const signedUrlResponse = await getBulkCSVSignedUrl(adAccountId);
          await uploadFile({
            bucket: 'gcs',
            file: uploadedFile,
            url: signedUrlResponse.signedUrl,
          });
          setFile(uploadedFile);
          dispatch(uploadBulkCSVSucceeded(signedUrlResponse.bulkSheetId));
        } catch (e) {
          dispatch(uploadBulkCSVFailed(e));
        }
      }}
      accept={{ 'text/csv': 'CSV' }}
      skipValidation
      displayComponent={() => (
        <BulksheetUploadDisplayContainer>
          <BulksheetUploadFileMetadataContainer>
            <FileIcon />
            <Type variant={Type.body1} as="label">
              {file?.name}
            </Type>
          </BulksheetUploadFileMetadataContainer>
          {!validationStarted && (
            <ButtonTertiary
              onClick={() => {
                setFile(null);
                dispatch(resetBulksheets());
              }}
              buttonLegacy
            >
              {i18n.t('I18N_DELETE', 'Delete')}
            </ButtonTertiary>
          )}
          {validationStarted && <LoadingSpinner diameter={64} />}
        </BulksheetUploadDisplayContainer>
      )}
      onError={() => {}} // fake prop to please the Uploader component
      displayComponentProps={{
        name: file?.name,
      }}
      uploadText={i18n.t(
        'I18N_UPLOAD_BULKSHEET_CSV_PROMPT',
        'Make sure your CSV file is smaller than 900 MB and has fewer than 100 rows.',
      )}
      isUploading={uploadState.uploading}
      uploadingProgress={uploadState.progress}
      shouldShowUploader={!file}
      iconContainerHeight="64px"
      resetCode={0}
      dragAndDropText={i18n.t(
        'I18N_DRAG_AND_DROP_YOUR_FILE',
        'Drag and drop your file',
      )}
      uploadFileText={i18n.t('I18N_UPLOAD_CSV_CTA', 'Select a CSV')}
    />
  );
};
