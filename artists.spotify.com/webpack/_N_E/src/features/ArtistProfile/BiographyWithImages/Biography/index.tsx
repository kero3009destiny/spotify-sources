import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import classnames from 'classnames';
import { Backdrop, ButtonPrimary, ButtonTertiary, Type } from '@spotify-internal/encore-web';
import { DialogConfirmation } from '@mrkt/features/Dialog';
import { useT } from '@mrkt/features/i18n';
import { Screen } from '../../../../shared/lib/useViewport';
import { Dimmable } from '../../Dimmable';
import { PencilButton } from '../../PencilButton';
import { useProfileSwitcheroo } from '../../utils/useProfileSwitcheroo';
import { decodeHTML, getTextFromHTML } from '../lib/htmlHelpers';
import { Editor } from '../Editor';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var MAX_BIO_LENGTH = 1500;
export var spotifyHrefTest = function spotifyHrefTest(link) {
  if (!link) return false;
  var matchEntity = /^spotify:(artist|album|track):(.*)$/.exec(link);
  var matchPlaylist = /^spotify:(user:(.*):)?playlist:(.*)$/.exec(link);
  return !!matchEntity || !!matchPlaylist;
};
export var replaceLinks = function replaceLinks(sanitizedHTML) {
  var div = document.createElement('div');
  div.innerHTML = sanitizedHTML;
  var textWithReplacedLinks = sanitizedHTML;

  var links = _toConsumableArray(div.getElementsByTagName('a'));

  var sanitizedLinks = links.filter(function (link) {
    return spotifyHrefTest(link.getAttribute('href') || '');
  });

  for (var i = sanitizedLinks.length - 1; i >= 0; i -= 1) {
    textWithReplacedLinks = textWithReplacedLinks.replace(sanitizedLinks[i].outerHTML, "".concat(sanitizedLinks[i].href, " ") // We are explicitly checking for Spotify URI regex match, so this should
    // be OK to consider sanitized.
    );
  }

  div.innerHTML = textWithReplacedLinks; // return the text content instead of encoded html, since the backend encodes special characters.

  return div.textContent || '';
};
export var Biography = function Biography(props) {
  var _useState = useState(false),
      editing = _useState[0],
      setEditing = _useState[1];

  var _useState2 = useState(false),
      showBioEditAnnouncement = _useState2[0],
      setShowBioEditAnnouncement = _useState2[1];

  var t = useT();

  var _useProfileSwitcheroo = useProfileSwitcheroo(function () {
    return setEditing(true);
  }),
      showProfileSwitcheroo = _useProfileSwitcheroo.showProfileSwitcheroo,
      renderedProfileSwitcheroo = _useProfileSwitcheroo.renderedProfileSwitcheroo,
      _useProfileSwitcheroo2 = _useProfileSwitcheroo.organizationUri,
      organizationUri = _useProfileSwitcheroo2 === void 0 ? '' : _useProfileSwitcheroo2;

  var onEdit = function onEdit() {
    var autoBiographyOrigin = props.autoBiographyOrigin,
        text = props.text;

    if (!autoBiographyOrigin && text) {
      setShowBioEditAnnouncement(true);
      return;
    }

    showProfileSwitcheroo();
  };

  var onCloseEdit = function onCloseEdit() {
    setEditing(false);
  };

  var onSave = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(link, sanitizedHTML) {
      var artistId, autoBiographyOrigin, backEndText, bioLinks, hasLinks;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              artistId = props.artistId, autoBiographyOrigin = props.autoBiographyOrigin;
              backEndText = replaceLinks(sanitizedHTML);

              if (autoBiographyOrigin && autoBiographyOrigin.links) {
                bioLinks = autoBiographyOrigin.links;
              }

              hasLinks = bioLinks && Object.keys(bioLinks).length > 0 && Object.keys(bioLinks).some(function (linkType) {
                return linkType !== 'wikipedia';
              });
              _context.next = 6;
              return props.saveBio(artistId, _objectSpread({
                body: backEndText,
                displayText: sanitizedHTML
              }, !hasLinks && {
                urls: [link]
              }), organizationUri);

            case 6:
              setEditing(false);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onSave(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var onAutoBioClose = function onAutoBioClose() {
    setShowBioEditAnnouncement(false);
  };

  var onAutoBioConfirm = function onAutoBioConfirm() {
    showProfileSwitcheroo();
    setShowBioEditAnnouncement(false);
  };

  var createBioSection = function createBioSection() {
    var text = props.text;
    var decodedHTML = decodeHTML(text);
    return /*#__PURE__*/_jsx("div", {
      className: styles.bio_with_images__text_wrapper,
      children: /*#__PURE__*/_jsx("div", {
        className: styles.bio__text_container,
        dangerouslySetInnerHTML: {
          __html: decodedHTML
        },
        "data-testid": "bio-text"
      })
    }); // eslint-disable-line react/no-danger
  };

  var renderCreateAutoBioModal = function renderCreateAutoBioModal() {
    var viewport = props.viewport;
    var xs = viewport <= Screen.XS;
    var ButtonSwitch = xs ? ButtonTertiary : ButtonPrimary;
    return /*#__PURE__*/_jsx(Backdrop, {
      center: true,
      onClose: onAutoBioClose,
      children: /*#__PURE__*/_jsx(DialogConfirmation, {
        dialogId: "profile-write-bio-dialog",
        "data-testid": "rovi-bio-warning",
        dialogTitle: t('artistprofile_biographywithimages_biography_1', 'Write your own bio', "Bio is short for biography and it is the artist's description of themselves."),
        body: t('artistprofile_biographywithimages_biography_2', "Tell fans your story and update it anytime you want. You'll have a {MAX_BIO_LENGTH}-character limit once your replace your Rovi bio", "Rovi is the name of a third party software, it is a proper noun. Don't translate.", {
          MAX_BIO_LENGTH: MAX_BIO_LENGTH
        }),
        footer: /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(ButtonTertiary, {
            condensed: true,
            onClick: onAutoBioClose,
            buttonSize: ButtonTertiary.sm,
            children: t('artistprofile_biographywithimages_biography_3', 'NOT NOW', 'CTA to do this later')
          }), /*#__PURE__*/_jsx(ButtonSwitch, {
            condensed: xs,
            color: "green",
            onClick: onAutoBioConfirm,
            buttonSize: ButtonSwitch.sm,
            children: t('artistprofile_biographywithimages_biography_4', 'WRITE BIO', "Bio is short for biography and it is the artist's description of themselves.")
          })]
        })
      })
    });
  };

  var renderEmptyBio = function renderEmptyBio() {
    var authorizedUser = props.authorizedUser;
    return /*#__PURE__*/_jsx("button", {
      className: styles.bio_empty,
      "data-testid": "bio-empty",
      onClick: authorizedUser ? onEdit : function () {},
      children: t('artistprofile_biographywithimages_biography_5', 'You currently do not have a bio.', "The artist hasn't written a bio, nor has one been pulled in automatically from Rovi.")
    });
  };

  var renderEditor = function renderEditor() {
    var text = props.text,
        autoBiographyOrigin = props.autoBiographyOrigin;
    var bioText = getTextFromHTML(text);
    var bioLength = bioText ? bioText.length : 0;
    return /*#__PURE__*/_jsx(Editor, {
      initialLink: "",
      initialText: autoBiographyOrigin ? decodeHTML(text) : '',
      initialCount: autoBiographyOrigin ? bioLength : 0,
      cancel: onCloseEdit,
      save: onSave
    });
  };

  var renderBioOrEditor = function renderBioOrEditor() {
    return editing ? renderEditor() : createBioSection();
  };

  var text = props.text,
      authorizedUser = props.authorizedUser;
  var hasBioEditAccess = !editing && authorizedUser;
  return /*#__PURE__*/_jsxs("div", {
    className: classnames(styles.bio, _defineProperty({}, styles.bio_dimmed, !authorizedUser && !text)),
    children: [renderedProfileSwitcheroo, /*#__PURE__*/_jsx(Dimmable, {
      active: editing,
      children: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsxs("header", {
          className: styles.bio__header,
          children: [/*#__PURE__*/_jsx(Type, {
            as: "h3",
            variant: Type.heading3,
            className: styles.bio__header__title,
            children: t('artistprofile_biographywithimages_biography_6', 'Bio', "Bio is short for biography and it is the artist's description of themselves.")
          }), hasBioEditAccess && /*#__PURE__*/_jsx(PencilButton, {
            className: styles.bio_with_images__edit_button,
            onClick: onEdit,
            testIdPrefix: "bio-",
            "aria-label": "edit bio"
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: classnames(_defineProperty({}, styles.bio_dimmed, !authorizedUser && !text)),
          children: editing || text ? renderBioOrEditor() : renderEmptyBio()
        })]
      })
    }), showBioEditAnnouncement && renderCreateAutoBioModal()]
  });
};