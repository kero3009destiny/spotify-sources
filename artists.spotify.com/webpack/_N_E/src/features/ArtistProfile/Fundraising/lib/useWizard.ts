import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

var _transitions;

// ignore-string-externalization
import React from 'react';
export var WizardStep;

(function (WizardStep) {
  WizardStep["input"] = "input";
  WizardStep["submit"] = "submit";
  WizardStep["submitting"] = "submitting";
  WizardStep["success"] = "success";
  WizardStep["failure"] = "failure";
  WizardStep["conflict"] = "conflict";
})(WizardStep || (WizardStep = {}));

var transitions = (_transitions = {}, _defineProperty(_transitions, WizardStep.input, [WizardStep.submit]), _defineProperty(_transitions, WizardStep.submit, [WizardStep.input, WizardStep.submitting]), _defineProperty(_transitions, WizardStep.submitting, [WizardStep.success, WizardStep.failure, // Conflict means submission failed because user already submitted
WizardStep.conflict]), _defineProperty(_transitions, WizardStep.failure, [WizardStep.input, WizardStep.submitting]), _defineProperty(_transitions, WizardStep.success, []), _defineProperty(_transitions, WizardStep.conflict, []), _transitions);
export function useWizard() {
  var _React$useState = React.useState(WizardStep.input),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      currStep = _React$useState2[0],
      setStep = _React$useState2[1];

  function stepFromTo(fromStep, toStep) {
    var validNextSteps = transitions[fromStep];

    if (toStep != null && validNextSteps.includes(toStep)) {
      setStep(toStep);
    }
  }

  return [currStep, stepFromTo];
}