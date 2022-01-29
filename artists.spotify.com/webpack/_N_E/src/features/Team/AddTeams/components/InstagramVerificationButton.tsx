import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import React from 'react';
import qs from 'query-string';
import storage from 'local-storage-fallback';
import { IconInstagram, IconX, ButtonSecondary, spacer12, spacer8, screenXxsMax } from '@spotify-internal/encore-web';
import { logError } from '@mrkt/features/Platform';
import { ONBOARDING_API, post, del } from '../../../../shared/lib/api';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledButtonSecondary = styled(ButtonSecondary).withConfig({
  displayName: "InstagramVerificationButton__StyledButtonSecondary",
  componentId: "n0qbhn-0"
})(["display:flex;align-items:center;margin-left:", ";padding-left:", ";padding-right:", ";max-width:98%;@media (max-width:", "){margin-top:", ";margin-left:0;}"], spacer12, spacer12, spacer12, screenXxsMax, spacer12);
var StyledText = styled.span.withConfig({
  displayName: "InstagramVerificationButton__StyledText",
  componentId: "n0qbhn-1"
})(["text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"]);
var StyledIconInstagram = styled(IconInstagram).withConfig({
  displayName: "InstagramVerificationButton__StyledIconInstagram",
  componentId: "n0qbhn-2"
})(["margin-right:", ";flex-shrink:0;"], spacer8);
var StyledIconX = styled(IconX).withConfig({
  displayName: "InstagramVerificationButton__StyledIconX",
  componentId: "n0qbhn-3"
})(["margin-left:", ";flex-shrink:0;"], spacer8);
export var InstagramVerificationButton = function InstagramVerificationButton(_ref) {
  var artistId = _ref.artistId,
      requestId = _ref.requestId,
      username = _ref.username,
      onRemoved = _ref.onRemoved;
  var _window$location$sear = window.location.search,
      search = _window$location$sear === void 0 ? '' : _window$location$sear;
  var t = useT();

  var _useTeamStore = useTeamStore(),
      layoutType = _useTeamStore.layoutType;

  var isFullLayout = layoutType === 'full';

  var verify = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var platform, data, authURL;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // set local storage items
              platform = qs.parse(search)['container-platform'] || 'web';
              storage.setItem('artist_id', artistId);
              requestId && storage.setItem('request_id', requestId);
              storage.setItem('platform', platform);
              storage.setItem('requestMethod', 'add_artist');
              _context.prev = 5;
              _context.next = 8;
              return post("".concat(ONBOARDING_API, "/v0/access/instagram/oauth"));

            case 8:
              data = _context.sent;
              authURL = data && data.authURL;
              window.location.assign(authURL);
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](5);
              logError(_context.t0);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 13]]);
    }));

    return function verify() {
      return _ref2.apply(this, arguments);
    };
  }();

  var remove = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return del("".concat(ONBOARDING_API, "/v0/access/request/").concat(requestId, "/artist/").concat(artistId, "/instagram"));

            case 3:
              onRemoved();
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              logError(_context2.t0);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    return function remove() {
      return _ref3.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_jsxs(StyledButtonSecondary, {
    buttonSize: isFullLayout ? 'md' : 'sm',
    "data-testid": "instagram-button",
    "aria-label": "IconInstagram",
    onClick: function onClick() {
      return username ? remove() : verify();
    },
    children: [/*#__PURE__*/_jsx(StyledIconInstagram, {
      iconSize: 24
    }), /*#__PURE__*/_jsx(StyledText, {
      children: username || t('INSTAGRAM', 'Instagram', 'connect to Instagram')
    }), username && /*#__PURE__*/_jsx(StyledIconX, {
      iconSize: 24
    })]
  });
};