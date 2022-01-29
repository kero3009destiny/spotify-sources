import React from 'react';
import { Type, spacer24 } from '@spotify-internal/encore-web';
import { Step, StepNumber, Steps } from './layout';
import { StyledLink } from './layout/StyledLink';
import bulkInviteCsv from './bulk-invite.csv';
import { useT } from '@mrkt/features/i18n';
import { BulkInviteStage } from './store/BulkInviteState';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export var Progress = function Progress(_ref) {
  var stage = _ref.stage,
      onDownload = _ref.onDownload,
      sendabilityMessage = _ref.sendabilityMessage;
  var t = useT();
  return /*#__PURE__*/_jsxs(Steps, {
    children: [/*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.heading3,
      style: {
        paddingBottom: spacer24
      },
      weight: Type.bold,
      children: t('TEAM_BULK_INVITE_PROGRESS_TITLE', 'Follow these steps to invite multiple team members at once.', 'Progress definition for team page bulk invite progress')
    }), /*#__PURE__*/_jsxs(Step, {
      children: [/*#__PURE__*/_jsx(StepNumber, {
        isComplete: stage > BulkInviteStage.Download,
        step: 1
      }), /*#__PURE__*/_jsxs(Type, {
        as: "p",
        variant: Type.body2,
        condensed: true,
        children: [/*#__PURE__*/_jsxs(StyledLink, {
          semanticColor: "textBrightAccent",
          href: bulkInviteCsv,
          target: "_self",
          onClick: function onClick() {
            return onDownload();
          },
          children: [t('TEAM_BULK_INVITE_PROGRESS_STEP1_PART1', 'Download the required invite template.', 'Step 1 of bulk invite progress'), ' ']
        }), t('TEAM_BULK_INVITE_PROGRESS_STEP2_PART2', 'This is an Excel template but you can open it with any spreadsheet managing tool.', 'Step 1 of bulk invite progress')]
      })]
    }), /*#__PURE__*/_jsxs(Step, {
      children: [/*#__PURE__*/_jsx(StepNumber, {
        isComplete: stage > BulkInviteStage.Upload,
        step: 2
      }), /*#__PURE__*/_jsxs(Type, {
        as: "p",
        variant: Type.body2,
        condensed: true,
        children: [t('TEAM_BULK_INVITE_PROGRESS_STEP1_PART2', 'Complete the template. All fields must be populated for every team member in order to send your bulk invitation. You can invite 100 people at a time.', 'Step 1 of bulk invite progress part two'), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx("b", {
          children: t('TEAM_BULK_INVITE_PROGRESS_STEP2_PART4', 'Make sure to export your sheet as a .CSV file.', 'Step 2 of bulk invite progress')
        }), ' ']
      })]
    }), /*#__PURE__*/_jsxs(Step, {
      children: [/*#__PURE__*/_jsx(StepNumber, {
        isComplete: stage > BulkInviteStage.Verify,
        step: 3
      }), /*#__PURE__*/_jsxs(Type, {
        as: "p",
        variant: Type.body2,
        condensed: true,
        children: [t('TEAM_BULK_INVITE_PROGRESS_STEP3', 'Upload the completed invite template. Double check all form fields are complete and hit send.', 'Step 3 of bulk invite progress'), sendabilityMessage && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("br", {}), sendabilityMessage]
        })]
      })]
    })]
  });
};