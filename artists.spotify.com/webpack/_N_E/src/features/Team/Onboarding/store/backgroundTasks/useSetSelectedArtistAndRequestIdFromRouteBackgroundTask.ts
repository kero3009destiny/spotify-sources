// ignore-string-externalization
import { useLocation, useRouteMatch } from 'react-router';
import { useEffect } from 'react';
import { ArtistAccessFlowStep } from '../models';
import { claimedArtistLoader } from '../api/claimedArtistLoader';
import { getStoredToken } from '../util/stateStorage';
import { useLocale, useT } from '@mrkt/features/i18n';
export var useSetSelectedArtistAndRequestIdFromRouteBackgroundTask = function useSetSelectedArtistAndRequestIdFromRouteBackgroundTask(_ref, _ref2) {
  var selectArtistAccessFlowArtist = _ref.selectArtistAccessFlowArtist,
      setArtistAccessFlowDetails = _ref.setArtistAccessFlowDetails,
      goToArtistAccessFlowStep = _ref.goToArtistAccessFlowStep,
      getRequestDetailsFromId = _ref.getRequestDetailsFromId,
      trackEvent = _ref.trackEvent;
  var artistAccessFlow = _ref2.artistAccessFlow;
  var location = useLocation();
  var locale = useLocale();
  var urlParams = new URLSearchParams(location.search);
  var caseId = urlParams.get('caseId');
  var t = useT();
  var errorMessages = {
    alreadyOnTeam: t('ERROR_FIND_TEAM_ALREADY_ON_TEAM', "You're already a member of this team.", ''),
    pendingRequest: t('d2c2c7', 'You have a pending request to join this team.', ''),
    inviteOnly: t('ab6f7c', 'This team is not accepting requests right now.', ''),
    genericError: t('CAN_CREATE_ACCESS_REQUEST_GENERIC_ERROR', 'Something went wrong', 'Something went wrong')
  };

  var _ref3 = useRouteMatch('/team/access/artist/:artistId') || {
    params: {}
  },
      _ref3$params$artistId = _ref3.params.artistId,
      artistId = _ref3$params$artistId === void 0 ? '' : _ref3$params$artistId;

  var details = artistAccessFlow.details;
  useEffect(function () {
    if (details.requestId || details.selectedArtist || location.pathname === '/team/access/artist') {
      return;
    }

    if (caseId) {
      setArtistAccessFlowDetails({
        requestId: caseId,
        token: getStoredToken(trackEvent, caseId)
      });
      getRequestDetailsFromId(caseId);
      claimedArtistLoader.load({
        id: artistId,
        locale: locale
      }).then(function (artist) {
        if (artist) {
          setArtistAccessFlowDetails({
            selectedArtist: artist
          });
        } else {
          setArtistAccessFlowDetails({
            selectedArtist: null
          });
        }
      });
      goToArtistAccessFlowStep(ArtistAccessFlowStep.SOCIAL_VERIFICATION);
    } else if (artistId) {
      selectArtistAccessFlowArtist(artistId, locale, errorMessages);
    }

    return;
  }, [artistId, details.requestId, details.selectedArtist, getRequestDetailsFromId, goToArtistAccessFlowStep, location.pathname, caseId, selectArtistAccessFlowArtist, setArtistAccessFlowDetails]);
};