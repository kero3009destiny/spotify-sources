import _defineProperty from "/var/jenkins_home/workspace/tingle.cd962a55-a742-407f-a437-251a69d63f52/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "/var/jenkins_home/workspace/tingle.cd962a55-a742-407f-a437-251a69d63f52/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.cd962a55-a742-407f-a437-251a69d63f52/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState, Suspense, useContext } from 'react';
import styled from 'styled-components';
import has from 'lodash/has';
import { Dropdown, DropdownTrigger, DropdownList, DropdownLink, spacer8, VisuallyHidden } from '@spotify-internal/encore-web-v3';
import { createMrktSongStatsInteractionBrowser } from '@spotify-internal/event-definitions/es5/events/createMrktSongStatsInteractionBrowser';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { logGabitoEvent } from '@mrkt/features/gabito';
import { useDateTimeFormatter, useT } from '@mrkt/features/i18n';
import { intlDateFormatOptions } from '@mrkt/features/stats-components/utils';
import { useViewport, breakpointValues, Viewport } from '../../shared/lib/useViewport';
import { ResizeContainer } from '../../shared/components/ResizeContainer';
import { useGetFilterOptions } from '../../shared/components/Chart/constants';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { CountryTimelineWrapper } from './CountryTimelineWrapper';
import { Provider, CountryTimelineContext } from './CountryTimelineContext';
import { ASPECT_RATIO, GA_EVENT_CATEGORY } from './constants';
import { keyboardNavigation, useDropdownLinkFocus, useDropdownLinkIndex } from '../../features/Dropdown/';
import { dateExtent, generateRangeString } from '../../features/Song/Timeline';
import { Section } from '../Section';
import { StatsCSVDownloadButton } from '../Song/StatsCSVDownloadButton';
import { useHasStatsCountryCSVDownloadButtons } from '../Song/StatsCSVDownloadButton/useHasStatsCountryCSVDownloadButtons';
import { CSV_DOWNLOAD_API } from '../../shared/lib/api';
import { PageId } from '../PlatformEvents';
import { useCurrentSong } from '../Song/hooks/useCurrentSong';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ToolIconsWrapper = styled.div.withConfig({
  displayName: "CountryTimeline__ToolIconsWrapper",
  componentId: "sc-1m2xv4i-0"
})(["display:flex;align-items:center;"]);
var defaultTimeFilter = '28day';
var StyledHeaderTools = styled.div.withConfig({
  displayName: "CountryTimeline__StyledHeaderTools",
  componentId: "sc-1m2xv4i-1"
})(["align-items:center;display:flex;margin-top:-", ";"], spacer8);
var StyledSuspenseContainer = styled.div.withConfig({
  displayName: "CountryTimeline__StyledSuspenseContainer",
  componentId: "sc-1m2xv4i-2"
})(["height:", ";"], function (props) {
  return "".concat(props.height, "px");
});
var StyledDropdown = styled(Dropdown).withConfig({
  displayName: "CountryTimeline__StyledDropdown",
  componentId: "sc-1m2xv4i-3"
})(["width:160px;"]);

function CountryTimelineComponent(_ref) {
  var songId = _ref.songId,
      artistId = _ref.artistId,
      width = _ref.width;

  var _useContext = useContext(CountryTimelineContext),
      countryTimelineData = _useContext.countryTimelineData,
      timeFilter = _useContext.timeFilter,
      setTimefilter = _useContext.setTimefilter;

  var _useState = useState(false),
      show = _useState[0],
      setToggle = _useState[1];

  var getFilterOptions = useGetFilterOptions();
  var filterOptions = getFilterOptions('TIMELINE_FILTERS_YEARLY_PRESETS');

  var _useDropdownLinkIndex = useDropdownLinkIndex(filterOptions, defaultTimeFilter),
      _useDropdownLinkIndex2 = _slicedToArray(_useDropdownLinkIndex, 2),
      selectedDropdownIndex = _useDropdownLinkIndex2[0],
      setSelectedDropdownIndex = _useDropdownLinkIndex2[1];

  useDropdownLinkFocus(show, 'country-time-filter-dropdown');
  var t = useT();
  var dateFormatter = useDateTimeFormatter(intlDateFormatOptions);

  var _useCurrentSong = useCurrentSong(),
      songName = _useCurrentSong.name;

  var itemOnClick = function itemOnClick(key) {
    setToggle(!show); // @ts-ignore

    setTimefilter(key);
    sendEvent({
      eventCategory: GA_EVENT_CATEGORY,
      eventAction: 'changeTimeFrame',
      eventLabel: key
    });
  };

  var handleKeyDown = keyboardNavigation(filterOptions, selectedDropdownIndex, setSelectedDropdownIndex, setToggle, itemOnClick);

  var getSelectedDropdownLabel = function getSelectedDropdownLabel() {
    return filterOptions.find(function (filter) {
      return filter.value === timeFilter;
    }).label;
  };

  var timeFilterComponent = /*#__PURE__*/_jsx(StyledHeaderTools, {
    children: /*#__PURE__*/_jsx(DropdownTrigger, {
      "aria-label": t('COUNTRY_TIMELINE_bf5485', 'Filter the country comparison chart by time period.', ''),
      overlay: show && /*#__PURE__*/_jsx(DropdownList, {
        "aria-activedescendant": timeFilter,
        "data-testid": "time-filter-dropdown",
        id: "country-time-filter-dropdown",
        onKeyDown: function onKeyDown(e) {
          return handleKeyDown(e);
        },
        children: filterOptions.map(function (filter, index) {
          return /*#__PURE__*/_jsx(DropdownLink, {
            "aria-selected": index === selectedDropdownIndex,
            as: "li",
            onClick: function onClick() {
              setSelectedDropdownIndex(index);
              itemOnClick(filter.value);
            },
            onFocus: function onFocus() {
              setSelectedDropdownIndex(index);
            },
            role: "option",
            selected: index === selectedDropdownIndex,
            children: filter.label
          }, index);
        })
      }),
      onShow: function onShow() {
        return setToggle(true);
      },
      onHide: function onHide() {
        return setToggle(false);
      },
      children: /*#__PURE__*/_jsx(StyledDropdown, {
        "data-testid": "timeline-time-filter",
        children: getSelectedDropdownLabel()
      })
    })
  });

  var hasEmptyState = has(countryTimelineData, 'status') && // @ts-ignore
  countryTimelineData.status === 204 || !countryTimelineData || Array.isArray(countryTimelineData) && countryTimelineData.length === 0;
  var headerDateExtent = !hasEmptyState ? // @ts-ignore
  dateExtent(_toConsumableArray(countryTimelineData).shift().timelinePoint) : null;

  var onDownloadClick = function onDownloadClick() {
    logGabitoEvent(createMrktSongStatsInteractionBrowser({
      creator_uri: "spotify:artist:".concat(artistId),
      navigational_root_id: PageId.ArtistSongStats,
      page_id: PageId.ArtistSongStats,
      page_uri: window.location.href,
      interaction_category: 'CountryTimeline',
      interaction_action: 'DownloadCSV'
    }));
  };

  var ToolIcons = /*#__PURE__*/_jsxs(ToolIconsWrapper, {
    children: [useHasStatsCountryCSVDownloadButtons() && /*#__PURE__*/_jsx(StatsCSVDownloadButton, {
      tooltipText: t('COUNTRY_TIMELINE_d01812', 'Download data as a CSV file', ''),
      downloadURL: "".concat(CSV_DOWNLOAD_API, "/v1/artist/").concat(artistId, "/recording/").concat(songId, "/historical/country-streams.csv"),
      onDownloadClick: onDownloadClick
    }), timeFilterComponent]
  });

  return /*#__PURE__*/_jsxs(Section, {
    id: "country-timeline",
    title: t('COUNTRY_TIMELINE_0cd24c', 'Country comparisons', ''),
    toolIcons: ToolIcons,
    subtitle: headerDateExtent ? generateRangeString(headerDateExtent, dateFormatter) : null,
    children: [/*#__PURE__*/_jsx(VisuallyHidden, {
      children: t('COUNTRY_TIMELINE_1a7879', 'Song timeline chart showing streams of {songName} for specific countries for {timeFilter}. Add or remove countries, up to a limit of 5 countries.', 'Possible values for {timeFilter}: Last 7 days, Last 28 days, 2021, 2019, 2018, 2017, 2016', {
        songName: songName,
        timeFilter: filterOptions[selectedDropdownIndex].label
      })
    }), /*#__PURE__*/_jsx(CountryTimelineWrapper, {
      width: width
    })]
  });
}

export function CountryTimeline(props) {
  var viewport = useViewport();
  var viewportValue = breakpointValues[viewport];
  var isSmall = viewport === Viewport.SM;
  return /*#__PURE__*/_jsx(ResizeContainer, {
    viewport: viewportValue,
    render: function render(width) {
      /*  magic number *_* to include the height and padding
          of the CountryLegend and CountryPicker.
          slight variation depending on viewport size */
      var remainingHeight = isSmall ? 365 : 381;
      var suspenseHeight = width * ASPECT_RATIO + remainingHeight;
      return /*#__PURE__*/_jsx(Suspense, {
        fallback:
        /*#__PURE__*/
        // @ts-ignore
        _jsx(StyledSuspenseContainer, {
          height: suspenseHeight,
          children: /*#__PURE__*/_jsx(LoadingIndicator, {})
        }),
        children: /*#__PURE__*/_jsx(Provider, {
          children: /*#__PURE__*/_jsx(CountryTimelineComponent, _objectSpread(_objectSpread({}, props), {}, {
            width: width
          }))
        })
      });
    }
  });
}