import React, { Component } from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import classnames from 'classnames';
import i18n from 'i18next';
import { isEmpty } from 'lodash';
import { change as changeAC } from 'redux-form';
import styled from 'styled-components';

import {
  ButtonSecondary,
  ButtonTertiary,
  FormGroup,
} from '@spotify-internal/adstudio-tape';
import Container from '@spotify-internal/adstudio-tape/lib/components/FormGroup/Container';
import { AudioPlayerLegacy } from '@spotify-internal/encore-advertising-web';
import { Type } from '@spotify-internal/encore-web';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import { getReduxFormValues } from 'ducks/reduxForm/selectors';

import AssetLibraryModal from './AssetLibraryModal';

import { BG_MUSIC } from 'config';
import { FORM_NAMES } from 'config/adCreation';
import { FormFields, REVISE_FORM_NAME } from 'config/revise';

import PropTypes from 'prop-types';

export const CLEAN_STOCK_MUSIC_INFO = {
  id: '',
  name: '',
  tags: [],
  gcsUri: '',
};

const BackgroundDuration = styled.div`
  margin-top: 32px;
  width: 600px;
  svg + div > span {
    font-size: 14px;
    line-height: 14px;
  }
`;

const StyledFormGroup = styled(FormGroup)`
  ${Container} {
    padding-bottom: 0;
  }
`;

const StyledButton2BgTrack = styled(ButtonTertiary)`
  padding-left: 0;
  padding-right: 0;
`;

export class BgAudioSelection extends Component {
  state = {
    activeTab: 'BROWSE_OPTIONS',
    selectedTrack: {},
    modalShow: false,
  };

  componentDidUpdate(prevProps, prevState) {
    // Scroll to bottom only when bg track is updated
    if (!isEmpty(this.state.selectedTrack)) {
      const curUploadUri =
        this.state.selectedTrack.gcsUri || this.state.selectedTrack.uri;
      const prevUploadUri =
        prevState.selectedTrack.gcsUri || prevState.selectedTrack.uri;

      if (curUploadUri !== prevUploadUri) {
        this.scrollToBottom();
      }
    }
  }

  handleClickButton(activeTab) {
    this.setState(() => ({
      activeTab,
      modalShow: true,
    }));
  }

  handleClickTab(activeTab) {
    this.setState(() => ({ activeTab }));
  }

  handleClickHide() {
    this.setState(() => ({ modalShow: false }));
  }

  handleRemove() {
    const {
      bgUploadPath,
      changeField,
      formName,
      name,
      uploaderFieldName,
      backgroundDurationName,
    } = this.props;

    this.setState(
      () => ({ selectedTrack: {} }),
      () => {
        changeField(formName, name, null);
        changeField(formName, uploaderFieldName, {});
        changeField(formName, backgroundDurationName, { playFullMusic: false });
      },
    );
  }

  handleUploadDone(libraryTrack) {
    const {
      bgMusicUploadInfo,
      bgUploadPath,
      changeField,
      formName,
      name,
    } = this.props;

    this.setState(
      prevState => {
        const { activeTab, selectedTrack: prevSelectedTrack } = prevState;

        let selectedTrack;
        if (
          bgMusicUploadInfo.id &&
          (!libraryTrack.id || activeTab === 'UPLOAD_BG_AUDIO')
        ) {
          selectedTrack = bgMusicUploadInfo;
        } else if (
          libraryTrack.id &&
          (!bgMusicUploadInfo.id || activeTab === 'BROWSE_OPTIONS')
        ) {
          selectedTrack = libraryTrack;
        }

        if (!selectedTrack || !selectedTrack.id) {
          selectedTrack = prevSelectedTrack;
        }

        return { modalShow: false, selectedTrack };
      },
      () => {
        const { selectedTrack } = this.state;
        changeField(formName, name, selectedTrack);
      },
    );
  }

  scrollToBottom() {
    const bodyContainer = document.querySelector('#modalContainer > div');
    if (bodyContainer) {
      const currentScrollHeight = bodyContainer.scrollTop;
      bodyContainer.scrollTop = currentScrollHeight + 200;
    }
  }

  componentWillMount() {
    if (this.props.bgMusicUploadInfo) {
      this.setState(() => ({
        selectedTrack: this.props.bgMusicUploadInfo,
      }));
    }
  }

  render() {
    const {
      backgroundDurationName,
      bgMusicUploadInfo,
      bgUploadPath,
      formName,
      hasModal,
      isRequired,
      logUserAction,
      name,
      onFileUpload,
      uploaderFieldName,
      uploading,
    } = this.props;

    const { activeTab, modalShow, selectedTrack } = this.state;

    const uploadUri = selectedTrack.gcsUri || selectedTrack.uri;

    const description = (
      <Type.p variant={Type.body2} weight={Type.book} className="description">
        {i18n.t(
          'I18N_UPLOAD_YOUR_OWN_MUSIC_OR',
          'Upload your own music or select from a list of background tracks recorded by independent artists.',
        )}
      </Type.p>
    );

    const PROPS_BGTRACKBUTTON_CHOOSEFROMLIBRARY = {
      buttonSize: 'sm',
      id: 'open-asset-library-button',
      tabIndex: '0',
      className: 'btn-choose',
      'data-test': 'browseOptionsButton',
      onClick: () => {
        logUserAction({
          category: 'create_ad_flow',
          label: 'open_background_track_modal',
        });
        this.handleClickButton('BROWSE_OPTIONS');
      },
      text: i18n.t('I18N_CHOOSE_FROM_LIBRARY', 'Choose from library'),
    };
    const PROPS_BGTRACKBUTTON_UPLOAD = {
      buttonSize: 'sm',
      id: 'open-asset-library-button',
      tabIndex: '0',
      className: 'btn-upload',
      'data-test': 'uploadOptionsButton',
      onClick: () => {
        logUserAction({
          category: 'create_ad_flow',
          label: 'click_background_upload_button',
        });
        this.handleClickButton('UPLOAD_BG_AUDIO');
      },
      text: i18n.t('I18N_UPLOAD_A_TRACK', 'Upload your own track'),
    };
    const backgroundButton1Props = PROPS_BGTRACKBUTTON_UPLOAD;
    const backgroundButton2Props = PROPS_BGTRACKBUTTON_CHOOSEFROMLIBRARY;

    return (
      <StyledFormGroup
        description={!uploadUri && !uploading && description}
        flush
      >
        <Form onSubmit={() => {}}>
          {() => (
            <div
              className={classnames('bg-track-upload-container', {
                'bg-track-upload-container--empty': !uploadUri && !uploading,
              })}
            >
              <div className={classnames({ 'bg-audio-buttons': !uploadUri })}>
                {!uploading && uploadUri && (
                  <AudioPlayerLegacy
                    deleteLabel={i18n.t('I18N_DELETE', 'Delete')}
                    downloadLabel={i18n.t('I18N_DOWNLOAD', 'Download')}
                    name={selectedTrack.name}
                    src={uploadUri}
                    onClickDelete={() => this.handleRemove()}
                    panelBorder
                  />
                )}

                {!uploadUri && !uploading && (
                  <div>
                    <ButtonSecondary
                      {...backgroundButton1Props}
                      color="grey"
                      buttonLegacy
                    >
                      {backgroundButton1Props.text}
                    </ButtonSecondary>
                    {i18n.t('I18N_DONT_HAVE_TRACK', "Don't have a track?")}{' '}
                    <StyledButton2BgTrack
                      {...backgroundButton2Props}
                      color="green"
                    >
                      {backgroundButton2Props.text}
                    </StyledButton2BgTrack>
                  </div>
                )}
              </div>
              {hasModal && (
                <AssetLibraryModal
                  activeTab={activeTab}
                  audioType={bgUploadPath}
                  formName={formName}
                  isRequired={!bgMusicUploadInfo.id && isRequired}
                  modalShow={modalShow}
                  name={name}
                  onChangeTab={tab => this.handleClickTab(tab)}
                  onDone={libraryTrack => {
                    logUserAction({
                      category: 'create_ad_flow',
                      label: 'done_background_track_modal',
                    });
                    this.handleUploadDone(libraryTrack);
                  }}
                  onFileUpload={onFileUpload}
                  onHide={() => this.handleClickHide()}
                  uploadEnabled
                  uploaderFieldName={uploaderFieldName}
                />
              )}
            </div>
          )}
        </Form>
      </StyledFormGroup>
    );
  }
}

BgAudioSelection.defaultProps = {
  hasModal: true,
  isRequired: false,
  backgroundDurationName: FORM_NAMES.NEW_VOICEOVER_BGMUSIC_DURATION,
};

BgAudioSelection.propTypes = {
  activeTab: PropTypes.oneOf(['UPLOAD_BG_AUDIO', 'BROWSE_OPTIONS']).isRequired,
  backgroundDurationName: PropTypes.string,
  bgMusicUploadInfo: PropTypes.object,
  bgUploadPath: PropTypes.oneOf([BG_MUSIC]).isRequired,
  changeField: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  hasModal: PropTypes.bool.isRequired,
  isRequired: PropTypes.bool,
  logUserAction: PropTypes.func.isRequired,
  modalShow: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onFileUpload: PropTypes.func.isRequired,
  uploaderFieldName: PropTypes.string.isRequired,
  uploading: PropTypes.bool,
};

function mapStateToProps(state, ownProps) {
  const reviseFormValues = getReduxFormValues(state)[REVISE_FORM_NAME];

  return {
    bgMusicUploadInfo:
      reviseFormValues && reviseFormValues[FormFields.REVISE_BG_MUSIC]
        ? reviseFormValues[FormFields.REVISE_BG_MUSIC]
        : {},
  };
}

export default connect(mapStateToProps, {
  changeField: changeAC,
  logUserAction: logUserActionAC,
})(BgAudioSelection);
