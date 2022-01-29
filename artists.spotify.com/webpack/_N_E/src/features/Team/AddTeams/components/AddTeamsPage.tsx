import styled from 'styled-components';
import { DialogFullScreen, ButtonPrimary, ButtonSecondary, IconArrowLeft, screenXxsMax } from '@spotify-internal/encore-web';
import React, { useState } from 'react';
import qs from 'query-string';
import { useHistory, useLocation } from 'react-router';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { useAddTeamsValidationErrors } from '../store/selectors/useAddTeamsValidationErrors';
import { useCurrentUserDetails } from '../../../UserSettings/lib/useCurrentUserDetails';
import { clearStoredArtistInfo, clearStoredRequestId } from '../utils/stateStorage';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Background = styled.div.withConfig({
  displayName: "AddTeamsPage__Background",
  componentId: "cw469w-0"
})(["display:flex;flex-direction:column;min-height:75vh;"]);
var Header = styled.div.withConfig({
  displayName: "AddTeamsPage__Header",
  componentId: "cw469w-1"
})(["display:flex;"]);
var Content = styled.div.withConfig({
  displayName: "AddTeamsPage__Content",
  componentId: "cw469w-2"
})(["flex-grow:0;margin:auto;@media (max-width:", "){width:100%;}"], screenXxsMax);
var MainCenterer = styled.div.withConfig({
  displayName: "AddTeamsPage__MainCenterer",
  componentId: "cw469w-3"
})(["display:flex;flex-grow:1;overflow-y:auto;width:98%;"]);
var StyledButtonSecondary = styled(ButtonSecondary).withConfig({
  displayName: "AddTeamsPage__StyledButtonSecondary",
  componentId: "cw469w-4"
})(["", ""], function (_ref) {
  var layout = _ref.layout;
  return !(layout === 'full') && 'padding: 10px';
});

var useNavStep = function useNavStep(step, continueUrl) {
  var _useTeamStore = useTeamStore(),
      selectedTeamType = _useTeamStore.addTeams.selectedTeamType,
      platform = _useTeamStore.platform;

  var t = useT();
  var location = useLocation();

  switch (step) {
    case 'artist-search':
      return {
        navStep: t('ADD_TEAMS_CHOOSE_ARTIST_NAV', '2 of 4 — Choose artist', ''),
        backButtonUrl: "/add-team".concat(location.search),
        backButtonText: t('d2df70', 'Back', ''),
        forwardButtonUrl: '',
        forwardButtonText: null
      };

    case 'label-search':
      return {
        navStep: t('ADD_TEAMS_SELECT_LABEL_NAV', '2 of 4 — Choose label', ''),
        backButtonUrl: "/add-team".concat(location.search),
        backButtonText: t('d2df70', 'Back', ''),
        forwardButtonUrl: '',
        forwardButtonText: null
      };

    case 'confirm':
      return {
        backButtonUrl: "/add-team/".concat(selectedTeamType, "-search").concat(location.search),
        forwardButtonUrl: "/add-team/request-submitted".concat(location.search),
        navStep: t('ADD_TEAMS_CREATE_TEAM_NAV', '3 of 4 — Create team', ''),
        backButtonText: t('d2df70', 'Back', ''),
        forwardButtonText: t('8398e8', 'Submit', '')
      };

    case 'join-request':
      return {
        navStep: t('ADD_TEAMS_JOIN_REQUEST_NAV', '3 of 4 — Request to join', ''),
        backButtonUrl: "/add-team/".concat(selectedTeamType.toLowerCase(), "-search").concat(location.search),
        forwardButtonUrl: "/add-team/request-submitted".concat(location.search),
        backButtonText: t('d2df70', 'Back', ''),
        forwardButtonText: t('8398e8', 'Submit', '')
      };

    case 'create-team':
      return {
        navStep: t('CREATE_NEW_LABEL_TEAM_NAV', '3 of 4 — Create a team', 'step 3 of 4 - enter details to submit a request to create a new label team'),
        backButtonUrl: "/add-team/".concat(selectedTeamType.toLowerCase(), "-search").concat(location.search),
        forwardButtonUrl: '/add-team/add-content',
        backButtonText: t('d2df70', 'Back', ''),
        forwardButtonText: t('NEXT_BUTTON', 'Next', 'go to the next page of the flow')
      };

    case 'add-content':
      return {
        navStep: t('ADD_CONTENT_NAV', '3 of 4 — Create a team', 'step 3 of 4 - add content to submit a request to create a new label team'),
        backButtonUrl: "/add-team/create-team".concat(location.search),
        forwardButtonUrl: '/add-team/request-submitted',
        backButtonText: t('d2df70', 'Back', ''),
        forwardButtonText: t('8398e8', 'Submit', '')
      };

    case 'request-submitted':
      return {
        navStep: t('REQUEST_SUBMITTED', '4 of 4 — Confirmation', 'step 4 of 4 - your request was submitted'),
        backButtonUrl: null,
        backButtonText: null,
        forwardButtonUrl: '',
        forwardButtonText: null
      };

    default:
      return {
        navStep: t('ADD_TEAMS_NAV_CHOOSE_TEAM', '1 of 4 — Choose team', 'step one of four, choose team type'),
        backButtonUrl: platform && platform.isApp ? '' : continueUrl,
        backButtonText: platform && platform.isApp ? '' : t('ADD_TEAMS_CANCEL_ACTION', 'Cancel', 'exit add team dialog'),
        forwardButtonUrl: '',
        forwardButtonText: null
      };
  }
};

export var AddTeamsPage = function AddTeamsPage(_ref2) {
  var children = _ref2.children,
      step = _ref2.step;
  var history = useHistory();
  var location = useLocation();

  var _useTeamStore2 = useTeamStore(),
      _useTeamStore2$addTea = _useTeamStore2.addTeams,
      details = _useTeamStore2$addTea.details,
      selectedTeamType = _useTeamStore2$addTea.selectedTeamType,
      requestSubmissionError = _useTeamStore2$addTea.requestSubmissionError,
      canRequestAccessError = _useTeamStore2$addTea.canRequestAccessError,
      setShowErrors = _useTeamStore2.setShowErrors,
      setValidationErrors = _useTeamStore2.setValidationErrors,
      submitAddTeamsRequest = _useTeamStore2.submitAddTeamsRequest,
      layoutType = _useTeamStore2.layoutType,
      setRequestSubmissionError = _useTeamStore2.setRequestSubmissionError,
      setCanRequestAccessError = _useTeamStore2.setCanRequestAccessError,
      platform = _useTeamStore2.platform;

  var isFullLayout = layoutType === 'full';
  var currentUserDetails = useCurrentUserDetails();
  var errors = useAddTeamsValidationErrors(details);
  var hasErrors = errors.has('role') || errors.has('company') || errors.has('websiteLink') || errors.has('socialLink') || errors.has('socialVerification') || errors.has('selectedMedia1') || errors.has('selectedMedia2') || errors.has('selectedMedia3');
  var continueUrl = qs.parse(location.search).continue || '/team/roster';

  var _useNavStep = useNavStep(step, continueUrl),
      navStep = _useNavStep.navStep,
      backButtonUrl = _useNavStep.backButtonUrl,
      backButtonText = _useNavStep.backButtonText,
      forwardButtonUrl = _useNavStep.forwardButtonUrl,
      forwardButtonText = _useNavStep.forwardButtonText;

  var isSubmitting = forwardButtonUrl.startsWith('/add-team/request-submitted');
  var isCreatingNewTeam = forwardButtonUrl.startsWith('/add-team/add-content');

  var _useState = useState(false),
      isLoading = _useState[0],
      setIsLoading = _useState[1];

  return /*#__PURE__*/_jsx(DialogFullScreen, {
    onClose: platform && platform.isApp ? undefined : function () {
      if (requestSubmissionError) {
        setRequestSubmissionError(null);
      }

      if (canRequestAccessError) {
        setCanRequestAccessError(null);
      }

      if (!backButtonUrl) {
        clearStoredRequestId();
        clearStoredArtistInfo();
      }

      history.push(continueUrl);
    },
    dialogTitle: /*#__PURE__*/_jsx("div", {
      style: {
        display: 'flex'
      },
      children: navStep
    }),
    body: /*#__PURE__*/_jsxs(Background, {
      "data-slo-id": "add-teams-page",
      "data-testid": "add-teams-flow-page",
      children: [/*#__PURE__*/_jsx(Header, {}), /*#__PURE__*/_jsxs(MainCenterer, {
        children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx(Content, {
          children: children
        }), /*#__PURE__*/_jsx("div", {})]
      })]
    }),
    footer: /*#__PURE__*/_jsxs("div", {
      children: [backButtonUrl ? /*#__PURE__*/_jsx(StyledButtonSecondary, {
        layout: layoutType,
        buttonSize: "md",
        onClick: function onClick() {
          setShowErrors(false);

          if (requestSubmissionError) {
            setRequestSubmissionError(null);
          }

          if (canRequestAccessError) {
            setCanRequestAccessError(null);
          }

          history.push(backButtonUrl);
        },
        children: isFullLayout ? backButtonText : /*#__PURE__*/_jsx(IconArrowLeft, {})
      }) : /*#__PURE__*/_jsx("div", {}), forwardButtonText && /*#__PURE__*/_jsx(ButtonPrimary, {
        buttonSize: "md",
        "data-testid": "add-teams-next",
        "data-slo-id": "add-teams-next",
        disabled: isLoading,
        onClick: function onClick() {
          setIsLoading(true);

          if (hasErrors && (isSubmitting || isCreatingNewTeam)) {
            setShowErrors(true);
            setValidationErrors(errors);
            setIsLoading(false);
            return;
          }

          if (!hasErrors) {
            setShowErrors(false);
          }

          if (isSubmitting) {
            setIsLoading(true);
            submitAddTeamsRequest(details, currentUserDetails, selectedTeamType, history, forwardButtonUrl);
            return;
          }

          setIsLoading(false);
          history.push(forwardButtonUrl);
        },
        children: forwardButtonText
      })]
    })
  });
};