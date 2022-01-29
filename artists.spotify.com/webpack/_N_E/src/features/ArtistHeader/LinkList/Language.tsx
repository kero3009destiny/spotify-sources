// ignore-string-externalization
import React from 'react';
import { LanguageSelectionBoundary } from '@mrkt/features/i18n/components/LanguageSelection/Boundary';
import { LanguageSelectionTrigger } from '@mrkt/features/i18n/components/LanguageSelection/Trigger';
import { LanguageSelectionOnboarding } from '@mrkt/features/i18n/components/LanguageSelection/Onboarding';
import { jsx as _jsx } from "react/jsx-runtime";
export var NavBarLanguageSection = function NavBarLanguageSection() {
  return /*#__PURE__*/_jsx("div", {
    className: "encore-creator-dark-theme",
    children: /*#__PURE__*/_jsx(LanguageSelectionBoundary, {
      fallback: null,
      children: /*#__PURE__*/_jsx(LanguageSelectionOnboarding, {
        children: /*#__PURE__*/_jsx(LanguageSelectionTrigger, {
          buttonSize: "sm"
        })
      })
    })
  });
};
export var SideMenuLanguageOnboarding = function SideMenuLanguageOnboarding(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_jsx(LanguageSelectionBoundary, {
    fallback: children,
    children: /*#__PURE__*/_jsx(LanguageSelectionOnboarding, {
      children: children
    })
  });
};
export var SideMenuLanguageSection = function SideMenuLanguageSection() {
  return /*#__PURE__*/_jsx("div", {
    className: "encore-creator-dark-theme",
    children: /*#__PURE__*/_jsx(LanguageSelectionBoundary, {
      fallback: null,
      children: /*#__PURE__*/_jsx(LanguageSelectionTrigger, {})
    })
  });
};