import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import get from 'lodash/get';
import { Dispatch } from 'redux';
import { change, Field } from 'redux-form';
import styled from 'styled-components';
import { validateFloatStringInRange } from 'validators';

import { AudioPlayerLegacy } from '@spotify-internal/encore-advertising-web';
import { spacer12, spacer32 } from '@spotify-internal/encore-foundation';
import {
  LoadingIndicator,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import {
  MIX_HISTORY_SUCCEEDED,
  MIX_PREVIEW_FAILED,
  MIX_PREVIEW_FAILED_MISSING_MUSIC,
  MIX_PREVIEW_SUBMITTED,
  MIX_PREVIEW_SUCCEEDED,
} from 'ducks/adReview/types';
import {
  clearMixPreview as clearMixPreviewAC,
  createMixPreview as createMixPreviewAC,
} from 'ducks/adReview/actions';
import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import {
  getMixHistoryStatusSelector,
  selectMixPreviewBackgroundVolume,
  selectMixPreviewError,
  selectMixPreviewMusicDuration,
  selectMixPreviewMusicStart,
  selectMixPreviewStatus,
  selectMixPreviewUrl,
  selectMixPreviewVoiceStart,
} from 'ducks/adReview/selectors';
import { getReduxFormValues } from 'ducks/reduxForm/selectors';

import BackgroundMixer from './BackgroundMixer';

import {
  USER_ACTION_CAT_REVISE_BG,
  USER_ACTION_CREATE_PREVIEW,
  USER_ACTION_CREATE_PREVIEW_FAILED,
  USER_ACTION_CREATE_PREVIEW_FAILED_MISSING_BG,
} from './constants';
import {
  FORM_NAMES,
  FormFields,
  REVISE_DEFAULTS,
  REVISE_FORM_NAME,
} from 'config/revise';

// NOTE: this was copied from 111's BackgroundMixOptions.js file, and modified.
// TODO: migrate unit tests (jsarma 10/08/20)
// FIXME: migrate entire revise flow to final-form (jsarma 10/08/20)
const GS_ADSTUDIO_INBOX = 'gs://adstudio-inbox/';
export const HTTP_ADSTUDIO_INBOX =
  'https://storage.googleapis.com/adstudio-inbox/';
const AUDIO_MIX_LABEL = i18n.t('I18N_MIXER_AUDIO_MIX', 'Audio Mix');

const StyledIndicatorDiv = styled.div`
  padding-bottom: ${spacer32};
  padding-top: ${spacer32};
`;

const StyledLoadingIndicator = styled(LoadingIndicator)`
  width: 100%;
`;

const StyledErrorDiv = styled.div`
  padding-bottom: ${spacer12};
  padding-top: ${spacer12};
`;

const PlayerBody = styled.div`
  display: grid;
  padding: 0;
  border: 1px solid #d2d2d2;
  border-top: 0;
  height: 100px;
`;

const CREATE_PREVIEW_FAILED_ERROR_MSG = i18n.t(
  'I18N_CREATE_PREVIEW_FAILED',
  "Something went wrong and we couldn't generate your audio mix. Please refresh and try again.",
);

export interface BackgroundMixingState {
  audioPlayer: TSFixMe;
  errorMessage: string;
}

interface OwnProps {
  form: string;
  accountId: string;
  creativeId: string;
  bgMusicId: string;
  initialMusicPath: string;
  initialMusicName?: string;
  voiceoverId: string;
}

interface DispatchProps {
  onClearPreview: () => void;
  updateFormFields: (
    voiceStart: number,
    musicStart: number,
    backgroundVolume: number,
    musicDuration: number,
  ) => void;
  mixPreview: (
    creativeId: string,
    musicPath: string,
    voiceoverPath: string,
    voiceStart: number,
    musicStart: number,
    backgroundVolume: number,
    musicDuration: number,
  ) => void;
  logUserAction: (argHash: TSFixMe) => void;
}

interface StateProps {
  createMixPreviewStatus: string;
  createMixPreviewError: string;
  createMixPreviewUrl: string;
  musicPath: string;
  musicName?: string;
  voiceStart: number;
  musicStart: number;
  backgroundVolume: number;
  musicDuration: number;
  voiceoverUrl?: string;
  voiceoverPath?: string;
  mixHistoryStatus?: string;
}

export type BackgroundMixingProps = OwnProps & DispatchProps & StateProps;

const initialState = {
  audioPlayer: React.createRef<TSFixMe>(),
  errorMessage: '',
};

class UnconnectedBackgroundMixing extends PureComponent<
  BackgroundMixingProps,
  BackgroundMixingState
> {
  constructor(props: BackgroundMixingProps) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps: BackgroundMixingProps) {
    // Autoplay music once the track is generated
    if (
      this.props.createMixPreviewStatus !== prevProps.createMixPreviewStatus &&
      this.props.createMixPreviewStatus === MIX_PREVIEW_SUCCEEDED &&
      this.state.audioPlayer.current
    ) {
      this.state.audioPlayer.current.play();
    }
  }

  handleMixPreview = () => {
    const {
      creativeId,
      musicPath,
      voiceoverPath,
      voiceStart,
      musicStart,
      backgroundVolume,
      musicDuration,
      mixPreview,
    } = this.props;
    if (!musicPath) {
      this.setState({ errorMessage: MIX_PREVIEW_FAILED_MISSING_MUSIC });
    } else if (!voiceoverPath) {
      this.setState({ errorMessage: MIX_PREVIEW_FAILED });
    } else {
      this.props.logUserAction({
        category: USER_ACTION_CAT_REVISE_BG,
        label: USER_ACTION_CREATE_PREVIEW,
        params: {
          creativeId: creativeId,
          musicPath,
          voiceoverPath,
          voiceStart,
          musicStart,
          backgroundVolume,
          musicDuration,
        },
      });
      mixPreview(
        creativeId,
        musicPath,
        voiceoverPath,
        voiceStart,
        musicStart,
        backgroundVolume,
        musicDuration,
      );
    }
  };

  mapCreateMixPreviewError(err: string) {
    if (err === MIX_PREVIEW_FAILED_MISSING_MUSIC) {
      this.props.logUserAction({
        category: USER_ACTION_CAT_REVISE_BG,
        label: USER_ACTION_CREATE_PREVIEW_FAILED_MISSING_BG,
      });
      return i18n.t(
        'I18N_MIXER_MUSIC_REQUIRED',
        'Background music is required for your ad',
      );
    }
    this.props.logUserAction({
      category: USER_ACTION_CAT_REVISE_BG,
      label: USER_ACTION_CREATE_PREVIEW_FAILED,
    });
    return CREATE_PREVIEW_FAILED_ERROR_MSG;
  }

  validatePositiveFloatString = (value: string) => {
    return validateFloatStringInRange(value, 0, null);
  };

  validateFloatStringBetweenZeroAndOne = (value: string) => {
    return validateFloatStringInRange(value, 0, 1);
  };

  componentWillUpdate(nextProps: BackgroundMixingProps) {
    if (nextProps.musicPath) {
      this.setState({ errorMessage: '' });
    }
    if (this.props.musicPath !== nextProps.musicPath) {
      this.props.logUserAction({
        category: USER_ACTION_CAT_REVISE_BG,
        label: 'Adjust_background_music',
        params: {
          value: nextProps.musicPath,
          name: nextProps.musicName,
        },
      });
      nextProps.onClearPreview();
    }
    if (this.props.mixHistoryStatus !== nextProps.mixHistoryStatus) {
      if (nextProps.mixHistoryStatus === MIX_HISTORY_SUCCEEDED) {
        nextProps.updateFormFields(
          nextProps.voiceStart,
          nextProps.musicStart,
          nextProps.backgroundVolume,
          nextProps.musicDuration,
        );
      }
    }
  }

  render() {
    const {
      onClearPreview,
      createMixPreviewStatus,
      createMixPreviewError,
      createMixPreviewUrl,
      updateFormFields,
      voiceStart,
      musicStart,
      musicDuration,
      backgroundVolume,
      musicPath,
      voiceoverUrl,
    } = this.props;
    const backgroundMixer = (
      <BackgroundMixer
        voiceStart={voiceStart}
        musicStart={musicStart}
        musicDuration={musicDuration}
        backgroundVolume={backgroundVolume}
        updateFormFields={updateFormFields}
        createMixPreviewUrl={createMixPreviewUrl}
        musicUrl={musicPath}
        voiceoverUrl={voiceoverUrl!}
      />
    );

    // FIXME: Might be able to remove this since we aren't exposing this feature
    const addFadeCheckbox = (
      <Field
        name={FORM_NAMES.REVISE_MIX_MODE}
        type="hidden"
        component="input"
        onChange={() => {
          onClearPreview();
        }}
      />
    );

    const editVoiceStart = (
      <Field
        name={FORM_NAMES.REVISE_VOICE_START}
        type="hidden"
        component="input"
        onChange={() => {
          onClearPreview();
        }}
      />
    );

    const editMusicStart = (
      <Field
        name={FORM_NAMES.REVISE_MUSIC_START}
        type="hidden"
        component="input"
        onChange={() => {
          onClearPreview();
        }}
      />
    );

    const editBackgroundVolume = (
      <Field
        name={FORM_NAMES.REVISE_BACKGROUND_VOLUME}
        type="hidden"
        component="input"
        onChange={() => {
          onClearPreview();
        }}
      />
    );

    const editMusicDuration = (
      <Field
        name={FORM_NAMES.REVISE_MUSIC_DURATION}
        type="hidden"
        component="input"
        onChange={() => {
          onClearPreview();
        }}
      />
    );

    const loadingIndicator = createMixPreviewStatus ===
      MIX_PREVIEW_SUBMITTED && (
      <StyledIndicatorDiv>
        <StyledLoadingIndicator indicatorSize={LoadingIndicator.lg} />
      </StyledIndicatorDiv>
    );

    const audioPlayer = createMixPreviewStatus === MIX_PREVIEW_SUCCEEDED && (
      <div>
        <AudioPlayerLegacy
          {...this.state.audioPlayer}
          src={createMixPreviewUrl}
          name={AUDIO_MIX_LABEL}
          stopsOtherAudioWhenPlayed
          shouldShowDownload
        />
      </div>
    );

    const errorMessage = createMixPreviewError || this.state.errorMessage;
    const error = errorMessage && (
      <StyledErrorDiv>
        <Type.h1 semanticColor={semanticColors.textNegative}>
          {this.mapCreateMixPreviewError(errorMessage)}
        </Type.h1>
      </StyledErrorDiv>
    );

    const createMixButton = createMixPreviewStatus !== MIX_PREVIEW_SUBMITTED &&
      createMixPreviewStatus !== MIX_PREVIEW_SUCCEEDED && (
        <AudioPlayerLegacy
          {...this.state.audioPlayer}
          name={AUDIO_MIX_LABEL}
          onClickPlay={this.handleMixPreview}
        />
      );

    return (
      <>
        {backgroundMixer}
        {addFadeCheckbox}
        {editVoiceStart}
        {editMusicStart}
        {editBackgroundVolume}
        {editMusicDuration}
        <PlayerBody>
          {createMixButton}
          {loadingIndicator}
          {audioPlayer}
        </PlayerBody>
        {error}
      </>
    );
  }
}

export const mapStateToProps = (
  state: TSFixMe,
  ownProps: TSFixMe,
): StateProps => {
  const voiceoverId = ownProps.voiceoverId;
  // @ts-ignore
  const reviseFormValues = getReduxFormValues(state)[REVISE_FORM_NAME];
  const uploadInfo =
    // @ts-ignore
    reviseFormValues && reviseFormValues[FormFields.REVISE_BG_MUSIC]
      ? // @ts-ignore
        reviseFormValues[FormFields.REVISE_BG_MUSIC]
      : {};

  return {
    voiceStart: parseFloat(selectMixPreviewVoiceStart(state)),
    musicStart: parseFloat(selectMixPreviewMusicStart(state)),
    backgroundVolume: parseFloat(selectMixPreviewBackgroundVolume(state)),
    musicDuration: parseFloat(selectMixPreviewMusicDuration(state)),
    mixHistoryStatus: getMixHistoryStatusSelector(state),
    voiceoverUrl: voiceoverId ? HTTP_ADSTUDIO_INBOX + voiceoverId : undefined,
    voiceoverPath: voiceoverId ? GS_ADSTUDIO_INBOX + voiceoverId : undefined,
    // uri=preset bg tracks, gcsUri=custom upload
    musicPath: get(
      uploadInfo,
      'uri',
      get(uploadInfo, 'gcsUri', ''), // ownProps.initialMusicPath
    ),
    musicName: get(uploadInfo, 'name', ownProps.initialMusicName),
    createMixPreviewStatus: selectMixPreviewStatus(state),
    createMixPreviewError: selectMixPreviewError(state),
    createMixPreviewUrl: selectMixPreviewUrl(state),
  };
};

export const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: TSFixMe,
): DispatchProps => {
  return {
    updateFormFields: (
      voiceStart: number,
      musicStart: number,
      backgroundVolume: number,
      musicDuration: number,
    ) => {
      dispatch(
        change(ownProps.form, FORM_NAMES.REVISE_VOICE_START, voiceStart),
      );
      dispatch(
        change(ownProps.form, FORM_NAMES.REVISE_MUSIC_START, musicStart),
      );
      dispatch(
        change(
          ownProps.form,
          FORM_NAMES.REVISE_BACKGROUND_VOLUME,
          backgroundVolume,
        ),
      );
      dispatch(
        change(ownProps.form, FORM_NAMES.REVISE_MUSIC_DURATION, musicDuration),
      );
      // When a field is changed, erase preview
      dispatch(clearMixPreviewAC());
    },
    mixPreview: (
      id: string,
      musicPath: string,
      voiceoverPath: string,
      voiceStart: number,
      musicStart: number,
      backgroundVolume: number,
      musicDuration: number,
    ) => {
      dispatch(
        createMixPreviewAC(
          id,
          musicPath,
          voiceoverPath,
          true, // playFullMusic always to true for trimming feature
          REVISE_DEFAULTS.MIX_MODE,
          voiceStart,
          musicStart,
          backgroundVolume,
          musicDuration,
        ),
      );
    },
    onClearPreview: () => {
      dispatch(clearMixPreviewAC());
    },
    logUserAction: (argHash: TSFixMe) => {
      dispatch(logUserActionAC(argHash));
    },
  };
};

const BackgroundMixing = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(UnconnectedBackgroundMixing);

export default BackgroundMixing;
