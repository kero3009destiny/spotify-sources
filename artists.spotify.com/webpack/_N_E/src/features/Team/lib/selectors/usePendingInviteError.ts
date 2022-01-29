import { useMemo } from 'react';
import { isEmail } from 'validator';
import { useT } from '@mrkt/features/i18n';
export var usePendingInviteValidationErrors = function usePendingInviteValidationErrors(pendingInvite) {
  var t = useT();
  return useMemo(function () {
    var errorMap = new Map();

    if (!pendingInvite) {
      return errorMap;
    }

    if (!pendingInvite.firstName) {
      errorMap.set('firstName', t('PENDING_INVITE_FIRST_NAME_ERROR', 'Add a first name', 'First name is required'));
    }

    if (!pendingInvite.lastName) {
      errorMap.set('lastName', t('PENDING_INVITE_LAST_NAME_ERROR', 'Add a last name', 'Last name is required'));
    }

    if (!pendingInvite.businessEmail) {
      errorMap.set('businessEmail', t('PENDING_INVITE_EMAIL_EMPTY_ERROR', 'Add an email', 'Email is required'));
    } else if (!isEmail(pendingInvite.businessEmail)) {
      errorMap.set('businessEmail', t('PENDING_INVITE_EMAIL_INVALID_ERROR', 'Enter a valid email', 'Email is invalid'));
    }

    if (!pendingInvite.didAcceptTerms) {
      errorMap.set('didAcceptTerms', t('PENDING_INVITE_TERMS_ERROR', 'Accept the terms to continue', 'Terms acceptance is required'));
    }

    return errorMap;
  }, [pendingInvite]);
};