import _slicedToArray from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

var _labelTypes;

import { max } from 'd3-array';
import { utcDay } from 'd3-time';
import React, { useState } from 'react';
import capitalize from 'lodash/capitalize';
import get from 'lodash/get';
import styled from 'styled-components';
import { IconDownloadAlt, ButtonIcon, Tooltip, Type, DropdownTrigger, DropdownList, DropdownLink, Dropdown, spacer20, spacer24, spacer32, spacer64, screenSmMin, gray60 } from '@spotify-internal/encore-web-v3';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { parseStringToDateUTC } from '@mrkt/features/date-helpers';
import { createWebAudienceEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-audience';
import { createUbiEventLogger } from '@mrkt/features/ubi';
import { useDateTimeFormatter, useNumberFormatter, useT } from '@mrkt/features/i18n';
import { intlDateFormatOptions, formatDateToString } from '@mrkt/features/stats-components/utils';
import { useIsDeprecatedLabelUser } from '../../../../features/artists/src/useIsDeprecatedLabelUser.js';
import { useHasAudienceCountryFilters } from '../../../../features/ArtistAudience/hooks/useHasAudienceCountryFilters';
import { useGetFilterOptions } from '../constants';
import { CSV_DOWNLOAD_API } from '../../../lib/api';
import { DataTrendHdrDesktop } from '../DataTrendHdr/DataTrendHdrDesktop';
import { DataTrendHdrMobile } from '../DataTrendHdr/DataTrendHdrMobile';
import { useGetMessages } from './messages';
import { Screen } from '../../../lib/useViewport';
import { keyboardNavigation, useDropdownLinkFocus, useDropdownLinkIndex } from '../../../../features/Dropdown/';
import { useGetString } from '../../../messages/strings';
import { PageId } from '../../../../features/PlatformEvents';
import { useCurrentOrgOrNull } from '../../../../features/artists/src/useCurrentOrgOrNull';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledExportTooltip = styled(ButtonIcon).withConfig({
  displayName: "AudienceAggregateHeader__StyledExportTooltip",
  componentId: "ouxq93-0"
})(["margin-right:", ";"], spacer24);
var StyledTimelineDropdownTrigger = styled(DropdownTrigger).withConfig({
  displayName: "AudienceAggregateHeader__StyledTimelineDropdownTrigger",
  componentId: "ouxq93-1"
})(["@media (min-width:", "){margin-right:", ";}"], screenSmMin, spacer64);
var StyledLoadingState = styled.div.withConfig({
  displayName: "AudienceAggregateHeader__StyledLoadingState",
  componentId: "ouxq93-2"
})(["min-height:184px;"]);
var StyledDateRangeSubHeading = styled(Type).attrs({
  forwardedAs: 'p',
  variant: Type.cta3,
  color: gray60
}).withConfig({
  displayName: "AudienceAggregateHeader__StyledDateRangeSubHeading",
  componentId: "ouxq93-3"
})(["padding-bottom:", ";"], spacer32);
var StyledTimeFilterMobile = styled.div.withConfig({
  displayName: "AudienceAggregateHeader__StyledTimeFilterMobile",
  componentId: "ouxq93-4"
})(["margin:", " auto;"], spacer20);
export var TimeFilterOptions;

(function (TimeFilterOptions) {
  TimeFilterOptions["SEVEN_DAYS"] = "7day";
  TimeFilterOptions["TWENTY_EIGHT_DAYS"] = "28day";
  TimeFilterOptions["LAST_5_YEARS"] = "last5years";
})(TimeFilterOptions || (TimeFilterOptions = {}));

var StatTypes;

(function (StatTypes) {
  StatTypes["STREAMS"] = "streams";
  StatTypes["LISTENERS"] = "listeners";
  StatTypes["FOLLOWERS"] = "followers";
})(StatTypes || (StatTypes = {}));

var defaultTimeFilter = TimeFilterOptions.TWENTY_EIGHT_DAYS;
var labelTypes = (_labelTypes = {}, _defineProperty(_labelTypes, StatTypes.STREAMS, 'Stream'), _defineProperty(_labelTypes, StatTypes.LISTENERS, 'Listener'), _defineProperty(_labelTypes, StatTypes.FOLLOWERS, 'Follower'), _labelTypes);
export var getDateExtent = function getDateExtent(range, timeFilterValue) {
  var filteredRange = range.filter(function (rng) {
    return rng !== null;
  }).filter(function (rng) {
    return rng.date;
  });
  var mostRecentDate = max(filteredRange, function (d) {
    return parseStringToDateUTC(d.date);
  });

  if (mostRecentDate instanceof Date) {
    switch (timeFilterValue // inclusive date ranges
    ) {
      case TimeFilterOptions.TWENTY_EIGHT_DAYS:
        return [utcDay.offset(mostRecentDate, -27), mostRecentDate];

      case TimeFilterOptions.SEVEN_DAYS:
        return [utcDay.offset(mostRecentDate, -6), mostRecentDate];

      default:
        return [new Date(Date.UTC(2015, 0, 1)), mostRecentDate];
    }
  }

  return null;
};
export var AudienceAggregateHeader = function AudienceAggregateHeader(props) {
  var artist = props.artist,
      query = props.query,
      data = props.data,
      onTimeFilterSelect = props.onTimeFilterSelect,
      range = props.range,
      _props$viewport = props.viewport,
      viewport = _props$viewport === void 0 ? Screen.XS : _props$viewport,
      qaId = props.qaId,
      country = props.country;
  var org = useCurrentOrgOrNull();
  var orgUri = org && org.uri;

  var _useState = useState(false),
      showDropdown = _useState[0],
      setShowDropdown = _useState[1];

  var getMessages = useGetMessages();
  var t = useT();
  var strings = useGetString();
  var numberFormatter = useNumberFormatter();
  var percentFormatter = useNumberFormatter({
    style: 'percent'
  });
  var dateFormatter = useDateTimeFormatter(intlDateFormatOptions);
  var isDeprecatedLabelUser = useIsDeprecatedLabelUser();
  var hasCountryFilters = useHasAudienceCountryFilters();
  var timeFilterValue = get(query, ['params', 'time-filter']);
  var typeValue = get(query, 'type', StatTypes.STREAMS);
  var getFilterOptions = useGetFilterOptions();
  var FILTER_OPTIONS = getFilterOptions('FILTER_OPTIONS');
  var selectedTimeFilter = FILTER_OPTIONS.find(function (o) {
    return o.value === timeFilterValue;
  });

  var _useDropdownLinkIndex = useDropdownLinkIndex(FILTER_OPTIONS, defaultTimeFilter),
      _useDropdownLinkIndex2 = _slicedToArray(_useDropdownLinkIndex, 2),
      selectedDropdownIndex = _useDropdownLinkIndex2[0],
      setSelectedDropdownIndex = _useDropdownLinkIndex2[1];

  useDropdownLinkFocus(showDropdown, 'country-time-filter-dropdown');
  var UBIEventLogger = createUbiEventLogger(artist.id, orgUri);
  var handleKeyDown = keyboardNavigation(FILTER_OPTIONS, selectedDropdownIndex, setSelectedDropdownIndex, setShowDropdown, onTimeFilterSelect);

  var formatDeltaNumber = function formatDeltaNumber(delta) {
    return numberFormatter.format(Math.abs(delta));
  };

  var formatDeltaPercent = function formatDeltaPercent(deltaPct) {
    return percentFormatter.format(Math.floor(Math.abs(deltaPct)) * 0.01);
  };

  var timeFilter = /*#__PURE__*/_jsx(StyledTimelineDropdownTrigger, {
    "data-testid": "audience-timeline-time-filter",
    "aria-label": t('CHART_AGGREGATE_HDR_ce44a9', 'Filter audience stats by different time periods', ''),
    overlay: showDropdown && /*#__PURE__*/_jsx(DropdownList, {
      "data-testid": "time-filter-dropdown",
      id: "country-time-filter-dropdown",
      onKeyDown: function onKeyDown(e) {
        return handleKeyDown(e);
      },
      children: FILTER_OPTIONS.map(function (filter, index) {
        return /*#__PURE__*/_jsx(DropdownLink, {
          "aria-selected": index === selectedDropdownIndex,
          as: "li",
          "data-testid": "audience-time-filter-".concat(filter.value),
          onClick: function onClick() {
            setSelectedDropdownIndex(index);
            onTimeFilterSelect(filter.value);
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
      return setShowDropdown(true);
    },
    onHide: function onHide() {
      return setShowDropdown(false);
    },
    children: /*#__PURE__*/_jsx(Dropdown, {
      disabled: country.code !== strings.worldwide.code,
      children: selectedTimeFilter === null || selectedTimeFilter === void 0 ? void 0 : selectedTimeFilter.label
    })
  }, "time-filter");

  var exportIcon = /*#__PURE__*/_jsx(TooltipTrigger, {
    placement: "top",
    tooltipId: "csv-tooltip",
    tooltip: /*#__PURE__*/_jsx(Tooltip, {
      children: /*#__PURE__*/_jsx("span", {
        children: t('CHART_AGGREGATE_HDR_fc7446', 'Download data as a CSV file', '')
      })
    }),
    children: /*#__PURE__*/_jsx(StyledExportTooltip, {
      component: "a",
      target: "_self",
      href: "".concat(CSV_DOWNLOAD_API, "/v1/artist/").concat(artist.id, "/downloads/timelines.csv?time-filter=").concat(timeFilterValue),
      onClick: function onClick() {
        var ubiSpec = createWebAudienceEventFactory({
          data: {
            identifier: PageId.ArtistAudience,
            uri: window.location.href
          }
        });
        var downloadCsvButton = ubiSpec.audienceTimelineFactory().downloadCsvButtonFactory();
        var ev = downloadCsvButton.hitDownloadFile();
        UBIEventLogger.logInteraction(ev);
      },
      children: /*#__PURE__*/_jsx(IconDownloadAlt, {})
    })
  }, "export");

  var selectedCountry = hasCountryFilters && country !== null && country !== void 0 && country.name ? " \u2022 ".concat(country.name) : '';
  var subheading;

  if (typeValue === StatTypes.FOLLOWERS) {
    subheading = /*#__PURE__*/_jsx(StyledDateRangeSubHeading, {
      children: t('CHART_AGGREGATE_HDR_907e6a', 'total {countryName}', 'Total followers for a given artist, for a specific country. Example Usage: total • argentina', {
        countryName: selectedCountry
      })
    });
  } else if (range) {
    var dateExtent = getDateExtent(range, timeFilterValue);

    if (dateExtent) {
      subheading = /*#__PURE__*/_jsxs(StyledDateRangeSubHeading, {
        children: [formatDateToString(dateExtent[0], dateFormatter), " \u2013", ' ', formatDateToString(dateExtent[1], dateFormatter), selectedCountry]
      });
    }
  }

  if (data) {
    var total = get(data, [typeValue, 'total']);
    var delta = parseInt(get(data, [typeValue, 'delta']), 10);
    var deltaPct = get(data, [typeValue, 'deltaPct']);
    var labelType = labelTypes[typeValue];

    if (viewport > Screen.SM) {
      var hdrProps = total ? {
        dataNumber: numberFormatter.format(total),
        dataLabel: getMessages("timelineMetric".concat(labelType)),
        delta: delta ? {
          trend: delta > 0 ? 'up' : 'down',
          deltaNumber: typeValue !== StatTypes.FOLLOWERS ? formatDeltaPercent(deltaPct) : formatDeltaNumber(delta),
          deltaLabel: typeValue !== StatTypes.FOLLOWERS ? getMessages("timelineMetricDelta".concat(timeFilterValue)) : getMessages("timelineMetricLast".concat(timeFilterValue))
        } : undefined,
        deltaLabelMobile: getMessages("timelineMetric".concat(labelType, "Mobile"))
      } : {
        dataLabel: getMessages("helpTooltip".concat(capitalize(typeValue))),
        deltaLabelMobile: getMessages("timelineMetric".concat(labelType, "Mobile"))
      };
      return /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(DataTrendHdrDesktop, {
          toolIcons: [!isDeprecatedLabelUser ? exportIcon : null, timeFilter].filter(Boolean),
          data: hdrProps,
          isTimeline: true,
          qaId: qaId
        }), subheading]
      });
    }

    if (viewport > Screen.XS && viewport <= Screen.SM) {
      var _hdrProps = total ? {
        dataNumber: numberFormatter.format(total),
        dataLabel: getMessages("timelineMetric".concat(labelType)),
        delta: delta ? {
          trend: delta > 0 ? 'up' : 'down',
          deltaNumber: typeValue !== StatTypes.FOLLOWERS ? formatDeltaPercent(deltaPct) : formatDeltaNumber(delta),
          deltaLabel: typeValue !== StatTypes.FOLLOWERS ? getMessages("timelineMetricDelta".concat(timeFilterValue)) : getMessages("timelineMetricLast".concat(timeFilterValue))
        } : undefined,
        deltaLabelMobile: getMessages("timelineMetric".concat(labelType, "Mobile"))
      } : {
        dataLabel: getMessages("helpTooltip".concat(capitalize(typeValue))),
        deltaLabelMobile: getMessages("timelineMetric".concat(labelType, "Mobile"))
      };

      return /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(DataTrendHdrDesktop, {
          data: _hdrProps,
          toolIcons: [timeFilter],
          isTimeline: true,
          qaId: qaId
        }), subheading]
      });
    }

    if (viewport <= Screen.XS) {
      return /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(StyledTimeFilterMobile, {
          children: timeFilter
        }), [StatTypes.LISTENERS, StatTypes.STREAMS, StatTypes.FOLLOWERS].map(function (statType) {
          var scopedTotal = get(data, [statType, 'total']);
          var scopedDelta = parseInt(get(data, [statType, 'delta']), 10);
          var scopedDeltaPct = get(data, [statType, 'deltaPct']);
          var scopedLabelType = labelTypes[statType];

          if (!scopedTotal && statType === StatTypes.FOLLOWERS) {
            return null;
          }

          var scopedProps = scopedTotal ? {
            dataNumber: numberFormatter.format(scopedTotal),
            dataLabel: getMessages("timelineMetric".concat(scopedLabelType)),
            delta: scopedDelta ? {
              trend: scopedDelta > 0 ? 'up' : 'down',
              deltaNumber: statType !== StatTypes.FOLLOWERS ? formatDeltaPercent(scopedDeltaPct) : formatDeltaNumber(scopedDelta),
              deltaLabel: statType !== StatTypes.FOLLOWERS ? getMessages("timelineMetricDelta".concat(timeFilterValue)) : getMessages("timelineMetricLast".concat(timeFilterValue))
            } : undefined,
            deltaLabelMobile: getMessages("timelineMetric".concat(scopedLabelType, "Mobile"))
          } : {
            dataLabel: getMessages("helpTooltip".concat(capitalize(statType))),
            deltaLabelMobile: getMessages("timelineMetric".concat(scopedLabelType, "Mobile"))
          };
          return /*#__PURE__*/_jsx(DataTrendHdrMobile, {
            data: scopedProps
          }, statType);
        })]
      });
    }
  }

  var loadingState = viewport <= Screen.XS ? /*#__PURE__*/_jsx(StyledLoadingState, {}) : null;
  return loadingState;
};