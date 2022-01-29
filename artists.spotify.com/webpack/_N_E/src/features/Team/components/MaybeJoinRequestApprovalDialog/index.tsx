import React from 'react';
import { Backdrop, ButtonPrimary, DialogAlert, FormGroup, FormRadio, Type, kleinBlue, spacer24, spacer40, spacer48, spacer8, createBasicColorSet } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../lib/store/useTeamStore';
import styled from 'styled-components';
import { AccessLevel } from '../../lib';
import { useT } from '@mrkt/features/i18n';
import ReaderSvg from '../TeamMemberDetailsForm/images/Reader.svg';
import EditorSvg from '../TeamMemberDetailsForm/images/Editor.svg';
import AdminSvg from '../TeamMemberDetailsForm/images/Admin.svg';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledFormGroup = styled(FormGroup).withConfig({
  displayName: "MaybeJoinRequestApprovalDialog__StyledFormGroup",
  componentId: "ao13te-0"
})(["padding:0;"]);
var StyledDialog = styled(DialogAlert).withConfig({
  displayName: "MaybeJoinRequestApprovalDialog__StyledDialog",
  componentId: "ao13te-1"
})(["width:100%;border-radius:0;max-width:none;bottom:0%;position:fixed;"]);
var AccessDescriptionContainer = styled.div.withConfig({
  displayName: "MaybeJoinRequestApprovalDialog__AccessDescriptionContainer",
  componentId: "ao13te-2"
})(["display:flex;margin-top:", ";"], spacer8);
var AccessTextContainer = styled.div.withConfig({
  displayName: "MaybeJoinRequestApprovalDialog__AccessTextContainer",
  componentId: "ao13te-3"
})(["padding-left:", ";"], spacer24);
var ImageContainer = styled.img.withConfig({
  displayName: "MaybeJoinRequestApprovalDialog__ImageContainer",
  componentId: "ao13te-4"
})(["width:", ";margin-left:", ";"], spacer48, spacer40);
export var MaybeJoinRequestApprovalDialog = function MaybeJoinRequestApprovalDialog() {
  var _useTeamStore = useTeamStore(),
      approveJoinRequest = _useTeamStore.approveJoinRequest,
      confirmJoinRequestApproval = _useTeamStore.confirmJoinRequestApproval,
      hideJoinRequestApprovalConfirmation = _useTeamStore.hideJoinRequestApprovalConfirmation,
      currentTeamDetails = _useTeamStore.currentTeamDetails,
      setJoinRequestAccessLevelFromApprovalDialog = _useTeamStore.setJoinRequestAccessLevelFromApprovalDialog;

  var t = useT();
  var accessLevelData = [{
    id: AccessLevel.Reader,
    title: t('ACCESS_LEVEL_DROPDOWN_READER_TITLE', 'Reader', 'Reader access level title'),
    description: t('ACCESS_LEVEL_DROPDOWN_READER_DESCRIPTION', 'Readers can check out stats and artist profiles.', 'Reader access level description'),
    icon: ReaderSvg
  }, {
    id: AccessLevel.Editor,
    title: t('ACCESS_LEVEL_DROPDOWN_EDITOR_TITLE', 'Editor', 'Editor access level title'),
    description: t('ACCESS_LEVEL_DROPDOWN_EDITOR_DESCRIPTION', 'Editors can add, update, and remove artist info, pitches, and campaigns.', 'Editor access level description'),
    icon: EditorSvg
  }, {
    id: AccessLevel.Admin,
    title: t('ACCESS_LEVEL_DROPDOWN_ADMIN_TITLE', 'Admin', 'Admin access level title'),
    description: t('ACCESS_LEVEL_DROPDOWN_ADMIN_DESCRIPTION', 'Admins can add, update, and remove team members, billing info, and artist info. Limit use.', 'Admin access level description'),
    icon: AdminSvg
  }];

  if (!confirmJoinRequestApproval || !currentTeamDetails) {
    return null;
  }

  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: hideJoinRequestApprovalConfirmation,
    children: /*#__PURE__*/_jsx(StyledDialog, {
      "data-testid": "confirm-join-request-approval-dialog",
      dialogTitle: t('JOIN_REQUEST_APPROVAL_DIALOG_TITLE', 'Choose access level for {fullName}', 'Choose an access level to add this person to your team', {
        fullName: confirmJoinRequestApproval.fullName
      }),
      body: /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(StyledFormGroup, {
          id: "accessLevel",
          value: confirmJoinRequestApproval.accessLevel,
          onChange: function onChange(e) {
            setJoinRequestAccessLevelFromApprovalDialog(confirmJoinRequestApproval, e.target.value);
          },
          children: accessLevelData.map(function (accessLevel) {
            return /*#__PURE__*/_jsxs(FormRadio, {
              id: accessLevel.id,
              name: "accessLevel",
              value: accessLevel.id,
              children: [/*#__PURE__*/_jsx(Type, {
                "data-testid": "access-description-title",
                variant: Type.body1,
                children: accessLevel.title
              }), /*#__PURE__*/_jsxs(AccessDescriptionContainer, {
                children: [/*#__PURE__*/_jsx(AccessTextContainer, {
                  children: /*#__PURE__*/_jsx(Type, {
                    as: Type.p,
                    variant: Type.body2,
                    condensed: true,
                    children: accessLevel.description
                  })
                }), /*#__PURE__*/_jsx("div", {
                  children: /*#__PURE__*/_jsx(ImageContainer, {
                    src: accessLevel.icon,
                    alt: "admin"
                  })
                })]
              })]
            }, accessLevel.id);
          })
        })
      }),
      footer: /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(ButtonPrimary, {
          "data-testid": "confirm-approve-button",
          disabled: !confirmJoinRequestApproval.accessLevel,
          buttonSize: "sm",
          UNSAFE_colorSet: createBasicColorSet('#EFF1FF', kleinBlue),
          onClick: function onClick() {
            approveJoinRequest(confirmJoinRequestApproval, currentTeamDetails, t);
            hideJoinRequestApprovalConfirmation();
          },
          children: t('JOIN_REQUEST_APPROVAL_BUTTON', 'Approve', 'Approve this request')
        })
      })
    })
  });
};