import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import { createAction } from 'redux-actions';
import { LOAD_ANNOUNCEMENTS, UPDATE_ANNOUNCEMENTS } from '../actionTypes';
import { get, post } from '../../lib/api';
var S4A_ANNOUNCEMENTS_URI = 'https://generic.wg.spotify.com/s4a-announcements'; // Gets list of announcements a user has seen, list of names to query

export var loadAnnouncementsPayloadCreator = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(announcementTypes) {
    var endpoint;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            endpoint = "".concat(S4A_ANNOUNCEMENTS_URI, "/v1/announcements?names=").concat(announcementTypes.join(','));
            return _context.abrupt("return", get(endpoint));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadAnnouncementsPayloadCreator(_x) {
    return _ref.apply(this, arguments);
  };
}();
export var loadAnnouncements = createAction(LOAD_ANNOUNCEMENTS, loadAnnouncementsPayloadCreator); // Updates announcements seen

export var updateAnnouncementsPayloadCreator = function updateAnnouncementsPayloadCreator(announcementTypes) {
  var announcementsPromises = announcementTypes.map(function (announcement) {
    var endpoint = "".concat(S4A_ANNOUNCEMENTS_URI, "/v1/announcements/").concat(announcement);
    return post(endpoint);
  }); // ignore all errors, user will see announcement again if non 409 error

  Promise.all(announcementsPromises).catch(function () {});
  return {
    data: announcementTypes
  };
};
export var updateAnnouncements = createAction(UPDATE_ANNOUNCEMENTS, updateAnnouncementsPayloadCreator);