import React from 'react';
import { NavStepper as EncoreNavStepper, NavStepperItem } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { WizardStep } from '../lib/useWizard';
import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function NavStepper(_ref) {
  var isEditing = _ref.isEditing,
      step = _ref.step,
      visible = _ref.visible;
  var t = useT();
  var viewport = useViewport();
  var condensed = viewport === Viewport.XS;
  var inputSelected = step === WizardStep.input;
  var inputVisited = step !== WizardStep.input;
  var confirmSelected = step === WizardStep.submit || step === WizardStep.failure || step === WizardStep.submitting;
  var confirmVisited = step === WizardStep.success || step === WizardStep.conflict;
  var successSelected = step === WizardStep.success || step === WizardStep.conflict;
  var successVisited = false;
  var inputStepCopy = isEditing ? t('artistprofile_fundraising_navstepper_1', 'Edit link', '') : t('artistprofile_fundraising_navstepper_2', 'Set link', '');
  return visible ? /*#__PURE__*/_jsxs(EncoreNavStepper, {
    role: "tablist",
    style: condensed ? {
      gridArea: 'nav'
    } : {},
    children: [/*#__PURE__*/_jsx(NavStepperItem, {
      active: inputSelected,
      visited: inputVisited,
      condensed: condensed,
      role: "tab",
      "aria-selected": inputSelected,
      style: condensed ? {
        fontSize: '28px'
      } : {},
      children: inputStepCopy
    }), /*#__PURE__*/_jsx(NavStepperItem, {
      active: confirmSelected,
      visited: confirmVisited,
      condensed: condensed,
      role: "tab",
      "aria-selected": confirmSelected,
      style: condensed ? {
        fontSize: '28px'
      } : {},
      children: t('artistprofile_fundraising_navstepper_3', 'Confirm', '')
    }), /*#__PURE__*/_jsx(NavStepperItem, {
      active: successSelected,
      visited: successVisited,
      condensed: condensed,
      role: "tab",
      "aria-selected": successSelected,
      style: condensed ? {
        fontSize: '28px'
      } : {},
      children: t('artistprofile_fundraising_navstepper_4', 'Done', '')
    })]
  }) : null;
}