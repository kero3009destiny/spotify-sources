import { useMemo } from 'react';
import isURL from 'validator/lib/isURL';
import { useT } from '@mrkt/features/i18n';
import { isSelectedArtist } from '../models';
import { OTHER_ROLE } from '../../../components/TeamMemberDetailsForm/TeamMemberDetails';
import { selectedMediaIsInvalid } from '../../../Onboarding/store/util/selectedMediaIsInvalid';
import { getStoredArtistInfo } from '../../utils/stateStorage';
import { useParams } from 'react-router';

var isEmpty = function isEmpty(v) {
  return (v || '').trim() === '';
};

export var useAddTeamsValidationErrors = function useAddTeamsValidationErrors(details) {
  var t = useT();
  var storedArtistInfo = getStoredArtistInfo();

  var _useParams = useParams(),
      step = _useParams.step;

  var companyRequired = details.selectedTeam && !isSelectedArtist(details.selectedTeam) && !storedArtistInfo.artistName || details.newLabelTeamName;
  var socialVerificationRequired = step === 'confirm';
  var socialAccountError = !details.twitterUsername && !details.instagramUsername && !details.websiteLink;
  var selectedMediaRequired = step === 'add-content';
  return useMemo(function () {
    var errors = new Map();

    if (isEmpty(details.role) || details.role === OTHER_ROLE) {
      errors.set('role', t('9fb6af', 'Add a role', ''));
    } else if (details.role === 'Other') {
      errors.set('role', t('788d5d', 'Enter a valid role', ''));
    }

    if (isEmpty(details.company) && companyRequired) {
      errors.set('company', t('996829', 'Add a company', ''));
    }

    if (details.websiteLink && !isURL(details.websiteLink)) {
      errors.set('websiteLink', t('7a92fc', 'Enter a valid URL', ''));
    }

    if (details.socialLink && !isURL(details.socialLink)) {
      errors.set('socialLink', t('7a92fc', 'Enter a valid URL', ''));
    }

    if (socialAccountError && socialVerificationRequired) {
      errors.set('socialVerification', t('d82e47', "To continue, connect a social account or paste a link to the artist's website.", ''));
    }

    if (selectedMediaRequired && selectedMediaIsInvalid(details.selectedMedia1)) {
      errors.set('selectedMedia1', t('ced231', 'Enter a valid URI or link', ''));
    }

    if (selectedMediaRequired && selectedMediaIsInvalid(details.selectedMedia2)) {
      errors.set('selectedMedia2', t('ced231', 'Enter a valid URI or link', ''));
    }

    if (selectedMediaRequired && selectedMediaIsInvalid(details.selectedMedia3)) {
      errors.set('selectedMedia3', t('ced231', 'Enter a valid URI or link', ''));
    }

    return errors;
  }, [companyRequired, details, selectedMediaRequired, socialAccountError, socialVerificationRequired, t]);
};