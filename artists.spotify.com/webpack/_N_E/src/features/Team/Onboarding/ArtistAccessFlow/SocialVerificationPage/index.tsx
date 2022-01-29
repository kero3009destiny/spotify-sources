import { useTeamStore } from '../../../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import React, { useState } from 'react';
import { ArtistAccessFlowStep } from '../../store';
import { ButtonPrimary, ButtonSecondary, FormGroup, FormHelpText, FormInput, LoadingIndicator, spacer16, Type } from '@spotify-internal/encore-web';
import { AvatarContainer, ButtonContainer, Container, HeaderContainer, TextContainer } from '../../components/sharedStyles';
import { Avatar, AvatarSize } from '../../components/Avatar';
import { useValidationErrors } from '../../../lib/selectors/useValidationErrors';
import { ErrorText } from '../../../components/TeamMemberDetailsForm/sharedStyles';
import styled from 'styled-components';
import { spacer24 } from '@spotify-internal/tokens';
import { InstagramVerificationButton } from './InstagramVerificationButton';
import { TwitterVerificationButton } from './TwitterVerificationButton';
import { MaybeValidationTimeoutDialog } from '../../components/MaybeValidationTimeoutDialog';
import { TermsAndConditionsCheckbox } from '../../../../Terms/components/TermsAndConditionsCheckbox';
import { isLqaTester } from '../../store/util/isLqaTester';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LQA_TEST_REQUEST_ID = 'test_request_id';
var SocialMediaContainer = styled.div.withConfig({
  displayName: "SocialVerificationPage__SocialMediaContainer",
  componentId: "sc-1f6p4q5-0"
})(["margin-top:", ";margin-bottom:", ";"], spacer24, spacer16);
var FormGroupContainer = styled(FormGroup).withConfig({
  displayName: "SocialVerificationPage__FormGroupContainer",
  componentId: "sc-1f6p4q5-1"
})(["padding-bottom:0;padding-left:", ";padding-right:", ";", ";"], spacer24, spacer24, function (props) {
  return props.isFull && 'width: 600px';
});
export var SocialVerificationPage = function SocialVerificationPage() {
  var _selectedArtist$image;

  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.artistAccessFlow.details,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep,
      setArtistAccessFlowDetails = _useTeamStore.setArtistAccessFlowDetails,
      currentUser = _useTeamStore.currentUser,
      layoutType = _useTeamStore.layoutType,
      hideBanner = _useTeamStore.hideBanner,
      submitArtistClaim = _useTeamStore.submitArtistClaim;

  var t = useT();
  var responsiveStyleProps = useLayoutType(layoutType);
  var selectedArtist = details.selectedArtist,
      requestId = details.requestId,
      companyWebsiteUrl = details.companyWebsiteUrl;

  var _useState = useState(false),
      termsAndConditionsAgreement = _useState[0],
      setTermsAndConditionsAgreement = _useState[1];

  var socialAccountError = !details.twitterUsername && !details.instagramUsername && !details.companyWebsiteUrl;
  var errors = useValidationErrors(details);
  var hasErrors = errors.has('companyWebsiteUrl') || !termsAndConditionsAgreement || socialAccountError;
  var error = errors.get('companyWebsiteUrl');

  var _useState2 = useState(false),
      disableSubmit = _useState2[0],
      setDisableSubmit = _useState2[1];

  var _useState3 = useState(false),
      showErrors = _useState3[0],
      setShowErrors = _useState3[1];

  var visibleError = showErrors && error;
  var visibleTermsConditionsError = !termsAndConditionsAgreement && showErrors && t('ARTIST_ACCESS_TERMS_ERROR', 'To continue, accept our terms and conditions', 'Please accept our terms and conditions to continue');
  var visibleSocialAccountError = socialAccountError && showErrors && t('ARTIST_ACCESS_SOCIAL_ACCOUNT_ERROR', "To continue, connect a social account or paste a link to the artist's website.", 'To continue, please connect a social account or paste a link to the artist website.');

  if (!selectedArtist || !currentUser || !requestId && !isLqaTester(currentUser.username)) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var artistImageUrl = selectedArtist === null || selectedArtist === void 0 ? void 0 : (_selectedArtist$image = selectedArtist.images[0]) === null || _selectedArtist$image === void 0 ? void 0 : _selectedArtist$image.url;
  var ERROR_BANNER_ID = 'artist-access-submit-error-banner';
  return /*#__PURE__*/_jsxs(Container, {
    "data-testid": "social-verification-page",
    children: [/*#__PURE__*/_jsx(AvatarContainer, {
      children: /*#__PURE__*/_jsx(Avatar, {
        size: layoutType === 'compact' ? AvatarSize.SMALL : AvatarSize.LARGE,
        imageUrl: artistImageUrl,
        claimed: false
      })
    }), /*#__PURE__*/_jsx(HeaderContainer, {
      children: /*#__PURE__*/_jsx(Type, {
        as: "h1",
        variant: "heading2",
        condensed: true,
        children: selectedArtist.name
      })
    }), /*#__PURE__*/_jsxs(TextContainer, {
      children: [/*#__PURE__*/_jsx(Type, {
        as: "p",
        variant: Type.cta2,
        semanticColor: "textSubdued",
        children: t('ARTIST_ACCESS_SOCIAL_VERIFICATION_STATUS', 'Info required', 'Information is required')
      }), /*#__PURE__*/_jsx(Type, {
        as: "p",
        variant: Type.body1,
        weight: Type.bold,
        condensed: true,
        children: t('ARTIST_ACCESS_SOCIAL_VERIFICATION_OAUTH', 'Verify by connecting to the artist’s social accounts.', "Verify your identity by connecting to the artist's social accounts")
      }), /*#__PURE__*/_jsxs(SocialMediaContainer, {
        children: [/*#__PURE__*/_jsx(InstagramVerificationButton, {
          username: details.instagramUsername,
          onRemoved: function onRemoved() {
            return setArtistAccessFlowDetails({
              instagramUsername: null
            });
          },
          requestId: requestId || LQA_TEST_REQUEST_ID,
          artistId: selectedArtist.id
        }), /*#__PURE__*/_jsx(TwitterVerificationButton, {
          username: details.twitterUsername,
          onRemoved: function onRemoved() {
            return setArtistAccessFlowDetails({
              twitterUsername: null
            });
          },
          requestId: requestId || LQA_TEST_REQUEST_ID,
          artistId: selectedArtist === null || selectedArtist === void 0 ? void 0 : selectedArtist.id
        }), /*#__PURE__*/_jsx(ErrorText, {
          id: "social-account-error",
          "data-testid": "social-account-error",
          error: !!visibleSocialAccountError,
          children: visibleSocialAccountError
        })]
      })]
    }), /*#__PURE__*/_jsxs(FormGroupContainer, {
      isFull: layoutType === 'full',
      label: t('ARTIST_ACCESS_SOCIAL_VERIFICATION_WEBSITE_LINK', "Or, paste a link to the artist's website.", "Or you can paste a link to the artist's website"),
      children: [/*#__PURE__*/_jsx(FormInput, {
        "data-testid": "company-website-input",
        placeholder: t('ARTIST_ACCESS_SOCIAL_VERIFICATION_WEBSITE_LABEL', "Link to the artist's website.", "Link to the artist's website form label"),
        value: companyWebsiteUrl,
        error: !!visibleError,
        onChange: function onChange(e) {
          setShowErrors(false);
          setArtistAccessFlowDetails({
            companyWebsiteUrl: e.target.value
          });
        }
      }), !!visibleError ? /*#__PURE__*/_jsx(ErrorText, {
        "data-testid": "website-verification-error",
        error: !!visibleError,
        children: visibleError
      }) : /*#__PURE__*/_jsx(FormHelpText, {
        children: t('ARTIST_ACCESS_SOCIAL_VERIFICATION_WEBSITE_LABEL_HELP_TEXT', 'Sites should include your name and email address.', 'Websites should include your name and email address so we can verify your identity')
      })]
    }), /*#__PURE__*/_jsx(Container, {
      children: /*#__PURE__*/_jsx(TermsAndConditionsCheckbox, {
        termsAndConditionsAgreement: termsAndConditionsAgreement,
        onChange: function onChange() {
          return setTermsAndConditionsAgreement(!termsAndConditionsAgreement);
        },
        visibleTermsConditionsError: visibleTermsConditionsError
      })
    }), /*#__PURE__*/_jsxs(ButtonContainer, {
      children: [/*#__PURE__*/_jsx(ButtonSecondary, {
        "data-testid": "back-button",
        type: "button",
        onClick: function onClick() {
          return goToArtistAccessFlowStep(ArtistAccessFlowStep.VERIFY_CLAIM);
        },
        buttonSize: responsiveStyleProps.buttonSize,
        children: t('ARTIST_ACCESS_GO_BACK', 'Go back', 'Go back')
      }), /*#__PURE__*/_jsx(ButtonPrimary, {
        "data-testid": "submit-button",
        buttonSize: responsiveStyleProps.buttonSize,
        disabled: disableSubmit,
        onClick: function onClick() {
          if (hasErrors) {
            setShowErrors(true);
          } else {
            setDisableSubmit(true);
            hideBanner(ERROR_BANNER_ID);
            isLqaTester(currentUser.username) ? goToArtistAccessFlowStep(ArtistAccessFlowStep.DETAILS_CONFIRMATION) : submitArtistClaim(details, t('ARTIST_ACCESS_CLAIM_ERROR', 'Something went wrong', 'Something went wrong'));
          }
        },
        children: t('ARTIST_ACCESS_SUBMIT', 'Submit', 'Submit')
      })]
    }), /*#__PURE__*/_jsx(MaybeValidationTimeoutDialog, {})]
  });
};