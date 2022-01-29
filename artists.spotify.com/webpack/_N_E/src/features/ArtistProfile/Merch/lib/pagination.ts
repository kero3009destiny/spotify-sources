import _slicedToArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React from 'react';
var defaultFirst = 0;
var pageSize = 5;
export function usePagination(numItems) {
  var _React$useState = React.useState(defaultFirst),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      first = _React$useState2[0],
      setFirst = _React$useState2[1];

  var _React$useState3 = React.useState(pageSize),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      last = _React$useState4[0],
      setLast = _React$useState4[1];

  function next() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pageSize;
    setFirst(function (f) {
      return f + size;
    });
    setLast(function (l) {
      return l + size;
    });
  }

  function prev() {
    next(-1 * pageSize);
  }

  return {
    first: first,
    last: last,
    next: next,
    prev: prev,
    displayFirst: first + 1,
    displayLast: numItems < last ? numItems : last
  };
}