import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import * as React from 'react';
import { scaleOrdinal } from 'd3-scale';
import styled, { css } from 'styled-components';
import { screenSmMin, spacer24, gray60, Type, Banner, VisuallyHidden } from '@spotify-internal/encore-web-v3';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useT } from '@mrkt/features/i18n';
import { ResizeContainer } from '../../../shared/components/ResizeContainer';
import { normalize as normalizeAnnotations } from '../normalizers/annotations';
import { normalize as normalizeTimeline } from '../normalizers/timeline'; // @todo: research cross-referencing features inside of other features
// @todo (post-launch): possibly move into this file/folder if only used here

import { ComparisonButton } from '../../ComparisonButton'; // @todo (post-launch): move this from the shared components folder

import { TimelineChart } from '../TimelineChart';
import { useGetString } from '../../../shared/messages/strings';
import { StyledBannerWrapper } from '../Styles';
import { ArtistEntityPicker as _ArtistEntityPicker, sortByMatchAndPopularity } from '@mrkt/features/combobox/EntityPicker';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ArtistEntityPicker = styled(_ArtistEntityPicker).withConfig({
  displayName: "TimelineWrapper__ArtistEntityPicker",
  componentId: "sc-1an4cj4-0"
})(["max-width:390px;"]);
var ARTIST_PRIMARY = 'primary';
var ARTIST_COMPARE_1 = 'compare1';
var ARTIST_COMPARE_2 = 'compare2';
var MAX_COMPARE_ARTISTS = 2;

var generateDefaultScale = function generateDefaultScale(artistId) {
  return scaleOrdinal().domain([artistId, '1', '2']).range([ARTIST_PRIMARY, ARTIST_COMPARE_1, ARTIST_COMPARE_2]);
};

var ComparisonWrapper = styled.div.withConfig({
  displayName: "TimelineWrapper__ComparisonWrapper",
  componentId: "sc-1an4cj4-1"
})(["margin-top:", ";", ""], spacer24, function (props) {
  return props.hasAnnotations ? css(["margin-left:", " * 5;"], spacer24) : css(["margin-left:", " * 5;margin-top:40px;"], spacer24);
});
var CompareMessage = styled.div.withConfig({
  displayName: "TimelineWrapper__CompareMessage",
  componentId: "sc-1an4cj4-2"
})(["color:", ";font-weight:", ";letter-spacing:0.5px;margin-bottom:15px;@media (min-width:", "){padding-top:12px;}"], gray60, Type.book, screenSmMin);
export var TimelineWrapper = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var setQuery = _ref.setQuery,
      artist = _ref.artist,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      viewport = _ref.viewport,
      annotations = _ref.annotations,
      qaId = _ref.qaId,
      query = _ref.query,
      selectedCountry = _ref.selectedCountry;

  var _React$useState = React.useState(function () {
    return generateDefaultScale(artist.id);
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      artistIdToType = _React$useState2[0],
      setArtistIdToType = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      comparedArtists = _React$useState4[0],
      setComparedArtist = _React$useState4[1];

  var t = useT();
  var strings = useGetString();
  var artistList = comparedArtists.concat([artist]);
  var normalizedChartData = normalizeTimeline({
    data: data,
    artistIdToType: artistIdToType,
    artistList: artistList
  });
  var normalizedAnnotations = [];

  if (annotations && query.params['time-filter'] !== 'last5years') {
    normalizedAnnotations = normalizeAnnotations({
      annotations: annotations
    });
  }

  React.useEffect(function () {
    if (selectedCountry.code !== strings.worldwide.code) {
      setComparedArtist([]);
      setArtistIdToType(function () {
        return generateDefaultScale(artist.id);
      });
    }
  }, [selectedCountry.code, artist.id]);

  var onAddArtist = function onAddArtist(addedArtist) {
    // do this on the next tick, so the auto-complete closes asap
    // currently, the @reach combobox (which the entity picker uses under the covers) does not play
    // well with Suspense. When this UI suspends, the results list stays rendered. The timeout forces
    // the results list to close, first, and THEN suspends and sends the new query
    setTimeout(function () {
      var artists = query.artists.concat(addedArtist.id);
      setComparedArtist(comparedArtists.concat([addedArtist]));
      setQuery(_objectSpread(_objectSpread({}, query), {}, {
        artists: artists
      }));
      sendEvent({
        eventCategory: 'Timeline',
        eventAction: 'compareArtist:add',
        eventLabel: addedArtist.name
      });
      var domain = artistIdToType.domain();
      domain[0] = artist.id;
      var newArtistIndex = domain.findIndex(function (d) {
        return d.toString().length === 1;
      });
      /* Only add artist to domain index if it's great than -1. */

      if (newArtistIndex < 0) return; // error case, should never occur

      domain[newArtistIndex] = addedArtist.id;
      var view = artistIdToType.copy().domain(domain);
      setArtistIdToType(function () {
        return view;
      });
    });
  };

  var onRemoveArtist = function onRemoveArtist(removedArtist) {
    var domain = artistIdToType.domain();
    var artistIndex = domain.findIndex(function (d) {
      return d === removedArtist.id;
    });
    var artists = query.artists.filter(function (d) {
      return d !== removedArtist.id;
    });
    domain[artistIndex] = artistIndex.toString();
    setComparedArtist(comparedArtists.filter(function (d) {
      return d.id !== removedArtist.id;
    }));
    var view = artistIdToType.copy().domain(domain);
    setArtistIdToType(function () {
      return view;
    });
    setQuery(_objectSpread(_objectSpread({}, query), {}, {
      artists: artists
    }));
    sendEvent({
      eventCategory: 'Timeline',
      eventAction: 'compareArtist:remove',
      eventLabel: removedArtist.name
    });
  };

  var filter = function filter(filteredArtist) {
    return !(comparedArtists.some(function (a) {
      return a.id === filteredArtist.id;
    }) || filteredArtist.id === artist.id);
  };

  return /*#__PURE__*/_jsxs("div", {
    "data-testid": qaId,
    "data-slo-id": "stats",
    ref: ref,
    children: [/*#__PURE__*/_jsx(ResizeContainer, {
      viewport: viewport,
      render: function render(width) {
        return /*#__PURE__*/_jsx(TimelineChart, {
          annotations: normalizedAnnotations,
          artist: artist,
          data: normalizedChartData,
          timeFilter: query.params['time-filter'],
          type: query.type,
          width: width
        });
      }
    }), /*#__PURE__*/_jsx(VisuallyHidden, {
      children: t('AUDIENCE_TIMELINE_WRAPPER_350331', 'Compare to other artists. Comparing artists is currently not available on screen readers.', '')
    }), /*#__PURE__*/_jsxs(ComparisonWrapper, {
      "aria-hidden": "true",
      hasAnnotations: true,
      children: [selectedCountry.code !== strings.worldwide.code && /*#__PURE__*/_jsx(StyledBannerWrapper, {
        "data-testid": "info-banner",
        children: /*#__PURE__*/_jsx(Banner, {
          contextual: true,
          variant: "announcement",
          children: t('AUDIENCE_TIMELINE_WRAPPER_ef9b65', 'You filtered by a country. But artist comparison is only available worldwide.', '')
        })
      }), comparedArtists.length === MAX_COMPARE_ARTISTS && /*#__PURE__*/_jsx(CompareMessage, {
        children: t('AUDIENCE_TIMELINE_WRAPPER_879356', 'You can only compare 3 artists at a time.', '')
      }), comparedArtists.length < MAX_COMPARE_ARTISTS && /*#__PURE__*/_jsx(ArtistEntityPicker, {
        onSelect: function onSelect(artistResult) {
          onAddArtist(artistResult.entity);
        },
        adjustResults: function adjustResults(results) {
          return sortByMatchAndPopularity(results.filter(function (artistResult) {
            return filter(artistResult);
          }));
        },
        placeholder: comparedArtists.length === 0 ? t('AUDIENCE_ARTIST_PICKER_f2d7ee', 'Compare to other artists', '') : t('AUDIENCE_ARTIST_PICKER_816aec', 'Compare to another artist', ''),
        disabled: selectedCountry.code !== strings.worldwide.code,
        noClearButton: true
      }), /*#__PURE__*/_jsx("div", {
        children: comparedArtists.map(function (a) {
          return /*#__PURE__*/_jsx(ComparisonButton, {
            buttonText: a.name,
            onClick: function onClick() {
              return onRemoveArtist(a);
            }
          }, a.id);
        })
      })]
    })]
  });
});