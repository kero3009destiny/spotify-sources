import React from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import i18n from 'i18next';
import styled from 'styled-components';

import { AudioPlayer } from '@spotify-internal/encore-advertising-web';
import { ButtonTertiary, IconDelete, Type } from '@spotify-internal/encore-web';
import { Box } from '@spotify-internal/encore-web/advertising/components/Box';
import {
  Uploader,
  UploaderProps,
} from '@spotify-internal/encore-web/advertising/components/Uploader';
import { IconAudioUploader } from '@spotify-internal/encore-web/advertising/icons/IconAudioUploader';

import { ValidatingFormGroup } from './FormGroups/ValidatingFormGroup';

import { CLIENT_AUDIO_TYPES, UPLOADER_STRINGS } from 'config/uploads';

import { UploadInfo } from 'types/common/state/api/upload';

const OverflowWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 230px;
`;

interface AudioUploaderProps extends UploaderProps {
  input: FieldInputProps<UploadInfo>;
  meta: FieldMetaState<UploadInfo>;
  onBlur: (file: File) => Promise<void>;
  progress: number;
  uploadInfo: UploadInfo;
  isUploading: boolean;
  description: string;
  label: string;
  isRequired?: boolean;
  shouldShowUploader: boolean;
  skipValidation?: boolean;
}

export function AudioUploader({
  input,
  meta,
  onBlur,
  progress,
  uploadInfo,
  isUploading,
  description,
  ...remainingProps
}: AudioUploaderProps) {
  const AUDIO_UPLOAD_TEXT = `${i18n.t(
    'I18N_ONLY_MP_WAV_AND_OGG',
    'Only .MP3, .WAV, and .OGG files are supported.',
  )}`;

  return (
    <div data-test="audio-form-uploader">
      <ValidatingFormGroup
        label={
          <Type as="h4" variant={Type.heading4} weight={Type.bold} condensed>
            {i18n.t('I18N_UPLOAD_AN_AUDIO_FILE', 'Upload an audio file')}
          </Type>
        }
        validateFields={[input.name]}
        errorMessage={meta.error ?? undefined}
        hideError={isUploading}
        description={description}
        condensed
      >
        <Uploader
          {...remainingProps}
          {...UPLOADER_STRINGS}
          onUpload={onBlur || input.onBlur}
          accept={CLIENT_AUDIO_TYPES}
          deleteLabel={i18n.t('I18N_DELETE', 'Delete')}
          displayComponentProps={{
            src: uploadInfo.gcsUri,
            name: uploadInfo.fileName,
          }}
          displayIcon={IconAudioUploader}
          uploadingProgress={progress}
          isUploading={isUploading}
          uploadText={AUDIO_UPLOAD_TEXT}
          dragAndDropText={i18n.t(
            'I18N_DRAG_AND_DROP_YOUR_AUDIO',
            'Drag and drop your audio file',
          )}
          uploadFileText={i18n.t('I18N_UPLOAD_AUDIO', 'Upload audio')}
          displayComponent={displayComponentProps => (
            <Box elevated>
              <AudioPlayer
                // @ts-ignore - allow name to accept element in EAW
                name={
                  displayComponentProps.name ? (
                    <OverflowWrapper>
                      {displayComponentProps.name}
                    </OverflowWrapper>
                  ) : (
                    i18n.t('I18N_USER_UPLOADED_AUDIO', 'User uploaded audio')
                  )
                }
                audioProps={{ src: displayComponentProps.src }}
                actions={
                  <ButtonTertiary
                    condensed
                    buttonSize={ButtonTertiary.md}
                    onClick={displayComponentProps.onClickDelete}
                    iconLeading={IconDelete}
                  >
                    {i18n.t('I18N_DELETE', 'Delete')}
                  </ButtonTertiary>
                }
              />
            </Box>
          )}
        />
      </ValidatingFormGroup>
    </div>
  );
}

export default AudioUploader;
