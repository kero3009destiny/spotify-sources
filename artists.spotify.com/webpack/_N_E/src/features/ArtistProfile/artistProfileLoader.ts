import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { createLoader } from '@spotify-internal/creator-data-loading';
import { webgateFetchJson, IDENTITY_API } from '../../shared/lib/api';

function transform(artistProfileResource) {
  var _artistProfileResourc, _artistProfileResourc2, _artistProfileResourc3;

  return !artistProfileResource ? null : _objectSpread(_objectSpread({}, artistProfileResource), {}, {
    artistPick: _objectSpread(_objectSpread({}, artistProfileResource.pinnedItem), {}, {
      updateID: 0
    }),
    artistFundraisingPick: artistProfileResource.fanFunding,
    catalog: artistProfileResource.releases,
    gallery: artistProfileResource.gallery && artistProfileResource.gallery.images && artistProfileResource.gallery.images.map(function (image) {
      return {
        id: image.originalId,
        src: image.image.uri
      };
    }) || [],
    gallerySource: (_artistProfileResourc = (_artistProfileResourc2 = artistProfileResource.gallery) === null || _artistProfileResourc2 === void 0 ? void 0 : _artistProfileResourc2.gallerySource) !== null && _artistProfileResourc !== void 0 ? _artistProfileResourc : null,
    headerImage: {
      header: artistProfileResource.header && artistProfileResource.header.uri || '',
      avatar: artistProfileResource.avatar && artistProfileResource.avatar.uri || ''
    },
    isEditable: (_artistProfileResourc3 = artistProfileResource.isEditable) !== null && _artistProfileResourc3 !== void 0 ? _artistProfileResourc3 : false,
    playlists: artistProfileResource.playlists || {
      data: []
    },
    topTracks: artistProfileResource.topTracks || []
  });
}

var artistProfileFields = ['artistUri', 'autobiography', 'avatar', 'biography', 'concertsMetadata', 'fallbackHeader', 'gallery', 'header', 'isVerified', 'mergedUserUri', 'monthlyListeners', 'name', 'newRelease', 'pinnedItem', 'playlists', 'relatedArtists', 'releases', 'topTracks', 'isEditable', 'fanFunding'];
export var artistProfileLoader = createLoader( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistId) {
    var endpoint;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            endpoint = "".concat(IDENTITY_API, "/v2/profile/").concat(artistId, "?fields=").concat(artistProfileFields, "&application=s4a&imgSize=large");
            _context.t0 = transform;
            _context.next = 4;
            return webgateFetchJson(endpoint);

          case 4:
            _context.t1 = _context.sent;
            return _context.abrupt("return", (0, _context.t0)(_context.t1));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());