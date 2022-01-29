import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { IDENTITY_API } from '../../../../shared/lib/api';
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { cropImage, updateMetadata, uploadImage } from '../../utils/uploadImage2';

function updateArtistPick(_x, _x2, _x3) {
  return _updateArtistPick.apply(this, arguments);
} // Caller relies on a try/catch to tell whether saving Artist Pick is successful.
// Below, uploadImage and updateMetadata are implemented using WebgateFetchJson,
// which throws if response code is not in range 200-299. updateArtistPick doesn't
// use webgateFetchJson, but includes similar code to throw if response code not in "ok" range


function _updateArtistPick() {
  _updateArtistPick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistId, organizationUri, _ref) {
    var backgroundImage, binarySource, comment, type, uri, artistPickEndpoint, body, response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            backgroundImage = _ref.backgroundImage, binarySource = _ref.binarySource, comment = _ref.comment, type = _ref.type, uri = _ref.uri;
            artistPickEndpoint = "".concat(IDENTITY_API, "/v1/profile/").concat(artistId, "/pinned?organizationUri=").concat(organizationUri);
            body = {
              type: type,
              uri: uri
            }; // If there's a backgroundImage property but no binarySource property on the
            // ClientArtistPick object, that means the user is editing a pick that already
            // has an image. We don't need to re-upload the already-uploaded image, but we
            // do need to set the backgroundImageUrl property in the update request.

            if (backgroundImage) {
              if (!binarySource) body.backgroundImageUrl = backgroundImage;
            } else {
              // Setting to null removes any previously added bg image for the artist pick
              body.backgroundImageUrl = null;
            }

            if (comment) body.comment = comment;
            _context.next = 7;
            return webgateFetch(artistPickEndpoint, {
              body: JSON.stringify(body),
              method: 'PUT'
            });

          case 7:
            response = _context.sent;

            if (response.ok) {
              _context.next = 10;
              break;
            }

            throw new Error("".concat(response.status, " ").concat(response.url));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateArtistPick.apply(this, arguments);
}

export function saveArtistPick(_x4, _x5, _x6) {
  return _saveArtistPick.apply(this, arguments);
}

function _saveArtistPick() {
  _saveArtistPick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(artistId, clientArtistPick, organizationUri) {
    var imageElement, _clientArtistPick$off, offset, collectionName, imageName, imageData, imageUploadResp;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return updateArtistPick(artistId, organizationUri, clientArtistPick);

          case 2:
            imageElement = clientArtistPick.imageElement, _clientArtistPick$off = clientArtistPick.offset, offset = _clientArtistPick$off === void 0 ? {} : _clientArtistPick$off;
            collectionName = 'artistpick';
            imageName = collectionName;

            if (!imageElement) {
              _context2.next = 14;
              break;
            }

            _context2.next = 8;
            return cropImage(imageElement, offset);

          case 8:
            imageData = _context2.sent;
            _context2.next = 11;
            return uploadImage(imageData, collectionName);

          case 11:
            imageUploadResp = _context2.sent;
            _context2.next = 14;
            return updateMetadata(imageUploadResp, artistId, organizationUri, collectionName, imageName);

          case 14:
            return _context2.abrupt("return", clientArtistPick);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _saveArtistPick.apply(this, arguments);
}