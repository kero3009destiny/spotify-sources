// ignore-string-externalization
import React from 'react';
import { ButtonIcon, FormInput, FormInputIcon, IconSearch, IconX, screenXsMax, spacer32, spacer48 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledSearchBar = styled(FormInput).withConfig({
  displayName: "SearchInput__StyledSearchBar",
  componentId: "sc-10n3h1m-0"
})(["padding-left:", ";@media (max-width:", "){padding-left:", ";}"], spacer48, screenXsMax, spacer32);
var StyledInputContainer = styled.div.withConfig({
  displayName: "SearchInput__StyledInputContainer",
  componentId: "sc-10n3h1m-1"
})(["position:relative;width:360px;@media (max-width:", "){width:100%;}"], screenXsMax);
export var SearchInput = function SearchInput(_ref) {
  var searchInputId = _ref.searchInputId,
      ariaLabel = _ref.ariaLabel,
      _onChange = _ref.onChange,
      enableAutoFocus = _ref.enableAutoFocus,
      value = _ref.value;
  var isRtl = useRtl();
  return /*#__PURE__*/_jsx(StyledInputContainer, {
    children: /*#__PURE__*/_jsx(FormInputIcon, {
      iconLeading: /*#__PURE__*/_jsx(IconSearch, {}),
      iconTrailing: value !== '' && !isRtl ? /*#__PURE__*/_jsx(ButtonIcon, {
        onClick: function onClick() {
          return _onChange('');
        },
        children: /*#__PURE__*/_jsx(IconX, {
          iconSize: 24
        })
      }) : undefined,
      children: /*#__PURE__*/_jsx(StyledSearchBar, {
        id: searchInputId,
        "WAI-aria": ariaLabel // added a WAI-aria description to make autoFocusing more accessible

        /* eslint-disable-next-line jsx-a11y/no-autofocus */
        ,
        autoFocus: enableAutoFocus,
        "data-testid": "search",
        onChange: function onChange(e) {
          return _onChange(e.target.value);
        },
        value: value
      })
    })
  });
};