import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonSecondary, IconAddFollow, Popover, PopoverTrigger, Type, screenSmMin, kleinBlue, spacer24, spacer40, spacer16 } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { LabelAccessFlowStep } from '../../store';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import { Container, ParentContainer, ButtonContainer, Link } from '../../components/sharedStyles';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var IconContainer = styled.div.withConfig({
  displayName: "SpeedBumpTeamPage__IconContainer",
  componentId: "tncoa3-0"
})(["height:80px;width:80px;background:", ";border-radius:50%;display:flex;justify-content:center;align-items:center;margin:0 auto ", " auto;@media (min-width:", "){height:160px;width:160px;}"], kleinBlue, spacer24, screenSmMin);
var HeadingContainer = styled(Type).attrs({
  forwardedAs: 'h1',
  variant: 'heading2',
  condensed: true
}).withConfig({
  displayName: "SpeedBumpTeamPage__HeadingContainer",
  componentId: "tncoa3-1"
})(["margin-bottom:", ";"], spacer24);
var ParagraphContainer = styled(Type.p).attrs({
  forwardedAs: 'p',
  variant: 'body1',
  condensed: true
}).withConfig({
  displayName: "SpeedBumpTeamPage__ParagraphContainer",
  componentId: "tncoa3-2"
})(["margin-bottom:", ";"], spacer40);
var StyledLink = styled(Link).withConfig({
  displayName: "SpeedBumpTeamPage__StyledLink",
  componentId: "tncoa3-3"
})(["margin-top:", ";"], spacer16);
export var SpeedBumpTeamPage = function SpeedBumpTeamPage() {
  var _details$selectedLabe;

  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.labelAccessFlow.details,
      goToLabelAccessFlowStep = _useTeamStore.goToLabelAccessFlowStep,
      layoutType = _useTeamStore.layoutType,
      trackEvent = _useTeamStore.trackEvent;

  var t = useT();

  var _useState = useState(false),
      showPopover = _useState[0],
      setShowPopover = _useState[1];

  var responsiveStyleProps = useLayoutType(layoutType);
  return /*#__PURE__*/_jsxs(ParentContainer, {
    "data-testid": "speed-bump-team-page",
    "data-slo-id": "speed-bump-team-page",
    children: [/*#__PURE__*/_jsxs(Container, {
      children: [/*#__PURE__*/_jsx(IconContainer, {
        children: /*#__PURE__*/_jsx(IconAddFollow, {
          iconSize: responsiveStyleProps.iconSize
        })
      }), /*#__PURE__*/_jsx(HeadingContainer, {
        children: t('LABEL_ACCESS_SPEEDBUMP_PAGE_HEADING', '{teamName} is already on Spotify for Artists.', 'This team is already on Spotify for Artists', {
          teamName: (_details$selectedLabe = details.selectedLabel) === null || _details$selectedLabe === void 0 ? void 0 : _details$selectedLabe.name
        })
      }), /*#__PURE__*/_jsx(ParagraphContainer, {
        children: t('LABEL_ACCESS_SPEEDBUMP_PAGE_SUBHEADING', 'To get access, ask an admin on your team to invite you.', 'To get access, ask an admin on the team to invite you.')
      }), /*#__PURE__*/_jsx(PopoverTrigger, {
        placement: PopoverTrigger.bottom,
        onShow: function onShow() {
          return setShowPopover(true);
        },
        onHide: function onHide() {
          return setShowPopover(false);
        },
        overlay: showPopover && /*#__PURE__*/_jsxs(Popover, {
          "data-testid": "speed-bump-popover",
          arrow: Popover.top,
          children: [t('LABEL_ACCESS_SPEEDBUMP_PAGE_POPOVER_TEXT', "If you don't know how to reach your admin, submit a request and we'll notify them for you.", "If you don't know how to reach your admin, you can submit a request and we'll notify them for you"), /*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(StyledLink, {
              component: "button",
              "data-testid": "submit-request-link",
              "data-slo-id": "submit-request-link",
              onClick: function onClick() {
                trackEvent({
                  action_target: 'label-onboarding:speedbump-page-submit-request-link',
                  action_type: 'label-onboarding:click',
                  action_intent: 'label-onboarding:speedbump-page-next',
                  action_meta_str_1: 'join-team'
                });
                goToLabelAccessFlowStep(LabelAccessFlowStep.ENTER_EMAIL);
              },
              children: t('LABEL_ACCESS_SPEEDBUMP_PAGE_SUBMIT_REQUEST_BUTTON', 'Submit a request', 'Button to submit a request to the team admins')
            })
          })]
        }),
        children: /*#__PURE__*/_jsx(Link, {
          component: "button",
          "data-testid": "speed-bump-popover-button",
          "data-slo-id": "speed-bump-popover-button",
          children: t('LABEL_ACCESS_SPEEDBUMP_PAGE_POPOVER_TRIGGER', "Can't reach your team?", "Can't reach your team?")
        })
      })]
    }), /*#__PURE__*/_jsxs(ButtonContainer, {
      children: [/*#__PURE__*/_jsx(ButtonSecondary, {
        "data-testid": "speed-bump-go-back",
        buttonSize: responsiveStyleProps.buttonSize,
        onClick: function onClick() {
          return goToLabelAccessFlowStep(LabelAccessFlowStep.FIND_TEAM);
        },
        children: t('LABEL_ACCESS_SPEEDBUMP_PAGE_ACTION_GO_BACK', 'Go back', 'Go back')
      }), /*#__PURE__*/_jsx(ButtonSecondary, {
        as: "a",
        buttonSize: responsiveStyleProps.buttonSize,
        href: "https://artists.spotify.com/help/article/getting-access-to-spotify-for-artists",
        children: t('LABEL_ACCESS_SPEEDBUMP_PAGE_ACTION_LEARN_MORE', 'Learn more', 'Click here to be directed to a help article where you can learn more.')
      })]
    })]
  });
};