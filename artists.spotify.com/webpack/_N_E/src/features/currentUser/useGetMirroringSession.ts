import _defineProperty from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import { useQuery } from 'react-query';
export var GET_MIRRORING_USER_URL = "https://mrkt-mirror-proxy.spotify.com/api/getMirroringSession";
export var useGetMirroringSession = function useGetMirroringSession() {
  var _useQuery = useQuery(['getMirroringSession'], /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch(GET_MIRRORING_USER_URL, {
              credentials: 'include'
            });

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            _context.t0 = _context.sent.userNameToMirror;
            return _context.abrupt("return", {
              isMirroringSession: true,
              userNameToMirror: _context.t0
            });

          case 10:
            _context.prev = 10;
            _context.t1 = _context["catch"](0);
            return _context.abrupt("return", {
              isMirroringSession: false
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  })), {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  }),
      decoratedSession = _useQuery.data,
      isLoading = _useQuery.isLoading,
      isError = _useQuery.isError;

  return {
    decoratedSession: _objectSpread({}, decoratedSession),
    isLoading: isLoading,
    isError: isError
  };
};