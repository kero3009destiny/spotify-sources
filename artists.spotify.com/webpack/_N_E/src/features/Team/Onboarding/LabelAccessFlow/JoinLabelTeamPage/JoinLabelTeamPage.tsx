import React from 'react';
import { Type } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { LabelAccessFlowStep } from '../../store';
import { AccessUserDetailsForm } from '../../components/AccessUserDetailsForm';
import { FormContainer, FormHeadingContainer } from '../../components/sharedStyles';
import { MaybeValidationTimeoutDialog } from '../../components/MaybeValidationTimeoutDialog';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var JoinLabelTeamPage = function JoinLabelTeamPage() {
  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.labelAccessFlow.details,
      goToLabelAccessFlowStep = _useTeamStore.goToLabelAccessFlowStep;

  var t = useT();
  var selectedLabel = details.selectedLabel;

  if (!selectedLabel) {
    goToLabelAccessFlowStep(LabelAccessFlowStep.FIND_TEAM);
    return null;
  }

  return /*#__PURE__*/_jsxs(FormContainer, {
    "data-testid": "join-label-team-page",
    "data-slo-id": "join-label-team-page",
    children: [/*#__PURE__*/_jsx(FormHeadingContainer, {
      children: /*#__PURE__*/_jsx(Type, {
        "data-testid": "join-label-team-heading",
        as: "h1",
        variant: "heading1",
        weight: "bold",
        children: t('LABEL_ACCESS_JOIN_TEAM_PAGE_TITLE', 'Join {teamName}', 'Join team page title', {
          teamName: selectedLabel === null || selectedLabel === void 0 ? void 0 : selectedLabel.name
        })
      })
    }), /*#__PURE__*/_jsx(AccessUserDetailsForm, {
      isCreatingNewTeam: false
    }), /*#__PURE__*/_jsx(MaybeValidationTimeoutDialog, {})]
  });
};