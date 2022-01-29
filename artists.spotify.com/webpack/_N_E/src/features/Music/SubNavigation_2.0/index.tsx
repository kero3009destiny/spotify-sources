import React from 'react';
import styled from 'styled-components';
import { CSV_DOWNLOAD_API } from '../../../shared/lib/api';
import { TableSectionHeader } from '../../TableSectionHeader';
import { PLAYLISTS_ROUTE, RELEASES_ROUTE, useGetCatalogFilterOptions } from '../../../features/CatalogUtils/constants';
import SearchInput from '../SearchInput';
import { VIEWER } from '../../../features/artists';
import { VisuallyHidden, spacer32 } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledWrapper = styled.div.withConfig({
  displayName: "SubNavigation_20__StyledWrapper",
  componentId: "sc-1nrtw8w-0"
})(["display:flex;justify-content:flex-end;margin-bottom:", ";"], spacer32);

function ReleasedSubNavigation(_ref) {
  var artistId = _ref.artistId,
      onFilterChange = _ref.onFilterChange,
      route = _ref.route,
      selectedFilter = _ref.selectedFilter,
      displaySearch = _ref.displaySearch,
      onSearch = _ref.onSearch,
      artistPermissions = _ref.artistPermissions;
  var t = useT();
  var getCatalogFilterOptions = useGetCatalogFilterOptions();

  var searchElement = displaySearch && /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(SearchInput, {
      onSearch: onSearch,
      "aria-describedby": "search-description"
    }), /*#__PURE__*/_jsx(VisuallyHidden, {
      id: "search-description",
      children: t('MUSIC_SUBNAV_c2bfc7', 'Search songs in your catalog', '')
    })]
  });

  return /*#__PURE__*/_jsx(StyledWrapper, {
    children: getCatalogFilterOptions(route) && /*#__PURE__*/_jsx(TableSectionHeader, {
      csvTooltip: route !== RELEASES_ROUTE && artistPermissions.includes(VIEWER) ? /*#__PURE__*/_jsx("span", {
        children: t('MUSIC_SUBNAV_57c586', 'Download data as a CSV file.', '')
      }) : null,
      title: searchElement,
      customTitle: true,
      exportUrl: "".concat(CSV_DOWNLOAD_API, "/v1/artist/").concat(artistId, "/downloads/").concat(route === PLAYLISTS_ROUTE ? 'playlists' : 'recordings', ".csv?time-filter=").concat(selectedFilter),
      filterOptions: getCatalogFilterOptions(route),
      iconAlignment: "right",
      handleFilterChange: onFilterChange,
      selectedFilter: selectedFilter
    })
  });
}

/* eslint-disable-next-line import/no-default-export */
export default ReleasedSubNavigation;