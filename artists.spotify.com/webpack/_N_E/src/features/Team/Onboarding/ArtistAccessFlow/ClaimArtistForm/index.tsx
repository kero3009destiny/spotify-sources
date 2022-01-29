import { useTeamStore } from '../../../lib/store/useTeamStore';
import React, { useState } from 'react';
import { ActionContainer, ArtistFlowContainer, AvatarContainer, Container, HeaderContainer, TextContainer } from '../../components/sharedStyles';
import { Avatar, AvatarSize } from '../../components/Avatar';
import { ButtonPrimary, ButtonSecondary, LoadingIndicator, Type, screenSmMin, screenXsMax, spacer12, spacer24, spacer4, spacer64, spacer8 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { ArtistAccessFlowStep } from '../../store';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import { useValidationErrors } from '../../../lib/selectors/useValidationErrors';
import { Input } from '../../../components/TeamMemberDetailsForm/Input';
import { RoleInput } from '../../../components/TeamMemberDetailsForm/RoleInput';
import { TeamType } from '../../../lib';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import { ErrorText } from '../../../components/TeamMemberDetailsForm/sharedStyles';
import { isLqaTester } from '../../store/util/isLqaTester';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var InputGroup = styled.div.withConfig({
  displayName: "ClaimArtistForm__InputGroup",
  componentId: "sc-1yzy7w-0"
})(["margin-top:", ";margin-bottom ", ";@media (min-width:", "){margin-top:", ";display:flex;justify-content:space-between;> *{width:50%;padding-bottom:", ";}@media (min-width:", "){display:flex;flex-wrap:wrap;margin-right:-", ";}@media (max-width:", "){display:block;> *{width:100%;}}"], spacer24, spacer64, screenSmMin, spacer24, spacer4, screenSmMin, spacer8, screenXsMax);
var CaptchaContainer = styled.div.withConfig({
  displayName: "ClaimArtistForm__CaptchaContainer",
  componentId: "sc-1yzy7w-1"
})(["padding-top:", ";padding-left:", ";@media (max-width:", "){padding-left:0;}"], spacer12, spacer8, screenXsMax);
var FormContainer = styled.div.withConfig({
  displayName: "ClaimArtistForm__FormContainer",
  componentId: "sc-1yzy7w-2"
})(["@media (min-width:", "){padding-left:15%;padding-right:15%;}"], screenSmMin);
export var ClaimArtistForm = function ClaimArtistForm() {
  var _selectedArtist$image;

  var _useTeamStore = useTeamStore(),
      _useTeamStore$onboard = _useTeamStore.onboarding.artistAccessFlow,
      details = _useTeamStore$onboard.details,
      isTest = _useTeamStore$onboard.isTest,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep,
      setArtistAccessFlowDetails = _useTeamStore.setArtistAccessFlowDetails,
      currentUser = _useTeamStore.currentUser,
      layoutType = _useTeamStore.layoutType;

  var t = useT();
  var responsiveStyleProps = useLayoutType(layoutType);
  var errors = useValidationErrors(details);

  var _useState = useState(false),
      showErrors = _useState[0],
      setShowErrors = _useState[1];

  var selectedArtist = details.selectedArtist;

  if (!selectedArtist || !currentUser) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var isCaptchaBackDoorTesting = selectedArtist.genres[0] === 'mock_genre_captcha_test_back_door' || isTest || isLqaTester(currentUser.username);
  var captcha = details.captcha;
  var modifiedFields = ['firstName', 'lastName', 'role'];
  var hasErrors = modifiedFields.some(function (field) {
    return errors.has(field);
  }) || !isCaptchaBackDoorTesting && !captcha;
  var visibleCaptchaError = !captcha && showErrors && t('ARTIST_ACCESS_CAPTCHA_ERROR', 'Please check the reCAPTCHA box', 'Please check the reCCAPTCHA box to continue');
  var artistImageUrl = selectedArtist === null || selectedArtist === void 0 ? void 0 : (_selectedArtist$image = selectedArtist.images[0]) === null || _selectedArtist$image === void 0 ? void 0 : _selectedArtist$image.url;
  var SITE_KEY = isCaptchaBackDoorTesting ? '6LehviATAAAAACZ5hcTODQmVldaS5fVHAOKbw3MP' : process.env.REACT_APP_RECAPTCHA_KEY || '';
  return /*#__PURE__*/_jsx(ArtistFlowContainer, {
    "data-testid": "claim-artist-form",
    children: /*#__PURE__*/_jsxs(Container, {
      children: [/*#__PURE__*/_jsx(HeaderContainer, {
        children: /*#__PURE__*/_jsx(Type, {
          as: "h1",
          variant: "heading1",
          condensed: true,
          children: t('ARTIST_ACCESS_CLAIM_ARTIST_FORM_TITLE', 'Tell us about yourself', 'Tell us about yourself by entering your details.')
        })
      }), /*#__PURE__*/_jsx(AvatarContainer, {
        children: /*#__PURE__*/_jsx(Avatar, {
          size: layoutType === 'compact' ? AvatarSize.SMALL : AvatarSize.LARGE,
          imageUrl: artistImageUrl,
          claimed: false
        })
      }), /*#__PURE__*/_jsxs(TextContainer, {
        children: [/*#__PURE__*/_jsx(Type, {
          as: Type.h3,
          semanticColor: "textSubdued",
          variant: Type.body1,
          children: t('ARTIST_ACCESS_CLAIM_ARTIST_FORM_SPOTIFY_ACCOUNT_LABEL', 'SPOTIFY ACCOUNT', 'Below is the login email associated with your Spotify account')
        }), /*#__PURE__*/_jsx(Type, {
          as: Type.h3,
          variant: Type.body1,
          children: currentUser.email
        })]
      }), /*#__PURE__*/_jsx(FormContainer, {
        children: /*#__PURE__*/_jsxs("form", {
          onSubmit: function onSubmit(e) {
            e.preventDefault();

            if (hasErrors) {
              setShowErrors(true);
            } else {
              goToArtistAccessFlowStep(ArtistAccessFlowStep.VERIFY_CLAIM);
            }
          },
          children: [/*#__PURE__*/_jsxs(InputGroup, {
            children: [/*#__PURE__*/_jsx(Input, {
              id: "firstName",
              "data-testid": "firstName",
              label: t('ARTIST_ACCESS_CLAIM_ARTIST_FORM_FIRST_NAME', 'First name', 'First name input label'),
              onChange: function onChange(firstName) {
                return setArtistAccessFlowDetails({
                  firstName: firstName
                });
              },
              value: details.firstName,
              forceShowErrors: showErrors,
              error: errors.get('firstName'),
              required: true
            }), /*#__PURE__*/_jsx(Input, {
              id: "lastName",
              "data-testid": "lastName",
              label: t('ARTIST_ACCESS_CLAIM_ARTIST_FORM_LAST_NAME', 'Last name', 'Last name input label'),
              onChange: function onChange(lastName) {
                return setArtistAccessFlowDetails({
                  lastName: lastName
                });
              },
              value: details.lastName,
              forceShowErrors: showErrors,
              error: errors.get('lastName'),
              required: true
            }), /*#__PURE__*/_jsx(Input, {
              id: "businessEmail",
              "data-testid": "businessEmail",
              disabled: true,
              onChange: function onChange() {
                /* noop: disabled field */
              },
              helpText: t('ARTIST_ACCESS_CLAIM_ARTIST_FORM_BUSINESS_EMAIL_HELP_TEXT', "We'll link this email to your team.", 'This is the email that will be linked to your team'),
              label: t('ARTIST_ACCESS_CLAIM_ARTIST_FORM_BUSINESS_EMAIL_LABEL', 'Business email', 'Business email form label'),
              value: details.businessEmail
            }), /*#__PURE__*/_jsx(RoleInput, {
              id: "role",
              "data-testid": "role",
              label: t('ARTIST_ACCESS_CLAIM_ARTIST_FORM_ROLE', 'Role', 'Role input label'),
              onChange: function onChange(role) {
                return setArtistAccessFlowDetails({
                  role: role
                });
              },
              value: details.role,
              forceShowErrors: showErrors,
              error: errors.get('role'),
              teamType: TeamType.artist,
              required: true
            }), /*#__PURE__*/_jsx(Input, {
              id: "company",
              "data-testid": "company",
              label: t('ARTIST_ACCESS_CLAIM_ARTIST_FORM_COMPANY', 'Company (optional)', 'Company input label. The company field is optional.'),
              onChange: function onChange(company) {
                return setArtistAccessFlowDetails({
                  company: company
                });
              },
              value: details.company
            }), /*#__PURE__*/_jsxs(CaptchaContainer, {
              children: [/*#__PURE__*/_jsx(ReCAPTCHA, {
                theme: "dark",
                size: "normal",
                sitekey: SITE_KEY,
                onChange: function onChange(val) {
                  return setArtistAccessFlowDetails({
                    captcha: val
                  });
                },
                "data-testid": "captcha"
              }), /*#__PURE__*/_jsx(ErrorText, {
                id: "captcha-error",
                "data-testid": "captcha-error",
                error: !!visibleCaptchaError,
                children: visibleCaptchaError
              })]
            })]
          }), /*#__PURE__*/_jsxs(ActionContainer, {
            children: [/*#__PURE__*/_jsx(ButtonSecondary, {
              "data-testid": "back-button",
              type: "button",
              onClick: function onClick() {
                return goToArtistAccessFlowStep(ArtistAccessFlowStep.ENTER_EMAIL);
              },
              buttonSize: responsiveStyleProps.buttonSize,
              children: t('ARTIST_ACCESS_GO_BACK', 'Go back', 'Go back')
            }), /*#__PURE__*/_jsx(ButtonPrimary, {
              "data-testid": "submit",
              type: "submit",
              buttonSize: responsiveStyleProps.buttonSize,
              children: t('ARTIST_ACCESS_NEXT', 'Next', 'Go to the next step')
            })]
          })]
        })
      })]
    })
  });
};