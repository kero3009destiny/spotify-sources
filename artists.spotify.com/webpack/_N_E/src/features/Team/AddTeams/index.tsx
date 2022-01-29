// ignore-string-externalization
import React from 'react';
import { AddTeamsPage } from './components/AddTeamsPage';
import { SelectTeamTypePage } from './SelectTeamTypePage';
import { useParams } from 'react-router';
import { ArtistSearchPage } from './ArtistSearchPage';
import { LabelSearchPage } from './LabelSearchPage';
import { SocialVerificationPage } from './SocialVerificationPage';
import { JoinRequestPage } from './JoinRequestPage';
import { CreateLabelPage } from './CreateLabelPage';
import { ConfirmationPage } from './ConfirmationPage';
import { AddContentPage } from './AddContentPage';
import { jsx as _jsx } from "react/jsx-runtime";

var Step = function Step(_ref) {
  var step = _ref.step;

  switch (step) {
    case 'artist-search':
      return /*#__PURE__*/_jsx(ArtistSearchPage, {});

    case 'label-search':
      return /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(LabelSearchPage, {})
      });

    case 'confirm':
      return /*#__PURE__*/_jsx(SocialVerificationPage, {});

    case 'join-request':
      return /*#__PURE__*/_jsx(JoinRequestPage, {});

    case 'create-team':
      return /*#__PURE__*/_jsx(CreateLabelPage, {});

    case 'add-content':
      return /*#__PURE__*/_jsx(AddContentPage, {});

    case 'request-submitted':
      return /*#__PURE__*/_jsx(ConfirmationPage, {});

    default:
      return /*#__PURE__*/_jsx(SelectTeamTypePage, {});
  }
};

export var AddTeams = function AddTeams(_ref2) {
  var testStep = _ref2.testStep;

  var _useParams = useParams(),
      step = _useParams.step;

  return /*#__PURE__*/_jsx(AddTeamsPage, {
    step: testStep || step,
    children: /*#__PURE__*/_jsx(Step, {
      step: testStep || step
    })
  });
};