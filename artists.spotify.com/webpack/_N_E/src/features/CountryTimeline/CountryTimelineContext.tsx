import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.cd962a55-a742-407f-a437-251a69d63f52/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.cd962a55-a742-407f-a437-251a69d63f52/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization
import React, { createContext, useState, useEffect } from 'react';
import get from 'lodash/get';
import { scaleOrdinal } from 'd3-scale';
import { useCountryNames } from '@mrkt/features/country-names';
import { useCurrentArtistId } from '../../features/artists/src/useCurrentArtistId';
import { useCurrentSongId } from '../Song/hooks/useCurrentSongId';
import { useCurrentUser } from '../../features/currentUser';
import { normalize } from './normalizer';
import { useCountryTimelineResource } from './useCountryTimelineResource';
import { setRecentCountryIds, getRecentCountryIds } from './recentCountryIds';
import { jsx as _jsx } from "react/jsx-runtime";

var getCountries = function getCountries(data) {
  if (!data || data.status) return null;
  return data.map(function (d) {
    return d.countryCode;
  });
};

export var CountryTimelineContext = /*#__PURE__*/createContext({});
var defaultDateFilter = '28day';
var REMOVED_COUNTRY_STRING = '';
export var Provider = function Provider(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === void 0 ? null : _ref$children;
  var artistId = useCurrentArtistId();
  var songId = useCurrentSongId();
  var user = useCurrentUser();
  var username = get(user || {}, 'username');

  var _useState = useState(function () {
    var storedCountries = getRecentCountryIds(username, artistId, songId);
    return storedCountries;
  }),
      countries = _useState[0],
      _setCountries = _useState[1];

  var _useState2 = useState(defaultDateFilter),
      timeFilter = _useState2[0],
      setTimefilter = _useState2[1];

  var _useState3 = useState(function () {
    return scaleOrdinal().range(['#3259F9', '#85E0FF', '#622762', '#E6579A', '#FFB1B9']).unknown(REMOVED_COUNTRY_STRING);
  }),
      colorScale = _useState3[0],
      setColorScale = _useState3[1];

  var _useState4 = useState(),
      countryTimelineData = _useState4[0],
      setChartData = _useState4[1];

  var setCountries = function setCountries(_countries) {
    if (!_countries) return;

    _setCountries(_countries);

    setRecentCountryIds(username, artistId, songId, _countries);
  };

  var isoCountries = useCountryNames();
  if (!isoCountries) throw new Error('countries undefined not supported');
  var newData = useCountryTimelineResource(artistId, songId, timeFilter, (countries || []).join());
  var dataLength = get(newData, 'countryTimelines', []).length;
  useEffect(function () {
    if (countries && !countries.length) {
      setRawChartDataAndCountries({
        countryTimelines: []
      });
    } else setRawChartDataAndCountries(newData);
  }, [dataLength, timeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  var addNewCountry = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(countryCode) {
      var newCountryArray, domain, addIndex;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newCountryArray = (countries || []).concat([countryCode]).sort(function (a, b) {
                if (isoCountries[a] < isoCountries[b]) return -1;
                if (isoCountries[a] > isoCountries[b]) return 1;
                return 0;
              });
              domain = colorScale.domain();
              addIndex = domain.findIndex(function (item) {
                return item === REMOVED_COUNTRY_STRING;
              });

              if (addIndex > -1) {
                // gating in case index is not found
                // replace previously removed countries
                domain[addIndex] = countryCode;
                setColorScale(function () {
                  return colorScale.copy().domain(domain);
                });
              } else {
                // add country to the domain
                domain.push(countryCode);
                colorScale.domain(domain);
              }

              setCountries(newCountryArray);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function addNewCountry(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var removeCountry = function removeCountry(countryCode) {
    // update color scale
    var domain = colorScale.domain();
    var removedIndex = domain.findIndex(function (item) {
      return item === countryCode;
    });

    if (removedIndex > -1) {
      // gating in case index is not found
      domain[removedIndex] = REMOVED_COUNTRY_STRING;
      setColorScale(function () {
        return colorScale.copy().domain(domain);
      });
    } // remove from countries array


    var filteredArray = (countries || []).filter(function (item) {
      return item !== countryCode;
    });
    setCountries(filteredArray);
  };

  var setRawChartDataAndCountries = function setRawChartDataAndCountries(data) {
    if (data.status && data.status !== 200) {
      setChartData(data);
    } else {
      var normalizedData = normalize(data).sort(function (a, b) {
        if (isoCountries[a.countryCode] < isoCountries[b.countryCode]) return -1;
        if (isoCountries[a.countryCode] > isoCountries[b.countryCode]) return 1;
        return 0;
      });
      setChartData(normalizedData);
      var fetchedCountries = getCountries(normalizedData);

      if (colorScale.domain().length === 0) {
        colorScale.domain(fetchedCountries);
      }

      setCountries(fetchedCountries);
    }
  };

  var countriesContext = {
    countries: countries,
    addNewCountry: addNewCountry,
    countryTimelineData: countryTimelineData,
    timeFilter: timeFilter,
    setTimefilter: setTimefilter,
    removeCountry: removeCountry,
    colorScale: colorScale
  };
  return /*#__PURE__*/_jsx(CountryTimelineContext.Provider, {
    value: countriesContext,
    children: children
  });
};
Provider.defaultProps = {
  countries: []
};