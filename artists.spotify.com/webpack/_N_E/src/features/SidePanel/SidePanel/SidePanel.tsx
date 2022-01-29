import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _taggedTemplateLiteral from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject;

// ignore-string-externalization
import React, { useEffect, Suspense, useRef, useMemo, useCallback } from 'react';
import { useImpressionUBILogger } from '@mrkt/features/ubi';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import { createGlobalStyle } from 'styled-components';
import { ButtonIcon, IconX, screenXsMax } from '@spotify-internal/encore-web';
import { Route } from 'react-router';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { usePageLocation } from '../../page';
import { hideSidePanel, useSidePanel } from '../../SidePanel';
import { LoggedIn } from '../../../shared/components/LoggedIn';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { useCurrentUser } from '../../currentUser'; // layout

import { Backdrop, Container, Footer, Header, Section } from './Layout'; // elements

import { Logo } from './Logo';
import { Search } from './Search';
import { ArtistsList } from './ArtistsList';
import { AppsList } from './AppsList';
import { SearchResultsList } from './SearchResultsList';
import { UserControls } from './UserControls';
import { setSidePanelOpening } from '../State';
import { useRouter } from 'next/router';
import { useCurrentArtistIdOrNull } from '../../artists';
import { Transition } from 'react-transition-group';
/* When flyout is open, don't allow body to scroll */

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var GlobalStyle = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  body {\n    height: 100%;\n    overflow: hidden;\n\n    @media (max-width: ", ") {\n      position: fixed;\n      width: 100%;\n    }\n  }\n"])), screenXsMax); // eslint-disable-next-line import/no-default-export

export default function SidePanel() {
  var currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  } // todo: remove Route once SidePanel works on all pages
  // todo: render SidePanel in a portal


  return /*#__PURE__*/_jsx(Route, {
    path: ['/artist/:artistId', '/settings', '/team', '/activity', '/roster', '/dm'],
    component: SidePanelComponent
  });
}
export function SidePanelComponent() {
  var routeInfo = useRouter();
  var spec = useMemo(function () {
    var uri = routeInfo.asPath;
    return createWebCommonEventFactory({
      data: {
        identifier: 's4a-side-panel',
        uri: uri
      }
    });
  }, [routeInfo.asPath]);
  var sidePanelImpression = spec.sideNavPanelFactory();
  var artistId = useCurrentArtistIdOrNull();

  var _useImpressionUBILogg = useImpressionUBILogger(sidePanelImpression, artistId, null),
      sidePanelRef = _useImpressionUBILogg.ref;

  var _useSidePanel = useSidePanel(),
      _useSidePanel2 = _slicedToArray(_useSidePanel, 2),
      _useSidePanel2$ = _useSidePanel2[0],
      shouldShowSidePanel = _useSidePanel2$.shouldShowSidePanel,
      sidePanelOpening = _useSidePanel2$.sidePanelOpening,
      sidePanelDispatch = _useSidePanel2[1];

  var viewport = useViewport();
  var isMobile = viewport === Viewport.XS;
  var container = useRef(null);
  var firstFocusableElement = useRef(null);
  useEffect(function () {
    var _firstFocusableElemen;

    if (!sidePanelOpening) {
      return;
    }

    (_firstFocusableElemen = firstFocusableElement.current) === null || _firstFocusableElemen === void 0 ? void 0 : _firstFocusableElemen.focus();
    sidePanelDispatch(setSidePanelOpening(false));
  }, [firstFocusableElement, sidePanelDispatch, sidePanelOpening]); // hide when escape key pressed

  useEffect(function () {
    if (!shouldShowSidePanel) {
      return undefined;
    }

    function handleEvent(e) {
      switch (e.type) {
        case 'focus':
          {
            var _container$current;

            if (document.activeElement && !((_container$current = container.current) !== null && _container$current !== void 0 && _container$current.contains(document.activeElement))) {
              sidePanelDispatch(hideSidePanel());
            }

            return;
          }

        case 'keydown':
          {
            if (e.which === 27) {
              sidePanelDispatch(hideSidePanel());
            }

            return;
          }

        default:
          return;
      }
    }

    window.addEventListener('keydown', handleEvent, true);
    window.addEventListener('focus', handleEvent, true);
    return function () {
      window.removeEventListener('keydown', handleEvent, true);
      window.removeEventListener('focus', handleEvent, true);
    };
  }, [shouldShowSidePanel]); // eslint-disable-line react-hooks/exhaustive-deps
  // hide when location changes

  useEffect(function () {
    if (shouldShowSidePanel) {
      sidePanelDispatch(hideSidePanel());
    }
  }, [usePageLocation()]); // eslint-disable-line react-hooks/exhaustive-deps
  // log ga events

  useEffect(function () {
    if (!shouldShowSidePanel) {
      return undefined;
    }

    sendEvent({
      eventCategory: 'Navigation',
      eventAction: 'artistSwitcher',
      eventLabel: 'open'
    });
    return function () {
      sendEvent({
        eventCategory: 'Navigation',
        eventAction: 'artistSwitcher',
        eventLabel: 'close'
      });
    };
  }, [shouldShowSidePanel]);
  var composedRef = useCallback(function (el) {
    container.current = el;
    sidePanelRef(el);
  }, [container, sidePanelRef]);
  return /*#__PURE__*/_jsxs(LoggedIn, {
    children: [shouldShowSidePanel && /*#__PURE__*/_jsx(GlobalStyle, {}), /*#__PURE__*/_jsx(Transition, {
      in: shouldShowSidePanel,
      timeout: 100,
      addEndListener: function addEndListener() {},
      children: function children(transitionState) {
        return /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(Backdrop, {
            onClick: function onClick() {
              return sidePanelDispatch(hideSidePanel());
            },
            transitionState: transitionState
          }), /*#__PURE__*/_jsx(Container, {
            transitionState: transitionState,
            ref: composedRef,
            id: "side-panel-container",
            className: "encore-creator-dark-theme",
            children: /*#__PURE__*/_jsxs(Suspense, {
              fallback: null,
              children: [/*#__PURE__*/_jsxs(Header, {
                children: [/*#__PURE__*/_jsx(Logo, {}), isMobile && /*#__PURE__*/_jsx(ButtonIcon, {
                  ref: firstFocusableElement,
                  type: "button",
                  onClick: function onClick() {
                    return sidePanelDispatch(hideSidePanel());
                  },
                  children: /*#__PURE__*/_jsx(IconX, {})
                }), /*#__PURE__*/_jsx(Search, {
                  ref: isMobile ? null : firstFocusableElement
                })]
              }), /*#__PURE__*/_jsxs(Section, {
                children: [/*#__PURE__*/_jsx(ArtistsList, {}), /*#__PURE__*/_jsx(SearchResultsList, {}), /*#__PURE__*/_jsx(AppsList, {})]
              }), /*#__PURE__*/_jsx(Footer, {
                children: /*#__PURE__*/_jsx(UserControls, {})
              })]
            })
          })]
        });
      }
    })]
  });
}