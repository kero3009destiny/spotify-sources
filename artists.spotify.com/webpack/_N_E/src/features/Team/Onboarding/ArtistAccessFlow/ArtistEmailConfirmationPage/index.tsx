import React from 'react';
import { ButtonSecondary, FormGroup, FormInput, Type, spacer64, FormHelpText } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import { ArtistAccessFlowStep, CodeVerificationStatus } from '../../store';
import { ButtonContainer, Container, ParentContainer } from '../../components/sharedStyles';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ParagraphContainer = styled(Type.p).attrs({
  variant: 'body1',
  condensed: true
}).withConfig({
  displayName: "ArtistEmailConfirmationPage__ParagraphContainer",
  componentId: "gxg5bd-0"
})(["margin-bottom:", ";"], spacer64);
var FormContainer = styled.div.withConfig({
  displayName: "ArtistEmailConfirmationPage__FormContainer",
  componentId: "gxg5bd-1"
})(["max-width:385px;margin:0 auto;text-align:left;"]);
var FormGroupContainer = styled(FormGroup).withConfig({
  displayName: "ArtistEmailConfirmationPage__FormGroupContainer",
  componentId: "gxg5bd-2"
})(["padding-bottom:0;"]);
export var ArtistEmailConfirmationPage = function ArtistEmailConfirmationPage() {
  var _details$selectedArti;

  var _useTeamStore = useTeamStore(),
      _useTeamStore$onboard = _useTeamStore.onboarding.artistAccessFlow,
      details = _useTeamStore$onboard.details,
      codeVerificationStatus = _useTeamStore$onboard.codeVerificationStatus,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep,
      verifyCodeAccessFlowEmail = _useTeamStore.verifyCodeAccessFlowEmail,
      setArtistAccessFlowDetails = _useTeamStore.setArtistAccessFlowDetails,
      layoutType = _useTeamStore.layoutType;

  var t = useT();
  var businessEmail = details.businessEmail;
  var artistIsClaimed = (_details$selectedArti = details.selectedArtist) === null || _details$selectedArti === void 0 ? void 0 : _details$selectedArti.isClaimed;
  var responsiveStyleProps = useLayoutType(layoutType);
  var hasError = ![CodeVerificationStatus.success, CodeVerificationStatus.incorrectLength].includes(codeVerificationStatus);

  var visibleError = function visibleError() {
    switch (codeVerificationStatus) {
      case CodeVerificationStatus.malformed:
      case CodeVerificationStatus.invalid:
        return t('ARTIST_ACCESS_EMAIL_VALIDATION_ERROR_INVALID', "That's not a valid six-digit code—try again?", 'That is not a valid code, try again.');

      case CodeVerificationStatus.expired:
        return t('ARTIST_ACCESS_EMAIL_VALIDATION_ERROR_EXPIRED', 'That six-digit code is expired. Go back one step and tap next to get a new one.', 'This code has expired. Go back one step and click Next to get a new code emailed to you.');

      default:
        return null;
    }
  };

  var resetFormErrors = function resetFormErrors() {
    verifyCodeAccessFlowEmail(details.businessEmail, '', nextStep, true);
  };

  var previousStep = ArtistAccessFlowStep.ENTER_EMAIL;
  var nextStep = artistIsClaimed ? ArtistAccessFlowStep.JOIN_ARTIST_TEAM : ArtistAccessFlowStep.CLAIM_ARTIST;
  return /*#__PURE__*/_jsxs(ParentContainer, {
    "data-testid": "artist-email-confirmation-page",
    children: [/*#__PURE__*/_jsxs(Container, {
      children: [/*#__PURE__*/_jsx(Type, {
        as: "h1",
        variant: "heading2",
        children: t('ARTIST_ACCESS_EMAIL_CONFIRMATION_TITLE', 'Check your email', 'Check your email')
      }), /*#__PURE__*/_jsx(ParagraphContainer, {
        dangerouslySetInnerHTML: {
          __html: t('ARTIST_ACCESS_EMAIL_CONFIRMATION_SUBTITLE', 'We sent a six-digit code to <strong>{businessEmail}</strong>. Copy and paste the code below to continue.', 'We emailed you a code. Enter it here to continue', {
            businessEmail: businessEmail
          })
        }
      }), /*#__PURE__*/_jsx(FormContainer, {
        children: /*#__PURE__*/_jsxs(FormGroupContainer, {
          label: t('ARTIST_ACCESS_EMAIL_CONFIRMATION_INPUT_LABEL', 'Six-digit code', 'Six-digit code input label'),
          children: [/*#__PURE__*/_jsx(FormInput, {
            "data-testid": "email-confirmation-input",
            error: hasError,
            "input-type": "number",
            maxLength: 6,
            onChange: function onChange(e) {
              verifyCodeAccessFlowEmail(details.businessEmail, e.target.value, nextStep, true);
              setArtistAccessFlowDetails({
                token: e.target.value
              });
            }
          }), hasError && /*#__PURE__*/_jsx(FormHelpText, {
            "data-testid": "email-confirmation-error",
            error: true,
            children: visibleError()
          }), /*#__PURE__*/_jsx(FormHelpText, {
            children: t('ARTIST_ACCESS_EMAIL_CONFIRMATION_INPUT_HELP_TEXT', 'Once you enter your code, you’ll have 30 minutes to finish getting access.', 'Once you enter your code, you have 30 minutes to finish submitting your request before the code expires')
          })]
        })
      })]
    }), /*#__PURE__*/_jsx(ButtonContainer, {
      children: /*#__PURE__*/_jsx(ButtonSecondary, {
        "data-testid": "email-confirmation-go-back",
        buttonSize: responsiveStyleProps.buttonSize,
        onClick: function onClick() {
          resetFormErrors();
          goToArtistAccessFlowStep(previousStep);
        },
        children: t('ARTIST_ACCESS_EMAIL_CONFIRMATION_ACTION_GO_BACK', 'Go back', 'Go back')
      })
    })]
  });
};