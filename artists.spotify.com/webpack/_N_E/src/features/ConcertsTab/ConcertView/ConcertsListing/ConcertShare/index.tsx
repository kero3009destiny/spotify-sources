import React, { useState } from 'react';
import cn from 'classnames';
import { useT } from '@mrkt/features/i18n';
import { ButtonTertiary, Backdrop, DialogAlert, IconFacebook, IconSkype, IconTelegram, IconTumblr, IconTwitter } from '@spotify-internal/encore-web';
import { copy } from './copyToClipboard';
import { createOpenLink, createFacebookLink, createSkypeLink, createTelegramLink, createTumblrLink, createTwitterLink } from './createShareableLink';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ConcertShare = function ConcertShare(props) {
  var _useState = useState(false),
      linkIsCopied = _useState[0],
      setLinkIsCopied = _useState[1];

  var t = useT();

  var handleCopy =
  /* istanbul ignore next */
  function handleCopy(ev) {
    return copy(ev.target).then(function () {
      return setLinkIsCopied(true);
    }).then(function () {
      return setTimeout(function () {
        return setLinkIsCopied(false);
      }, 3000);
    });
  };
  /* istanbul ignore next */


  var messages = {
    shareTitle: {
      id: 'ConcertsListing.ConcertShare.title',
      defaultMessage: 'Share your concert'
    },
    btnCopy: {
      id: 'app.ConcertShareCopy.btnCopy',
      defaultMessage: t('c38d4c', 'Copy Link', '')
    },
    btnCopied: {
      id: 'app.ConcertShareCopy.btnCopied',
      defaultMessage: t('aa9689', 'Copied', '')
    }
  };
  var uri = props.uri,
      toggleShare = props.toggleShare;
  var openUrl = createOpenLink(uri);
  var shares = [{
    name: 'facebook',
    url: createFacebookLink(uri),
    title: t('32f528', 'Share on Facebook', ''),
    icon: IconFacebook
  }, {
    name: 'twitter',
    url: createTwitterLink(uri),
    title: t('bbcf0a', 'Share on Twitter', ''),
    icon: IconTwitter
  }, {
    name: 'skype',
    url: createSkypeLink(uri),
    title: t('f4a167', 'Share on Skype', ''),
    icon: IconSkype
  }, {
    name: 'telegram',
    url: createTelegramLink(uri),
    title: t('91e411', 'Share on Telegram', ''),
    icon: IconTelegram
  }, {
    name: 'tumblr',
    url: createTumblrLink(uri),
    title: t('c7c7c8', 'Share on Tumblr', ''),
    icon: IconTumblr
  }];
  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    onClose: function onClose() {
      return toggleShare(null);
    },
    "data-testid": "concert-share",
    children: /*#__PURE__*/_jsx(DialogAlert, {
      dialogTitle: messages.shareTitle.defaultMessage,
      body: /*#__PURE__*/_jsx("div", {
        className: styles.concert_share_icons,
        children: shares.map(function (share) {
          return /*#__PURE__*/_jsx("button", {
            type: "button",
            className: cn(styles.concert_share_button, styles["concert_share_button_".concat(share.name)]),
            onClick: function onClick() {
              window.open(share.url, '_blank');
              toggleShare(null);
            },
            title: share.title,
            children: /*#__PURE__*/_jsx(share.icon, {
              className: styles.concert_share_icon,
              name: share.name,
              iconSize: 16
            })
          }, share.name);
        })
      }),
      footer: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(ButtonTertiary, {
          buttonSize: ButtonTertiary.sm,
          condensed: true,
          onClick: function onClick() {
            return toggleShare(null);
          },
          children: "Cancel"
        }), /*#__PURE__*/_jsx(ButtonTertiary, {
          buttonSize: ButtonTertiary.sm,
          condensed: true,
          semanticColor: linkIsCopied ? 'textSubdued' : 'textBrightAccent',
          "data-copy-text": openUrl,
          onClick: handleCopy,
          disabled: linkIsCopied,
          children: linkIsCopied ? messages.btnCopied.defaultMessage : messages.btnCopy.defaultMessage
        })]
      })
    })
  });
};

/* eslint-disable-next-line import/no-default-export */
export default ConcertShare;