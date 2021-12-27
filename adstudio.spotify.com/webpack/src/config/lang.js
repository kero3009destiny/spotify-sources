// TODO(carpita): Select language at run time and integrate with existing Spotify lang frameworks
import i18n from 'i18next';

const bindings = {
  'build-voice-over': i18n.t('I18N_BUILD_A_VOICEOVER', 'Build a Voiceover'),
  'transcript-placeholder': i18n.t('I18N_TRANSCRIPT', 'Transcript'),
  'name-placeholder': i18n.t('I18N_NAME', 'Name'),
  'instructions-placeholder': i18n.t('I18N_INSTRUCTIONS', 'Instructions'),
  'enter-your-script': i18n.t('I18N_ENTER_A_SCRIPT', 'Enter Your Script'),
  'enter-your-script-instructions': i18n.t(
    'I18N_SCRIPT_OF_VOICEOVER_UP_TO',
    'Script of Voiceover: up to 2000 characters.',
  ),
  'error-empty-transcript': i18n.t(
    'I18N_YOU_MUST_ENTER_CONTENT_FO',
    'You must enter content for the voice-over transcript.',
  ),
  'error-empty-name': i18n.t(
    'I18N_YOU_MUST_LABEL_YOUR_VOICE',
    'You must label your voice-over with a name.',
  ),
  'server-error': i18n.t(
    'I18N_A_SERVER_ERROR_OCCURRED_W',
    'A server error occurred while attempting to create a voice-over',
  ),
};

export default function getBinding(key, defaultValue) {
  if (bindings.hasOwnProperty(key)) {
    return bindings[key];
  }
  return defaultValue;
}

export function setLocale() /* locale */ {
  // ...
}

getBinding.setLocale = setLocale;
