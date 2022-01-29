import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import { Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { PencilButton } from '../PencilButton';
import { getUsernameOrLink } from './LinkHelper';
import { LinkEditor } from './LinkEditor';
import styles from './index.module.scss';
import { useProfileSwitcheroo } from '../utils/useProfileSwitcheroo';
import { useFormFields } from './lib/useFormFields';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function typedObjectKeys(obj) {
  return Object.keys(obj);
}

export var SocialLinks = function SocialLinks(props) {
  var autobiography = props.autobiography;
  var links = autobiography && autobiography.links;
  var t = useT();
  var formFields = useFormFields();
  var structuredLinks = {};
  typedObjectKeys(formFields).map(function (type) {
    return links && links[type] && (structuredLinks[type] = {
      shortname: type,
      link: getUsernameOrLink(type, links[type], {
        username: true
      }),
      error: false
    });
  });

  var _useState = useState(false),
      showLinkEditor = _useState[0],
      setShowLinkEditor = _useState[1];

  var _useState2 = useState(structuredLinks),
      clientLinks = _useState2[0],
      setClientLinks = _useState2[1];

  var _useState3 = useState(structuredLinks),
      uploadedLinks = _useState3[0],
      setUploadedLinks = _useState3[1];

  var _useProfileSwitcheroo = useProfileSwitcheroo(function () {
    return setShowLinkEditor(true);
  }),
      renderedProfileSwitcheroo = _useProfileSwitcheroo.renderedProfileSwitcheroo,
      _useProfileSwitcheroo2 = _useProfileSwitcheroo.organizationUri,
      organizationUri = _useProfileSwitcheroo2 === void 0 ? '' : _useProfileSwitcheroo2,
      showProfileSwitcheroo = _useProfileSwitcheroo.showProfileSwitcheroo;

  var onSave = function onSave() {
    // convert username to URL
    var usernameToLink = {};
    typedObjectKeys(clientLinks).map(function (type) {
      return usernameToLink[type] = getUsernameOrLink(type, clientLinks[type].link, {
        link: true
      });
    });
    props.updateSocialLinks(props.artistId, {
      links: usernameToLink
    }, organizationUri);
    setClientLinks(_objectSpread({}, clientLinks));
    setUploadedLinks(_objectSpread({}, clientLinks));
    setShowLinkEditor(false);
  };

  var onStartEditing = function onStartEditing() {
    showProfileSwitcheroo();
  };

  var onCancelEditing = function onCancelEditing() {
    setClientLinks(_objectSpread({}, uploadedLinks));
    setShowLinkEditor(false);
  };

  var onUpdateLink = function onUpdateLink(linkType, value) {
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var updatedLinks = _objectSpread(_objectSpread({}, clientLinks), {}, _defineProperty({}, linkType, {
      shortname: linkType,
      link: value,
      error: error
    }));

    setClientLinks(_objectSpread({}, updatedLinks));
  };

  var onChangeLink = function onChangeLink(event, linkType) {
    return onUpdateLink(linkType, event.target.value);
  };

  var onBlurLink = function onBlurLink(event, linkType) {
    var inputValue = event.target.value;
    var hasValidLink = inputValue && getUsernameOrLink(linkType, inputValue, {
      username: true
    });

    if (hasValidLink) {
      onUpdateLink(linkType, hasValidLink);
    }

    if (!hasValidLink && inputValue !== '') {
      onUpdateLink(linkType, inputValue, true);
    }
  };

  var onRemoveLink = function onRemoveLink(linkType) {
    delete clientLinks[linkType];
    setClientLinks(_objectSpread({}, clientLinks));
  };

  var renderLinks = function renderLinks() {
    return typedObjectKeys(formFields).map(function (TYPE) {
      var Icon = formFields[TYPE] && formFields[TYPE].icon;
      if (!Icon || !uploadedLinks[TYPE] || uploadedLinks[TYPE].link === '') return null;
      var link = getUsernameOrLink(TYPE, uploadedLinks[TYPE].link, {
        link: true
      });
      return /*#__PURE__*/_jsxs("a", {
        href: link,
        className: styles.social_links_item,
        rel: "noopener noreferrer",
        target: "_blank",
        "data-testid": "social-link",
        "data-slo-id": "social-link:".concat(TYPE),
        children: [/*#__PURE__*/_jsx(Icon, {
          "aria-hidden": true,
          focusable: false,
          iconSize: 24,
          className: styles.social_links_platform_icon
        }), /*#__PURE__*/_jsx("span", {
          className: styles.editor_link_name,
          children: uploadedLinks[TYPE].shortname
        })]
      }, TYPE);
    });
  };

  var authorizedUser = props.authorizedUser;
  var hasLinks = uploadedLinks && typedObjectKeys(uploadedLinks).some(function (type) {
    return uploadedLinks[type] && uploadedLinks[type].link !== '';
  });
  return /*#__PURE__*/_jsxs("section", {
    children: [renderedProfileSwitcheroo, /*#__PURE__*/_jsxs("header", {
      className: styles.social_links_header,
      children: [/*#__PURE__*/_jsx(Type, {
        as: "h3",
        variant: Type.heading3,
        color: "white",
        children: t('artistprofile_sociallinks_1', 'More Info', '')
      }), authorizedUser && /*#__PURE__*/_jsx(PencilButton, {
        onClick: onStartEditing,
        testIdPrefix: "social-links-",
        "aria-label": t('artistprofile_sociallinks_2', 'edit more info', '')
      })]
    }), hasLinks ? renderLinks() : /*#__PURE__*/_jsx(Type, {
      as: "p",
      semanticColor: "textSubdued",
      "data-slo-id": "social-links:empty",
      children: t('artistprofile_sociallinks_3', 'Add links to your social media sites, Wikipedia page, and more.', '')
    }), authorizedUser && showLinkEditor && /*#__PURE__*/_jsx(LinkEditor, {
      links: clientLinks,
      onSave: onSave,
      onCancel: onCancelEditing,
      onRemoveLink: onRemoveLink,
      onChangeLink: onChangeLink,
      onBlurLink: onBlurLink,
      formFields: formFields
    })]
  });
};