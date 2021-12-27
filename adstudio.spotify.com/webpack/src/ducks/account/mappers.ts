import { getTimezoneOffsetMillis } from 'utils/dateHelpers';

import {
  EMAIL_SUBSCRIBE_INPUT_NAME,
  VAT_FORM_INPUT_NAME,
} from '../../components/common/AccountForm';

import { Account } from './types';

export function mapAccountRequest(account: Account) {
  const {
    [VAT_FORM_INPUT_NAME]: vatField,
    [EMAIL_SUBSCRIBE_INPUT_NAME]: emailField,
    ...rest
  } = account;

  return {
    ...rest,
    taxId: vatField,
    emailSubscription: emailField,
    timezoneOffsetMillis: getTimezoneOffsetMillis(),
  };
}
