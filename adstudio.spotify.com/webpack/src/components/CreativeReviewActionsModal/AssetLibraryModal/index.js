import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { compose, withState } from 'recompose';

import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import {
  ButtonTertiary,
  DialogConfirmation,
} from '@spotify-internal/adstudio-tape';
import { Type } from '@spotify-internal/encore-web';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';

import ReduxFormUploader from 'components/form-common/ReduxFormUploader';

import AssetLibraryModalTabs from './AssetLibraryModalTabs';
import StockMusicTable from './StockMusicTable';

import { BG_MUSIC } from 'config';

import PropTypes from 'prop-types';

export function AssetLibraryModal({
  activeTab,
  audioType,
  formName,
  isRequired,
  logUserAction,
  modalShow,
  name,
  onChangeTab,
  onDone,
  onFileUpload,
  onHide,
  onSelect,
  selection,
  uploadEnabled,
  uploaderFieldName,
}) {
  let bgAudioUploadType;
  switch (activeTab) {
    case 'UPLOAD_BG_AUDIO':
      bgAudioUploadType = (
        <ReduxFormUploader
          id={uploaderFieldName}
          isRequired={isRequired}
          name={name}
          uploaderFieldName={uploaderFieldName}
          uploadType={audioType}
          placeholderType={BG_MUSIC}
          onUpload={file => {
            onFileUpload(file.name);
          }}
          formName={formName}
          fieldName={BG_MUSIC}
        />
      );

      break;

    case 'BROWSE_OPTIONS':
      bgAudioUploadType = (
        <StockMusicTable
          audioType={audioType}
          onSelect={track => {
            logUserAction({
              category: 'create_ad_flow',
              label: 'select_background_track',
              params: track.name,
            });
            onSelect(track);
          }}
          selectedTrack={selection}
        />
      );

      break;

    default:
      break;
  }

  if (!modalShow) return <div style={{ display: 'none' }} />;

  return (
    <DialogConfirmation
      flush
      dialogClasses="asset-library-modal"
      dialogTitle={
        <div>
          <Type.h3 variant={Type.heading3} weight={Type.black} condensed>
            {i18n.t('I18N_ADD_A_BACKGROUND_TRACK', 'Add a background track')}
          </Type.h3>
          {uploadEnabled && (
            <AssetLibraryModalTabs
              activeTab={activeTab}
              onClick={onChangeTab}
            />
          )}
        </div>
      }
      body={bgAudioUploadType}
      footer={
        <div>
          <ButtonTertiary
            className="cancel-btn"
            // encore needs a green on tertiary to accept colors
            color="green"
            onClick={() => {
              onSelect({});
              onHide();
            }}
            buttonLegacy
          >
            {i18n.t('I18N_CANCEL', 'Cancel')}
          </ButtonTertiary>
          <ButtonPrimary
            className="select-btn"
            data-test="done-btn"
            onClick={() => onDone(selection)}
            buttonLegacy
          >
            {i18n.t('I18N_DONE', 'Done')}
          </ButtonPrimary>
        </div>
      }
    />
  );
}

AssetLibraryModal.propTypes = {
  activeTab: PropTypes.string.isRequired,
  audioType: PropTypes.oneOf([BG_MUSIC]).isRequired,
  formName: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  logUserAction: PropTypes.func.isRequired,
  modalShow: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChangeTab: PropTypes.func,
  onDone: PropTypes.func,
  onFileUpload: PropTypes.func.isRequired,
  onHide: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  selection: PropTypes.object,
  uploadEnabled: PropTypes.bool,
  uploaderFieldName: PropTypes.string.isRequired,
};

export default compose(
  connect(null, { logUserAction: logUserActionAC }),
  withState('selection', 'onSelect', {}),
)(AssetLibraryModal);
