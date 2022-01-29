import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Combobox } from '@mrkt/features/combobox';
import { isActiveTeamMember } from '../../lib';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { useQueryClient } from 'react-query';
import { useActivityTeamMemberClearFilterLogger, useActivityTeamMemberFilterLogger, useActivityTeamMemberSearchLogger } from '../lib/hooks/useActivityUbi';
import { IconBadgeWithText } from '../../components/IconBadge/IconBadgeWithText';
import { jsx as _jsx } from "react/jsx-runtime";
var ResponsiveCombobox = styled(Combobox).withConfig({
  displayName: "TeamMemberSearchCombobox__ResponsiveCombobox",
  componentId: "sc-14v78x2-0"
})(["width:", ";margin-bottom:24px;"], function (props) {
  return props.smallScreen ? '100%' : '360px';
});
export var TeamMemberSearchCombobox = function TeamMemberSearchCombobox(_ref) {
  var queryState = _ref.queryState;

  var _useState = useState([]),
      searchResults = _useState[0],
      setSearchResults = _useState[1];

  var _useTeamStore = useTeamStore(),
      selectActivityTeamMember = _useTeamStore.selectActivityTeamMember,
      currentTeamMembers = _useTeamStore.currentTeamMembers,
      selectedTeamMember = _useTeamStore.activity.selectedTeamMember,
      layoutType = _useTeamStore.layoutType;

  var logActivitySearch = useActivityTeamMemberSearchLogger();
  var logActivitySelectFilter = useActivityTeamMemberFilterLogger();
  var logActivityClearFilter = useActivityTeamMemberClearFilterLogger();
  var t = useT();

  var _queryState = _slicedToArray(queryState, 2),
      query = _queryState[0],
      setQuery = _queryState[1];

  var queryClient = useQueryClient();
  var smallScreen = layoutType === 'compact';
  useEffect(function () {
    var filterItems = (currentTeamMembers || []).filter(isActiveTeamMember).map(function (tm) {
      return {
        searchKey: tm.fullName ? tm.fullName.toLowerCase() : tm.username,
        id: tm.id,
        value: tm.fullName || tm.username,
        username: tm.username
      };
    });
    var resultCache = new Map();
    var trimmedQuery = query && query.trim() || '';

    if (!trimmedQuery) {
      setSearchResults([]);
      return;
    }

    if (!resultCache.has(trimmedQuery)) {
      var _items = filterItems.filter(function (fi) {
        return fi.searchKey.startsWith(trimmedQuery.toLocaleLowerCase());
      });

      resultCache.set(trimmedQuery, _items);
    }

    var items = resultCache.get(trimmedQuery);
    setSearchResults(items);
  }, [currentTeamMembers, query]);

  var renderEntity = function renderEntity(entity) {
    var value = entity.value;
    return /*#__PURE__*/_jsx(IconBadgeWithText, {
      text: value,
      "data-testid": "entity-option"
    });
  };

  return /*#__PURE__*/_jsx(ResponsiveCombobox, {
    smallScreen: smallScreen,
    value: query,
    label: t('ACTIVITY_TEAM_MEMBER_SEARCH_PLACEHOLDER', 'Search team members', 'search activities by team member'),
    onSelect: function onSelect(item) {
      if (!item) {
        return;
      }

      logActivitySelectFilter();
      selectActivityTeamMember({
        username: item.username,
        name: item.value
      });
      setQuery(item.value);
    },
    onChange: function onChange(value) {
      logActivitySearch();
      setQuery(value);

      if (value === '') {
        selectActivityTeamMember(null);
      }
    },
    onClear: function onClear() {
      selectActivityTeamMember(null);
      setQuery('');
      logActivityClearFilter(); // resets useInfiniteQuery for activities so the user isn't
      // anchored to the middle of the table if there are multiple pages in the cache

      queryClient.resetQueries('activities');
    },
    options: searchResults,
    renderEntity: renderEntity
  });
};