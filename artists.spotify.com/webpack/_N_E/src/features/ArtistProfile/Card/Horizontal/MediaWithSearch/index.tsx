// ignore-string-externalization
import React from 'react';
import { IconPlus } from '@spotify-internal/encore-web';
import { SearchEntityPicker } from '@mrkt/features/combobox/EntityPicker';
import { CardHorizontal, ImageContent, InfoWrapper } from '../Layout';
import { MediaIcon } from '../MediaIcon';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var TYPES = ['artist', 'album', 'track', 'playlist'];
export function MediaWithSearch(_ref) {
  var placeholder = _ref.placeholder,
      onSelect = _ref.onSelect,
      qaId = _ref.qaId;

  var handleSelect = function handleSelect(playlistObject) {
    onSelect(playlistObject.entity);
  };

  return /*#__PURE__*/_jsxs(CardHorizontal, {
    className: styles.media_with_search,
    children: [/*#__PURE__*/_jsx(ImageContent, {
      children: /*#__PURE__*/_jsx(MediaIcon, {
        icon: /*#__PURE__*/_jsx(IconPlus, {
          "aria-hidden": true,
          focusable: false,
          iconSize: 32
        })
      })
    }), /*#__PURE__*/_jsx(InfoWrapper, {
      isSearch: true,
      children: /*#__PURE__*/_jsx(SearchEntityPicker, {
        id: qaId,
        placeholder: placeholder,
        onSelect: handleSelect,
        className: styles['media_with_search-entity-picker'],
        entityTypes: ['playlist'],
        dataLimit: 50
      })
    })]
  });
}
MediaWithSearch.defaultProps = {
  type: TYPES,
  placeholder: '',
  onSelect: function onSelect() {},
  filter: function filter() {
    return true;
  },
  fluidHeight: false
};