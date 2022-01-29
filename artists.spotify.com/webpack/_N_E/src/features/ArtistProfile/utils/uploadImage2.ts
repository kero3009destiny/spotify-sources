import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { IDENTITY_API } from '../../../shared/lib/api';
import { defaultWebgateHeaders, webgateFetchJson } from '@mrkt/features/webgate-fetch';
var ContentType;

(function (ContentType) {
  ContentType["jpeg"] = "image/jpeg";
  ContentType["png"] = "image/png";
})(ContentType || (ContentType = {}));

function getUploadAPIURL(collectionName) {
  return "https://image-upload.spotify.com/v4/".concat(collectionName);
}

export function uploadImage(_x, _x2) {
  return _uploadImage.apply(this, arguments);
}

function _uploadImage() {
  _uploadImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(data, collectionName) {
    var uploadAPIURL, omitHeaders;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            uploadAPIURL = getUploadAPIURL(collectionName);
            omitHeaders = Object.keys(defaultWebgateHeaders);
            _context2.next = 4;
            return webgateFetchJson(uploadAPIURL, {
              body: data,
              headers: {
                Accept: '*/*',
                // TODO: Support other image types?
                'Content-Type': ContentType.jpeg
              },
              method: 'POST'
            }, omitHeaders);

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _uploadImage.apply(this, arguments);
}

export function updateMetadata(_x3, _x4, _x5, _x6, _x7) {
  return _updateMetadata.apply(this, arguments);
}

function _updateMetadata() {
  _updateMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(image2Response, artistId, organizationUri, collectionName, imageName) {
    var metadataAPIURL;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            metadataAPIURL = "".concat(IDENTITY_API, "/v0/image/").concat(artistId, "/tokens?organizationUri=").concat(organizationUri);
            _context3.next = 3;
            return webgateFetchJson(metadataAPIURL, {
              body: JSON.stringify([_objectSpread({
                collection: collectionName,
                token: image2Response.uploadToken
              }, imageName != null && {
                image: imageName
              })]),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'PUT'
            });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _updateMetadata.apply(this, arguments);
}

function getUploadResult(image2Response, details) {
  // We need to pass back the imageId to the caller so that when we later try to
  // reorder a newly-uploaded image by id, we have access to the id. Previously
  // ID has been ignored in this case and the blob url has been populating the
  // "id" field in the objects referencing the client-side image metadata
  var type = details.type;
  var capture = details.capture; // Need to check for imageType since "capture" is overloaded and can be either
  // an object or a string

  if (type === 'gallery' && // Check whether it's an object
  typeof capture === 'object' && capture != null) {
    capture = _objectSpread(_objectSpread({}, capture), {}, {
      imageId: image2Response.uploadToken
    });
  }

  return _defineProperty({}, type, capture);
}

function getCollectionName(imageType) {
  switch (imageType) {
    case 'avatar':
    case 'header':
    case 'gallery':
      return "artist".concat(imageType);

    default:
      return imageType;
  }
}

export function cropImage(_x8, _x9) {
  return _cropImage.apply(this, arguments);
}

function _cropImage() {
  _cropImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(image, offset) {
    var canvas, _offset$top, top, _offset$right, right, _offset$bottom, bottom, _offset$left, left, context;

    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            canvas = document.createElement('canvas');
            _offset$top = offset.top, top = _offset$top === void 0 ? 0 : _offset$top, _offset$right = offset.right, right = _offset$right === void 0 ? 0 : _offset$right, _offset$bottom = offset.bottom, bottom = _offset$bottom === void 0 ? 0 : _offset$bottom, _offset$left = offset.left, left = _offset$left === void 0 ? 0 : _offset$left;
            canvas.width = image.width - (right + left);
            canvas.height = image.height - (top + bottom);
            context = canvas.getContext('2d');

            if (context) {
              _context4.next = 7;
              break;
            }

            throw new Error('canvas context is null');

          case 7:
            context.drawImage(image, -left, -top);
            return _context4.abrupt("return", new Promise(function (resolve, reject) {
              canvas.toBlob(function (blob) {
                if (blob) {
                  resolve(blob);
                }

                reject(new Error('Failed to create image'));
              }, ContentType.jpeg, 1.0);
            }));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _cropImage.apply(this, arguments);
}

export var uploadImage2 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(details, artistId, organizationUri) {
    var binary, imageElement, offset, imageName, collectionName, imageData, imageUploadResp;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            binary = details.binary, imageElement = details.imageElement, offset = details.offset, imageName = details.type;
            collectionName = getCollectionName(details.type);

            if (!(imageElement && shouldCrop(offset))) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return cropImage(imageElement, offset);

          case 5:
            imageData = _context.sent;
            _context.next = 9;
            break;

          case 8:
            imageData = binary;

          case 9:
            _context.next = 11;
            return uploadImage(imageData, collectionName);

          case 11:
            imageUploadResp = _context.sent;

            if (!(details.type !== 'gallery')) {
              _context.next = 15;
              break;
            }

            _context.next = 15;
            return updateMetadata(imageUploadResp, artistId, organizationUri, collectionName, imageName);

          case 15:
            return _context.abrupt("return", getUploadResult(imageUploadResp, details));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function uploadImage2(_x10, _x11, _x12) {
    return _ref2.apply(this, arguments);
  };
}();

function shouldCrop(offset) {
  var offsetValues = Object.values(offset); // Avoid running through the crop function if all of the offset values
  // are 0 or close to zero (i.e. as the result of floating point imprecision
  // some values report a tiny crop offset value that is not reflective of
  // user intent to crop the image

  if (offsetValues.some(function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return Math.round(value) !== 0;
  })) {
    return true;
  }

  return false;
}