import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { useInfiniteQuery } from 'react-query';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { useAcceptLanguage } from '@mrkt/features/i18n/hooks/useAcceptLanguage';
export var useActivityFeed = function useActivityFeed(teamMemberQuery, currentTeamUri) {
  var acceptLanguage = useAcceptLanguage();

  var params = function params(pageToken) {
    if (teamMemberQuery && pageToken) {
      return "?username=".concat(teamMemberQuery, "&last_id=").concat(pageToken);
    } else if (teamMemberQuery) {
      return "?username=".concat(teamMemberQuery);
    } else if (pageToken) {
      return "?last_id=".concat(pageToken);
    }

    return '';
  };

  return useInfiniteQuery(['activities', teamMemberQuery, currentTeamUri, acceptLanguage], /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref) {
      var _ref$pageParam, pageParam, response;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref$pageParam = _ref.pageParam, pageParam = _ref$pageParam === void 0 ? '' : _ref$pageParam;
              _context.next = 3;
              return webgateFetchJson("https://generic.wg.spotify.com/activity-feed/v0/activity/organization/".concat(currentTeamUri).concat(params(pageParam)), {
                headers: {
                  'accept-language': acceptLanguage
                }
              });

            case 3:
              response = _context.sent;
              return _context.abrupt("return", response);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), {
    getNextPageParam: function getNextPageParam(lastPage, _pages) {
      return lastPage.page_token;
    }
  });
};