import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import { FormGroup, FormInput, FormPopoverTrigger, FormSelect, spacer8 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { TeamType } from '../../lib/model/Team';
import { assertUnreachable } from '../../lib/util/assertUnreachable';
import { InputFormGroup, ErrorText } from './sharedStyles';
import { OTHER_ROLE } from './TeamMemberDetails';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var RoleInputGroup = styled(FormGroup).withConfig({
  displayName: "RoleInput__RoleInputGroup",
  componentId: "rj3195-0"
})(["width:100%;padding-bottom:0;"]);
var StyledInputFormGroup = styled(InputFormGroup).withConfig({
  displayName: "RoleInput__StyledInputFormGroup",
  componentId: "rj3195-1"
})(["div{span:last-child{margin-left:auto;}}"]); // still need the 100% width from RoleInputGroup
// remove padding-bottom so error isn't far from input

var OtherRoleInputGroup = styled(RoleInputGroup).withConfig({
  displayName: "RoleInput__OtherRoleInputGroup",
  componentId: "rj3195-2"
})(["padding-top:", ";padding-bottom:0;"], spacer8);
export var RoleInput = function RoleInput(_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? 'role' : _ref$id,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      _onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      error = _ref.error,
      _ref$forceShowErrors = _ref.forceShowErrors,
      forceShowErrors = _ref$forceShowErrors === void 0 ? false : _ref$forceShowErrors,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? 'Role' : _ref$label,
      teamType = _ref.teamType,
      _ref$required = _ref.required,
      required = _ref$required === void 0 ? false : _ref$required,
      _ref$popover = _ref.popover,
      popover = _ref$popover === void 0 ? undefined : _ref$popover,
      _ref$popoverPlacement = _ref.popoverPlacement,
      popoverPlacement = _ref$popoverPlacement === void 0 ? undefined : _ref$popoverPlacement;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      hasFocus = _React$useState2[0],
      setHasFocus = _React$useState2[1];

  var _useState = useState(false),
      isTouched = _useState[0],
      setIsTouched = _useState[1];

  var showError = (isTouched || forceShowErrors) && !!error;
  var visibleError = showError && error;
  var t = useT();
  var artistRoles = [t('ROLE_INPUT_ARTIST_ROLE_AGENT', 'Agent', 'The artist team member role of Agent'), t('ROLE_INPUT_ARTIST_ROLE_ARTIST', 'Artist', 'The artist team member role of Artist'), t('ROLE_INPUT_ARTIST_ROLE_COMPOSER', 'Composer', 'The artist team member role of Composer'), t('ROLE_INPUT_ARTIST_ROLE_LABEL', 'Label', 'The artist team member role of Label'), t('ROLE_INPUT_ARTIST_ROLE_MANAGER', 'Manager', 'The artist team member role of Manager'), t('ROLE_INPUT_ARTIST_ROLE_MUSICIAN', 'Musician', 'The artist team member role of Musician'), t('ROLE_INPUT_ARTIST_ROLE_PRODUCER', 'Producer', 'The artist team member role of Producer'), t('ROLE_INPUT_ARTIST_ROLE_PUBLISHER', 'Publisher', 'The artist team member role of Publisher'), t('ROLE_INPUT_ARTIST_ROLE_SONGWRITER', 'Songwriter', 'The artist team member role of Songwriter')];
  var labelRoles = [t('ROLE_INPUT_LABEL_ROLE_A&R', 'A&R', 'The artist team member role of A&R'), t('ROLE_INPUT_LABEL_ROLE_DIGITAL', 'Digital', 'The artist team member role of Digital'), t('ROLE_INPUT_LABEL_ROLE_DIGITAL_MARKETING', 'Digital marketing', 'The artist team member role of Digital marketing'), t('ROLE_INPUT_LABEL_ROLE_MANAGER', 'Manager', 'The label team member role of Manager'), t('ROLE_INPUT_LABEL_ROLE_PRODUCT_MANAGER', 'Product manager', 'The label team member role of Product manager'), t('ROLE_INPUT_LABEL_ROLE_RADIO_TEAM', 'Radio team', 'The label team member role of Radio team'), t('ROLE_INPUT_LABEL_ROLE_SALES', 'Sales', 'The label team member role of Sales')];

  var roles = function () {
    switch (teamType) {
      case TeamType.artist:
        return artistRoles;

      case TeamType.label:
        return labelRoles;

      default:
        return assertUnreachable(teamType);
    }
  }();

  var formatString = function formatString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).trim();
  };

  var isSelectedRoleChosen = !value || roles.includes(value) && value !== OTHER_ROLE;
  var otherVisible = hasFocus || !isSelectedRoleChosen;

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      popoverVisible = _React$useState4[0],
      setPopoverVisible = _React$useState4[1];

  return /*#__PURE__*/_jsxs(StyledInputFormGroup, {
    children: [/*#__PURE__*/_jsx(RoleInputGroup, {
      label: label,
      labelFor: id,
      indicator: required ? 'required' : undefined,
      popover: popover && /*#__PURE__*/_jsx(FormPopoverTrigger, {
        "aria-label": "help",
        placement: popoverPlacement,
        overlay: popoverVisible && popover,
        onShow: function onShow() {
          return setPopoverVisible(true);
        },
        onHide: function onHide() {
          return setPopoverVisible(false);
        }
      }),
      children: /*#__PURE__*/_jsxs(FormSelect, {
        id: "role",
        "data-slo-id": "role",
        error: showError,
        "aria-invalid": showError,
        "aria-describedby": showError ? "".concat(id, "-error") : undefined,
        value: otherVisible ? OTHER_ROLE : value,
        onChange: function onChange(e) {
          _onChange(e.target.value);
        },
        onFocus: onFocus,
        onBlur: function onBlur() {
          return setIsTouched(!otherVisible);
        },
        "data-testid": "role",
        "aria-required": required,
        children: [value ? null : /*#__PURE__*/_jsx("option", {
          value: "",
          children: t('ROLE_INPUT_CHOOSE_ROLE', 'Choose role', 'The default display text prompting people to choose a role from the dropdown.')
        }), roles.map(function (item) {
          return /*#__PURE__*/_jsx("option", {
            value: item,
            children: item
          }, item);
        }), /*#__PURE__*/_jsx("option", {
          value: OTHER_ROLE,
          children: t('ROLE_INPUT_OTHER_OPTION_VALUE', 'Other', 'The role is not listed here. I would like to enter my own role.')
        })]
      })
    }), otherVisible && /*#__PURE__*/_jsx(OtherRoleInputGroup, {
      label: t('ROLE_INPUT_OTHER_LABEL', 'Please specify other role', 'Please specify a role on the team.'),
      indicator: required ? 'required' : undefined,
      labelFor: "role-other",
      children: /*#__PURE__*/_jsx(FormInput, {
        id: "role-other",
        "data-testid": "role-other",
        "data-slo-id": "role-other",
        error: showError,
        type: "text",
        value: value === OTHER_ROLE ? '' : value,
        onFocus: function onFocus() {
          return setHasFocus(true);
        },
        onChange: function onChange(e) {
          return _onChange(e.target.value || OTHER_ROLE);
        },
        onBlur: function onBlur(e) {
          _onChange(formatString(e.target.value) || OTHER_ROLE);

          setHasFocus(false);
          setIsTouched(true);
        }
      })
    }), /*#__PURE__*/_jsx(ErrorText, {
      "data-testid": "role-error",
      error: !!visibleError,
      children: visibleError
    })]
  });
};