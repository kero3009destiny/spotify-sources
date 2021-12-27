import React from 'react';
import { useSelector } from 'react-redux';
import i18n from 'i18next';

import { semanticColors, Type } from '@spotify-internal/encore-web';
// TODO: After the encore v4 migration, check that IconAudioFile is using the correct svg. With this current version it's the IconDraft svg
import { LoadingSpinner } from '@spotify-internal/encore-web/advertising/components/LoadingSpinner';
import { IconAudioFile } from '@spotify-internal/encore-web/advertising/icons/IconAudioFile';

import { getCSVDownloadInProgress } from 'ducks/bulksheets/selectors';

import { Container, LeftSection } from './styles';

export const BulksheetDownloadProgress = () => {
  const csvDownloadInProgress = useSelector(getCSVDownloadInProgress);

  if (!csvDownloadInProgress) {
    return <></>;
  }

  return (
    <Container>
      <LeftSection>
        <IconAudioFile
          iconSize={64}
          semanticColor={semanticColors.textBrightAccent}
        />
        <Type variant={Type.body3} semanticColor={semanticColors.textSubdued}>
          {i18n.t('I18N_PREPARING_YOUR_CSV', 'Preparing your CSV...')}
        </Type>
      </LeftSection>
      <LoadingSpinner diameter={64} />
    </Container>
  );
};
