import React from 'react';
import { Table, TableCell, TableHeaderCell, TableRow, IconSearch, LoadingIndicator, EmptyState, EmptyStateTitle, EmptyStateText } from '@spotify-internal/encore-web';
import { TeamMembersContainer } from './TeamMembersContainer';
import { PopoverNavigationActions } from './PopoverNavigationActions';
import { useTeamStore } from '../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { IconBadgeWithText } from '../components/IconBadge/IconBadgeWithText';
import { useArtistsTabNoSearchResultsLogger } from './hooks/useArtistsTabUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export var ArtistsTabSearchResults = function ArtistsTabSearchResults() {
  var _useTeamStore = useTeamStore(),
      _useTeamStore$artists = _useTeamStore.artistsTab,
      artistTeams = _useTeamStore$artists.artistTeams,
      currentArtistTeam = _useTeamStore$artists.currentArtistTeam,
      searchQuery = _useTeamStore$artists.searchQuery,
      currentTeam = _useTeamStore.currentTeam,
      setArtistsTabCurrentTeam = _useTeamStore.setArtistsTabCurrentTeam,
      setArtistTeamMembers = _useTeamStore.setArtistTeamMembers,
      setArtistsTabCurrentTeamMembers = _useTeamStore.setArtistsTabCurrentTeamMembers;

  var t = useT();
  var logNoSearchResultsImpression = useArtistsTabNoSearchResultsLogger();
  React.useEffect(function () {
    if ((artistTeams === null || artistTeams === void 0 ? void 0 : artistTeams.length) === 0) {
      logNoSearchResultsImpression();
    }
  }, [artistTeams]);

  if (!currentTeam || !artistTeams) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var _openTeamMembersPopover = function openTeamMembersPopover(artistTeam) {
    setArtistsTabCurrentTeam(artistTeam);
    setArtistTeamMembers(artistTeam.uri, currentTeam.uri);
  };

  var closeTeamMembersPopover = function closeTeamMembersPopover() {
    setArtistsTabCurrentTeam(null);
    setArtistsTabCurrentTeamMembers(null);
  };

  if (artistTeams.length === 0) {
    return /*#__PURE__*/_jsxs(EmptyState, {
      variant: "contextual",
      icon: IconSearch,
      iconColorSet: "announcement",
      children: [/*#__PURE__*/_jsx(EmptyStateTitle, {
        children: t('ARTISTS_TAB_NO_SEARCH_RESULTS_TITLE', "Couldn't find “{searchQuery}”", "Your search query didn't return any results", {
          searchQuery: searchQuery
        })
      }), /*#__PURE__*/_jsx(EmptyStateText, {
        children: t('ARTISTS_TAB_NO_SEARCH_RESULTS_TEXT', 'Try searching again using a different spelling.', 'Try your search again with a different spelling')
      })]
    });
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(Table, {
      "data-testid": "artists-tab",
      children: [/*#__PURE__*/_jsx("thead", {
        children: /*#__PURE__*/_jsxs(TableRow, {
          children: [/*#__PURE__*/_jsx(TableHeaderCell, {
            align: "left",
            children: t('ARTISTS_TAB_TABLE_HEADER_ARTIST', 'Artist', 'Table heading for all of the artists you have access to')
          }), /*#__PURE__*/_jsx(TableHeaderCell, {
            align: "right",
            children: t('ARTISTS_TAB_TABLE_HEADER_MANAGE', 'Manage', 'Table heading to manage your artists by taking actions on them')
          })]
        })
      }), /*#__PURE__*/_jsx("tbody", {
        children: artistTeams.map(function (team) {
          return /*#__PURE__*/_jsxs(TableRow, {
            children: [/*#__PURE__*/_jsx(TableCell, {
              align: "left",
              children: /*#__PURE__*/_jsx(IconBadgeWithText, {
                imgSrc: team.imageUrl,
                text: team.name,
                circle: true
              })
            }), /*#__PURE__*/_jsx(TableCell, {
              align: "right",
              children: /*#__PURE__*/_jsx(PopoverNavigationActions, {
                openTeamMembersPopover: function openTeamMembersPopover() {
                  return _openTeamMembersPopover(team);
                }
              })
            })]
          }, team.uri);
        })
      })]
    }), currentArtistTeam && /*#__PURE__*/_jsx(TeamMembersContainer, {
      onClose: closeTeamMembersPopover
    })]
  });
};