import { useT } from '@mrkt/features/i18n';
import { IconInstagram, IconTwitter, IconFacebook, IconLink } from '@spotify-internal/encore-web';
import { useSoundbetterSocialLinks } from '../../utils/useSoundbetterSocialLinks';
import { IconSoundbetter } from '../IconSoundbetter';
export function getFormFields(_ref) {
  var t = _ref.t,
      soundbetter = _ref.soundbetter;
  var urlPlaceholder = t('artistprofile_sociallinks_lib_1', 'URL', '');
  var usernameOrURLPlaceholder = t('artistprofile_sociallinks_lib_2', 'Username or URL', '');
  var formFields = {
    instagram: {
      defaultValue: '',
      icon: IconInstagram,
      url: 'https://instagram.com',
      placeholder: usernameOrURLPlaceholder
    },
    twitter: {
      defaultValue: '',
      icon: IconTwitter,
      url: 'https://twitter.com',
      placeholder: usernameOrURLPlaceholder
    },
    facebook: {
      defaultValue: '',
      icon: IconFacebook,
      url: 'https://facebook.com',
      placeholder: usernameOrURLPlaceholder
    },
    wikipedia: {
      defaultValue: '',
      icon: IconLink,
      url: 'https://wikipedia.org',
      placeholder: urlPlaceholder
    }
  };

  if (soundbetter) {
    formFields.soundbetter = {
      defaultValue: '',
      icon: IconSoundbetter,
      url: 'https://soundbetter.com',
      placeholder: urlPlaceholder
    };
  }

  return formFields;
}
export var useFormFields = function useFormFields() {
  return getFormFields({
    t: useT(),
    soundbetter: useSoundbetterSocialLinks()
  });
};