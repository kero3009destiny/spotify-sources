import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { mediaMetadataLoader } from '../api/mediaMetadataLoader';
import { toMediaInfo } from '../util/toMediaInfo';
export var selectLabelAccessFlowMediaTask = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(key, mediaUriOrLink, _ref) {
    var setLabelAccessFlowDetails, maybeMediaInfo, result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setLabelAccessFlowDetails = _ref.setLabelAccessFlowDetails;
            maybeMediaInfo = toMediaInfo(mediaUriOrLink);

            if (maybeMediaInfo) {
              _context.next = 5;
              break;
            }

            setLabelAccessFlowDetails(_defineProperty({}, key, {
              status: 'entering',
              uri: mediaUriOrLink
            }));
            return _context.abrupt("return");

          case 5:
            setLabelAccessFlowDetails(_defineProperty({}, key, {
              status: 'loading',
              uri: mediaUriOrLink
            }));
            _context.prev = 6;
            _context.next = 9;
            return mediaMetadataLoader.load(maybeMediaInfo);

          case 9:
            result = _context.sent;
            setLabelAccessFlowDetails(_defineProperty({}, key, result));
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](6);
            setLabelAccessFlowDetails(_defineProperty({}, key, {
              status: 'error',
              uri: mediaUriOrLink,
              errorDetails: _context.t0
            }));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 13]]);
  }));

  return function selectLabelAccessFlowMediaTask(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();