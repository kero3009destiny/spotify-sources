import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
import styled from 'styled-components';
import { FormRadio } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { FormGroup } from '../StyleElements';
import { jsx as _jsx } from "react/jsx-runtime";
var Span16 = styled.span.withConfig({
  displayName: "RadioGroup__Span16",
  componentId: "xoys24-0"
})(["font-size:16px;line-height:24px;"]);
export function RadioGroup(props) {
  var t = useT();
  var options = {
    fundraisinglink: {
      type: 'input',
      displayName: t('artistprofile_fundraising_forminput_radiogroup_1', 'Fundraising link', '')
    },
    musicrelieforg: {
      type: 'select',
      displayName: t('artistprofile_fundraising_forminput_radiogroup_2', 'Music Relief organization', 'Music Relief organizations were picked by Spotify for the Artist Fundraising Pick initiative. Spotify partnered with 20 such organizations across the globe.')
    }
  };

  function onProviderChange(ev) {
    var nextProvider = ev.target.value;

    if (nextProvider === 'musicrelieforg') {
      props.link.reset();
      props.org.reset();
      props.provider.setValue(ev);
      props.setIsFundraisingLinkSelected(false);
    } else {
      props.link.reset();
      props.org.reset();
      props.provider.reset();
      props.setIsFundraisingLinkSelected(true);
    }
  }

  var radioGroupAriaLabel = props.isEditing ? t('artistprofile_fundraising_forminput_radiogroup_3', 'Edit your Artist Fundraising Pick', 'Artist Fundraising Pick should be translated as it is in the consumer product. Refer to translation memory.') : t('artistprofile_fundraising_forminput_radiogroup_4', 'Set your Artist Fundraising Pick', 'Artist Fundraising Pick should be translated as it is in the consumer product. Refer to translation memory.');

  function getChecked(key, providerValue) {
    return (// TODO This is unfortunate, maybe refactor
      key === providerValue && !props.isFundraisingLinkSelected || key === 'fundraisinglink' && props.isFundraisingLinkSelected
    );
  }

  return /*#__PURE__*/_jsx(FormGroup, {
    role: "radiogroup",
    "aria-label": radioGroupAriaLabel,
    children: Object.entries(options).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          option = _ref2[1];

      var formRadioId = "fundraising-pick-type-".concat(key);
      var isChecked = getChecked(key, props.provider.value);
      return /*#__PURE__*/_jsx(React.Fragment, {
        children: /*#__PURE__*/_jsx(FormRadio, {
          "aria-checked": isChecked,
          checked: isChecked,
          id: formRadioId,
          name: "fundraising-pick-type",
          onChange: onProviderChange,
          value: key,
          children: /*#__PURE__*/_jsx(Span16, {
            children: option.displayName
          })
        })
      }, key);
    })
  });
}