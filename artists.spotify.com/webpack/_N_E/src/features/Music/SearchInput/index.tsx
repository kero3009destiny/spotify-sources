import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["onSearch"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FormInput, FormInputIcon, IconSearch, screenSmMin, screenXsMax, spacer32 } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import debounce from 'lodash/debounce';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledFormInput = styled(FormInput).withConfig({
  displayName: "SearchInput__StyledFormInput",
  componentId: "sc-12cqheq-0"
})(["@media (max-width:", "){margin-bottom:", ";}@media (min-width:", "){min-width:360px;}"], screenXsMax, spacer32, screenSmMin);

function SearchInput(_ref) {
  var onSearch = _ref.onSearch,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useState = useState(''),
      inputText = _useState[0],
      setInputText = _useState[1];

  var onSearchDebounced = useCallback(debounce(onSearch, 200), []);
  var t = useT();

  var onChange = function onChange(e) {
    setInputText(e.target.value);
    onSearchDebounced(e.target.value);
  };

  return /*#__PURE__*/_jsx(FormInputIcon, {
    iconLeading: /*#__PURE__*/_jsx(IconSearch, {}),
    children: /*#__PURE__*/_jsx(StyledFormInput, _objectSpread({
      type: "text",
      placeholder: t('MUSIC_SEARCH_PLACEHOLDER', 'Search', 'Filter songs.'),
      "data-testid": "catalog-search-input",
      value: inputText,
      onChange: onChange
    }, rest))
  });
}
/* eslint-disable-next-line import/no-default-export */


export default SearchInput;