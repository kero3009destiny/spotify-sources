import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ButtonPrimary } from '@spotify-internal/encore-web';
import { Dropzone, DropzoneFileData } from '@mrkt/features/dropzone';
import { useT } from '@mrkt/features/i18n';

export const HiddenDropzone = styled(Dropzone)`
  visibility: hidden;
`;

type Props = {
  file?: string;
  onChange: (file?: string) => void;
  onError: (errors: string[]) => void;
};
export function ImageUpload(props: Props) {
  const { onChange, onError } = props;
  const onReceiveFiles = useCallback(
    ([receivedFile]: DropzoneFileData[]) => {
      const fileErrors = receivedFile.errors.slice(0);

      if (!receivedFile.binary || fileErrors.length) {
        onChange(undefined);
        if (fileErrors.length) {
          onError(fileErrors);
        }
        return;
      }
      onChange(receivedFile.source);
    },
    [onChange, onError],
  );

  const t = useT();

  return (
    <Dropzone
      onFileSelection={onReceiveFiles}
      imageTypes={['image/jpeg', 'image/jpg', 'image/png']}
    >
      <ButtonPrimary
        colorSet="base"
        buttonSize={ButtonPrimary.sm}
        aria-label={t(
          'STORYLINES_ADD_IMAGE_LABEL',
          'Add image to Storyline card',
          'add image to storyline card',
        )}
      >
        {props.file
          ? t('STORYLINES_REPLACE_IMAGE', 'Replace', 'replace image button')
          : t('STORYLINES_ADD_IMAGE_BUTTON', 'Add Image', 'add image button')}
      </ButtonPrimary>
    </Dropzone>
  );
}
