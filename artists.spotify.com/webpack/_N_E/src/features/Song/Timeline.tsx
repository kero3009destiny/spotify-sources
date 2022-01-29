import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import styled from 'styled-components';
import has from 'lodash/has';
import { extent } from 'd3-array'; // eslint-disable-next-line no-restricted-imports

import moment from 'moment';
import { Dropdown, DropdownLink, DropdownList, DropdownTrigger, Type, spacer64, screenXsMax, screenSmMin, VisuallyHidden } from '@spotify-internal/encore-web-v3';
import { createMrktSongStatsInteractionBrowser } from '@spotify-internal/event-definitions/es5/events/createMrktSongStatsInteractionBrowser';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { parseStringToDateUTC } from '@mrkt/features/date-helpers';
import { logGabitoEvent } from '@mrkt/features/gabito';
import { useDateTimeFormatter, useT } from '@mrkt/features/i18n';
import { intlDateFormatOptions, formatDateToString } from '@mrkt/features/stats-components/utils';
import { PageId } from '../PlatformEvents';
import { useSongTimelineData } from './hooks/useSongTimelineData';
import { useSummaryTableData } from './hooks/useSummaryTableData';
import { useGetString } from '../../shared/messages/strings';
import { ResizeContainer } from '../../shared/components/ResizeContainer';
import { keyboardNavigation, useDropdownLinkFocus, useDropdownLinkIndex } from '../Dropdown/';
import { useCurrentArtist } from '../artists';
import { maxYear, minYear, yearRegex, useGetFilterOptions } from '../../shared/components/Chart/constants';
import { SummaryTable } from './Stats/SummaryTable';
import { breakpointValues, useBreakpointValue, Viewport } from '../../shared/lib/useViewport';
import { normalize as normalizeSongTimeline } from './normalizers/songTimeline';
import { useSummaryTableNormalizer } from './normalizers/summaryTable';
import { useCurrentSong } from './hooks/useCurrentSong';
import { useHasSongRightsAccessToRecording } from './hooks/useHasSongRightsAccessToRecording';
import { TimelineDatePickerWrapper, TimeFilterOptions, useMostRecentDateWithData } from '../TimelineDatePicker';
import { Section } from '../Section';
import { StatsCSVDownloadButton } from './StatsCSVDownloadButton';
import { useHasStatsGlobalCSVDownloadButtons } from './StatsCSVDownloadButton/useHasStatsGlobalCSVDownloadButtons';
import { CSV_DOWNLOAD_API } from '../../shared/lib/api';
import { TimelineChart } from './TimelineChart';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ToolIconsWrapper = styled.div.withConfig({
  displayName: "Timeline__ToolIconsWrapper",
  componentId: "sc-1wun4jy-0"
})(["align-items:center;display:flex;"]);
export var generateRangeString = function generateRangeString(range, dateFormatter) {
  return "".concat(formatDateToString(range[0], dateFormatter), " \u2013 ").concat(formatDateToString(range[1], dateFormatter));
};
var TIME_FILTER_PARAM = 'time-filter';
export function dateExtent(dateRange) {
  // define type here because [undefined, undefined] | [Date, Date]
  // results in a TS Error: "This expression is not callable."
  var range = extent(dateRange, function (d) {
    return d && d.date ? parseStringToDateUTC(d.date) : null;
  }); // filter out undefined and nulls from array

  var validDates = range.filter(function (d) {
    return !!d;
  });
  return validDates.length === 2 ? validDates : null;
}
var StyledDropdown = styled(Dropdown).withConfig({
  displayName: "Timeline__StyledDropdown",
  componentId: "sc-1wun4jy-1"
})(["min-width:150px;@media (max-width:", "){margin:0;}@media (min-width:", "){padding-right:", ";}"], screenXsMax, screenSmMin, spacer64);
var StyledErrorWrapper = styled.div.withConfig({
  displayName: "Timeline__StyledErrorWrapper",
  componentId: "sc-1wun4jy-2"
})(["text-align:", ";"], function (_ref) {
  var xsViewport = _ref.xsViewport;
  return xsViewport ? 'center' : undefined;
});
var StyledSection = styled(Section).withConfig({
  displayName: "Timeline__StyledSection",
  componentId: "sc-1wun4jy-3"
})(["position:relative;span[class^='Overlay-']{z-index:1;}"]);
var defaultTimeFilter = '28day';

var isValidTimeFilter = function isValidTimeFilter(searchQuery, filters, mostRecentDate) {
  var timeFilterQuery = searchQuery['time-filter'];

  if (!timeFilterQuery) {
    // no time-filter query present
    return false;
  }

  if (timeFilterQuery === TimeFilterOptions.CUSTOM) {
    if (searchQuery['start-date'] && searchQuery['end-date']) {
      var momentStartDate = moment(searchQuery['start-date']).utc().startOf('day');
      var momentEndDate = moment(searchQuery['end-date']).utc().startOf('day');
      return momentStartDate.isSameOrBefore(mostRecentDate) && momentEndDate.isSameOrBefore(mostRecentDate) && momentStartDate.isSameOrAfter(momentEndDate.clone().subtract(1, 'year')) && momentStartDate.isBefore(momentEndDate) && momentStartDate.isSameOrAfter(mostRecentDate.clone().subtract(5, 'years').startOf('year'));
    }

    return false;
  }

  var isYearlyPreset = Boolean(timeFilterQuery.match(yearRegex));

  if (isYearlyPreset) {
    var year = Number(timeFilterQuery.split('year').pop());
    var isValidPresetRange = moment(year).clone().utc().isBetween(minYear, maxYear, undefined, '[]');

    if (!isValidPresetRange) {
      return false;
    }
  }

  return filters.map(function (filter) {
    return filter.value;
  }).includes(timeFilterQuery);
};

var getInitialTimeFilter = function getInitialTimeFilter(searchQuery, filters, mostRecentDate) {
  if (isValidTimeFilter(searchQuery, filters, mostRecentDate)) {
    return searchQuery[TIME_FILTER_PARAM];
  }

  return defaultTimeFilter;
};

var getCustomDates = function getCustomDates(filterValue, searchQuery) {
  if (filterValue === TimeFilterOptions.CUSTOM) {
    return {
      startDate: searchQuery['start-date'],
      endDate: searchQuery['end-date']
    };
  }

  return undefined;
};

export function Timeline() {
  var trackingId = 'SongDetailTimeline';
  var history = useHistory();
  var location = useLocation();
  var song = useCurrentSong();
  var artist = useCurrentArtist();
  var viewport = useBreakpointValue();
  var isSplitRights = useHasSongRightsAccessToRecording();
  var mostRecentDateAvailable = useMostRecentDateWithData();
  var normalizeSummaryTable = useSummaryTableNormalizer();
  var t = useT();
  var strings = useGetString();
  var dateFormatter = useDateTimeFormatter(intlDateFormatOptions);
  var isViewportSM = viewport <= breakpointValues[Viewport.SM];
  var isViewportXS = viewport <= breakpointValues[Viewport.XS];
  var getFilterOptions = useGetFilterOptions();
  var filterOptions = isViewportSM ? getFilterOptions('SONG_TIMELINE_FILTER_OPTIONS_SMALL_SCREEN') : getFilterOptions('SONG_TIMELINE_FILTER_OPTIONS');
  var queryParams = qs.parse(location.search);

  var _React$useState = React.useState(getInitialTimeFilter(queryParams, filterOptions, mostRecentDateAvailable)),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      query = _React$useState2[0],
      setQuery = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      showDropdown = _React$useState4[0],
      setShowDropdown = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      showDatePicker = _React$useState6[0],
      toggleDatePicker = _React$useState6[1];

  var _React$useState7 = React.useState(getCustomDates(query, queryParams)),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      customDates = _React$useState8[0],
      setCustomDates = _React$useState8[1];

  var _useDropdownLinkIndex = useDropdownLinkIndex(filterOptions, defaultTimeFilter),
      _useDropdownLinkIndex2 = _slicedToArray(_useDropdownLinkIndex, 2),
      selectedDropdownIndex = _useDropdownLinkIndex2[0],
      setSelectedDropdownIndex = _useDropdownLinkIndex2[1];

  var handleKeyDown = keyboardNavigation(filterOptions, selectedDropdownIndex, setSelectedDropdownIndex, setShowDropdown, onTimeFilterSelect);
  var EMPTY_COPY = t('SONG_TIMELINE_b85323', 'You don’t have any stats for this time period. Try changing the date range.', '');
  React.useEffect(function () {
    var searchQuery = qs.parse(location.search);
    var filterValue = defaultTimeFilter;
    var dates; // if `time-filter` is a search query, check if it's valid or not

    if (TIME_FILTER_PARAM in searchQuery) {
      if (isValidTimeFilter(searchQuery, filterOptions, mostRecentDateAvailable)) {
        filterValue = searchQuery[TIME_FILTER_PARAM];
        dates = getCustomDates(filterValue, searchQuery);
      } else {
        history.push(_objectSpread(_objectSpread({}, location), {}, {
          search: "?time-filter=".concat(defaultTimeFilter)
        }));
        return;
      }
    }

    setQuery(filterValue);
    setCustomDates(dates); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, location, isSplitRights, mostRecentDateAvailable]);
  useDropdownLinkFocus(showDropdown, 'time-filter-dropdown');

  var _ref2 = customDates || {},
      startString = _ref2.startDate,
      endString = _ref2.endDate;

  var timelineData = useSongTimelineData(artist.id, song.id, query, startString, endString);
  var summaryTableData = useSummaryTableData(artist.id, song.id, query, startString, endString);

  var onDatePickerSave = function onDatePickerSave(startDate, endDate) {
    var startDateString = startDate.format('YYYY-MM-DD');
    var endDateString = endDate.format('YYYY-MM-DD');
    onDatePickerClose();
    logGabitoEvent(createMrktSongStatsInteractionBrowser({
      creator_uri: "spotify:artist:".concat(artist.id),
      navigational_root_id: PageId.ArtistSongStats,
      page_id: PageId.ArtistSongStats,
      page_uri: window.location.href,
      interaction_category: 'SongTimeline',
      interaction_action: 'saveDateRange',
      interaction_value: "".concat(startDateString, " - ").concat(endDateString)
    }));
    history.push(_objectSpread(_objectSpread({}, location), {}, {
      search: "?time-filter=".concat(TimeFilterOptions.CUSTOM, "&start-date=").concat(startDateString, "&end-date=").concat(endDateString)
    }));
  };

  var onDatePickerClose = function onDatePickerClose() {
    toggleDatePicker(false);
    setShowDropdown(false);
  }; // Dropdowns & Event Handlers


  var tableFilterHeader = filterOptions.find(function (filter) {
    return filter.value === query;
  });

  var onCustomFilter = function onCustomFilter() {
    toggleDatePicker(true);
  };

  function onTimeFilterSelect(value) {
    logGabitoEvent(createMrktSongStatsInteractionBrowser({
      creator_uri: "spotify:artist:".concat(artist.id),
      navigational_root_id: PageId.ArtistSongStats,
      page_id: PageId.ArtistSongStats,
      page_uri: window.location.href,
      interaction_category: 'SongTimeline',
      interaction_action: 'clickDateOption',
      interaction_value: value
    }));
    setShowDropdown(!showDropdown);

    if (value === TimeFilterOptions.CUSTOM) {
      onCustomFilter();
      return;
    } // clear custom dates on preset date range


    sendEvent({
      eventCategory: trackingId,
      eventAction: 'selectDropdown',
      eventLabel: value
    });
    history.push(_objectSpread(_objectSpread({}, location), {}, {
      search: "?time-filter=".concat(value)
    }));
  }

  var timeFilter = /*#__PURE__*/_jsx(DropdownTrigger, {
    "aria-label": t('SONG_TIMELINE_ee6727', 'Filter the song streams chart by time period.', ''),
    overlay: showDropdown && /*#__PURE__*/_jsx(DropdownList, {
      onKeyDown: function onKeyDown(e) {
        return handleKeyDown(e);
      },
      onBlur: function onBlur() {
        return setShowDropdown(false);
      },
      id: "time-filter-dropdown",
      "aria-activedescendant": query,
      "data-testid": "time-filter-dropdown",
      children: filterOptions.map(function (filter, index) {
        return /*#__PURE__*/_jsx(DropdownLink, {
          as: "li",
          role: "option",
          id: filter.value,
          "data-testid": "timeline-time-filter-link-".concat(filter.value),
          onFocus: function onFocus() {
            setSelectedDropdownIndex(index);
          },
          onClick: function onClick() {
            setSelectedDropdownIndex(index);
            onTimeFilterSelect(filter.value);
          },
          selected: index === selectedDropdownIndex,
          "aria-selected": index === selectedDropdownIndex,
          children: filter.label
        }, filter.value);
      })
    }),
    onShow: function onShow() {
      toggleDatePicker(false);
      setShowDropdown(true);
      logGabitoEvent(createMrktSongStatsInteractionBrowser({
        creator_uri: "spotify:artist:".concat(artist.id),
        navigational_root_id: PageId.ArtistSongStats,
        page_id: PageId.ArtistSongStats,
        page_uri: window.location.href,
        interaction_category: 'SongTimeline',
        interaction_action: 'clickDateDropdown'
      }));
    },
    onHide: function onHide() {
      return setShowDropdown(false);
    },
    children: /*#__PURE__*/_jsx(StyledDropdown, {
      id: "dropdown-toggle",
      "aria-labelledby": "dropdown-label dropdown-toggle",
      "aria-expanded": showDropdown || undefined,
      "data-testid": "timeline-time-filter",
      children: showDatePicker ? filterOptions[filterOptions.length - 1].label : tableFilterHeader === null || tableFilterHeader === void 0 ? void 0 : tableFilterHeader.label
    })
  });

  var hasEmptyState = timelineData.status === 204 || summaryTableData.status === 204 || has(timelineData, 'payload') && timelineData.payload.timelinePoint && timelineData.payload.timelinePoint.length === 0 || has(summaryTableData, 'payload') && summaryTableData.payload.summaryRow && summaryTableData.payload.summaryRow.length === 0;
  var hasErrorState = !hasEmptyState && (timelineData.status > 204 || summaryTableData.status > 204 || !has(timelineData, 'payload') || // if proper structure is missing from responses
  !timelineData.payload.timelinePoint || !has(summaryTableData, 'payload') || !summaryTableData.payload.summaryRow);
  var hasErrorOrEmptyState = hasErrorState || hasEmptyState;
  var normalizedTimelineData = !hasErrorOrEmptyState ? normalizeSongTimeline(timelineData.payload, song) : {};
  var normalizedTableData = !hasErrorOrEmptyState ? normalizeSummaryTable(summaryTableData.payload) : [];
  var headerDateExtent = !hasErrorOrEmptyState ? dateExtent(timelineData.payload.timelinePoint) : null;
  var dateRangeTitle = headerDateExtent ? generateRangeString(headerDateExtent, dateFormatter) : null;

  var onDownloadClick = function onDownloadClick() {
    logGabitoEvent(createMrktSongStatsInteractionBrowser({
      creator_uri: "spotify:artist:".concat(artist.id),
      navigational_root_id: PageId.ArtistSongStats,
      page_id: PageId.ArtistSongStats,
      page_uri: window.location.href,
      interaction_category: 'SongTimeline',
      interaction_action: 'DownloadCSV'
    }));
  };

  var ToolIcons = /*#__PURE__*/_jsxs(ToolIconsWrapper, {
    children: [useHasStatsGlobalCSVDownloadButtons() && !isViewportXS && /*#__PURE__*/_jsx(StatsCSVDownloadButton, {
      tooltipText: t('SONG_TIMELINE_d01812', 'Download data as a CSV file', ''),
      downloadURL: "".concat(CSV_DOWNLOAD_API, "/v1/artist/").concat(artist.id, "/recording/").concat(song.id, "/historical/streams.csv"),
      onDownloadClick: onDownloadClick
    }), timeFilter]
  });

  var a11yChartDescription = filterOptions[selectedDropdownIndex].value === TimeFilterOptions.CUSTOM ? t('SONG_TIMELINE_3730ce', 'Song timeline chart for {songName} showing streams for a custom time period. You can change the date range to any period up to one year.', '', {
    songName: song.name
  }) : t('SONG_TIMELINE_23268f', 'Song timeline chart for {songName} showing streams for the {timeFilter}. You can change the date range to any period up to one year.', '', {
    songName: song.name,
    timeFilter: filterOptions[selectedDropdownIndex].label
  });
  return /*#__PURE__*/_jsxs(StyledSection, {
    id: "timeline",
    title: t('SONG_TIMELINE_section_title', 'Streams this period', ''),
    subtitle: !isViewportXS && dateRangeTitle,
    toolIcons: ToolIcons,
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      children: a11yChartDescription
    }), /*#__PURE__*/_jsxs(React.Fragment, {
      children: [showDatePicker && /*#__PURE__*/_jsx(TimelineDatePickerWrapper, {
        query: query,
        customDates: customDates,
        onSave: onDatePickerSave,
        onCancel: onDatePickerClose,
        anchorDirection: "right"
      }), hasErrorState && /*#__PURE__*/_jsx(StyledErrorWrapper, {
        xsViewport: isViewportXS,
        children: strings.insightsError
      }), hasEmptyState && /*#__PURE__*/_jsx(StyledErrorWrapper, {
        xsViewport: isViewportXS,
        children: /*#__PURE__*/_jsx(Type, {
          as: "p",
          children: EMPTY_COPY
        })
      }), !hasErrorOrEmptyState && !isViewportXS && /*#__PURE__*/_jsx(ResizeContainer, {
        viewport: viewport,
        render: function render(width) {
          return /*#__PURE__*/_jsx(TimelineChart, {
            data: normalizedTimelineData[song.id].timelineData,
            width: width
          });
        }
      }), !hasErrorOrEmptyState && normalizedTableData && /*#__PURE__*/_jsx(SummaryTable, {
        data: normalizedTableData,
        filterHeader: (tableFilterHeader === null || tableFilterHeader === void 0 ? void 0 : tableFilterHeader.value) === 'custom' && dateRangeTitle ? {
          label: dateRangeTitle,
          value: 'custom'
        } : tableFilterHeader,
        isViewportXS: isViewportXS
      })]
    })]
  });
}