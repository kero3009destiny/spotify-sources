import { FieldValidator } from 'final-form';
import i18n from 'i18next';

import { required } from '@spotify-internal/adstudio-web-utils/lib/validators';

import { withCustomMessage } from './index';

export const i18nRequired: FieldValidator<any> = withCustomMessage(
  required,
  i18n.t('I18N_THIS_FIELD_IS_REQUIRED', 'This field is required.'),
);

export const i18nRequiredCheckboxes: FieldValidator<any> = (value, allValues) =>
  i18nRequired(Object.values(value).some(Boolean), allValues);
