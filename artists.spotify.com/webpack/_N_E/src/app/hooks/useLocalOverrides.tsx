// ignore-string-externalization
import { useLocation } from 'react-router-dom'; //

/** Force hard to reach states for testing purposes. */

export var useLocalOverrides = function useLocalOverrides() {
  var _useLocation = useLocation(),
      search = _useLocation.search;

  var searchParms = new URLSearchParams(search);
  return {
    showAppError: searchParms.has('_app-error')
  };
};