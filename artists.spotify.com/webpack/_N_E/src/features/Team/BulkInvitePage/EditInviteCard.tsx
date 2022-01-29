import React from 'react';
import { ButtonTertiary, spacer24 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { TeamMemberDetailsForm } from '../components/TeamMemberDetailsForm';
import { Card, EditDetailsContainer } from './layout';
import { TeamType } from '../lib/model/Team';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LeftShiftedButtonTertiary = styled(ButtonTertiary).withConfig({
  displayName: "EditInviteCard__LeftShiftedButtonTertiary",
  componentId: "sc-8wsag0-0"
})(["margin-left:-", ";"], spacer24);
export var EditInviteCard = function EditInviteCard(_ref) {
  var details = _ref.details,
      onUpdate = _ref.onUpdate,
      onCancel = _ref.onCancel,
      onRemove = _ref.onRemove;
  var t = useT();
  return /*#__PURE__*/_jsx(Card, {
    "data-testid": "edit-invite-card",
    children: /*#__PURE__*/_jsx(EditDetailsContainer, {
      children: /*#__PURE__*/_jsx(TeamMemberDetailsForm, {
        submitButtonText: t('TEAM_BULK_INVITE_SUBMIT_DONE', 'Done', 'Team member detail form submit button'),
        initialDetails: details,
        initialForceShowErrors: true,
        onSubmit: onUpdate,
        otherButtons: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(ButtonTertiary, {
            "data-testid": "remove",
            type: "button",
            buttonSize: useViewport() === Viewport.XS ? ButtonTertiary.sm : ButtonTertiary.md,
            onClick: onRemove,
            children: t('TEAM_BULK_INVITE_REMOVE_USER', 'Remove', 'Remove user from team button')
          }), /*#__PURE__*/_jsx(LeftShiftedButtonTertiary, {
            "data-testid": "cancel",
            type: "button",
            buttonSize: useViewport() === Viewport.XS ? ButtonTertiary.sm : ButtonTertiary.md,
            onClick: onCancel,
            children: t('TEAM_BULK_INVITE_EDIT_CANCEL', 'Cancel', 'Cancel edit user')
          })]
        }),
        isSubmitting: false,
        currentTeamType: TeamType.artist
      })
    })
  });
};