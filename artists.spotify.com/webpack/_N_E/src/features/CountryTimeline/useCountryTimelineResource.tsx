// ignore-string-externalization
import React, { useEffect } from 'react';
import { createResource } from '../../shared/lib/createResource';
import { S4X_DATA_API, webgateFetch } from '../../shared/lib/api';

var fetchCountryData = function fetchCountryData(props) {
  var countryCodes = props.countryCodes ? "&country-codes=".concat(props.countryCodes) : '';
  return webgateFetch("".concat(S4X_DATA_API, "/v1/artist/").concat(props.artistId, "/recording/").concat(props.songId, "/timeline/countries?time-filter=").concat(props.timeFilter, "&aggregation-level=recording").concat(countryCodes)).then(function (response) {
    if (!response) {
      return {
        status: 204
      }; // No Content
    }

    switch (response.status) {
      case 200:
        return response.json();

      case 403: // Forbidden

      default:
        return {
          status: response.status
        };
    }
  }).catch(function () {
    return {
      status: 500
    };
  });
};

var CountryTimelinePermissionResource = createResource(function (props) {
  return fetchCountryData(props);
}, function (props) {
  return "".concat(props.artistId).concat(props.songId).concat(props.timeFilter).concat(props.countryCodes);
} // when key changes the loader is called again
);
export function useCountryTimelineResource(artistId, songId, timeFilter, countryCodes) {
  var songKey = React.useMemo(function () {
    return {
      artistId: artistId,
      songId: songId,
      timeFilter: timeFilter,
      countryCodes: countryCodes
    };
  }, [artistId, songId, timeFilter, countryCodes]);
  useEffect(function () {
    // do nothing for now on mount, but invalidate when things change or on unmount
    return function cleanup() {
      CountryTimelinePermissionResource.invalidate(songKey);
    };
  }, [songKey, timeFilter]);
  return CountryTimelinePermissionResource.read(songKey);
}
export function getCountryTimelineResource(artistId, songId, timeFilter, countryCodes) {
  return fetchCountryData({
    artistId: artistId,
    songId: songId,
    timeFilter: timeFilter,
    countryCodes: countryCodes
  });
}