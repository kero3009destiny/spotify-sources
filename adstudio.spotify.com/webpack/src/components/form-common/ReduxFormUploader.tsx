// This file is now only used for the Revise redux form. This abstraction can be fully eliminated
// when the Revise form is re-written with react final form
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blur as blurAC, Field } from 'redux-form';
import { checkForFileUpload, validAudioFileType } from 'validators';
import { validateBackgroundDuration } from 'validators/audio';
import { i18nRequired } from 'validators/i18nRequired';
import { toAsyncValidator } from 'validators/toAsyncValidator';

import { getAccountId } from 'ducks/account/selectors';
import { getReduxFormValues } from 'ducks/reduxForm/selectors';

import AudioUploaderComponent from 'components/form-common/AudioUploader';

import { createPlaceholder, CreateUploadUrlResponse } from 'api/adCreation';

import { getFileError } from 'utils/creativeHelpers';
import { useUploader } from 'utils/hooks/useUploader';
import { removeSignatureFromUrl } from 'utils/uploadHelpers';

import { Format } from 'types/common/state/api/format';
import { UPLOAD_TYPES } from 'types/common/state/api/uploadTypes';

interface ReduxFormUploaderProps {
  id: string;
  isRequired: boolean;
  name: string;
  uploaderFieldName: string;
  onUpload: (file: File) => void;
  formName: string;
  validate: (value: any, formValues: any) => void;
  fieldName: string;
  onClickDelete?: () => void;
  description: string;
}

export const ReduxFormUploader = ({
  formName,
  name,
  validate,
  uploaderFieldName,
  isRequired,
  onClickDelete,
  ...remainingProps
}: ReduxFormUploaderProps) => {
  const dispatch = useDispatch();
  const reduxFormValues = useSelector(getReduxFormValues);
  const currentValue =
    // @ts-ignore
    reduxFormValues[formName] && reduxFormValues[formName][name]
      ? // @ts-ignore
        reduxFormValues[formName][name]
      : {};
  const [uploadState, uploadFile] = useUploader();
  const adAccountId = useSelector(getAccountId);
  const [asyncFileError, setAsyncFileError] = useState<string | null>(null);
  const uploadValidators = [checkForFileUpload(name)];

  return (
    <div className="redux-form-uploader">
      <Field
        {...remainingProps}
        validate={uploadValidators}
        name={uploaderFieldName}
        // @ts-ignore
        component={AudioUploaderComponent}
        shouldShowUploader={!currentValue?.id}
        skipValidation
        isUploading={uploadState.uploading}
        onClickDelete={() => {
          if (onClickDelete) {
            onClickDelete();
          }
          dispatch(blurAC(formName, name, null));
          dispatch(blurAC(formName, uploaderFieldName, null));
        }}
        onError={(msg: string) => Error(msg)}
        uploadType={UPLOAD_TYPES.BG_MUSIC}
        uploadInfo={currentValue}
        isRequired={isRequired}
        progress={uploadState.progress}
        onBlur={async (_, file) => {
          try {
            // Run async validators
            const fileError = await getFileError(file, UPLOAD_TYPES.BG_MUSIC, [
              toAsyncValidator(validAudioFileType),
              validateBackgroundDuration,
            ]);

            if (fileError) {
              setAsyncFileError(fileError);
            } else {
              setAsyncFileError(null);

              // Sign URL
              const signedUrlResponse = await createPlaceholder(
                UPLOAD_TYPES.BG_MUSIC,
                file.type,
                adAccountId,
                undefined,
                Format.AUDIO,
              );

              // Upload to GCS
              await uploadFile({
                bucket: 'gcs',
                url: (signedUrlResponse as CreateUploadUrlResponse).gcsUri!,
                file,
              });

              const formValue = {
                id: (signedUrlResponse as CreateUploadUrlResponse).id!,
                gcsUri: removeSignatureFromUrl(
                  (signedUrlResponse as CreateUploadUrlResponse).gcsUri!,
                ),
                name: file.name,
                fileName: file.name,
              };

              dispatch(blurAC(formName, name, formValue));
              dispatch(blurAC(formName, uploaderFieldName, formValue));
            }
          } catch (e) {
            setAsyncFileError(e.message);
          }
        }}
        asyncErrorMessage={asyncFileError}
      />

      <Field
        name={name}
        component="input"
        type="hidden"
        validate={isRequired ? [i18nRequired] : null}
      />
    </div>
  );
};

export default ReduxFormUploader;
