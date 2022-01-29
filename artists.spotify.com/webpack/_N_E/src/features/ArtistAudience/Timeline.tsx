import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import has from 'lodash/has';
import styled, { css } from 'styled-components';
import { NavPill, NavPillList, NavPillListItem, Type, ButtonTertiary, VisuallyHidden } from '@spotify-internal/encore-web-v3';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useT } from '@mrkt/features/i18n';
import { TimelineWrapper } from './TimelineWrapper';
import { SEGMENT_LISTENERS, SEGMENT_STREAMS, SEGMENT_FOLLOWERS } from './constants/timelineSegments';
import { AudienceAggregateHeader } from '../../shared/components/Chart/AudienceAggregateHeader';
import { useGetString } from '../../shared/messages/strings';
import { useGetFilterOptions } from '../../shared/components/Chart/constants';
import { breakpointValues, Viewport, useBreakpointValue } from '../../shared/lib/useViewport';
import { useCurrentArtist } from '../../features/artists';
import { useCurrentOrgOrNull } from '../../features/artists/src/useCurrentOrgOrNull';
import { Section } from '../Section';
import { useTimelineRawData } from './resources/useTimelineRawData';
import { useAggregateRawData } from './resources/useAggregateRawData';
import { useAnnotationsRawData } from './resources/useAnnotationsRawData';
import styles from './index.module.scss';
import { createUbiEventLogger, useImpressionUBILogger } from '@mrkt/features/ubi';
import { ubiAudienceSpec } from './ubiAudienceSpec';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var TEXT_OPEN_ARTIST_PROFILE = 'Open artist profile on Spotify';
var defaultDateFilter = '28day';
var timeFilterParam = 'time-filter';
var defaultAudienceFilter = SEGMENT_LISTENERS;
var audienceFilterParam = 'audience-filter';
var audienceFilterValues = [SEGMENT_LISTENERS, SEGMENT_STREAMS, SEGMENT_FOLLOWERS];
var StyledSection = styled(Section).withConfig({
  displayName: "Timeline__StyledSection",
  componentId: "gwdowl-0"
})(["", ""], function (props) {
  return props.isViewportXS && css(["padding:", ";"], props.padding);
});
var trackingId = 'ArtistAudienceTimeline';

function getFilterFromUrl(filterKey, url, filterValues) {
  var query = qs.parse(url);

  if (filterKey === timeFilterParam) {
    return timeFilterParam in query && filterValues.includes(query[timeFilterParam]) ? query[timeFilterParam] : defaultDateFilter;
  }

  return audienceFilterParam in query && audienceFilterValues.includes(query[audienceFilterParam]) ? query[audienceFilterParam] : defaultAudienceFilter;
}

function updateFilterParam(filterKey, newFilter, location) {
  var query = qs.parse(location.search);
  query[filterKey] = newFilter;
  return qs.stringify(query);
}

export function ArtistAudienceTimeline(props) {
  var artist = useCurrentArtist();
  var org = useCurrentOrgOrNull();
  var orgUri = org && org.uri;
  var viewport = useBreakpointValue();
  var history = useHistory();
  var location = useLocation();

  var _useState = useState({
    type: 'listeners',
    artists: [],
    params: {
      'time-filter': '28day'
    }
  }),
      query = _useState[0],
      setQuery = _useState[1];

  var artists = query.artists;
  var t = useT();
  var strings = useGetString();
  var UBIEventLogger = createUbiEventLogger(artist.id, orgUri); // don't fetch data for other artists when filtering by countries
  // need to do this for first render, useEffect handles housekeeping on the query

  var queryForDataFetching = props.country.code === strings.worldwide.code ? query : _objectSpread(_objectSpread({}, query), {}, {
    artists: []
  });
  var timeline = useTimelineRawData(queryForDataFetching, props.country);
  var aggregate = useAggregateRawData(query.params, props.country);
  var annotations = useAnnotationsRawData(query.params, props.country);
  var sections = [{
    id: SEGMENT_LISTENERS,
    label: strings.listeners
  }, {
    id: SEGMENT_STREAMS,
    label: strings.streams
  }, {
    id: SEGMENT_FOLLOWERS,
    label: strings.followers
  }];
  var getFilterOptions = useGetFilterOptions();
  var FILTER_OPTIONS = getFilterOptions('FILTER_OPTIONS');
  var filterValues = FILTER_OPTIONS.map(function (_ref) {
    var value = _ref.value;
    return value;
  });
  useEffect(function () {
    var filterValue = defaultDateFilter;
    var audienceValue = defaultAudienceFilter;
    var shouldRedirect = false;
    var queryParams = qs.parse(location.search); // in general do not set queryParams param on mount
    // except if user passes invalid input, set to default

    if (timeFilterParam in queryParams) {
      var isTimeFilterValid = filterValues.includes(queryParams[timeFilterParam]);

      if (isTimeFilterValid) {
        filterValue = queryParams[timeFilterParam];
      } else {
        shouldRedirect = true;
      } // if country filter is active, redirect to 28 days default


      if (props.country.code !== strings.worldwide.code && isTimeFilterValid && queryParams[timeFilterParam] !== '28day') {
        filterValue = defaultDateFilter;
        shouldRedirect = true;
      }
    }

    if (audienceFilterParam in queryParams) {
      switch (audienceFilterValues.includes(queryParams[audienceFilterParam])) {
        case true:
          audienceValue = queryParams[audienceFilterParam];
          break;

        default:
          shouldRedirect = true;
      }
    }

    if (shouldRedirect) {
      var _newQuery;

      var newQuery = (_newQuery = {}, _defineProperty(_newQuery, timeFilterParam, filterValue), _defineProperty(_newQuery, audienceFilterParam, audienceValue), _newQuery);
      history.push(_objectSpread(_objectSpread({}, location), {}, {
        search: qs.stringify(newQuery)
      }));
      return;
    }

    setQuery({
      type: audienceValue,
      artists: artists,
      params: _defineProperty({}, timeFilterParam, filterValue)
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, location, artists, props.country.code]);
  useEffect(function () {
    // unset the query to fetch compared artists
    if (props.country.code !== strings.worldwide.code) {
      setQuery(_objectSpread(_objectSpread({}, query), {}, {
        artists: []
      }));
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [props.country.code]);

  var onChangeNavPill = function onChangeNavPill(type) {
    sendEvent({
      eventCategory: trackingId,
      eventAction: 'toggle',
      eventLabel: type
    });
    var metricSelectionFactory = ubiAudienceSpec().audienceTimelineFactory().metricSelectionFactory();

    switch (type) {
      case SEGMENT_LISTENERS:
        {
          var listenersButton = metricSelectionFactory.listenersButtonFactory();
          var hitListenersEvent = listenersButton.hitUiReveal();
          UBIEventLogger.logInteraction(hitListenersEvent);
          break;
        }

      case SEGMENT_STREAMS:
        {
          var streamsButton = metricSelectionFactory.streamsButtonFactory();
          var hitStreamsEvent = streamsButton.hitUiReveal();
          UBIEventLogger.logInteraction(hitStreamsEvent);
          break;
        }

      case SEGMENT_FOLLOWERS:
        {
          var followersButton = metricSelectionFactory.followersButtonFactory();
          var hitFollowersEvent = followersButton.hitUiReveal();
          UBIEventLogger.logInteraction(hitFollowersEvent);
          break;
        }

      default:
        break;
    }

    history.push(_objectSpread(_objectSpread({}, location), {}, {
      search: updateFilterParam(audienceFilterParam, type, location)
    }));
  };

  var onChangeSelect = function onChangeSelect(value) {
    sendEvent({
      eventCategory: trackingId,
      eventAction: 'selectDropdown',
      eventLabel: value
    });
    var datePickerFactory = ubiAudienceSpec().audienceTimelineFactory().datePickerFactory();

    switch (value) {
      case '7day':
        {
          var ev = datePickerFactory.last7DaysPresetFactory().hitFilter();
          UBIEventLogger.logInteraction(ev);
          break;
        }

      case '28day':
        {
          var _ev = datePickerFactory.last28DaysPresetFactory().hitFilter();

          UBIEventLogger.logInteraction(_ev);
          break;
        }

      case 'last5years':
        {
          var _ev2 = datePickerFactory.since2015Factory().hitFilter();

          UBIEventLogger.logInteraction(_ev2);
          break;
        }

      default:
        {
          var _ev3 = datePickerFactory.last28DaysPresetFactory().hitFilter();

          UBIEventLogger.logInteraction(_ev3);
          break;
        }
    }

    history.push(_objectSpread(_objectSpread({}, location), {}, {
      search: updateFilterParam(timeFilterParam, value, location)
    }));
  };

  var isViewportXS = viewport <= breakpointValues[Viewport.XS];
  var isNullTimeline = has(timeline, 'status') && timeline.status === 204;
  var timelineHasError = has(timeline, 'status') && timeline.status > 204;
  var aggregateHasError = has(aggregate, 'status') && aggregate.status > 204;
  var hasValidRange = !isNullTimeline && timeline instanceof Object && // @ts-ignore
  timeline[artist.id] instanceof Object;
  var padding = isNullTimeline ? '32px 16px 24px' : '24px 0 0';
  var audienceTimelineFactory = ubiAudienceSpec().audienceTimelineFactory();
  var timelineChartImpressionFactory = audienceTimelineFactory.timelineChartFactory();

  var _useImpressionUBILogg = useImpressionUBILogger(timelineChartImpressionFactory, artist.id, orgUri),
      timelineRef = _useImpressionUBILogg.ref;

  var emptyStateImpressionFactory = audienceTimelineFactory.emptyStateFactory();

  var _useImpressionUBILogg2 = useImpressionUBILogger(emptyStateImpressionFactory, artist.id, orgUri),
      emptyStateRef = _useImpressionUBILogg2.ref;

  var errorStateImpressionFactory = audienceTimelineFactory.errorStateFactory();

  var _useImpressionUBILogg3 = useImpressionUBILogger(errorStateImpressionFactory, artist.id, orgUri),
      errorStateRef = _useImpressionUBILogg3.ref; // @ts-ignore


  var selectedSegment = getFilterFromUrl(audienceFilterParam, location.search); // @ts-ignore

  var selectedSegmentLabel = strings[selectedSegment];
  var selectedTimeFilter = FILTER_OPTIONS.find(function (filter) {
    return filter.value === query.params['time-filter'];
  });
  var selectedTimeFilterLabel = selectedTimeFilter ? selectedTimeFilter.label : 'last 28 days';
  return /*#__PURE__*/_jsxs(StyledSection, {
    id: "timeline",
    isViewportXS: isViewportXS,
    padding: padding,
    children: [!timelineHasError && !isNullTimeline && !aggregateHasError && /*#__PURE__*/_jsx(AudienceAggregateHeader, {
      data: aggregate,
      range: hasValidRange ? timeline[artist.id].timelinePoint : undefined,
      query: query,
      artist: artist,
      viewport: viewport,
      onTimeFilterSelect: onChangeSelect // @ts-ignore
      ,
      trackingId: trackingId,
      country: props.country,
      qaId: "audience-data-trend-hdr"
    }), (timelineHasError || isNullTimeline) && /*#__PURE__*/_jsx(Type, {
      as: "h2",
      variant: "heading2",
      className: styles.error_state_text,
      children: t('AUDIENCE_TIMELINE_8efd79', 'No listeners yet', '')
    }), timelineHasError && /*#__PURE__*/_jsx("div", {
      className: styles.error_state_text,
      ref: errorStateRef,
      children: /*#__PURE__*/_jsx(Type, {
        as: "p",
        children: strings.insightsError
      })
    }), isNullTimeline && /*#__PURE__*/_jsxs("div", {
      className: styles.error_state_text,
      ref: emptyStateRef,
      children: [/*#__PURE__*/_jsx(Type, {
        as: "p",
        children: t('AUDIENCE_TIMELINE_d8bd2d', 'To watch your audience grow, you’ll need to reach your first listener.', '')
      }), /*#__PURE__*/_jsx(ButtonTertiary, {
        color: "green",
        condensed: true,
        href: "https://open.spotify.com/artist/".concat(artist.id),
        rel: "noopener noreferrer",
        target: "_blank",
        children: TEXT_OPEN_ARTIST_PROFILE
      })]
    }), !timelineHasError && !isNullTimeline && !isViewportXS && /*#__PURE__*/_jsxs(Fragment, {
      children: [/*#__PURE__*/_jsx(VisuallyHidden, {
        children: t('AUDIENCE_TIMELINE_f78102', 'Audience timeline chart for {artistName} showing number of {segment}, {countryName}, {timeFilter}. Adjust the chart’s date range. Get stats for specific countries. Or change the chart’s stats from listeners to streams or followers.', '{segment} could be replaced by "Listeners", "Streams", or "Followers" depending on what tab a user selects in the UI. This text is hidden from the UI and will be read by a screen reader.', {
          artistName: artist.name,
          timeFilter: selectedTimeFilterLabel,
          segment: selectedSegmentLabel,
          countryName: props.country.name
        })
      }), /*#__PURE__*/_jsx(NavPill, {
        list: /*#__PURE__*/_jsx(NavPillList, {
          children: sections.map(function (tab) {
            return /*#__PURE__*/_jsx(NavPillListItem, {
              active: tab.id === selectedSegment,
              label: tab.label,
              "data-testid": "timeline-".concat(tab.id),
              onClick: function onClick(e) {
                e.preventDefault();
                onChangeNavPill(tab.id);
              }
            }, tab.id);
          })
        }),
        children: /*#__PURE__*/_jsx(TimelineWrapper, {
          ref: timelineRef,
          selectedCountry: props.country,
          annotations: annotations,
          artist: artist,
          data: timeline,
          onTimelinePointClick: function onTimelinePointClick(dateStr) {
            if (!dateStr) return;
          },
          qaId: "audience-timeline-wrapper",
          query: query,
          setQuery: setQuery,
          viewport: viewport,
          trackingId: trackingId
        })
      })]
    })]
  });
}