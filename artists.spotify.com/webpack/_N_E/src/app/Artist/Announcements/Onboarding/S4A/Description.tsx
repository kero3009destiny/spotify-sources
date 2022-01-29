import React from 'react';
import { TypeList, TypeListItem, Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var Description = function Description() {
  var t = useT();
  return /*#__PURE__*/_jsxs(TypeList.ul, {
    condensed: true,
    children: [/*#__PURE__*/_jsxs(TypeListItem, {
      children: [/*#__PURE__*/_jsx(Type.h4, {
        condensed: true,
        children: /*#__PURE__*/_jsx("strong", {
          children: t('START_WITH_THE_MUSIC_HEADING', 'Start with the music', 'Heading of the onboarding section')
        })
      }), /*#__PURE__*/_jsx("span", {
        children: t('FIND_OUT_WHOS_LISTENING_TEXT', 'Find out who’s listening and the songs they love most.', 'Descriptive list item where artists find out about features of S4A')
      })]
    }), /*#__PURE__*/_jsxs(TypeListItem, {
      children: [/*#__PURE__*/_jsx(Type.h4, {
        condensed: true,
        children: /*#__PURE__*/_jsx("strong", {
          children: t('KEEP_A_FRESH_PRESENCE_TEXT', 'Keep a fresh presence', 'Descriptive list item where artists find out about features of S4A')
        })
      }), /*#__PURE__*/_jsx("span", {
        children: t('POST_AN_ARTIST_PICK_TEXT', 'Post an Artist Pick, update profiles images, write a new bio.', 'Descriptive list item where artists find out about features of S4A')
      })]
    }), /*#__PURE__*/_jsxs(TypeListItem, {
      condensed: true,
      children: [/*#__PURE__*/_jsx(Type.h4, {
        condensed: true,
        children: /*#__PURE__*/_jsx("strong", {
          children: t('ONBOARDING_GET_HELP', 'Get help when you need it', 'Header for message letting user know where to go for guidance/support with onboarding')
        })
      }), /*#__PURE__*/_jsx("span", {
        children: t('TAP_YOUR_NAME_TEXT', 'Tap your name on the main menu for guides and support.', 'Descriptive list item where artists find out about features of S4A')
      })]
    })]
  });
};
/* eslint-disable-next-line import/no-default-export */

export default Description;