import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { IDENTITY_API, webgateFetchJson } from '../../../../shared/lib/api';
export var save = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(links, artistId, organizationUri) {
    var endpoint, filteredLinks, payload;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            endpoint = "".concat(IDENTITY_API, "/v1/profile/").concat(artistId, "/biography?organizationUri=").concat(organizationUri);
            filteredLinks = {};
            Object.keys(links).forEach(function (type) {
              if (links[type] !== '') filteredLinks[type] = links[type];
            });
            payload = {
              links: filteredLinks
            };
            _context.next = 6;
            return webgateFetchJson(endpoint, {
              body: JSON.stringify(payload),
              method: 'PATCH'
            });

          case 6:
            return _context.abrupt("return", links);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function save(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();