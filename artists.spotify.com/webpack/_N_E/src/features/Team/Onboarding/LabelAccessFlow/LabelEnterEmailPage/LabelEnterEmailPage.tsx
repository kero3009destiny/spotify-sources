import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonPrimary, ButtonSecondary, FormGroup, FormInput, Type, spacer64 } from '@spotify-internal/encore-web';
import { ErrorText } from '../../../components/TeamMemberDetailsForm/sharedStyles';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { useValidationErrors } from '../../../lib/selectors/useValidationErrors';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import { LabelAccessFlowStep } from '../../store';
import { useIsJoiningExistingTeam } from '../../store/selectors/useIsJoiningExistingTeam';
import { Container, ParentContainer, ButtonContainer } from '../../components/sharedStyles';
import { useLocale, useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ParagraphContainer = styled(Type).attrs({
  forwardedAs: 'p',
  variant: 'body1',
  condensed: true
}).withConfig({
  displayName: "LabelEnterEmailPage__ParagraphContainer",
  componentId: "sc-16rzgdv-0"
})(["margin-bottom:", ";"], spacer64);
var FormContainer = styled.div.withConfig({
  displayName: "LabelEnterEmailPage__FormContainer",
  componentId: "sc-16rzgdv-1"
})(["max-width:385px;margin:0 auto;text-align:left;"]);
var FormGroupContainer = styled(FormGroup).withConfig({
  displayName: "LabelEnterEmailPage__FormGroupContainer",
  componentId: "sc-16rzgdv-2"
})(["padding-bottom:0;"]);
export var LabelEnterEmailPage = function LabelEnterEmailPage() {
  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.labelAccessFlow.details,
      goToLabelAccessFlowStep = _useTeamStore.goToLabelAccessFlowStep,
      setLabelAccessFlowDetails = _useTeamStore.setLabelAccessFlowDetails,
      sendAccessFlowEmail = _useTeamStore.sendAccessFlowEmail,
      layoutType = _useTeamStore.layoutType;

  var t = useT();
  var locale = useLocale();
  var businessEmail = details.businessEmail;
  var isJoiningExistingTeam = useIsJoiningExistingTeam(details.selectedLabel);
  var responsiveStyleProps = useLayoutType(layoutType); // error handling

  var errors = useValidationErrors(details);
  var hasError = errors.has('businessEmail');

  var _useState = useState(false),
      showError = _useState[0],
      setShowError = _useState[1];

  var error = errors.get('businessEmail');
  var visibleError = showError && error;
  var previousStep = LabelAccessFlowStep.FIND_TEAM;
  return /*#__PURE__*/_jsx(ParentContainer, {
    "data-testid": "email-verification-page",
    children: /*#__PURE__*/_jsxs("form", {
      onSubmit: function onSubmit(e) {
        e.preventDefault();

        if (hasError) {
          setShowError(true);
        } else {
          sendAccessFlowEmail(businessEmail, false, locale);
        }
      },
      children: [/*#__PURE__*/_jsxs(Container, {
        children: [/*#__PURE__*/_jsx(Type, {
          as: "h1",
          variant: "heading2",
          children: t('LABEL_ACCESS_ENTER_EMAIL_HEADING', "What's your business email address?", "What's your business email address?")
        }), /*#__PURE__*/_jsx(ParagraphContainer, {
          children: isJoiningExistingTeam ? t('LABEL_ACCESS_ENTER_EMAIL_SUBHEADING_JOIN', 'Make sure you enter the email associated with the team you want to join.', 'Enter the email address associated with the team you want to join') : t('LABEL_ACCESS_ENTER_EMAIL_SUBHEADING_CREATE', 'Make sure you enter the email associated with the team you want to create.', 'Enter the email address associated with the team you want to create')
        }), /*#__PURE__*/_jsx(FormContainer, {
          children: /*#__PURE__*/_jsxs(FormGroupContainer, {
            children: [/*#__PURE__*/_jsx(FormInput, {
              "data-testid": "email-verification-input",
              "data-slo-id": "email-verification-input",
              placeholder: t('LABEL_ACCESS_ENTER_EMAIL_INPUT_PLACEHOLDER', 'Enter your business email address', 'Enter your business email address'),
              value: businessEmail,
              error: showError,
              onBlur: function onBlur() {
                if (hasError) {
                  setShowError(true);
                }
              },
              onChange: function onChange(e) {
                setShowError(false);
                setLabelAccessFlowDetails({
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
            return goToLabelAccessFlowStep(previousStep);
          },
          children: t('LABEL_ACCESS_ENTER_EMAIL_ACTION_GO_BACK', 'Go back', 'Go back')
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          "data-testid": "email-verification-next",
          "data-slo-id": "email-verification-next",
          type: "submit",
          buttonSize: responsiveStyleProps.buttonSize,
          children: t('LABEL_ACCESS_ENTER_EMAIL_ACTION_NEXT', 'Next', 'Go to the next step')
        })]
      })]
    })
  });
};