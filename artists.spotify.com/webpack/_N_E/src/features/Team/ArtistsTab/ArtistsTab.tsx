import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FormInputIcon, FormInput, FormGroup, IconSearch, LoadingIndicator, EmptyState, EmptyStateTitle, EmptyStateButton, EmptyStateText } from '@spotify-internal/encore-web';
import { ButtonTertiaryAsLink } from '../../EncoreCreatorWebHelpers';
import { ArtistsTabSearchResults } from './ArtistsTabSearchResults';
import { useTeamStore } from '../lib/store/useTeamStore';
import { useLocation } from 'react-router-dom';
import { useT } from '@mrkt/features/i18n';
import { useArtistsTabArtistSearchLogger, useArtistsTabEmptyStateAddArtistLinkLogger, useArtistsTabEmptyStateLogger, useArtistsTabSearchArtistsLinkLogger } from './hooks/useArtistsTabUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var StyledFormGroup = styled(FormGroup).withConfig({
  displayName: "ArtistsTab__StyledFormGroup",
  componentId: "sc-2q3y0l-0"
})(["max-width:360px;"]);
export var ArtistsTab = function ArtistsTab() {
  var _useTeamStore = useTeamStore(),
      _useTeamStore$artists = _useTeamStore.artistsTab,
      searchQuery = _useTeamStore$artists.searchQuery,
      artistTeams = _useTeamStore$artists.artistTeams,
      currentTeam = _useTeamStore.currentTeam,
      searchArtistTeams = _useTeamStore.searchArtistTeams;

  var t = useT();
  var location = useLocation();
  var continueTo = encodeURIComponent("".concat(location.pathname));
  var logArtistsSearch = useArtistsTabArtistSearchLogger();
  var logSearchArtistsLinkClick = useArtistsTabSearchArtistsLinkLogger();
  var logEmptyStateImpression = useArtistsTabEmptyStateLogger();
  var logEmptyStateAddArtistLinkClick = useArtistsTabEmptyStateAddArtistLinkLogger("/add-team?continue=".concat(continueTo));
  var inputRef = useRef(null);

  var _useState = useState(false),
      showSearchMessage = _useState[0],
      setShowSearchMessage = _useState[1];

  var showArtistEmptyState = artistTeams && artistTeams.length === 0 && !searchQuery;

  var checkSearchMessage = function checkSearchMessage() {
    if (!showSearchMessage && window.pageYOffset > 100) {
      setShowSearchMessage(true);
    } else if (showSearchMessage && window.pageYOffset <= 100) {
      setShowSearchMessage(false);
    }
  };

  var scrollTop = function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(function () {
      var _inputRef$current;

      return (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }, 800);
  };

  useEffect(function () {
    window.addEventListener('scroll', checkSearchMessage);
    return function () {
      window.removeEventListener('scroll', checkSearchMessage);
    };
  });

  if (!currentTeam) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  if (showArtistEmptyState) {
    logEmptyStateImpression();
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [showArtistEmptyState ? /*#__PURE__*/_jsxs(EmptyState, {
      variant: "contextual",
      iconColorSet: "announcement",
      children: [/*#__PURE__*/_jsx(EmptyStateTitle, {
        children: t('ARTISTS_TAB_EMPTY_STATE_TITLE', 'No artists on your roster yet', 'There are no artists on your roster yet')
      }), /*#__PURE__*/_jsx(EmptyStateText, {
        children: t('ARTISTS_TAB_EMPTY_STATE_TEXT', "When you get access to an artist, they'll appear here.", 'When your label team gets access to an artist, they will appear here')
      }), /*#__PURE__*/_jsx(ButtonTertiaryAsLink, {
        color: "green",
        to: "/add-team?continue=".concat(continueTo),
        onClick: function onClick() {
          return logEmptyStateAddArtistLinkClick();
        },
        children: t('ARTISTS_TAB_EMPTY_STATE_ACTION', 'Add artist', 'Link to request access to an artist or label team')
      })]
    }) : /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(StyledFormGroup, {
        label: t('ARTISTS_TAB_SEARCH_ARTISTS', 'Search artists', 'Search artists'),
        children: /*#__PURE__*/_jsx(FormInputIcon, {
          iconLeading: /*#__PURE__*/_jsx(IconSearch, {}),
          children: /*#__PURE__*/_jsx(FormInput, {
            ref: inputRef,
            value: searchQuery,
            onChange: function onChange(e) {
              searchArtistTeams(currentTeam.uri, e.target.value);
              logArtistsSearch();
            },
            "data-testid": "search-artists"
          })
        })
      }), /*#__PURE__*/_jsx(ArtistsTabSearchResults, {})]
    }), showSearchMessage && /*#__PURE__*/_jsxs(EmptyState, {
      variant: "contextual",
      icon: IconSearch,
      iconColorSet: "announcement",
      children: [/*#__PURE__*/_jsx(EmptyStateTitle, {
        children: t('ARTISTS_TAB_SEARCH_ALL_ARTISTS_TITLE', 'You can always search all your artists', 'You can search all of your artists')
      }), /*#__PURE__*/_jsx(EmptyStateButton, {
        onClick: function onClick() {
          scrollTop();
          logSearchArtistsLinkClick();
        },
        children: t('ARTISTS_TAB_SEARCH_ALL_ARTISTS_SCROLL_TO_TOP_ACTION', 'Search Artists', 'Scroll to the top of the page to search your artists')
      })]
    })]
  });
};