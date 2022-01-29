import _defineProperty from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { utcParse } from 'd3-time-format';
import { timeHour } from 'd3-time';
import { createSelector } from 'reselect';
import { normalizeView } from './normalizer';
export var isFutureDate = function isFutureDate(startDate) {
  var parser = utcParse('%Y-%m-%dT%H:%M:%S%Z');
  var dateParsed = parser(startDate.date);
  var concertDate = isFinite(dateParsed) ? timeHour.offset(dateParsed, startDate.utcOffset) : 0;
  var timeToCompare = concertDate ? concertDate.getTime() : 0;
  var timeNow = new Date().getTime();
  return isFinite(timeToCompare) ? timeToCompare - timeNow > 0 : false;
};
export var selectConcerts = createSelector( // @ts-ignore
function (state) {
  return state.concertView;
}, function (concerts) {
  return concerts && concerts.data ? concerts && concerts.data && concerts.data.upcomingConcerts.map(normalizeView) : [];
});
export var selectPartnerImages = createSelector( // @ts-ignore
function (state) {
  return state.concertView;
}, function (view) {
  return view && view.data && view.data.partnerArtistImages ? view.data.partnerArtistImages : [];
});
export var selectConnectedPartners = createSelector( // @ts-ignore
function (state) {
  return state.concertView;
}, selectPartnerImages, function (view, partnerImages) {
  return view && view.data ? view.data.connectedPartners.map(function (partner) {
    return _objectSpread(_objectSpread({}, partner), {}, {
      mappedPartnerImage: partnerImages.find(function (img) {
        return img.partnerId === partner.partnerId && img.partnerName === partner.partnerName;
      }) || {}
    });
  }) : [];
});
export var selectConcertViewLoadStatus = createSelector( // @ts-ignore
function (state) {
  return state.concertView;
}, function (view) {
  return {
    isLoading: !!view && !!view.loadingId,
    hasError: !!view && !!view.error
  };
});