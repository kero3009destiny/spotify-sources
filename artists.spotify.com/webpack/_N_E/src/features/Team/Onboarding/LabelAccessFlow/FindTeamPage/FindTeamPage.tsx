import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonIcon, ButtonSecondary, IconInformationAlt, Popover, PopoverTrigger, Type, spacer12, spacer24, spacer72 } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { LabelAccessFlowStep } from '../../store';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import { useT } from '@mrkt/features/i18n';
import { LabelSearchFormCombobox } from '../../../components/LabelSearchFormCombobox';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Container = styled.div.withConfig({
  displayName: "FindTeamPage__Container",
  componentId: "sc-1csiy0w-0"
})(["align-items:center;display:flex;flex-direction:column;text-align:center;"]);
var HeaderContainer = styled.div.withConfig({
  displayName: "FindTeamPage__HeaderContainer",
  componentId: "sc-1csiy0w-1"
})(["margin-bottom:", ";h1{margin-bottom:", ";}"], spacer72, spacer24);
var SearchContainer = styled.div.withConfig({
  displayName: "FindTeamPage__SearchContainer",
  componentId: "sc-1csiy0w-2"
})(["margin-bottom:96px;max-width:600px;width:100%;"]);
var ActionContainer = styled.div.withConfig({
  displayName: "FindTeamPage__ActionContainer",
  componentId: "sc-1csiy0w-3"
})(["display:flex;justify-content:space-between;max-width:750px;width:100%;"]);
var Space12 = styled.span.withConfig({
  displayName: "FindTeamPage__Space12",
  componentId: "sc-1csiy0w-4"
})(["display:inline-block;width:", ";"], spacer12);
var Subheading = styled.div.withConfig({
  displayName: "FindTeamPage__Subheading",
  componentId: "sc-1csiy0w-5"
})(["align-items:center;display:flex;justify-content:center;"]);
export var FindTeamPage = function FindTeamPage() {
  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.labelAccessFlow.details,
      goToLabelAccessFlowStep = _useTeamStore.goToLabelAccessFlowStep,
      goToTeamPage = _useTeamStore.goToTeamPage,
      showSuccessBanner = _useTeamStore.showSuccessBanner,
      setLabelAccessFlowDetails = _useTeamStore.setLabelAccessFlowDetails,
      canCreateAccessRequest = _useTeamStore.canCreateAccessRequest,
      layoutType = _useTeamStore.layoutType,
      teams = _useTeamStore.teams,
      trackEvent = _useTeamStore.trackEvent;

  var t = useT();
  var errorMessages = {
    alreadyOnTeam: t('ERROR_FIND_TEAM_ALREADY_ON_TEAM', "You're already a member of this team.", ''),
    pendingRequest: t('d2c2c7', 'You have a pending request to join this team.', ''),
    inviteOnly: t('ab6f7c', 'This team is not accepting requests right now.', ''),
    genericError: t('CAN_CREATE_ACCESS_REQUEST_GENERIC_ERROR', 'Something went wrong', 'Something went wrong')
  };

  var _useState = useState(false),
      showPopover = _useState[0],
      setShowPopover = _useState[1];

  var responsiveStyleProps = useLayoutType(layoutType);

  var trackFindTeamPageClick = function trackFindTeamPageClick(flowPath) {
    trackEvent({
      action_target: "label-onboarding:find-team-page:".concat(flowPath === 'create-team' ? 'create-team-action' : 'next-button'),
      action_type: 'label-onboarding:click',
      action_intent: 'label-onboarding:next-step',
      action_meta_str_1: flowPath
    });
  };

  var handleSelectLabel = function handleSelectLabel(selectedTeam) {
    setLabelAccessFlowDetails({
      selectedLabel: selectedTeam
    });
    trackFindTeamPageClick('join-team');
    var currentTeamWithAccess = teams && teams.find(function (team) {
      return team.uri === selectedTeam.uri;
    });

    if (currentTeamWithAccess) {
      goToTeamPage(currentTeamWithAccess);
      showSuccessBanner(t('LABEL_ACCESS_FIND_TEAM_PAGE_ALREADY_ADMIN', 'You already have Admin access to {selectedTeamName}', 'You already have access to this team', {
        selectedTeamName: selectedTeam.name
      }));
    } else {
      canCreateAccessRequest(selectedTeam.uri, false, errorMessages);
    }
  };

  var onCreateTeamAction = function onCreateTeamAction(inputValue) {
    trackFindTeamPageClick('create-team');
    setLabelAccessFlowDetails({
      teamName: inputValue
    });
    goToLabelAccessFlowStep(LabelAccessFlowStep.ENTER_EMAIL);
  };

  return /*#__PURE__*/_jsxs(Container, {
    "data-testid": "find-team-page",
    children: [/*#__PURE__*/_jsxs(HeaderContainer, {
      children: [/*#__PURE__*/_jsx(Type, {
        as: "h1",
        variant: "heading1",
        condensed: true,
        children: t('LABEL_ACCESS_FIND_TEAM_PAGE_HEADER', 'What label team are you joining?', 'What label team would you like to join?')
      }), /*#__PURE__*/_jsxs(Subheading, {
        children: [t('LABEL_ACCESS_FIND_TEAM_PAGE_SUBHEADER', 'Use the same label or licensor name as when you submitted your music.', 'Use the same label or licensor name as you did when you submitted your music'), /*#__PURE__*/_jsx(Space12, {}), /*#__PURE__*/_jsx(PopoverTrigger, {
          placement: responsiveStyleProps.popoverPlacement,
          onShow: function onShow() {
            return setShowPopover(true);
          },
          onHide: function onHide() {
            return setShowPopover(false);
          },
          overlay: showPopover && /*#__PURE__*/_jsx(Popover, {
            arrow: responsiveStyleProps.popoverArrow,
            children: t('LABEL_ACCESS_FIND_TEAM_PAGE_POPOVER', 'To see the label/licensor name associated with your content, go to one of your songs in the Spotify desktop app, right-click, then click Show Credits > Source.', 'To find the label or licensor name associated with your content, right click one of your songs on the Spotify desktop app and click Show Credits, and then Source.')
          }),
          children: /*#__PURE__*/_jsx(ButtonIcon, {
            children: /*#__PURE__*/_jsx(IconInformationAlt, {})
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(SearchContainer, {
      children: /*#__PURE__*/_jsx(LabelSearchFormCombobox, {
        accessSelectAction: handleSelectLabel,
        onCreateTeamAction: onCreateTeamAction
      })
    }), /*#__PURE__*/_jsx(ActionContainer, {
      children: /*#__PURE__*/_jsx(ButtonSecondary, {
        buttonSize: responsiveStyleProps.buttonSize,
        as: "a",
        href: "http://artists.spotify.com/claim",
        children: t('LABEL_ACCESS_FIND_TEAM_PAGE_ACTION_GO_BACK', 'Go back', 'Go back')
      })
    })]
  });
};