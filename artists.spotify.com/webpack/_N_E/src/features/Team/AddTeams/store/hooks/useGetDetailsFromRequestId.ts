import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { ONBOARDING_API } from '../../../../../shared/lib/api';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
export var useGetDetailsFromRequestId = function useGetDetailsFromRequestId(requestId) {
  var _useTeamStore = useTeamStore(),
      setAddTeamsFlowDetails = _useTeamStore.setAddTeamsFlowDetails;

  var _useQuery = useQuery(['requestData', requestId], /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return webgateFetchJson("".concat(ONBOARDING_API, "/v0/access/request/").concat(requestId));

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), {
    enabled: !!requestId
  }),
      requestData = _useQuery.data,
      requestIsValidating = _useQuery.isLoading;

  var twitterUsername = requestData && requestData.artists[0].twitterUsername || null;
  var instagramUsername = requestData && requestData.artists[0].instagramUsername || null;
  useEffect(function () {
    setAddTeamsFlowDetails({
      instagramUsername: instagramUsername
    });
  }, [instagramUsername, setAddTeamsFlowDetails]);
  useEffect(function () {
    setAddTeamsFlowDetails({
      twitterUsername: twitterUsername
    });
  }, [twitterUsername, setAddTeamsFlowDetails]);
  return {
    twitterUsername: twitterUsername,
    instagramUsername: instagramUsername,
    requestIsValidating: requestIsValidating
  };
};