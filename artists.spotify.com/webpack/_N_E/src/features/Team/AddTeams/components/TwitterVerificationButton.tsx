import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import React from 'react';
import { ButtonSecondary, IconTwitter, IconX, spacer12, spacer8 } from '@spotify-internal/encore-web';
import { logError } from '@mrkt/features/Platform';
import { ONBOARDING_API, post, del } from '../../../../shared/lib/api';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledButtonSecondary = styled(ButtonSecondary).withConfig({
  displayName: "TwitterVerificationButton__StyledButtonSecondary",
  componentId: "sc-1hjv338-0"
})(["display:flex;align-items:center;padding-left:", ";padding-right:", ";max-width:98%;"], spacer12, spacer12);
var StyledText = styled.span.withConfig({
  displayName: "TwitterVerificationButton__StyledText",
  componentId: "sc-1hjv338-1"
})(["text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"]);
var StyledIconTwitter = styled(IconTwitter).withConfig({
  displayName: "TwitterVerificationButton__StyledIconTwitter",
  componentId: "sc-1hjv338-2"
})(["margin-right:", ";flex-shrink:0;"], spacer8);
var StyledIconX = styled(IconX).withConfig({
  displayName: "TwitterVerificationButton__StyledIconX",
  componentId: "sc-1hjv338-3"
})(["margin-left:", ";flex-shrink:0;"], spacer8);
export var TwitterVerificationButton = function TwitterVerificationButton(_ref) {
  var artistId = _ref.artistId,
      requestId = _ref.requestId,
      username = _ref.username,
      onRemoved = _ref.onRemoved;
  var href = window.location.href;
  var t = useT();

  var _useTeamStore = useTeamStore(),
      layoutType = _useTeamStore.layoutType;

  var isFullLayout = layoutType === 'full';

  var verify = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var data, authURL;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return post("".concat(ONBOARDING_API, "/v0/access/request/").concat(requestId, "/artist/").concat(artistId, "/twitter/oauth"), {
                body: {
                  redirectUrl: "".concat(href)
                }
              });

            case 3:
              data = _context.sent;
              authURL = data && data.authURL;
              window.location.assign(authURL);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              logError(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
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
              return del("".concat(ONBOARDING_API, "/v0/access/request/").concat(requestId, "/artist/").concat(artistId, "/twitter"));

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
    "data-testid": "twitter-button",
    "aria-label": "IconTwitter",
    onClick: function onClick() {
      return username ? remove() : verify();
    },
    children: [/*#__PURE__*/_jsx(StyledIconTwitter, {
      iconSize: 24
    }), /*#__PURE__*/_jsx(StyledText, {
      children: username || t('TWITTER', 'Twitter', 'connect to Twitter')
    }), username && /*#__PURE__*/_jsx(StyledIconX, {
      iconSize: 24
    })]
  });
};