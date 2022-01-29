// ignore-string-externalization
import React from 'react';
import { Redirect } from 'react-router-dom';
import { TeamType } from '../lib/model/Team';
import { ArtistsTab } from './ArtistsTab';
import { jsx as _jsx } from "react/jsx-runtime";
export var ArtistsTabRoute = function ArtistsTabRoute(_ref) {
  var currentTeam = _ref.currentTeam;
  var isLabelTeam = currentTeam.type === TeamType.label;

  if (!isLabelTeam) {
    return /*#__PURE__*/_jsx(Redirect, {
      to: "/"
    });
  }

  return /*#__PURE__*/_jsx(ArtistsTab, {});
};