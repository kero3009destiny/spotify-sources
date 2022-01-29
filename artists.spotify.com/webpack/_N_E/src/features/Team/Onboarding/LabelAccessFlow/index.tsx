import React, { useEffect } from 'react';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { JoinLabelTeamPage } from './JoinLabelTeamPage/JoinLabelTeamPage';
import { SpeedBumpTeamPage } from './SpeedBumpTeamPage/SpeedBumpTeamPage';
import { LabelEnterEmailPage } from './LabelEnterEmailPage/LabelEnterEmailPage';
import { CreateLabelTeamPage } from './CreateLabelTeamPage/CreateLabelTeamPage';
import { OnboardingPage } from '../components/OnboardingPage';
import { useHelpButton } from '../../../HelpWidget';
import { FindTeamPage } from './FindTeamPage/FindTeamPage';
import { LabelAccessFlowStep } from './../store';
import { assertUnreachable } from '../../lib/util/assertUnreachable';
import { AddContentTeamPage } from './AddContentTeamPage/AddContentTeamPage';
import { ConfirmationPage } from './ConfirmationPage/ConfirmationPage';
import { LabelEmailConfirmationPage } from './LabelEmailConfirmationPage/LabelEmailConfirmationPage';
import { jsx as _jsx } from "react/jsx-runtime";

var Step = function Step() {
  var _useTeamStore = useTeamStore(),
      step = _useTeamStore.onboarding.labelAccessFlow.step;

  switch (step) {
    case LabelAccessFlowStep.FIND_TEAM:
      return /*#__PURE__*/_jsx(FindTeamPage, {});

    case LabelAccessFlowStep.SPEEDBUMP:
      return /*#__PURE__*/_jsx(SpeedBumpTeamPage, {});

    case LabelAccessFlowStep.ENTER_EMAIL:
      return /*#__PURE__*/_jsx(LabelEnterEmailPage, {});

    case LabelAccessFlowStep.CONFIRM_EMAIL:
      return /*#__PURE__*/_jsx(LabelEmailConfirmationPage, {});

    case LabelAccessFlowStep.CREATE_TEAM:
      return /*#__PURE__*/_jsx(CreateLabelTeamPage, {});

    case LabelAccessFlowStep.JOIN_TEAM:
      return /*#__PURE__*/_jsx(JoinLabelTeamPage, {});

    case LabelAccessFlowStep.SELECT_CONTENT:
      return /*#__PURE__*/_jsx(AddContentTeamPage, {});

    case LabelAccessFlowStep.DETAILS_CONFIRMATION:
      return /*#__PURE__*/_jsx(ConfirmationPage, {});

    default:
      return assertUnreachable(step);
  }
};

export var LabelAccessFlow = function LabelAccessFlow() {
  var _useHelpButton = useHelpButton(),
      setVisible = _useHelpButton.setVisible;

  useEffect(function () {
    return setVisible(false);
  }, [setVisible]);
  return /*#__PURE__*/_jsx(OnboardingPage, {
    children: /*#__PURE__*/_jsx(Step, {})
  });
};