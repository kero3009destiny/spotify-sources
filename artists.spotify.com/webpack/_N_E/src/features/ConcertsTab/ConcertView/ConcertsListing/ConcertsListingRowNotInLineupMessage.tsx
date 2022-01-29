import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { IconExclamationAlt } from '@spotify-internal/encore-web-v3';
import { TableRow } from '../../../../shared/components/Table';
import styles from './ConcertsListingRow.module.scss';
/* eslint-disable-next-line import/no-default-export */

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function ConcertsListingRowNotInLineupMessage(_ref) {
  var partnerName = _ref.partnerName,
      partnerContactUrl = _ref.partnerContactUrl,
      hiddenPartnerName = _ref.hiddenPartnerName,
      hiddenPartnerContactUrl = _ref.hiddenPartnerContactUrl,
      isMobile = _ref.isMobile;
  var t = useT();
  var messages = {
    notInLineupPromptBeg: {
      id: 'ConcertsListingRow.notInLineupBeg',
      defaultMessage: t('cfaf58', "We've found a listing on", '')
    },
    notInLineupPromptMiddle: {
      id: 'ConcertsListingRow.notInLineupMiddle',
      defaultMessage: t('b48489', ', but you’re not on the listing fans see on Spotify.', '')
    },
    notInLineupPromptEnd: {
      id: 'ConcertsListingRow.notInLineupEnd',
      defaultMessage: t('8d0a8d', 'Contact the promoter to get added on ', '')
    }
  };
  return /*#__PURE__*/_jsx(TableRow, {
    children: /*#__PURE__*/_jsx("td", {
      colSpan: isMobile ? 2 : 5,
      className: styles.not_in_lineup_message,
      children: /*#__PURE__*/_jsxs("div", {
        className: styles.not_in_lineup_message_container,
        children: [/*#__PURE__*/_jsx(IconExclamationAlt, {
          iconSize: 24
        }), /*#__PURE__*/_jsxs("span", {
          className: styles.not_in_lineup_message_text,
          children: [/*#__PURE__*/_jsxs("span", {
            className: styles.not_in_lineup_message_beginning,
            children: [messages.notInLineupPromptBeg.defaultMessage, /*#__PURE__*/_jsx("a", {
              href: hiddenPartnerContactUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: styles.not_in_lineup_link,
              children: "".concat(hiddenPartnerName)
            }), messages.notInLineupPromptMiddle.defaultMessage]
          }), isMobile && /*#__PURE__*/_jsx("br", {}), messages.notInLineupPromptEnd.defaultMessage, /*#__PURE__*/_jsx("a", {
            href: partnerContactUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: styles.not_in_lineup_link,
            children: "".concat(partnerName)
          }), "."]
        })]
      })
    })
  });
}