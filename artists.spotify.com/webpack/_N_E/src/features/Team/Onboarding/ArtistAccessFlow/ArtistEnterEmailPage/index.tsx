import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonPrimary, ButtonSecondary, FormGroup, FormInput, spacer64, Type } from '@spotify-internal/encore-web';
import { ErrorText } from '../../../components/TeamMemberDetailsForm/sharedStyles';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { useValidationErrors } from '../../../lib/selectors/useValidationErrors';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import { ArtistAccessFlowStep } from '../../store';
import { ButtonContainer, Container, ParentContainer } from '../../components/sharedStyles';
import { useLocale, useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ParagraphContainer = styled(Type.p).attrs({
  variant: 'body1',
  condensed: true
}).withConfig({
  displayName: "ArtistEnterEmailPage__ParagraphContainer",
  componentId: "sc-14gzvfp-0"
})(["margin-bottom:", ";"], spacer64);
var FormContainer = styled.div.withConfig({
  displayName: "ArtistEnterEmailPage__FormContainer",
  componentId: "sc-14gzvfp-1"
})(["max-width:385px;margin:0 auto;text-align:left;"]);
var FormGroupContainer = styled(FormGroup).withConfig({
  displayName: "ArtistEnterEmailPage__FormGroupContainer",
  componentId: "sc-14gzvfp-2"
})(["padding-bottom:0;"]);
export var ArtistEnterEmailPage = function ArtistEnterEmailPage() {
  var _details$selectedArti, _details$selectedArti2;

  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.artistAccessFlow.details,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep,
      setArtistAccessFlowDetails = _useTeamStore.setArtistAccessFlowDetails,
      sendAccessFlowEmail = _useTeamStore.sendAccessFlowEmail,
      layoutType = _useTeamStore.layoutType;

  var locale = useLocale();
  var t = useT();
  var businessEmail = details.businessEmail;
  var artistIsClaimed = (_details$selectedArti = details.selectedArtist) === null || _details$selectedArti === void 0 ? void 0 : _details$selectedArti.isClaimed;
  var artistHasInstantAccess = !artistIsClaimed && !!((_details$selectedArti2 = details.selectedArtist) !== null && _details$selectedArti2 !== void 0 && _details$selectedArti2.distributor);
  var responsiveStyleProps = useLayoutType(layoutType); // error handling

  var errors = useValidationErrors(details);
  var hasError = errors.has('businessEmail');

  var _useState = useState(false),
      showError = _useState[0],
      setShowError = _useState[1];

  var error = errors.get('businessEmail');
  var visibleError = showError && error;
  var previousStep = artistIsClaimed || artistHasInstantAccess ? ArtistAccessFlowStep.SPEEDBUMP : ArtistAccessFlowStep.FIND_ARTIST;
  return /*#__PURE__*/_jsx(ParentContainer, {
    "data-testid": "artist-enter-email-page",
    children: /*#__PURE__*/_jsxs("form", {
      onSubmit: function onSubmit(e) {
        e.preventDefault();

        if (hasError) {
          setShowError(true);
        } else {
          sendAccessFlowEmail(businessEmail, true, locale);
        }
      },
      children: [/*#__PURE__*/_jsxs(Container, {
        children: [/*#__PURE__*/_jsx(Type, {
          as: "h1",
          variant: "heading2",
          children: t('ARTIST_ACCESS_ENTER_EMAIL_HEADING', "What's your business email address?", 'What is your business email address?')
        }), /*#__PURE__*/_jsx(ParagraphContainer, {
          children: artistIsClaimed ? t('ARTIST_ACCESS_ENTER_EMAIL_SUBHEADING_JOIN', 'Make sure you enter the email associated with the team you want to join.', 'Enter the email address associated with the team you want to join') : t('ARTIST_ACCESS_ENTER_EMAIL_SUBHEADING_CREATE', 'Make sure you enter the email associated with the team you want to create.', 'Enter the email address associated with the team you want to create')
        }), /*#__PURE__*/_jsx(FormContainer, {
          children: /*#__PURE__*/_jsxs(FormGroupContainer, {
            children: [/*#__PURE__*/_jsx(FormInput, {
              "data-testid": "email-verification-input",
              placeholder: t('ARTIST_ACCESS_ENTER_EMAIL_INPUT_PLACEHOLDER', 'Enter your business email address', 'Enter your business email address'),
              value: businessEmail,
              error: showError,
              onBlur: function onBlur() {
                if (hasError) {
                  setShowError(true);
                }
              },
              onChange: function onChange(e) {
                setShowError(false);
                setArtistAccessFlowDetails({
                  businessEmail: e.target.value
                });
              }
            }), /*#__PURE__*/_jsx(ErrorText, {
              "data-testid": "email-verification-error",
              error: !!visibleError,
              children: visibleError
            })]
          })
        })]
      }), /*#__PURE__*/_jsxs(ButtonContainer, {
        children: [/*#__PURE__*/_jsx(ButtonSecondary, {
          "data-testid": "email-verification-go-back",
          type: "button",
          buttonSize: responsiveStyleProps.buttonSize,
          onClick: function onClick() {
            return goToArtistAccessFlowStep(previousStep);
          },
          children: t('ARTIST_ACCESS_GO_BACK', 'Go back', 'Go back')
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          "data-testid": "email-verification-next",
          type: "submit",
          buttonSize: responsiveStyleProps.buttonSize,
          children: t('ARTIST_ACCESS_NEXT', 'Next', 'Go to the next step')
        })]
      })]
    })
  });
};