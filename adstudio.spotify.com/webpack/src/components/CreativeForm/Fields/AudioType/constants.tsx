import React from 'react';
import i18n from 'i18next';

import { MegaSelectorProps } from '@spotify-internal/encore-advertising-web';
import {
  IconArrowTopRight,
  semanticColors,
} from '@spotify-internal/encore-web';
import { IconAudioFile } from '@spotify-internal/encore-web/advertising/icons/IconAudioFile';
import { IconSoundwave } from '@spotify-internal/encore-web/advertising/icons/IconSoundwave';

import { AUDIO_NAME, AudioType } from 'config/audioTypes';

import { CreativeFormValues } from 'types/common/campaignHierarchy/types';

export const TEST_IDS: Record<string, string> = {
  AUDIO_TYPE_INSTANT: 'instant-assets-radio-button',
  AUDIO_TYPE_VO: 'new-voiceover-radio-button',
  AUDIO_TYPE_FULLMIX: 'audio-submission-radio-button',
  AUDIO_TYPE_SPOKEN_LAYER_BRIEF: 'spoken-layer-brief-radio-button',
  AUDIO_TYPE_SPOKEN_LAYER_FULLMIX: 'spoken-layer-fullmix-radio-button',
};

export type AssetMegaSelectorProps = MegaSelectorProps<
  CreativeFormValues['audioType']
> & {
  'data-test'?: string;
};

export const INSTANT_ASSET_SELECTION: AssetMegaSelectorProps = {
  value: AudioType.INSTANT_ASSETS,
  label: i18n.t('I18N_CREATE_INSTANTLY', 'Create instantly'),
  description: i18n.t(
    'I18N_CREATE_AN_AD_RIGHT_NOW',
    'Create an ad right now using automation tech. Just choose a song to get started.',
  ),
  icon: (
    <IconArrowTopRight
      iconSize={48}
      semanticColor={semanticColors.textBrightAccent}
    />
  ),
  'data-test': TEST_IDS.AUDIO_TYPE_INSTANT,
};

export const VO_INSTANT_ASSET_SELECTION: AssetMegaSelectorProps = {
  value: AudioType.NEW_VOICEOVER,
  label: i18n.t('I18N_WRITE_A_SCRIPT', 'Write a script'),
  description: i18n.t(
    'I18N_WRITE_A_VOICEOVER_SCRIPT1',
    "Write a voiceover script and we'll produce a fully mixed version in 24-48 hours.",
  ),

  icon: (
    <IconSoundwave
      iconSize={48}
      semanticColor={semanticColors.textBrightAccent}
    />
  ),
  'data-test': TEST_IDS.AUDIO_TYPE_VO,
};

export const FULLMIX_INSTANT_ASSET_SELECTION: AssetMegaSelectorProps = {
  value: AudioType.UPLOADED_AUDIO,
  label: i18n.t('I18N_USE_YOUR_OWN', 'Use your own'),
  description: i18n.t(
    'I18N_UPLOAD_YOUR_OWN_COMPLETE',
    'Upload your own complete audio file.',
  ),

  icon: (
    <IconAudioFile
      iconSize={48}
      semanticColor={semanticColors.textBrightAccent}
    />
  ),
  'data-test': TEST_IDS.AUDIO_TYPE_FULLMIX,
};

export const VO_SELECTION: AssetMegaSelectorProps = {
  value: AudioType.NEW_VOICEOVER,
  label: i18n.t('I18N_CREATE_FROM_SCRATCH', 'Help me create one'),
  description: i18n.t(
    'I18N_WRITE_A_VOICEOVER_SCRIPT',
    "Write a voiceover script and we'll record and mix it with a background track for you.",
  ),

  icon: (
    <IconSoundwave
      iconSize={48}
      semanticColor={semanticColors.textBrightAccent}
    />
  ),
  'data-test': TEST_IDS.AUDIO_TYPE_VO,
};

export const FULLMIX_SELECTION: AssetMegaSelectorProps = {
  value: AudioType.UPLOADED_AUDIO,
  label: i18n.t('I18N_USE_YOUR_OWN', 'Use my own'),
  description: i18n.t(
    'I18N_UPLOAD_YOUR_COMPLETE_AUDI',
    'Upload your complete audio ad with a voiceover and background track.',
  ),

  icon: (
    <IconAudioFile
      iconSize={48}
      semanticColor={semanticColors.textBrightAccent}
    />
  ),
  'data-test': TEST_IDS.AUDIO_TYPE_FULLMIX,
};

export const SPOKEN_LAYER_BRIEF_SELECTION: AssetMegaSelectorProps = {
  value: AudioType.SPOKEN_LAYER_BRIEF,
  label: AUDIO_NAME[AudioType.SPOKEN_LAYER_BRIEF],
  description: i18n.t(
    'I18N_TELL_US_YOUR_MESSAGE',
    'Tell us about your message, we will write a script and record it for you. ',
  ),

  icon: (
    <IconSoundwave
      iconSize={48}
      semanticColor={semanticColors.textBrightAccent}
    />
  ),
  'data-test': TEST_IDS.AUDIO_TYPE_SPOKEN_LAYER_BRIEF,
};

export const SPOKEN_LAYER_FULLMIX_SELECTION: AssetMegaSelectorProps = {
  value: AudioType.SPOKEN_LAYER_FULLMIX,
  label: AUDIO_NAME[AudioType.SPOKEN_LAYER_FULLMIX],
  description: i18n.t(
    'I18N_UPLOAD_PREVIOUSLY_APPROVED',
    'Upload your previously approved podcast audio ad created through Spotify.',
  ),

  icon: (
    <IconAudioFile
      iconSize={48}
      semanticColor={semanticColors.textBrightAccent}
    />
  ),
  'data-test': TEST_IDS.AUDIO_TYPE_SPOKEN_LAYER_FULLMIX,
};
