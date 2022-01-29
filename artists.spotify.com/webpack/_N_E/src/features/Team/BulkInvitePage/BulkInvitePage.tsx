import React from 'react';
import { LoadingIndicator } from '@spotify-internal/encore-web';
import { TeamPage } from '../components/TeamPage';
import { Upload } from './Upload';
import { InviteList } from './InviteList';
import { Progress } from './Progress';
import { groupInvitesBySendableStatus } from './util/groupInvitesBySendableStatus';
import { SendButton } from './SendButton';
import { SendabilityMessage } from './SendabilityMessage';
import { TeamBreadcrumb, TeamRosterBreadcrumb } from '../components/Breadcrumbs';
import { assertTeamType } from '../lib/model/Team';
import { useTeamStore } from '../lib/store/useTeamStore';
import { ButtonPrimaryAsLink } from '../../EncoreCreatorWebHelpers';
import { LoadingIndicator as FullLoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { bulkInvite } from '../lib/events';
import { useT } from '@mrkt/features/i18n';
import { useBulkInviteDownloadTemplateCsvFileLogger, useBulkInviteUploadCsvFileHitLogger, useBulkInviteUploadCsvFileDragLogger, useBulkInviteCsvParsingErrorLogger, useBulkInviteCsvMissingHeadersErrorLogger, useBulkInviteInvalidFileTypeErrorLogger } from './hooks/useBulkInviteUbi';
import { BulkInviteStage } from './store/BulkInviteState';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var BulkInvitePage = function BulkInvitePage() {
  var _useTeamStore = useTeamStore(),
      _useTeamStore$bulkInv = _useTeamStore.bulkInvite,
      stage = _useTeamStore$bulkInv.stage,
      invites = _useTeamStore$bulkInv.invites,
      numInvitesOmitted = _useTeamStore$bulkInv.numInvitesOmitted,
      currentTeamDetails = _useTeamStore.currentTeamDetails,
      currentTeamMembers = _useTeamStore.currentTeamMembers,
      advanceStage = _useTeamStore.advanceStage,
      processFileAction = _useTeamStore.processFileAction,
      trackEvent = _useTeamStore.trackEvent;

  var t = useT();
  var logDownloadTemplateCsvFile = useBulkInviteDownloadTemplateCsvFileLogger();
  var logUploadCsvFileHit = useBulkInviteUploadCsvFileHitLogger();
  var logUploadCsvFileDrag = useBulkInviteUploadCsvFileDragLogger();
  var logFileParsingError = useBulkInviteCsvParsingErrorLogger();
  var logMissingHeadersError = useBulkInviteCsvMissingHeadersErrorLogger();
  var logInvalidFileTypeError = useBulkInviteInvalidFileTypeErrorLogger();

  if (!currentTeamDetails) {
    return /*#__PURE__*/_jsx(FullLoadingIndicator, {});
  }

  var isLoading = stage === BulkInviteStage.Uploading;
  var isSending = stage === BulkInviteStage.Sending;
  var isComplete = stage === BulkInviteStage.Sent;
  var invitesBySendableStatus = groupInvitesBySendableStatus(invites);
  var numInvitesToSend = invitesBySendableStatus.sendable.length;
  var numInvitesSent = invitesBySendableStatus.sent.length;
  var numInvitesWithError = invitesBySendableStatus.error.length;
  var showInviteList = invites.length > 0;
  var backUrl = "/team/".concat(currentTeamDetails.type, "/").concat(currentTeamDetails.id);

  var sendabilityMessage = /*#__PURE__*/_jsx(SendabilityMessage, {
    numInvitesSent: numInvitesSent,
    numInvitesWithError: numInvitesWithError,
    numInvitesToSend: numInvitesToSend,
    numInvitesOmitted: numInvitesOmitted,
    stage: stage
  });

  var renderContents = function renderContents() {
    if (isLoading) {
      return /*#__PURE__*/_jsx(LoadingIndicator, {
        "data-testid": "loading",
        indicatorSize: LoadingIndicator.md
      });
    }

    if (showInviteList) {
      return /*#__PURE__*/_jsx(InviteList, {
        sendabilityMessage: sendabilityMessage,
        invites: invites,
        isSending: isSending,
        teamName: currentTeamDetails.name,
        numInvitesToSend: numInvitesToSend,
        isComplete: isComplete,
        backUrl: backUrl,
        trackEvent: trackEvent
      });
    }

    return /*#__PURE__*/_jsx(Upload, {
      onFileSelected: function onFileSelected(file, methodForAnalytics) {
        if (file) {
          processFileAction(file, new Set(currentTeamMembers === null || currentTeamMembers === void 0 ? void 0 : currentTeamMembers.map(function (tm) {
            return tm.businessEmail;
          })), methodForAnalytics, t, logFileParsingError, logMissingHeadersError, logInvalidFileTypeError);
          methodForAnalytics === 'drop' ? logUploadCsvFileDrag() : logUploadCsvFileHit();
        }
      }
    });
  };

  var renderActionButton = function renderActionButton() {
    if (isComplete) {
      return /*#__PURE__*/_jsx(ButtonPrimaryAsLink, {
        "data-testid": "back-action",
        to: backUrl,
        children: t('TEAM_BULK_INVITE_DONE_BUTTON', 'Done', 'Done Button on Team bulk invite page')
      });
    }

    if (showInviteList) {
      return /*#__PURE__*/_jsx(SendButton, {
        numInvitesToSend: numInvitesToSend,
        isSending: isSending,
        positionForAnalytics: "top"
      });
    }

    return null;
  };

  return /*#__PURE__*/_jsxs(TeamPage, {
    title: t('TEAM_BULK_INVITE_DOC_TITLE', 'Bulk invite', 'Team Bulk Invite document title'),
    documentTitle: [t('TEAM_BULK_INVITE_DOC_TITLE', 'Bulk invite', 'Team Bulk Invite document title'), currentTeamDetails.name],
    actions: renderActionButton(),
    breadcrumbs: /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(TeamRosterBreadcrumb, {}), /*#__PURE__*/_jsx(TeamBreadcrumb, {
        team: {
          name: currentTeamDetails.name,
          type: assertTeamType(currentTeamDetails.type),
          id: currentTeamDetails.id,
          uri: currentTeamDetails.uri
        }
      })]
    }),
    children: [/*#__PURE__*/_jsx(Progress, {
      sendabilityMessage: sendabilityMessage,
      stage: stage,
      onDownload: function onDownload() {
        if (stage === BulkInviteStage.Download) {
          advanceStage();
        }

        logDownloadTemplateCsvFile();
        trackEvent(bulkInvite.downloadFile());
      }
    }), renderContents()]
  });
};