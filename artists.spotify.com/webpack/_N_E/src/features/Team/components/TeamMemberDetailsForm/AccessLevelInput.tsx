import React from 'react';
import { FormGroup, FormHelpText, FormRadio, Type, gray90, screenSmMin, screenXsMax, spacer24, spacer64 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { AccessLevel, accessLevelName, toAccessLevel } from '../../lib/model/AccessLevel';
import AdminSvg from './images/Admin.svg';
import EditorSvg from './images/Editor.svg';
import ReaderSvg from './images/Reader.svg';
import { useT } from '@mrkt/features/i18n';
import { useWebTeamMemberDetailsFormAdminRadioButtonLogger, useWebTeamMemberDetailsFormEditorRadioButtonLogger, useWebTeamMemberDetailsFormReaderRadioButtonLogger } from '../../lib/hooks/useWebTeamMemberDetailsFormUbi'; // TODO(TeamsReducerRefactor): use layoutType instead of @media to be consistent

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var ChangeAccessLevelContainer = styled.div.withConfig({
  displayName: "AccessLevelInput__ChangeAccessLevelContainer",
  componentId: "sc-1610ad2-0"
})(["margin-bottom:", ";@media (min-width:", "){display:flex;width:100%;margin-bottom:", ";}"], spacer24, screenSmMin, spacer64);
var AccessLevelContainer = styled.div.withConfig({
  displayName: "AccessLevelInput__AccessLevelContainer",
  componentId: "sc-1610ad2-1"
})(["border:solid 1px ", ";display:flex;justify-content:center;padding-top:", ";padding-bottom:", ";@media (min-width:", "){width:25%;}@media (max-width:", "){width:100%;border:0;padding:0;}"], gray90, spacer24, spacer24, screenSmMin, screenXsMax);
var AccessLevelDescriptionContainer = styled.div.withConfig({
  displayName: "AccessLevelInput__AccessLevelDescriptionContainer",
  componentId: "sc-1610ad2-2"
})(["border:solid 1px ", ";border-left:0;display:flex;padding-inline-start:", ";@media (min-width:", "){padding-inline-start:", ";width:75%;}@media (max-width:", "){border-right:0;padding-bottom:", ";padding-top:", ";width:100%;}"], gray90, spacer24, screenSmMin, spacer64, screenXsMax, spacer24, spacer24);
var RadioGroupContainer = styled(FormGroup).withConfig({
  displayName: "AccessLevelInput__RadioGroupContainer",
  componentId: "sc-1610ad2-3"
})(["margin-top:", ";@media (min-width:", "){display:initial;min-width:150px;}"], spacer24, screenSmMin);
var ImageContainer = styled.img.withConfig({
  displayName: "AccessLevelInput__ImageContainer",
  componentId: "sc-1610ad2-4"
})(["flex-shrink:0;width:60px;@media (max-width:", "){margin-right:", ";width:44px;}"], screenXsMax, spacer24);
var AccessTextContainer = styled.div.withConfig({
  displayName: "AccessLevelInput__AccessTextContainer",
  componentId: "sc-1610ad2-5"
})(["display:flex;flex-direction:column;justify-content:center;@media (min-width:", "){margin-inline-start:", ";p{white-space:normal;}}"], screenSmMin, spacer24);

var RadioGroup = function RadioGroup(_ref) {
  var accessLevelHeadingId = _ref.accessLevelHeadingId,
      isSmallScreen = _ref.isSmallScreen,
      items = _ref.items,
      value = _ref.value,
      _onChange = _ref.onChange,
      error = _ref.error;
  return /*#__PURE__*/_jsxs(RadioGroupContainer, {
    "aria-labelledby": accessLevelHeadingId,
    role: "radiogroup",
    inline: isSmallScreen,
    children: [items.map(function (i) {
      return /*#__PURE__*/_jsx(FormRadio, {
        id: i.value,
        name: "access-level",
        onChange: function onChange() {
          return _onChange(i.value);
        },
        "data-testid": "radio-".concat(i.value.toLocaleLowerCase()),
        checked: i.value === value,
        "aria-required": "true",
        "aria-describedby": "".concat(i.label.toLocaleLowerCase(), "-description"),
        children: i.label
      }, i.value);
    }), /*#__PURE__*/_jsx(FormHelpText, {
      "data-testid": "radio-error",
      error: !!error,
      children: error
    })]
  });
};

var AccessDescription = function AccessDescription(_ref2) {
  var id = _ref2.id,
      image = _ref2.image,
      title = _ref2.title,
      description = _ref2.description;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ImageContainer, {
      src: image,
      alt: "admin"
    }), /*#__PURE__*/_jsxs(AccessTextContainer, {
      id: id,
      children: [/*#__PURE__*/_jsx(Type.h1, {
        "data-testid": "access-description-title",
        variant: Type.heading4,
        children: /*#__PURE__*/_jsx("b", {
          children: title
        })
      }), /*#__PURE__*/_jsx(Type.p, {
        children: description
      })]
    })]
  });
};

export var AccessLevelInput = function AccessLevelInput(_ref3) {
  var accessLevelHeadingId = _ref3.accessLevelHeadingId,
      _onChange2 = _ref3.onChange,
      value = _ref3.value,
      error = _ref3.error,
      _ref3$layoutType = _ref3.layoutType,
      layoutType = _ref3$layoutType === void 0 ? 'full' : _ref3$layoutType;
  var t = useT();
  var logAdminAccess = useWebTeamMemberDetailsFormAdminRadioButtonLogger();
  var logEditorAccess = useWebTeamMemberDetailsFormEditorRadioButtonLogger();
  var logReaderAccess = useWebTeamMemberDetailsFormReaderRadioButtonLogger();
  return /*#__PURE__*/_jsxs(ChangeAccessLevelContainer, {
    children: [/*#__PURE__*/_jsx(AccessLevelContainer, {
      children: /*#__PURE__*/_jsx(RadioGroup, {
        accessLevelHeadingId: accessLevelHeadingId,
        isSmallScreen: layoutType === 'compact',
        items: Object.values(AccessLevel).map(function (v) {
          return {
            value: v,
            label: accessLevelName(v, t)
          };
        }),
        value: value || '',
        onChange: function onChange(accessLevel) {
          _onChange2(toAccessLevel(accessLevel));

          if (accessLevel === AccessLevel.Admin) {
            logAdminAccess();
          } else if (accessLevel === AccessLevel.Editor) {
            logEditorAccess();
          } else {
            logReaderAccess();
          }
        },
        error: error
      })
    }), /*#__PURE__*/_jsxs(AccessLevelDescriptionContainer, {
      children: [value === AccessLevel.Admin && /*#__PURE__*/_jsx(AccessDescription, {
        id: "admin-description",
        image: AdminSvg,
        title: t('ACCESS_LEVEL_ADMIN_ACCESS_TITLE', 'Admin access', 'Admin access level title'),
        description: t('ACCESS_LEVEL_ADMIN_DESCRIPTION', 'Admins can add, update, and remove team members, billing info, and artist info. Limit use.', 'Admin access level description')
      }), value === AccessLevel.Editor && /*#__PURE__*/_jsx(AccessDescription, {
        id: "editor-description",
        image: EditorSvg,
        title: t('ACCESS_LEVEL_EDITOR_ACCESS_TITLE', 'Editor access', 'Editor access level title'),
        description: t('ACCESS_LEVEL_EDITOR_DESCRIPTION', 'Editors can add, update, and remove artist info, pitches, and campaigns.', 'Editor access level description')
      }), value === AccessLevel.Reader && /*#__PURE__*/_jsx(AccessDescription, {
        id: "Reader-description",
        image: ReaderSvg,
        title: t('ACCESS_LEVEL_READER_ACCESS_TITLE', 'Reader access', 'Reader access level title'),
        description: t('ACCESS_LEVEL_READER_DESCRIPTION', 'Readers can check out stats and artist profiles.', 'Reader access level description')
      })]
    })]
  });
};