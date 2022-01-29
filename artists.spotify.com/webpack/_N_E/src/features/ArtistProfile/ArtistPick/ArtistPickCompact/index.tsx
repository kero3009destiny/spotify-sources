// ignore-string-externalization
import React from 'react';
import { IconChevronRight, Type } from '@spotify-internal/encore-web';
import classNames from 'classnames';
import CalendarIcon from '../../../ConcertsTab/CalendarIcon';
import { Comment } from '../Comment';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function ArtistPickCompact(_ref) {
  var artistImageUrl = _ref.artistImageUrl,
      artistName = _ref.artistName,
      comment = _ref.comment,
      editing = _ref.editing,
      expirationText = _ref.expirationText,
      uri = _ref.uri,
      image = _ref.image,
      onCommentChange = _ref.onCommentChange,
      title = _ref.title,
      type = _ref.type,
      subtitle = _ref.subtitle;
  var defaultCommentAndHoverText = "Posted by".concat(artistName ? " ".concat(artistName) : '');
  var isConcert = type === 'concert_local';
  var displayComment = defaultCommentAndHoverText; // If the comment prop has content (is truthy) display the comment prop, also
  // display the comment prop if in edit mode (even if it's an empty string).
  // Otherwise fall back to the default comment text.

  if (editing || Boolean(comment)) {
    displayComment = comment || '';
  }

  return /*#__PURE__*/_jsxs("div", {
    "data-testid": "artist-pick-compact",
    children: [/*#__PURE__*/_jsxs("div", {
      className: styles.artist_pick_compact,
      children: [isConcert ? /*#__PURE__*/_jsx(CalendarIcon, {
        day: "DD",
        month: "MM",
        size: "apCompact"
      }) :
      /*#__PURE__*/

      /* eslint-disable jsx-a11y/anchor-has-content */
      _jsx("a", {
        className: styles.artist_pick_compact__image,
        href: uri !== null && uri !== void 0 ? uri : undefined,
        style: {
          backgroundImage: "url(".concat(image || '', ")")
        },
        "aria-label": title
      })
      /* eslint-enable jsx-a11y/anchor-has-content */
      , /*#__PURE__*/_jsxs("div", {
        className: styles.artist_pick_compact__text_container,
        children: [/*#__PURE__*/_jsx(Comment, {
          editing: editing,
          className: styles.artist_pick_compact__comment,
          comment: displayComment,
          hoverText: comment,
          image: artistImageUrl,
          onChange: onCommentChange,
          transparent: !comment && !editing,
          defaultComment: !comment && !editing
        }), /*#__PURE__*/_jsxs("div", {
          className: styles.artist_pick_compact__rowify,
          children: [/*#__PURE__*/_jsxs("div", {
            className: styles.artist_pick_compact__columnify,
            children: [/*#__PURE__*/_jsx("a", {
              className: styles.artist_pick_compact__title,
              href: uri,
              title: title,
              children: title
            }), /*#__PURE__*/_jsx("a", {
              className: styles.artist_pick_compact__subtitle,
              href: uri,
              children: subtitle
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: styles.artist_pick_compact__icon_right,
            children: /*#__PURE__*/_jsx(IconChevronRight, {
              "aria-hidden": true,
              focusable: false,
              className: classNames(styles.artist_pick_compact__icon, styles.artist_pick_compact__icon_visible),
              iconSize: 16
            })
          })]
        })]
      })]
    }), /*#__PURE__*/_jsx(Type.p, {
      className: styles.artist_pick_compact__expiration,
      variant: Type.cta3,
      children: expirationText || ''
    })]
  });
}