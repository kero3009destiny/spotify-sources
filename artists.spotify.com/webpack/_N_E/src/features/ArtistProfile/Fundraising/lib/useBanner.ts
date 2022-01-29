import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import storage from 'local-storage-fallback';
import { useCurrentArtistIdOrNull } from '../../../artists';
import { useAuthorized } from './useAuthorized';
export var BannerState;

(function (BannerState) {
  BannerState[BannerState["success"] = 0] = "success";
  BannerState[BannerState["hide"] = 1] = "hide";
})(BannerState || (BannerState = {}));

export function useBanner() {
  var authorized = useAuthorized();
  var currentArtistId = useCurrentArtistIdOrNull();
  var key = getKey(currentArtistId);

  var _useStorage = useStorage(key),
      value = _useStorage.value,
      setValue = _useStorage.setValue;

  var done = React.useCallback(function () {
    setValue(BannerState.hide);
  }, [setValue]);
  return {
    success: value === BannerState.success,
    // Always hide the banner if user is not authorized to submit the
    // fundraising form
    hide: !authorized || value === BannerState.hide,
    done: done
  };
}

function useStorage(key) {
  var _storage$getItem;

  var storedValue = fromString((_storage$getItem = storage.getItem(key)) !== null && _storage$getItem !== void 0 ? _storage$getItem : '');

  var _React$useState = React.useState(storedValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setInnerValue = _React$useState2[1];

  React.useEffect(function () {
    // Re-read the value from storage whenever key changed
    setInnerValue(storedValue);
  }, [key, setInnerValue, storedValue]);

  function setValue(newValue) {
    setInnerValue(newValue);
    storage.setItem(key, toString(newValue));
  } // I've observed that when there's a discrepancy it's because there's a 1
  // render delay where the value in state is not yet synchronized to a value
  // from local storage. E.g. when switching between current artists (changing
  // the key). To prevent a render flash of the wrong banner, use the stored
  // value read directly (synchronously) from storage when there's a
  // synchronization delay.


  return {
    value: storedValue !== value ? storedValue : value,
    setValue: setValue
  };
}

export function useShowSuccess() {
  var currentArtistId = useCurrentArtistIdOrNull();
  var key = getKey(currentArtistId);
  return function showSuccess() {
    storage.setItem(key, toString(BannerState.success));
  };
}
export function useHideBanner() {
  var currentArtistId = useCurrentArtistIdOrNull();
  var key = getKey(currentArtistId);
  return function hideBanner() {
    storage.setItem(key, toString(BannerState.hide));
  };
}
export function getKey(artistId) {
  return "fundraising_banner_".concat(artistId || '');
}

function toString(v) {
  return v.toString();
}

function fromString(v) {
  var asInt = parseInt(v || '', 10) || 0;
  return clip(asInt);
}

function clip(num) {
  if ([0, 1, 2].includes(num)) return num;
  return 0;
}