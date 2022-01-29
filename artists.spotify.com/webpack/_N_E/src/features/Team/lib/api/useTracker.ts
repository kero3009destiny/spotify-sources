import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { createAlohomoraInteractionBrowser } from '@spotify-internal/event-definitions/es5/events/createAlohomoraInteractionBrowser';
import { useMemo } from 'react';
import { useCurrentOrgOrNull } from '../../../../features/artists/src/useCurrentOrgOrNull';
import { logGabitoEvent } from '@mrkt/features/gabito';
export var useTracker = function useTracker() {
  var currentOrgOrNull = useCurrentOrgOrNull();
  return useMemo(function () {
    return {
      trackEvent: function trackEvent(event) {
        var context = {
          organization_uri: currentOrgOrNull && currentOrgOrNull.uri,
          is_test: window.location.host !== 'artists.spotify.com',
          current_uri: window.location.href
        };
        logGabitoEvent(createAlohomoraInteractionBrowser(_objectSpread(_objectSpread({}, event), context)));
      }
    };
  }, [currentOrgOrNull]);
};