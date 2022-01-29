import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { useRead, usePut } from '@spotify-internal/creator-data-loading';
import { Logger } from '@mrkt/features/Platform';
import { useCurrentArtist } from '../../../../artists';
import { artistProfileLoader } from '../../../artistProfileLoader';
import { useDelete as useDeleteRequest } from '../../lib';
export function useDelete(onSuccess, onFailure) {
  var del = useDeleteRequest();
  var optimisticDelete = useOptimisticDelete();
  return /*#__PURE__*/function () {
    var _deleteCurrentFundraisingPick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var resp;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return del();

            case 2:
              resp = _context.sent;

              if (resp !== null && resp !== void 0 && resp.ok) {
                optimisticDelete();
                onSuccess();
              } else {
                logError(resp);
                onFailure();
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function deleteCurrentFundraisingPick() {
      return _deleteCurrentFundraisingPick.apply(this, arguments);
    }

    return deleteCurrentFundraisingPick;
  }();
} // Optimistically delete fundraising pick client side if delete request was successful

function useOptimisticDelete() {
  var artist = useCurrentArtist();
  var artistProfile = useRead(artistProfileLoader, artist.id);
  var setArtistProfile = usePut(artistProfileLoader, artist.id);
  return function optimisticDelete() {
    if (artistProfile) {
      setArtistProfile(_objectSpread(_objectSpread({}, artistProfile), {}, {
        artistFundraisingPick: undefined
      }));
    }
  };
}

function logError(resp) {
  // Log unexpected error code
  Logger.logError('artist-fundraising-pick-delete-error', new Error("Unexpected response".concat(resp !== null && resp !== void 0 && resp.status ? " status ".concat(resp === null || resp === void 0 ? void 0 : resp.status) : " ".concat(resp))));
}