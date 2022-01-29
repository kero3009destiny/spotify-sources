import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ButtonIcon, FormInputIcon, IconSearch, VisuallyHidden, white } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { createUbiEventLogger, useImpressionUBILogger } from '@mrkt/features/ubi';
import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
import { useSidePanel, setSearchValue, showSearch, hideSearch } from '../../../SidePanel';
import { CloseButton } from './CloseButton';
import { Container } from './Container';
import { Input } from './Input';
import { InputWrapper } from './InputWrapper';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import { useCurrentArtistIdOrNull } from '../../../artists';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledButtonIcon = styled(ButtonIcon).withConfig({
  displayName: "Search__StyledButtonIcon",
  componentId: "sc-133sp0y-0"
})(["&::after{content:'';display:block;position:absolute;border-bottom:3px solid transparent;transition:border-color 200ms ease-in;width:100%;bottom:-6px;}&:hover::after{border-color:", ";}"], white);
var StyledFormInputIcon = styled(FormInputIcon).withConfig({
  displayName: "Search__StyledFormInputIcon",
  componentId: "sc-133sp0y-1"
})(["svg{left:7px;}"]);
export var Search = /*#__PURE__*/forwardRef(function NavigationSearch(_props, firstFocusableRef) {
  var _useSidePanel = useSidePanel(),
      _useSidePanel2 = _slicedToArray(_useSidePanel, 2),
      _useSidePanel2$ = _useSidePanel2[0],
      searchValue = _useSidePanel2$.searchValue,
      shouldShowSearch = _useSidePanel2$.shouldShowSearch,
      sidePanelDispatch = _useSidePanel2[1];

  var searchArtistsInputRef = useRef(null);
  var viewport = useViewport();
  var isMobile = viewport === Viewport.XS;
  var t = useT();
  useEffect(function () {
    if (shouldShowSearch) {
      var _searchArtistsInputRe;

      (_searchArtistsInputRe = searchArtistsInputRef.current) === null || _searchArtistsInputRe === void 0 ? void 0 : _searchArtistsInputRe.focus();
    }
  }, [searchArtistsInputRef, shouldShowSearch]);
  var searchTitle = t('SIDEPANEL_SEARCH_ARTISTS_LABEL', 'Search artists', 'Label for the text input used to search artists the user has access to');
  var artistId = useCurrentArtistIdOrNull();
  var routeInfo = useRouter();
  var sidePanelSearchSpec = useMemo(function () {
    var uri = routeInfo.asPath;
    return createWebCommonEventFactory({
      data: {
        identifier: 's4a-side-panel-search',
        uri: uri
      }
    });
  }, [routeInfo.asPath]);
  var searchBarImpression = sidePanelSearchSpec.sideNavPanelFactory().searchBarFactory();

  var _useImpressionUBILogg = useImpressionUBILogger(searchBarImpression, artistId, null),
      searchRef = _useImpressionUBILogg.ref;

  var UBIEventLogger = createUbiEventLogger(artistId);

  var searchButtonClicked = function searchButtonClicked() {
    UBIEventLogger.logInteraction(sidePanelSearchSpec.sideNavPanelFactory().searchButtonFactory().hitUiElementToggle());
    sidePanelDispatch(showSearch());
  };

  var searchButtonCloseClicked = function searchButtonCloseClicked(e) {
    e.preventDefault();
    sidePanelDispatch(hideSearch());
    var uri = window.location.href;
    var spec = createWebCommonEventFactory({
      data: {
        identifier: 's4a-side-panel-search-close',
        uri: uri
      }
    });
    UBIEventLogger.logInteraction(spec.sideNavPanelFactory().searchBarFactory().closeButtonFactory().hitUiElementToggle());
  };

  var composedRef = useCallback(function (el) {
    searchArtistsInputRef.current = el;
    searchRef(el);
  }, [searchArtistsInputRef, searchRef]);
  return /*#__PURE__*/_jsx(Container, {
    showSearch: shouldShowSearch,
    children: /*#__PURE__*/_jsxs(InputWrapper, {
      children: [!shouldShowSearch && !isMobile && /*#__PURE__*/_jsx(StyledButtonIcon, {
        ref: firstFocusableRef,
        title: searchTitle,
        onClick: searchButtonClicked,
        children: /*#__PURE__*/_jsx(IconSearch, {
          color: white
        })
      }), (shouldShowSearch || isMobile) && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(VisuallyHidden, {
          as: "label",
          htmlFor: "sidebar-search-artists",
          children: searchTitle
        }), /*#__PURE__*/_jsx(StyledFormInputIcon, {
          iconLeading: /*#__PURE__*/_jsx(IconSearch, {}),
          children: /*#__PURE__*/_jsx(Input, {
            placeholder: searchTitle,
            type: "text",
            value: searchValue,
            onChange: function onChange(e) {
              return sidePanelDispatch(setSearchValue(e.target.value));
            },
            onFocus: function onFocus() {
              return sidePanelDispatch(showSearch());
            },
            ref: composedRef,
            id: "sidebar-search-artists",
            showSearch: shouldShowSearch
          })
        }), /*#__PURE__*/_jsx(CloseButton, {
          disabled: !shouldShowSearch,
          onClick: searchButtonCloseClicked
        })]
      })]
    })
  });
});