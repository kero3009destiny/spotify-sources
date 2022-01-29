import { useMemo } from 'react';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import { isArtistAccessFlowDetails, isLabelAccessFlowDetails } from '../../Onboarding/store/models';
import { OTHER_ROLE, isTeamMemberDetails } from '../../components/TeamMemberDetailsForm/TeamMemberDetails';
import { selectedMediaIsInvalid } from '../../Onboarding/store/util/selectedMediaIsInvalid';
import { useT } from '@mrkt/features/i18n';

var isEmpty = function isEmpty(v) {
  return (v || '').trim() === '';
};

export var useValidationErrors = function useValidationErrors(details, disabledFields) {
  var t = useT();
  return useMemo(function () {
    var errors = new Map();

    var isEnabled = function isEnabled(value) {
      return !(disabledFields !== null && disabledFields !== void 0 && disabledFields.has(value));
    };

    if (isEmpty(details.firstName) && isEnabled('firstName')) {
      errors.set('firstName', t('TEAM_FORM_ERROR_FIRST_NAME', 'Add a first name', 'First name is a required field'));
    }

    if (isEmpty(details.lastName) && isEnabled('lastName')) {
      errors.set('lastName', t('TEAM_FORM_ERROR_LAST_NAME', 'Add a last name', 'Last name is a required field'));
    }

    if (isEmpty(details.businessEmail) && isEnabled('businessEmail')) {
      errors.set('businessEmail', t('TEAM_FORM_ERROR_BUSINESS_EMAIL_MISSING', 'Add an email', 'Business email is a required field'));
    } else if (details.businessEmail && !isEmail(details.businessEmail.trim())) {
      errors.set('businessEmail', t('TEAM_FORM_ERROR_BUSINESS_EMAIL_INVALID', 'Enter a valid email', 'The email you entered is not valid. Please enter a valid email address.'));
    }

    if (isEmpty(details.role) && isEnabled('role') || details.role === OTHER_ROLE) {
      errors.set('role', t('TEAM_FORM_ERROR_ROLE_MISSING', 'Add a role', 'Role is a required field'));
    } else if (details.role === 'Other') {
      errors.set('role', t('TEAM_FORM_ERROR_ROLE_INVALID', 'Enter a valid role', 'The role you entered is not valid. Please enter a valid role.'));
    }

    if (isEmpty(details.company) && isEnabled('company')) {
      errors.set('company', t('TEAM_FORM_ERROR_COMPANY', 'Add a company', 'Company is a required field'));
    }

    if (isArtistAccessFlowDetails(details)) {
      if (details.companyWebsiteUrl && !isURL(details.companyWebsiteUrl)) {
        errors.set('companyWebsiteUrl', t('TEAM_FORM_ERROR_WEBSITE', 'Enter a valid URL', 'The URL you entered is not valid.'));
      }
    }

    if (isTeamMemberDetails(details)) {
      if (isEmpty(details.accessLevel) && isEnabled('accessLevel')) {
        errors.set('accessLevel', t('TEAM_FORM_ERROR_ACCESS_LEVEL', 'Select an access level', 'Select an access level'));
      }
    }

    if (isLabelAccessFlowDetails(details)) {
      if (!details.selectedLabel && !details.teamName) {
        errors.set('teamName', t('TEAM_FORM_ERROR_TEAM_NAME', 'Add a team name', 'Add a team name'));
      }

      if (details.socialUrl && !isURL(details.socialUrl)) {
        errors.set('socialUrl', t('TEAM_FORM_ERROR_WEBSITE', 'Enter a valid URL', 'The URL you entered is not valid.'));
      }

      if (selectedMediaIsInvalid(details.selectedMedia1)) {
        errors.set('selectedMedia1', t('TEAM_FORM_ERROR_MEDIA', 'Enter a valid URI or link', 'Enter a valid URI or link'));
      }

      if (selectedMediaIsInvalid(details.selectedMedia2)) {
        errors.set('selectedMedia2', t('TEAM_FORM_ERROR_MEDIA', 'Enter a valid URI or link', 'Enter a valid URI or link'));
      }

      if (selectedMediaIsInvalid(details.selectedMedia3)) {
        errors.set('selectedMedia3', t('TEAM_FORM_ERROR_MEDIA', 'Enter a valid URI or link', 'Enter a valid URI or link'));
      }
    }

    return errors;
  }, [details, disabledFields, t]);
};