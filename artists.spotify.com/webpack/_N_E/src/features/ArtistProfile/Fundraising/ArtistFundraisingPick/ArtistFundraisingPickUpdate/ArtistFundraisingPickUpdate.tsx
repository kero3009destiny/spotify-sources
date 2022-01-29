import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import { Dimmable } from '../../../Dimmable';
import { VSpacer24 } from '../../../Elements';
import { ArtistFundraisingPickUpdateBody } from './ArtistFundraisingPickUpdateBody';
import { ArtistFundraisingPickUpdateFooter } from './ArtistFundraisingPickUpdateFooter';
import { Title } from '../shared/Title';
import { TitleActions } from '../shared/TitleActions';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function ArtistFundraisingPickUpdate(props) {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isEditing = _React$useState2[0],
      setIsEditing = _React$useState2[1];

  return /*#__PURE__*/_jsx(Dimmable, {
    active: isEditing,
    children: /*#__PURE__*/_jsxs("div", {
      "data-testid": "afp-update",
      children: [/*#__PURE__*/_jsx(Title, {
        children: /*#__PURE__*/_jsx(TitleActions, {
          isEditing: isEditing,
          setAlert: props.setAlert,
          setIsEditing: setIsEditing
        })
      }), /*#__PURE__*/_jsx(ArtistFundraisingPickUpdateBody, {
        partner: props.partner,
        url: props.url
      }), /*#__PURE__*/_jsx(ArtistFundraisingPickUpdateFooter, {
        isEditing: isEditing,
        setIsEditing: setIsEditing
      }), /*#__PURE__*/_jsx(VSpacer24, {})]
    })
  });
}