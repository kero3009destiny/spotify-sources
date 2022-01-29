import { Type, FormGroup, FormRadio, FormHelpText, screenSmMin, spacer24, spacer8 } from '@spotify-internal/encore-web';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from '../sharedStyles';
import { useT } from '@mrkt/features/i18n';
import { useLabelOrDistributorFormRadioLogger, useRestartFlowLinkLogger } from '../../store/hooks/useAccessUserDetailsFormUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LabelOrDistributorPanel = styled.div.withConfig({
  displayName: "utils__LabelOrDistributorPanel",
  componentId: "sc-1x7aho2-0"
})(["@media (min-width:", "){padding:", ";}"], screenSmMin, function (props) {
  return props.teamDetails ? "0 ".concat(spacer8, " 0") : "".concat(spacer24, " ").concat(spacer8, " 0");
});
export var LabelArtistOrDistributor = function LabelArtistOrDistributor(_ref) {
  var _ref$teamDetails = _ref.teamDetails,
      teamDetails = _ref$teamDetails === void 0 ? false : _ref$teamDetails,
      isArtist = _ref.isArtist;
  var t = useT();
  var logRestartFlowLinkClick = useRestartFlowLinkLogger();
  var restartFlowUrl = 'https://artists.spotify.com/claim';
  return /*#__PURE__*/_jsxs(LabelOrDistributorPanel, {
    teamDetails: teamDetails,
    children: [/*#__PURE__*/_jsx(Type, {
      variant: "body1",
      weight: "black",
      children: isArtist ? t('LABEL_OR_DISTRIBUTOR_NOT_AN_ARTIST_TITLE', 'Not an artist?', 'Are you a label or distributor team member, not an artist?') : t('LABEL_OR_DISTRIBUTOR_NOT_A_LABEL_OR_DISTRIBUTOR', 'Not a label or distributor?', 'Are you an artist team member, not a label or distributor?')
    }), /*#__PURE__*/_jsx(Type, {
      onClick: function onClick() {
        return logRestartFlowLinkClick(restartFlowUrl);
      },
      as: "p",
      variant: "body2",
      children: isArtist ? /*#__PURE__*/_jsx(Link, {
        href: restartFlowUrl,
        children: t('LABEL_OR_DISTRIBUTOR_NOT_AN_ARTIST_DESCRIPTION', "If you're a label or distributor team member, go here instead.", 'Are you a label or distributor team member, not an artist? Click the following link to go back and select the correct team type.')
      }) : /*#__PURE__*/_jsx(Link, {
        href: restartFlowUrl,
        children: t('ARTIST_NOT_A_LABEL_DESCRIPTION', "If you're an artist team member, go here instead.", 'Are you an artist team member, not a label or distributor? Click the following link to go back and select the correct team type.')
      })
    })]
  });
};
export var LabelOrDistributorFormRadio = function LabelOrDistributorFormRadio(_ref2) {
  var id = _ref2.id,
      label = _ref2.label,
      _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? '' : _ref2$value,
      error = _ref2.error,
      _onChange = _ref2.onChange,
      _ref2$forceShowErrors = _ref2.forceShowErrors,
      forceShowErrors = _ref2$forceShowErrors === void 0 ? false : _ref2$forceShowErrors;

  var _useState = useState(false),
      isTouched = _useState[0],
      setIsTouched = _useState[1];

  var showError = isTouched || forceShowErrors;
  var visibleError = showError && error;
  var t = useT();
  var logSelectLabelOrDistributor = useLabelOrDistributorFormRadioLogger();
  return /*#__PURE__*/_jsx(LabelOrDistributorPanel, {
    teamDetails: true,
    children: /*#__PURE__*/_jsxs(FormGroup, {
      label: label,
      labelFor: id,
      id: id,
      "data-testid": id,
      inline: true,
      value: value,
      onChange: function onChange(e) {
        _onChange(e.target.value);

        logSelectLabelOrDistributor(e.target.value);
      },
      onBlur: function onBlur(e) {
        _onChange(e.target.value.trim());

        setIsTouched(true);
      },
      children: [/*#__PURE__*/_jsx(FormRadio, {
        name: "teamType",
        "data-testid": "label",
        id: "label",
        value: "LABEL",
        "aria-invalid": showError,
        "aria-describedby": showError ? "".concat(id, "-error") : undefined,
        defaultChecked: true,
        children: t('LABEL_OR_DISTRIBUTOR_RADIO_BUTTON_LABEL', 'Label', 'Label team type')
      }), /*#__PURE__*/_jsx(FormRadio, {
        name: "teamType",
        "data-testid": "distributor",
        id: "distributor",
        value: "DISTRIBUTOR",
        "aria-invalid": showError,
        "aria-describedby": showError ? "".concat(id, "-error") : undefined,
        children: t('LABEL_OR_DISTRIBUTOR_RADIO_BUTTON_DISTRIBUTOR', 'Distributor', 'Distributor team type')
      }), /*#__PURE__*/_jsx(FormHelpText, {
        id: "".concat(id, "-error"),
        "data-testid": "".concat(id, "-error"),
        error: !!visibleError,
        children: visibleError
      })]
    })
  });
};