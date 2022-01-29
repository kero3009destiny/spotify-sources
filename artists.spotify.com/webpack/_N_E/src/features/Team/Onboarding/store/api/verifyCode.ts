// ignore-string-externalization
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { CodeVerificationStatus } from '../models';
export var verifyCode = function verifyCode(token, businessEmail) {
  return webgateFetch("".concat(ONBOARDING_API, "/v0/redeemToken/").concat(token, "/").concat(businessEmail), {
    method: 'POST'
  }).then(function (response) {
    switch (response.status) {
      case 200:
        return CodeVerificationStatus.success;

      case 410:
        return CodeVerificationStatus.expired;

      default:
        return CodeVerificationStatus.invalid;
    }
  });
};