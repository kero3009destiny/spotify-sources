// ignore-string-externalization
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCurrentArtistPermissions, CATALOG_VIEW } from '../../../features/artists';
import { useIsHomeEnabledForCurrentUser } from '../../../features/ArtistHome';
import { jsx as _jsx } from "react/jsx-runtime";
export function ArtistFallback() {
  var permissions = useCurrentArtistPermissions();

  if (useIsHomeEnabledForCurrentUser()) {
    // has viewer permission
    return /*#__PURE__*/_jsx(Route, {
      path: "/artist/:artistId",
      render: function render(_ref) {
        var match = _ref.match;
        return /*#__PURE__*/_jsx(Redirect, {
          to: "".concat(match.url, "/home")
        });
      }
    });
  }

  if (permissions.includes(CATALOG_VIEW)) {
    return /*#__PURE__*/_jsx(Route, {
      path: "/artist/:artistId",
      render: function render(_ref2) {
        var match = _ref2.match;
        return /*#__PURE__*/_jsx(Redirect, {
          to: "".concat(match.url, "/music")
        });
      }
    });
  }

  return /*#__PURE__*/_jsx(Redirect, {
    to: "/"
  });
}