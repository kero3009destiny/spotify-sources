import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import { ButtonPrimary, ButtonSecondary, Type, spacer12, spacer24, spacer64, spacer80, screenSmMin } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { Input } from '../../../components/TeamMemberDetailsForm/Input';
import { ContentPopover } from './utils';
import { MediaPreview } from './MediaPreview';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { LabelAccessFlowStep } from '../../store';
import { useValidationErrors } from '../../../lib/selectors/useValidationErrors';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import { useIsJoiningExistingTeam } from '../../store/selectors/useIsJoiningExistingTeam';
import { MaybeValidationTimeoutDialog } from '../../components/MaybeValidationTimeoutDialog';
import { useT } from '@mrkt/features/i18n';
import { TermsAndConditionsCheckbox } from '../../../../Terms/components/TermsAndConditionsCheckbox';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ActionContainer = styled.div.withConfig({
  displayName: "AddContentTeamPage__ActionContainer",
  componentId: "ht67x3-0"
})(["display:flex;justify-content:space-between;margin-top:", ";max-width:750px;width:100%;"], spacer80);
var Container = styled.div.withConfig({
  displayName: "AddContentTeamPage__Container",
  componentId: "ht67x3-1"
})(["align-items:center;display:flex;flex-direction:column;text-align:center;margin:auto;padding-left:", ";padding-right:", ";@media (min-width:", "){padding-left:0;padding-right:0;}"], spacer24, spacer24, screenSmMin);
var InputGroup = styled.div.withConfig({
  displayName: "AddContentTeamPage__InputGroup",
  componentId: "ht67x3-2"
})(["display:block;justify-content:space-between;width:100%;text-align:left;@media (min-width:", "){width:50%;}> *{width:100%;padding-bottom:", ";}"], screenSmMin, spacer12);
var Subheading = styled(Type.p).attrs({
  variant: 'body1'
}).withConfig({
  displayName: "AddContentTeamPage__Subheading",
  componentId: "ht67x3-3"
})(["align-items:center;display:flex;justify-content:center;width:100%;margin-top:", ";margin-bottom:", ";@media (min-width:", "){width:60%;}"], spacer24, spacer64, screenSmMin);
export var AddContentTeamPage = function AddContentTeamPage() {
  var _useTeamStore = useTeamStore(),
      clearSelectedMedia = _useTeamStore.clearSelectedMedia,
      details = _useTeamStore.onboarding.labelAccessFlow.details,
      selectLabelAccessFlowMedia = _useTeamStore.selectLabelAccessFlowMedia,
      goToLabelAccessFlowStep = _useTeamStore.goToLabelAccessFlowStep,
      submitAccessFlowDetails = _useTeamStore.submitAccessFlowDetails,
      layoutType = _useTeamStore.layoutType;

  var t = useT();
  var isCreatingNewTeam = !useIsJoiningExistingTeam(details.selectedLabel);
  var responsiveStyleProps = useLayoutType(layoutType);
  var selectedMedia1 = details.selectedMedia1,
      selectedMedia2 = details.selectedMedia2,
      selectedMedia3 = details.selectedMedia3;

  var _useState = useState(false),
      termsAndConditionsAgreement = _useState[0],
      setTermsAndConditionsAgreement = _useState[1];

  var errors = useValidationErrors(details);

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showErrors = _React$useState2[0],
      setShowErrors = _React$useState2[1];

  var hasErrors = errors.has('selectedMedia1') || errors.has('selectedMedia2') || errors.has('selectedMedia3') || !termsAndConditionsAgreement;
  var visibleTermsConditionsError = !termsAndConditionsAgreement && showErrors && t('ADD_CONTENT_FORM_TERMS_ERROR', 'To continue, accept our terms and conditions', 'You must accept our terms and conditions to continue. Error message');
  return /*#__PURE__*/_jsxs(Container, {
    "data-testid": "add-content-team-page",
    children: [/*#__PURE__*/_jsx(Type, {
      as: "h1",
      variant: "heading1",
      condensed: true,
      children: t('ADD_CONTENT_FORM_HEADER', 'Add your content', 'Add content page header')
    }), /*#__PURE__*/_jsx(Subheading, {
      children: t('ADD_CONTENT_FORM_SUBHEADER', 'Add 3 tracks or albums owned by your company. Don’t include artist URIs or links. If you deliver content through multiple licensors, provide examples from each.', 'Add 3 track or album links or URIs that are owned by your company. Please provide examples from each licensor if you work with multiple licensors.')
    }), /*#__PURE__*/_jsxs(InputGroup, {
      children: [/*#__PURE__*/_jsx(Input, {
        placeholder: t('ADD_CONTENT_FORM_INPUT_PLACEHOLDER', 'Paste your Spotify URI or link', 'paste a Spotify URI or link'),
        popover: /*#__PURE__*/_jsx(ContentPopover, {
          popoverArrow: responsiveStyleProps.popoverArrow
        }),
        popoverPlacement: responsiveStyleProps.popoverPlacement,
        id: "media1",
        label: t('ADD_CONTENT_FORM_INPUT_LABEL_1', 'Album or track URI 1', 'Input label for first album or track URI or link'),
        value: selectedMedia1 === null || selectedMedia1 === void 0 ? void 0 : selectedMedia1.uri,
        onChange: function onChange(uri) {
          return selectLabelAccessFlowMedia('selectedMedia1', uri);
        },
        error: errors.get('selectedMedia1'),
        forceShowErrors: showErrors,
        required: true
      }), /*#__PURE__*/_jsx(MediaPreview, {
        media: selectedMedia1,
        clear: function clear() {
          return clearSelectedMedia('selectedMedia1');
        }
      }), /*#__PURE__*/_jsx(Input, {
        placeholder: t('ADD_CONTENT_FORM_INPUT_PLACEHOLDER', 'Paste your Spotify URI or link', 'paste a Spotify URI or link'),
        id: "media2",
        label: t('ADD_CONTENT_FORM_INPUT_LABEL_2', 'Album or track URI 2', 'Input label for second album or track URI or link'),
        value: selectedMedia2 === null || selectedMedia2 === void 0 ? void 0 : selectedMedia2.uri,
        onChange: function onChange(uri) {
          return selectLabelAccessFlowMedia('selectedMedia2', uri);
        },
        error: errors.get('selectedMedia2'),
        forceShowErrors: showErrors,
        required: true
      }), /*#__PURE__*/_jsx(MediaPreview, {
        media: selectedMedia2,
        clear: function clear() {
          return clearSelectedMedia('selectedMedia2');
        }
      }), /*#__PURE__*/_jsx(Input, {
        placeholder: t('ADD_CONTENT_FORM_INPUT_PLACEHOLDER', 'Paste your Spotify URI or link', 'paste a Spotify URI or link'),
        id: "media3",
        label: t('ADD_CONTENT_FORM_INPUT_LABEL_3', 'Album or track URI 3', 'Input label for third album or track URI or link'),
        value: selectedMedia3 === null || selectedMedia3 === void 0 ? void 0 : selectedMedia3.uri,
        onChange: function onChange(uri) {
          return selectLabelAccessFlowMedia('selectedMedia3', uri);
        },
        error: errors.get('selectedMedia3'),
        forceShowErrors: showErrors,
        required: true
      }), /*#__PURE__*/_jsx(MediaPreview, {
        media: selectedMedia3,
        clear: function clear() {
          return clearSelectedMedia('selectedMedia3');
        }
      })]
    }), /*#__PURE__*/_jsx(Container, {
      children: /*#__PURE__*/_jsx(TermsAndConditionsCheckbox, {
        termsAndConditionsAgreement: termsAndConditionsAgreement,
        onChange: function onChange() {
          return setTermsAndConditionsAgreement(!termsAndConditionsAgreement);
        },
        visibleTermsConditionsError: visibleTermsConditionsError
      })
    }), /*#__PURE__*/_jsxs(ActionContainer, {
      children: [/*#__PURE__*/_jsx(ButtonSecondary, {
        "data-testid": "add-content-back",
        buttonSize: responsiveStyleProps.buttonSize,
        onClick: function onClick() {
          return goToLabelAccessFlowStep(LabelAccessFlowStep.CREATE_TEAM);
        },
        children: t('ADD_CONTENT_FORM_GO_BACK_BUTTON', 'Go back', 'Go back')
      }), /*#__PURE__*/_jsx(ButtonPrimary, {
        "data-testid": "add-content-next",
        buttonSize: responsiveStyleProps.buttonSize,
        onClick: function onClick() {
          if (hasErrors) {
            setShowErrors(true);
          } else {
            submitAccessFlowDetails(details, isCreatingNewTeam, t);
          }
        },
        children: t('ADD_CONTENT_FORM_SUBMIT_BUTTON', 'Submit', 'Submit button')
      })]
    }), /*#__PURE__*/_jsx(MaybeValidationTimeoutDialog, {})]
  });
};