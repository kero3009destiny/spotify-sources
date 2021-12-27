import React, {
  Component,
  FunctionComponent,
  ReactElement,
  SyntheticEvent,
} from 'react';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import i18n from 'i18next';
import get from 'lodash/get';
import { Dispatch } from 'redux';
import {
  Field,
  FormSubmitHandler,
  InjectedFormProps,
  reduxForm,
} from 'redux-form';
import { AsyncValidateCallback } from 'redux-form/lib/reduxForm';
import styled from 'styled-components';
import { maxWordCountErrorMsg, noEmojiSymbols } from 'validators';
import { i18nRequired } from 'validators/i18nRequired';

import {
  ReduxFormDropdownTextarea,
  ReduxFormRadioList,
} from '@spotify-internal/adstudio-shared';
import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import { getWordCount } from '@spotify-internal/adstudio-tape/lib/utils/helpers/stringHelpers';
import { asyncValidateAssets } from '@spotify-internal/adstudio-web-utils/lib/asyncValidators';
import { spacer12 } from '@spotify-internal/encore-foundation';
import {
  addColorSet,
  ButtonTertiary,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';
import { withRemoteConfig } from '@spotify-internal/remote-config-resolver-react';

import { getMixHistory as getMixHistoryAC } from 'ducks/adReview/actions';
import {
  reviseVoiceoverBackground,
  reviseVoiceoverById,
} from 'ducks/assetReview/actions';
import { getAccount } from 'ducks/account/selectors';
import {
  assetReviewError,
  assetReviewSucceeded,
} from 'ducks/assetReview/selectors';
import { getReduxFormValues } from 'ducks/reduxForm/selectors';
import { hasChangesSelector, needsWordCounter } from 'ducks/revise/selectors';

import CommonModal from 'components/common/CommonModal';

import BackgroundMixing from './BackgroundMixing';
import BgAudioSelectionComponent from './BgAudioSelection';
import { ChooseFlow } from './ReviseChooseFlow';

import { BG_MUSIC } from 'config';
import {
  MAX_VOICEOVER_WORD_COUNT,
  MAX_VOICEOVER_WORD_COUNT_STRING,
} from 'config/adCreation';
import {
  FormFields,
  REVISE_DEFAULTS,
  REVISE_FORM_NAME,
  ReviseFormData,
  VOICEOVER_INSTRUCTIONS_DESCRIPTION,
  VOICEOVER_INSTRUCTIONS_OPTION_ONE,
  VOICEOVER_INSTRUCTIONS_OPTION_OTHER,
  VOICEOVER_INSTRUCTIONS_OPTION_THREE,
  VOICEOVER_INSTRUCTIONS_OPTION_TWO,
  VOICEOVER_INSTRUCTIONS_OTHER_PLACEHOLDER,
  VOICEOVER_INSTRUCTIONS_PLACEHOLDER,
  VoiceoverInstructionsOption,
} from 'config/revise';

import { PendingCreativeResponseRow } from 'types/common/state/api/assets';
import { BgAsset } from 'types/common/state/api/creative';

const BgAudioSelection = (BgAudioSelectionComponent as unknown) as FunctionComponent<
  any
>;

const ASYNC_VALIDATION_FIELDS: (keyof ReviseFormData)[] = [
  FormFields.REVISE_BG_MUSIC_UPLOADER,
];

const StyledErrorMessage = styled(Type.p)`
  padding-bottom: ${spacer12};
  padding-top: ${spacer12};
`;

export const onSubmit: FormSubmitHandler<ReviseFormData, ReviseProps> = (
  values,
  _dispatch,
  props,
) => {
  const {
    // ad: { id },
    pendingCreative,
    reviseBGMusic,
    reviseVO,
  } = props;

  const { key, value } = values.reviseVOInstructions;
  const VOrevisionValues = `[${key}]:  ${value}`;
  const bgMusicString = (values.reviseBGMusic &&
    values.reviseBGMusic.id) as string;

  switch (values.revise_option) {
    case FormFields.REVISE_BG_MUSIC: {
      reviseBGMusic(
        pendingCreative.adAccountId,
        pendingCreative.creativeId,
        pendingCreative.voiceover.mixId!,
        bgMusicString,
        !!bgMusicString, // if no bg music, playFullMusic must be false or else request fails
        values.reviseVoiceStart || REVISE_DEFAULTS.VOICE_START,
        values.reviseMusicStart || REVISE_DEFAULTS.MUSIC_START,
        values.reviseBackgroundVolume || REVISE_DEFAULTS.BACKGROUND_VOLUME,
        values.reviseMusicDuration || REVISE_DEFAULTS.MUSIC_DURATION,
      );
      break;
    }
    case FormFields.VOICEOVER_INSTRUCTIONS:
      reviseVO(
        pendingCreative.adAccountId,
        pendingCreative.voiceover.id!,
        VOrevisionValues,
      );
      // reviseVO(id, VOrevisionValues);
      break;
  }
};

export const checkBgMusicChanged = (
  field: keyof ReviseFormData,
  formValues: ReviseFormData,
  props: ReviseFormProps,
): string | undefined => {
  const { initialValues } = props;
  const errorMsg = i18n.t(
    'I18N_YOU_MUST_EITHER_SELECT_A',
    'You must either select a new background track or remove the existing one.',
  );

  const isInvalid =
    initialValues[field] === formValues[field] ||
    formValues.reviseBGMusic === null;

  return isInvalid ? errorMsg : undefined;
};

export const checkBgMusicOrDurationChanged = (
  field: keyof ReviseFormData,
  formValues: ReviseFormData,
  props: ReviseFormProps,
): string | undefined => {
  const { initialValues } = props;
  const {
    playFullMusic: initialPlayFullMusic,
  } = initialValues.reviseBackgroundDuration;

  const changedPlayFullMusic =
    formValues.reviseBackgroundDuration &&
    formValues.reviseBackgroundDuration.playFullMusic;
  const bgMusicError = checkBgMusicChanged(field, formValues, props);

  if (bgMusicError) return bgMusicError;

  if (
    changedPlayFullMusic !== undefined &&
    initialPlayFullMusic !== changedPlayFullMusic
  )
    return undefined;

  return;
};

export const validateVoiceoverRevision = (
  value: VoiceoverInstructionsOption,
  formValues: ReviseFormData,
): string | undefined => {
  if (formValues.revise_option === FormFields.VOICEOVER_INSTRUCTIONS) {
    // value is an object literal and inherently truthy. check value.key
    // to ensure a user selected an item from the dropdown.
    return i18nRequired(value.key, formValues);
  }
  return;
};

export const validateWordCount = (
  option: VoiceoverInstructionsOption,
): string | undefined => {
  if (
    option &&
    option.key === VOICEOVER_INSTRUCTIONS_OPTION_ONE &&
    option.value
  ) {
    if (getWordCount(option.value) > MAX_VOICEOVER_WORD_COUNT) {
      return maxWordCountErrorMsg(MAX_VOICEOVER_WORD_COUNT);
    }
  }
  return;
};

export const validateNoEmojis = (
  option: VoiceoverInstructionsOption,
): string | undefined => {
  if (
    option &&
    option.key === VOICEOVER_INSTRUCTIONS_OPTION_ONE &&
    option.value
  ) {
    return noEmojiSymbols(option.value);
  }
  return;
};

export interface OwnProps {
  pendingCreative: PendingCreativeResponseRow;
  onComplete: () => void;
  onHide: (...args: any) => void;
  isSubmitting: boolean;
  isAdStudioRevisionFlowEnabled: boolean;
}

export interface StateProps {
  revisePendingCreativeSucceeded: boolean;
  errorMsg: string | boolean | Error;
  hasChanges: boolean;
  initialValues: ReviseFormData;
  needsWordCounter: boolean;
  accountId: string;
  reviseCategory?: string;
}

export interface DispatchProps {
  reviseVO: (
    adAccountId: string,
    voiceoverId: string,
    instructions: string,
  ) => void;
  reviseBGMusic: (
    adAccountId: string,
    creativeId: string,
    voiceoverMixId: string,
    bgAssetId: string,
    playFullMusic: boolean,
    voiceStart: number,
    musicStart: number,
    backgroundVolume: number,
    musicDuration: number,
  ) => void;
  getMixHistory: (accountId: string, voiceoverId?: string) => void;
}

export type FlowType =
  | typeof FormFields.REVISE_BG_MUSIC
  | typeof FormFields.VOICEOVER_INSTRUCTIONS;

export type ReviseProps = OwnProps & StateProps & DispatchProps;

export type ReviseFormProps = ReviseProps &
  InjectedFormProps<ReviseFormData, ReviseProps>;

export class Revise extends Component<ReviseFormProps> {
  state = {
    chosenFlow: null,
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleFlowClick = (flowType: string) => {
    this.setState({ chosenFlow: flowType });
  };

  handleOnSubmit = (e: SyntheticEvent) => {
    if (this.props.isSubmitting) return;
    this.props.handleSubmit(e);
  };

  componentWillMount() {
    const { accountId, pendingCreative } = this.props;

    const voiceoverId = pendingCreative.voiceover.id || undefined;

    this.props.getMixHistory(accountId, voiceoverId);
  }

  componentWillReceiveProps(nextProps: ReviseFormProps) {
    const {
      pendingCreative: { creativeId: nextCreativeId },
      reset,
    } = nextProps;
    const {
      pendingCreative: { creativeId },
    } = this.props;

    if (nextCreativeId !== creativeId) {
      reset();
    }
  }

  getContent(error: string | boolean | Error) {
    const {
      accountId,
      pendingCreative,
      form,
      isAdStudioRevisionFlowEnabled,
    } = this.props;
    const errorMsg =
      typeof error === 'string'
        ? error
        : i18n.t('I18N_AN_ERROR_OCCURRED', 'An error occurred.');
    const styledErrorMsg = error ? (
      <>
        <StyledErrorMessage semanticColor={semanticColors.textNegative}>
          {errorMsg}
        </StyledErrorMessage>
      </>
    ) : null;

    const bg = pendingCreative.bg || {};
    const BackgroundRevisionComponents = (
      <>
        <BgAudioSelection
          activeTab="UPLOAD_BG_AUDIO"
          name={FormFields.REVISE_BG_MUSIC}
          backgroundDurationName={FormFields.REVISE_BG_DURATION}
          uploaderFieldName={FormFields.REVISE_BG_MUSIC_UPLOADER}
          formName={form}
          bgUploadPath={BG_MUSIC}
          isRequired
        />

        {isAdStudioRevisionFlowEnabled && pendingCreative.voiceover.id && (
          <BackgroundMixing
            form={form}
            creativeId={pendingCreative.creativeId}
            bgMusicId={bg.id}
            initialMusicName={bg.name}
            initialMusicPath={bg.url}
            voiceoverId={pendingCreative.voiceover.id}
            accountId={accountId}
          />
        )}
      </>
    );

    const VoiceoverRevisionComponents = (
      <>
        <Field
          name={FormFields.VOICEOVER_INSTRUCTIONS}
          component={ReduxFormDropdownTextarea}
          validate={[
            validateVoiceoverRevision,
            validateWordCount,
            validateNoEmojis,
          ]}
          placeholder={VOICEOVER_INSTRUCTIONS_PLACEHOLDER}
          responsePlaceholder={VOICEOVER_INSTRUCTIONS_OTHER_PLACEHOLDER}
          description={VOICEOVER_INSTRUCTIONS_DESCRIPTION}
          options={[
            {
              key: VOICEOVER_INSTRUCTIONS_OPTION_ONE,
              value: VOICEOVER_INSTRUCTIONS_OPTION_ONE,
            },

            {
              key: VOICEOVER_INSTRUCTIONS_OPTION_TWO,
              value: VOICEOVER_INSTRUCTIONS_OPTION_TWO,
            },

            {
              key: VOICEOVER_INSTRUCTIONS_OPTION_THREE,
              value: VOICEOVER_INSTRUCTIONS_OPTION_THREE,
            },

            {
              key: VOICEOVER_INSTRUCTIONS_OPTION_OTHER,
              value: VOICEOVER_INSTRUCTIONS_OPTION_OTHER,
            },
          ]}
          selectPlaceholder={i18n.t(
            'I18N_SELECT_AN_OPTION',
            'Select an option',
          )}
          textareaPlaceholder={i18n.t('I18N_DESCRIPTION', 'Description...')}
          flush
          wordCounter={this.props.needsWordCounter}
          maxWordCount={MAX_VOICEOVER_WORD_COUNT}
          maxWordCountString={MAX_VOICEOVER_WORD_COUNT_STRING}
        />
        {styledErrorMsg}
      </>
    );

    let content;

    if (isAdStudioRevisionFlowEnabled) {
      if (this.props.reviseCategory === FormFields.REVISE_BG_MUSIC) {
        content = BackgroundRevisionComponents;
      } else if (
        this.props.reviseCategory === FormFields.VOICEOVER_INSTRUCTIONS
      ) {
        content = VoiceoverRevisionComponents;
      }
    } else {
      content = (
        <div id="revise-default">
          <Field
            component={ReduxFormRadioList}
            name={FormFields.REVISE_CATEGORY}
            validate={[i18nRequired, checkBgMusicOrDurationChanged]}
            id="test!"
            options={[
              {
                key: FormFields.REVISE_BG_MUSIC,
                value: i18n.t('I18N_BACKGROUND_MUSIC', 'Background music'),
                'data-test': 'reviseBgMusic-radio',
                children: BackgroundRevisionComponents,
              },
              {
                key: FormFields.VOICEOVER_INSTRUCTIONS,
                value: i18n.t('I18N_VOICEOVER_CLIP', 'Voiceover clip'),
                'data-test': 'reviseVOInstructions-radio',
                children: VoiceoverRevisionComponents,
              },
            ]}
          />
        </div>
      );
    }

    return content;
  }

  render() {
    const {
      pendingCreative,
      revisePendingCreativeSucceeded,
      errorMsg,
      onComplete,
      hasChanges,
      onHide: propsOnHide,
    } = this.props;

    let onHide = propsOnHide;
    let cancelBtn = (
      <ButtonTertiary
        type="button"
        className="close-btn"
        id="cancel-btn"
        onClick={(...args: TSFixMe) => {
          return onHide(...args);
        }}
        buttonLegacy
      >
        {i18n.t('I18N_CANCEL', 'Cancel')}
      </ButtonTertiary>
    );

    let id;
    let header = i18n.t(
      'I18N_WHAT_WOULD_YOU_LIKE_TO_RE',
      'What would you like to revise?',
    );
    let content = this.getContent(errorMsg);
    let submitBtn: ReactElement | null = (
      <ButtonPrimary
        data-test="revise-submit-btn"
        onClick={this.handleOnSubmit}
        disabled={this.props.isSubmitting || !hasChanges}
        buttonLegacy
      >
        {i18n.t('I18N_REQUEST_REVISION', 'Request Revision')}
      </ButtonPrimary>
    );

    let modalSize = 'large';

    if (revisePendingCreativeSucceeded) {
      modalSize = 'small';
      id = 'revise-success';
      header = i18n.t('I18N_REQUEST_SENT', 'Request sent!');
      content = (
        <span data-test="revise-success">
          <Trans
            i18nKey="I18N_YOUR_AD_ORDER_FOR_HAS_BE1"
            values={{ adName: pendingCreative.name }}
          >
            Your ad order for <strong>{{ adName: name }}</strong> has been
            submitted for revision. You will receive an email when it is ready
            for review.
          </Trans>
        </span>
      );

      submitBtn = null;
      cancelBtn = (
        <ButtonTertiary
          data-test="revise-close-btn"
          // @ts-ignore
          color="green"
          className="close-btn"
          condensed
          onClick={onComplete}
          buttonLegacy
        >
          {i18n.t('I18N_CLOSE', 'Close')}
        </ButtonTertiary>
      );

      onHide = onComplete;
    } else if (this.props.isAdStudioRevisionFlowEnabled) {
      if (!this.props.reviseCategory) {
        submitBtn = null;
        content = <ChooseFlow handleFlowClick={this.handleFlowClick} />;
      } else if (this.props.reviseCategory === FormFields.REVISE_BG_MUSIC) {
        header = i18n.t(
          'I18N_BACKGROUND_MUSIC_AND_MIXING',
          'Background music & mixing',
        );
      } else if (
        this.props.reviseCategory === FormFields.VOICEOVER_INSTRUCTIONS
      ) {
        header = i18n.t('I18N_VOICEOVER_CLIP', 'Voiceover clip');
      }
    }

    return (
      <CommonModal
        data-test="revise-ad-modal"
        modalHeader={header}
        className={`revise-ad-modal ${addColorSet('base')}`}
        closeBtn={cancelBtn}
        submitBtn={submitBtn}
        onHide={onHide}
        modalSize={modalSize}
        id={id}
        error={errorMsg}
        show
      >
        {content}
      </CommonModal>
    );
  }
}

export const getInitialValues = ({
  bgAsset,
}: {
  bgAsset?: BgAsset;
}): ReviseFormData => {
  return {
    revise_option: '',
    reviseBGMusic: bgAsset?.id
      ? {
          id: bgAsset?.id,
          gcsUri: bgAsset?.url,
          uri: bgAsset?.url,
          name: bgAsset?.name,
        }
      : null,
    reviseVOInstructions: { key: '', value: '' },
    reviseBackgroundDuration: { playFullMusic: !!bgAsset?.playFullMusic },
    reviseBGMusic_uploader: {},
    reviseMixMode: REVISE_DEFAULTS.MIX_MODE,
  };
};

export const mapStateToProps = (
  state: TSFixMe,
  ownProps: OwnProps,
): StateProps => {
  const bg: BgAsset =
    (ownProps.pendingCreative && ownProps.pendingCreative.bg) || {};

  const formValues: {
    [key: string]: ReviseFormData;
  } = getReduxFormValues(state);
  const reviseFormValues: ReviseFormData = formValues[REVISE_FORM_NAME];
  const reviseCategory =
    reviseFormValues && reviseFormValues[FormFields.REVISE_CATEGORY];
  return {
    revisePendingCreativeSucceeded: assetReviewSucceeded(state),
    errorMsg: assetReviewError(state),
    hasChanges: hasChangesSelector(state, {
      bgMusicId: bg.id,
      playFullMusic: bg.playFullMusic,
    }),
    initialValues: getInitialValues({
      bgAsset: ownProps.pendingCreative?.bg,
    }),
    needsWordCounter: needsWordCounter(state),
    accountId: get(getAccount(state), 'id'),
    reviseCategory,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    reviseVO: (
      adAccountId: string,
      voiceoverId: string,
      instructions: string,
    ) => {
      dispatch(
        reviseVoiceoverById({
          adAccountId,
          voiceoverId,
          instructions,
        }),
      );
    },
    reviseBGMusic: (
      adAccountId: string,
      creativeId: string,
      voiceoverMixId: string,
      bgAssetId: string,
      playFullMusic: boolean,
      voiceStart: number,
      musicStart: number,
      backgroundVolume: number,
      musicDuration: number,
    ) => {
      dispatch(
        reviseVoiceoverBackground({
          adAccountId,
          creativeId,
          voiceoverMixId,
          bgAssetId,
          playFullMusic,
          mixMode: REVISE_DEFAULTS.MIX_MODE,
          voiceStart: voiceStart || REVISE_DEFAULTS.VOICE_START,
          musicStart: musicStart || REVISE_DEFAULTS.MUSIC_START,
          backgroundVolume:
            backgroundVolume || REVISE_DEFAULTS.BACKGROUND_VOLUME,
          musicDuration: musicDuration || REVISE_DEFAULTS.MUSIC_DURATION,
        }),
      );
    },
    getMixHistory: (accountId: string, voiceoverId?: string) => {
      if (voiceoverId) {
        dispatch(getMixHistoryAC(accountId, voiceoverId));
      }
    },
  };
};

const shouldAsyncValidate = ({
  blurredField,
}: AsyncValidateCallback<ReviseFormData, {}>) =>
  ASYNC_VALIDATION_FIELDS.includes(blurredField as keyof ReviseFormData);

const mapResolverToProps = (resolver: { getBool: (arg: string) => any }) => ({
  isAdStudioRevisionFlowEnabled: resolver.getBool(
    'ad-studio-revision-flow-enabled',
  ),
});

const WrappedWithRemoteConfig = withRemoteConfig(mapResolverToProps, {
  blockRendering: true,
})(Revise);

const ReviseReduxForm = reduxForm<ReviseFormData, ReviseProps>({
  form: REVISE_FORM_NAME,
  asyncValidate: asyncValidateAssets,
  asyncBlurFields: ASYNC_VALIDATION_FIELDS,
  shouldAsyncValidate,
  onSubmit,
})(WrappedWithRemoteConfig);

export const ConnectedReviseReduxForm = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(ReviseReduxForm);

export default ConnectedReviseReduxForm;
