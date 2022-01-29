import _slicedToArray from "/var/jenkins_home/workspace/tingle.95d1c772-977c-47f0-ae13-caaa6a239f46/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// The elasticsearch cluster is currently set to only allow
// paging to a max of 10k results. Since our limit is always
// 20, our max offset allowed is 9980 (max - limit);
export var MAX_OFFSET = 9980;

function getUrlParams(search) {
  var params = new URLSearchParams(search);
  var offset = params.get('offset') || '0';
  var parsed = Math.max(Number(offset), 0);
  var numOffset = isNaN(parsed) ? 0 : parsed; // clamp the offset to MAX_OFFSET

  numOffset = Math.min(MAX_OFFSET, numOffset); // if the user tried to input their own offset number
  // via url and it isn't a multiple of 20, then
  // set it to the next multiple of 20 always
  // rounding down; ie. 19 gets set to 0.

  if (numOffset > 0 && numOffset % 20 !== 0) {
    numOffset -= numOffset % 20;
  } // the ordering of these keys needs to be the same
  // as the order of the initialParams keys in order
  // for preloading to correctly cache hit.
  // Oh! the Perils of JSON.stringify() as a cache key...


  return {
    limit: 20,
    offset: numOffset
  };
}

export function useRosterSearchParams() {
  var location = useLocation();
  var history = useHistory();

  var _React$useState = React.useState(getUrlParams(location.search)),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      params = _React$useState2[0],
      setParams = _React$useState2[1]; // this function sets the url which causes a new location
  // object to be created, which will trigger the below
  // effect to update our internal params, which finally
  // triggers a rerender of the component.


  function setNewParams(newParams) {
    var updated = new URLSearchParams(window.location.search);
    var offset = Math.min(MAX_OFFSET, newParams.offset);
    updated.set('offset', "".concat(offset));
    history.push("/roster?".concat(updated.toString()));
  } // ONLY RUN ON MOUNT so that the initial offset
  // is set in the url


  React.useEffect(function () {
    var initialParams = getUrlParams(location.search);
    history.replace("/roster?offset=".concat(initialParams.offset)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // trigger a re-render with updated params because the URL changed

  React.useEffect(function () {
    setParams(getUrlParams(location.search));
  }, [location]);
  return [params, setNewParams];
}