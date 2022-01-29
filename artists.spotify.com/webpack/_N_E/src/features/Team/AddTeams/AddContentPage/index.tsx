import { Banner, Type } from '@spotify-internal/encore-web';
import { Input } from '../../components/TeamMemberDetailsForm/Input';
import { ContentPopover } from '../../Onboarding/LabelAccessFlow/AddContentTeamPage/utils';
import { MediaPreview } from '../../Onboarding/LabelAccessFlow/AddContentTeamPage/MediaPreview';
import React from 'react';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var AddContentContainer = styled.div.withConfig({
  displayName: "AddContentPage__AddContentContainer",
  componentId: "l4u7w4-0"
})(["max-width:540px;"]);
var InputGroup = styled.div.withConfig({
  displayName: "AddContentPage__InputGroup",
  componentId: "l4u7w4-1"
})(["display:block;> *{width:98%;padding-bottom:0;padding-left:0;}"]);
export var AddContentPage = function AddContentPage() {
  var t = useT();

  var _useTeamStore = useTeamStore(),
      _useTeamStore$addTeam = _useTeamStore.addTeams,
      details = _useTeamStore$addTeam.details,
      formErrors = _useTeamStore$addTeam.formErrors,
      showError = _useTeamStore$addTeam.showError,
      requestSubmissionError = _useTeamStore$addTeam.requestSubmissionError,
      setAddTeamsFlowDetails = _useTeamStore.setAddTeamsFlowDetails,
      selectAddTeamsMedia = _useTeamStore.selectAddTeamsMedia;

  var selectedMedia1 = details.selectedMedia1,
      selectedMedia2 = details.selectedMedia2,
      selectedMedia3 = details.selectedMedia3;
  var hasErrors = !!(formErrors.get('selectedMedia1') || formErrors.get('selectedMedia2') || formErrors.get('selectedMedia3'));
  var visibleErrors = showError && hasErrors;
  return /*#__PURE__*/_jsxs(AddContentContainer, {
    "data-testid": "add-teams-add-content",
    "data-slo-id": "add-teams-add-content",
    children: [/*#__PURE__*/_jsx(Type, {
      weight: Type.bold,
      as: "h1",
      variant: Type.heading2,
      children: t('ADD_TEAMS_ADD_CONTENT_HEADER', 'Add your content', 'Add content section header')
    }), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      children: t('ADD_TEAMS_ADD_CONTENT_DESCRIPTION', 'Add 3 tracks or albums owned by your company. Don’t include artist URIs or links. If you deliver content through multiple licensors, provide examples from each.', 'Add content section description')
    }), /*#__PURE__*/_jsxs(InputGroup, {
      children: [/*#__PURE__*/_jsx(Input, {
        placeholder: t('ADD_TEAMS_ADD_CONTENT_PLACEHOLDER', 'Paste your Spotify URI or link', 'paste a spotify URI or link'),
        popover: /*#__PURE__*/_jsx(ContentPopover, {
          popoverArrow: "topRight"
        }),
        popoverPlacement: "bottomLeft",
        id: "media1",
        label: t('ADD_TEAMS_ADD_CONTENT_1', 'Album or track URI 1', 'first album or track URI'),
        value: selectedMedia1 === null || selectedMedia1 === void 0 ? void 0 : selectedMedia1.uri,
        onChange: function onChange(uri) {
          selectAddTeamsMedia('selectedMedia1', uri);
          formErrors.delete('selectedMedia1');
        },
        error: formErrors.get('selectedMedia1'),
        forceShowErrors: !!visibleErrors,
        required: true
      }), /*#__PURE__*/_jsx(MediaPreview, {
        media: selectedMedia1,
        clear: function clear() {
          return setAddTeamsFlowDetails({
            selectedMedia1: null
          });
        }
      }), /*#__PURE__*/_jsx(Input, {
        placeholder: t('ADD_TEAMS_ADD_CONTENT_PLACEHOLDER', 'Paste your Spotify URI or link', 'paste a spotify URI or link'),
        id: "media2",
        label: t('ADD_TEAMS_ADD_CONTENT_2', 'Album or track URI 2', 'second album or track URI'),
        value: selectedMedia2 === null || selectedMedia2 === void 0 ? void 0 : selectedMedia2.uri,
        onChange: function onChange(uri) {
          selectAddTeamsMedia('selectedMedia2', uri);
          formErrors.delete('selectedMedia2');
        },
        error: formErrors.get('selectedMedia2'),
        forceShowErrors: !!visibleErrors,
        required: true
      }), /*#__PURE__*/_jsx(MediaPreview, {
        media: selectedMedia2,
        clear: function clear() {
          return setAddTeamsFlowDetails({
            selectedMedia2: null
          });
        }
      }), /*#__PURE__*/_jsx(Input, {
        placeholder: t('ADD_TEAMS_ADD_CONTENT_PLACEHOLDER', 'Paste your Spotify URI or link', 'paste a spotify URI or link'),
        id: "media3",
        label: t('ADD_TEAMS_ADD_CONTENT_3', 'Album or track URI 3', 'third album or track URI'),
        value: selectedMedia3 === null || selectedMedia3 === void 0 ? void 0 : selectedMedia3.uri,
        onChange: function onChange(uri) {
          selectAddTeamsMedia('selectedMedia3', uri);
          formErrors.delete('selectedMedia1');
        },
        error: formErrors.get('selectedMedia3'),
        forceShowErrors: !!visibleErrors,
        required: true
      }), /*#__PURE__*/_jsx(MediaPreview, {
        media: selectedMedia3,
        clear: function clear() {
          return setAddTeamsFlowDetails({
            selectedMedia3: null
          });
        }
      })]
    }), requestSubmissionError && /*#__PURE__*/_jsx(Banner, {
      contextual: true,
      colorSet: "negative",
      children: requestSubmissionError
    })]
  });
};