import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { Logger } from '@mrkt/features/Platform';
import { InvalidFileTypeError, MissingHeaderError, parseBulkInviteCsv } from '../../util/parseBulkInviteCsv';
import { FileProcessingFailureType } from '../BulkInviteAction';
import { InviteState } from '../BulkInviteState';
var BANNER_ID = 'bulk-invite';
var MAX_INVITES = 100;
export var processFileTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(file, existingMemberEmails, _methodForAnalytics, t, logFileParsingError, logMissingHeadersError, logInvalidFileTypeError, _ref) {
    var hideBanner, showErrorBanner, setFileLoading, fileProcessingFailed, setInvites, _yield$parseBulkInvit, inviteList, maybeTruncatedInvites, numInvitesOmitted, invites;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hideBanner = _ref.hideBanner, showErrorBanner = _ref.showErrorBanner, setFileLoading = _ref.setFileLoading, fileProcessingFailed = _ref.fileProcessingFailed, setInvites = _ref.setInvites;
            hideBanner(BANNER_ID);
            setFileLoading(true);
            _context.prev = 3;
            _context.next = 6;
            return parseBulkInviteCsv(file, t);

          case 6:
            _yield$parseBulkInvit = _context.sent;
            inviteList = _yield$parseBulkInvit.inviteList;

            if (inviteList.length === 0) {
              fileProcessingFailed(FileProcessingFailureType.EMPTY_FILE, t('BULK_INVITE_EMPTY_FILE_ERROR_MESSAGE', 'No items found. Check that the file contains entries for each invitee.', 'There were no items found in the file you uploaded. Check that your file contains entries for each invitee.'));
              logFileParsingError();
              showErrorBanner(t('BULK_INVITE_EMPTY_FILE_ERROR_MESSAGE', 'No items found. Check that the file contains entries for each invitee.', 'There were no items found in the file you uploaded. Check that your file contains entries for each invitee.'), {
                id: BANNER_ID
              });
            } else {
              maybeTruncatedInvites = inviteList.slice(0, MAX_INVITES);
              numInvitesOmitted = inviteList.length - maybeTruncatedInvites.length;
              invites = maybeTruncatedInvites.map(function (invite, index) {
                return _objectSpread(_objectSpread({}, invite), {}, {
                  state: !!invite.details.businessEmail && existingMemberEmails.has(invite.details.businessEmail) ? InviteState.ALREADY_EXISTS : InviteState.VIEWING,
                  id: "invite-".concat(index),
                  serverErrors: []
                });
              });
              setInvites(invites, numInvitesOmitted);
            }

            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            // eslint-disable-next-line no-console
            console.warn(t('BULK_INVITE_ERROR_CONSOLE_WARNING', 'Error processing CSV file', 'There was an error processing the CSV file you uploaded.'), _context.t0);

            if (_context.t0 instanceof MissingHeaderError) {
              fileProcessingFailed(FileProcessingFailureType.MISSING_HEADER, t('BULK_INVITE_MISSING_HEADER_ERROR_MESSAGE', 'The following columns need to be included: {columnHeaders}', 'The following columns are missing from the file you uploaded.', {
                columnHeaders: _context.t0.headers.join(',')
              }));
              logMissingHeadersError();
              showErrorBanner(t('BULK_INVITE_MISSING_HEADER_ERROR_MESSAGE', 'The following columns need to be included: {columnHeaders}', 'The following columns are missing from the file you uploaded.', {
                columnHeaders: _context.t0.headers.join(',')
              }), {
                id: BANNER_ID
              });
            } else {
              fileProcessingFailed(FileProcessingFailureType.INVALID_FILETYPE, t('BULK_INVITE_PROCESS_FILE_INVALID_FILE_TYPE_ERROR', "Couldn't read the file. Make sure it's a CSV file and try again.", "We couldn't read the file you uploaded. Make sure it is a CSV file and try again."));
              logInvalidFileTypeError();
              showErrorBanner(t('BULK_INVITE_PROCESS_FILE_INVALID_FILE_TYPE_ERROR', "Couldn't read the file. Make sure it's a CSV file and try again.", "We couldn't read the file you uploaded. Make sure it is a CSV file and try again."), {
                id: BANNER_ID
              });

              if (!(_context.t0 instanceof InvalidFileTypeError)) {
                Logger.logError('bulk-invite-csv-failure', _context.t0);
                logFileParsingError();
                showErrorBanner(t('BULK_INVITE_ERROR_CONSOLE_WARNING', 'Error processing CSV file', 'There was an error processing the CSV file you uploaded.'), {
                  id: BANNER_ID
                });
              }
            }

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 11]]);
  }));

  return function processFileTask(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();