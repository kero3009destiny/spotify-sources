import React from 'react';
import { Type } from '@spotify-internal/encore-web';
import { FormContainer, FormHeadingContainer } from '../../components/sharedStyles';
import { AccessUserDetailsForm } from '../../components/AccessUserDetailsForm';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var CreateLabelTeamPage = function CreateLabelTeamPage() {
  var t = useT();
  return /*#__PURE__*/_jsxs(FormContainer, {
    "data-testid": "create-label-team-page",
    children: [/*#__PURE__*/_jsx(FormHeadingContainer, {
      children: /*#__PURE__*/_jsx(Type, {
        as: "h1",
        variant: "heading1",
        weight: "bold",
        children: t('LABEL_ACCESS_CREATE_TEAM_PAGE_TITLE', 'Create a team', 'Create a team- page title')
      })
    }), /*#__PURE__*/_jsx(AccessUserDetailsForm, {
      isCreatingNewTeam: true
    })]
  });
};