import _defineProperty from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { Route } from 'react-router-dom';
import { LoggedIn } from '../../shared/components/LoggedIn';
import { HasAccess } from '../../shared/components/HasAccess';
import { PageContainer } from '../../features/page/Container';
import ConnectedArtist from './Artist';
import { jsx as _jsx } from "react/jsx-runtime";
export function ArtistContainer(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_jsx(PageContainer, {
    children: /*#__PURE__*/_jsx(LoggedIn, {
      children: /*#__PURE__*/_jsx(HasAccess, {
        children: /*#__PURE__*/_jsx(Route, {
          path: "/artist/:artistId",
          render: function render(routeProps) {
            return /*#__PURE__*/_jsx(ConnectedArtist, _objectSpread(_objectSpread({}, routeProps), {}, {
              children: children
            }));
          }
        })
      })
    })
  });
}