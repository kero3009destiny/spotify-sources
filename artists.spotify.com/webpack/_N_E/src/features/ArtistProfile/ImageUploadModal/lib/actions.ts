import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { IDENTITY_API, webgateFetch } from '../../../../shared/lib/api';
export function updateOrderById(_x, _x2, _x3) {
  return _updateOrderById.apply(this, arguments);
}

function _updateOrderById() {
  _updateOrderById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistID, organizationURI, images) {
    var collectionName, reorderByIdEndpoint2, postData;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            collectionName = 'artistgallery';
            reorderByIdEndpoint2 = getReorderByIdEndpoint(artistID, organizationURI);
            postData = images.map(function (img) {
              if (img.status === 'IS_UPLOADED') {
                // For newly uploaded images, token is the upload token returned by the
                // Image2 system
                return {
                  collection: collectionName,
                  token: img.id
                };
              } // For existing/reordered images, imageRef is the original ID. Once Image2
              // migration is complete, the original ID will be a CDN url.


              return {
                collection: collectionName,
                imageRef: img.id
              };
            });
            _context.next = 5;
            return webgateFetch(reorderByIdEndpoint2, {
              body: JSON.stringify(postData),
              method: 'POST'
            });

          case 5:
            return _context.abrupt("return", images);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateOrderById.apply(this, arguments);
}

function getReorderByIdEndpoint(artistID, organizationURI) {
  return "".concat(IDENTITY_API, "/v0/image/").concat(artistID, "/gallery?organizationUri=").concat(organizationURI);
}