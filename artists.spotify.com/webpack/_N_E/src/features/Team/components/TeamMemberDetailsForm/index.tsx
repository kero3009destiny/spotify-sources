import _toConsumableArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["fullName"],
    _excluded2 = ["firstName", "lastName"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useEffect, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';
import styled from 'styled-components';
import { ButtonPrimary, Type, screenSmMin, spacer8, spacer24, red } from '@spotify-internal/encore-web';
import { accessLevelName } from '../../lib/model/AccessLevel';
import { Input } from './Input';
import { RoleInput } from './RoleInput';
import { AccessLevelInput } from './AccessLevelInput';
import { getNames, toFullName } from '../../lib';
import { useValidationErrors } from '../../lib/selectors/useValidationErrors';
import { useT } from '@mrkt/features/i18n';
import { useWebTeamMemberDetailsFormBusinessEmailTextboxLogger, useWebTeamMemberDetailsFormCompanyTextboxLogger, useWebTeamMemberDetailsFormFirstNameTextboxLogger, useWebTeamMemberDetailsFormLastNameTextboxLogger, useWebTeamMemberDetailsFormRoleDropdownElementSelectLogger, useWebTeamMemberDetailsFormRoleDropdownLogger } from '../../lib/hooks/useWebTeamMemberDetailsFormUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var InputGroup = styled.div.withConfig({
  displayName: "TeamMemberDetailsForm__InputGroup",
  componentId: "qlzx4j-0"
})(["@media (min-width:", "){display:flex;flex-wrap:wrap;margin-right:-", ";}margin-left:-", ";"], screenSmMin, spacer8, spacer8);
var ActionContainer = styled.div.withConfig({
  displayName: "TeamMemberDetailsForm__ActionContainer",
  componentId: "qlzx4j-1"
})(["display:flex;"]);
var ContentsContainer = styled.div.withConfig({
  displayName: "TeamMemberDetailsForm__ContentsContainer",
  componentId: "qlzx4j-2"
})(["margin-top:", ";"], spacer24);
var RequiredFieldsAsterisk = styled.span.attrs({
  'aria-hidden': 'true'
}).withConfig({
  displayName: "TeamMemberDetailsForm__RequiredFieldsAsterisk",
  componentId: "qlzx4j-3"
})(["color:", ";margin-right:", ";"], red, spacer8);
export var TeamMemberDetailsForm = function TeamMemberDetailsForm(_ref) {
  var _onSubmit = _ref.onSubmit,
      currentTeamName = _ref.currentTeamName,
      currentTeamType = _ref.currentTeamType,
      submitButtonText = _ref.submitButtonText,
      _ref$isSubmitting = _ref.isSubmitting,
      isSubmitting = _ref$isSubmitting === void 0 ? false : _ref$isSubmitting,
      _ref$initialDetails = _ref.initialDetails,
      initialDetails = _ref$initialDetails === void 0 ? {} : _ref$initialDetails,
      _ref$disabledFields = _ref.disabledFields,
      disabledFields = _ref$disabledFields === void 0 ? new Set() : _ref$disabledFields,
      _ref$initialForceShow = _ref.initialForceShowErrors,
      initialForceShowErrors = _ref$initialForceShow === void 0 ? false : _ref$initialForceShow,
      _ref$disableSendWhenC = _ref.disableSendWhenClean,
      disableSendWhenClean = _ref$disableSendWhenC === void 0 ? true : _ref$disableSendWhenC,
      _ref$layoutType = _ref.layoutType,
      layoutType = _ref$layoutType === void 0 ? 'full' : _ref$layoutType,
      submitMessage = _ref.submitMessage,
      otherButtons = _ref.otherButtons;
  // useMemo is used here so the reference can safely be used in useEffect
  var t = useT();
  var initialDetailsWithNameExpanded = useMemo(function () {
    var fullName = initialDetails.fullName,
        otherInitialDetails = _objectWithoutProperties(initialDetails, _excluded);

    return _objectSpread(_objectSpread(_objectSpread({}, otherInitialDetails), getNames(fullName || '')), {}, {
      // AccessLevel must be pre-set
      accessLevel: initialDetails.accessLevel
    });
  }, [initialDetails]);

  var _useState = useState(initialDetailsWithNameExpanded),
      details = _useState[0],
      setDetails = _useState[1];

  var _useState2 = useState(initialForceShowErrors),
      forceShowErrors = _useState2[0],
      setForceShowErrors = _useState2[1];

  var logFirstName = useWebTeamMemberDetailsFormFirstNameTextboxLogger();
  var logLastName = useWebTeamMemberDetailsFormLastNameTextboxLogger();
  var logBusinessEmail = useWebTeamMemberDetailsFormBusinessEmailTextboxLogger();
  var logCompany = useWebTeamMemberDetailsFormCompanyTextboxLogger();
  var logRoleDropdownReveal = useWebTeamMemberDetailsFormRoleDropdownLogger();
  var logRoleDropdownSelect = useWebTeamMemberDetailsFormRoleDropdownElementSelectLogger();

  var ubiLogger = function ubiLogger(ubiId) {
    if (ubiId === 'firstName') {
      logFirstName();
    } else if (ubiId === 'lastName') {
      logLastName();
    } else if (ubiId === 'businessEmail') {
      logBusinessEmail();
    } else if (ubiId === 'company') {
      logCompany();
    } else if (ubiId === 'role') {
      logRoleDropdownReveal();
    }
  }; // If initialDetails changes, merge with current details


  useEffect(function () {
    setDetails(initialDetailsWithNameExpanded);
  }, [initialDetailsWithNameExpanded, setDetails]);
  var errors = useValidationErrors(details, disabledFields);
  var hasErrors = errors.size > 0;
  var isClean = disableSendWhenClean && isEqual(details, initialDetailsWithNameExpanded);
  var isDisabled = isClean || hasErrors || isSubmitting;
  var buttonSize = layoutType === 'compact' ? ButtonPrimary.sm : ButtonPrimary.md;
  var accessLevelHeadingId = 'access-level-heading';

  var inputProps = function inputProps(id, label) {
    return {
      id: id,
      label: label,
      onChange: function onChange(v) {
        setDetails(_objectSpread(_objectSpread({}, details), {}, _defineProperty({}, id, v)));
        id === 'role' && logRoleDropdownSelect(v);
      },
      onFocus: function onFocus() {
        return ubiLogger(id);
      },
      disabled: disabledFields.has(id),
      value: details[id],
      forceShowErrors: forceShowErrors,
      error: errors.get(id),
      required: true
    };
  };

  return /*#__PURE__*/_jsx(ContentsContainer, {
    children: /*#__PURE__*/_jsxs("form", {
      onSubmit: function onSubmit(e) {
        e.preventDefault();

        var _ref2 = details,
            firstName = _ref2.firstName,
            lastName = _ref2.lastName,
            otherDetails = _objectWithoutProperties(_ref2, _excluded2);

        if (!isDisabled) _onSubmit(_objectSpread(_objectSpread({}, otherDetails), {}, {
          fullName: toFullName(firstName, lastName)
        }));
      },
      children: [/*#__PURE__*/_jsxs(InputGroup, {
        children: [/*#__PURE__*/_jsx(Input, _objectSpread({}, inputProps('firstName', t('TEAM_MEMBER_DETAILS_FORM_LABEL_FIRST_NAME', 'First name', 'Form label for the first name input field')))), /*#__PURE__*/_jsx(Input, _objectSpread({}, inputProps('lastName', t('TEAM_MEMBER_DETAILS_FORM_LABEL_LAST_NAME', 'Last name', 'Form label for the last name input field')))), /*#__PURE__*/_jsx(Input, _objectSpread({}, inputProps('businessEmail', t('TEAM_MEMBER_DETAILS_FORM_LABEL_BUSINESS_EMAIL', 'Business email', 'Form label for the business email input field')))), /*#__PURE__*/_jsx(RoleInput, _objectSpread(_objectSpread({}, inputProps('role', t('TEAM_MEMBER_DETAILS_FORM_LABEL_ROLE', 'Role', 'Form label for the role input field'))), {}, {
          teamType: currentTeamType
        })), /*#__PURE__*/_jsx(Input, _objectSpread({}, inputProps('company', t('TEAM_MEMBER_DETAILS_FORM_LABEL_COMPANY', 'Company', 'Form label for the company input field'))))]
      }), /*#__PURE__*/_jsx(Type, {
        as: "h2",
        id: accessLevelHeadingId,
        variant: Type.heading3,
        children: t('TEAM_MEMBER_DETAILS_FORM_LABEL_ACCESS_LEVEL', 'Choose access level', 'Form label for the access level input field. Choose an access level.')
      }), /*#__PURE__*/_jsx(AccessLevelInput, {
        accessLevelHeadingId: accessLevelHeadingId,
        value: details.accessLevel,
        onChange: function onChange(accessLevel) {
          setDetails(_objectSpread(_objectSpread({}, details), {}, {
            accessLevel: accessLevel
          }));
        },
        error: errors.get('accessLevel'),
        layoutType: layoutType
      }), (isSubmitting || !isDisabled) && details.accessLevel && /*#__PURE__*/_jsx("p", {
        dangerouslySetInnerHTML: {
          __html: currentTeamName ? t('TEAM_MEMBER_DETAILS_ACCESS_LEVEL_SUBMISSION_MESSAGE_WITH_TEAM_NAME', 'You are giving this team member <strong>{accessLevelName}</strong> access to all {teamName} content.', "You are giving this team member access to this team's content", {
            accessLevelName: accessLevelName(details.accessLevel, t),
            teamName: currentTeamName
          }) : t('TEAM_MEMBER_DETAILS_ACCESS_LEVEL_SUBMISSION_MESSAGE', 'You are giving this team member <strong>{accessLevelName}</strong> access to all team content.', "You are giving this team member access to this team's content", {
            accessLevelName: accessLevelName(details.accessLevel, t)
          })
        }
      }), hasErrors && /*#__PURE__*/_jsxs("p", {
        children: [/*#__PURE__*/_jsx(RequiredFieldsAsterisk, {
          children: "*"
        }), t('TEAM_MEMBER_DETAILS_ERROR_MESSAGE', 'Complete all required fields in order to save changes.', 'You must complete all required fields in order to save changes. There is at least one form error on the page.')]
      }), /*#__PURE__*/_jsxs(ActionContainer, {
        children: [/*#__PURE__*/_jsx(ButtonPrimary, {
          disabled: isDisabled,
          "data-testid": "submit",
          "data-slo-id": "send-invite",
          type: "submit",
          title: function () {
            if (isClean) return t('TEAM_MEMBER_DETAILS_NO_CHANGE_ERROR', 'Make a change to save', "Make a change to save this team member's details");
            if (isSubmitting) return !!submitMessage ? submitMessage : t('TEAM_MEMBER_DETAILS_UPDATE_MESSAGE', 'Updating details', "Updating team member's details loading state.");
            if (hasErrors) return _toConsumableArray(errors.values()).join('\n');
            return undefined;
          }(),
          onClick: function onClick() {
            return setForceShowErrors(true);
          },
          buttonSize: buttonSize,
          children: !!submitButtonText ? submitButtonText : t('TEAM_MEMBER_DETAILS_SUBMIT', 'Submit', "Submit updates to the team member's details.")
        }), otherButtons]
      })]
    })
  });
};