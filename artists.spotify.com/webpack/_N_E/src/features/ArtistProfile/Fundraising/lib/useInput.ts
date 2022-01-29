import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React, { useEffect } from 'react';
import { getSingleCharDiff } from '../lib/getSingleCharDiff';
export function useInput(defaultValue, staticPrefix) {
  var _React$useState = React.useState(staticPrefix || ''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      prefix = _React$useState2[0],
      setInnerPrefix = _React$useState2[1];

  var initialValue = "".concat(prefix).concat(defaultValue) || '';

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      dirty = _React$useState4[0],
      setDirty = _React$useState4[1];

  var _React$useState5 = React.useState( // @ts-ignore
  initialValue),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      value = _React$useState6[0],
      setInnerValue = _React$useState6[1];

  var _React$useState7 = React.useState([]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      errors = _React$useState8[0],
      setErrors = _React$useState8[1];

  function validate(validators) {
    setErrors(validators.map(function (v) {
      return v(value);
    }).filter(isString));
  }

  function reset() {
    setInnerValue(defaultValue || '');
    setPrefix('');
    setErrors([]);
  }

  var setInnerValueAndDirty = React.useCallback(function setInnerValueAndDirty(val) {
    setInnerValue(val);
    if (val !== prefix) setDirty(true);
  }, [prefix]); // TODO switch away from taking in the event, then can remove persist

  function setValue(event) {
    var _event$persist;

    // TODO is this needed?
    (_event$persist = event.persist) === null || _event$persist === void 0 ? void 0 : _event$persist.call(event); // No white space

    var newValue = event.target.value.trim();
    var slugRe = /^[a-zA-Z0-9_\-.]+$/;
    var cashSlugRe = /^\${1}[a-zA-Z0-9_-]+/;

    if (!prefix || newValue.startsWith(prefix)) {
      // Handle pasting slug with leading and/or trailing whitespace
      setInnerValueAndDirty("".concat(prefix).concat(newValue.slice(prefix.length).trim())); // Handle select all then backspace
    } else if (!newValue && prefix) {
      setInnerValueAndDirty(prefix); // Handle paste just the slug
    } else if (newValue && newValue.match(slugRe)) {
      setInnerValueAndDirty("".concat(prefix).concat(newValue)); // Handle pasting a cash slug with leading $
    } else if (newValue && newValue.match(cashSlugRe)) {
      // It's fine that this will work if someone pastes a "$someslug" in a
      // paypal or gofundme text input because we strip it anyway.
      setInnerValueAndDirty("".concat(prefix).concat(newValue.slice(1)));
    } else if (newValue) {
      // Handle single char diff in the middle of a prefix
      var diff = getSingleCharDiff(prefix, newValue);

      if (diff !== null && diff !== void 0 && diff.match(slugRe)) {
        setInnerValueAndDirty("".concat(prefix).concat(diff));
      }
    }
  }

  useEffect(function () {
    if (prefix && !value.startsWith(prefix)) {
      setInnerValue(prefix);
    }
  }, [prefix, setInnerValue, value]);

  function setPrefix(val) {
    setInnerPrefix(val);
  }

  return {
    value: value,
    setValue: setValue,
    setInnerValue: setInnerValueAndDirty,
    initialValue: initialValue,
    setPrefix: setPrefix,
    validate: validate,
    errors: errors,
    dirty: dirty,
    reset: reset
  };
}

function isString(value) {
  return value !== null;
}