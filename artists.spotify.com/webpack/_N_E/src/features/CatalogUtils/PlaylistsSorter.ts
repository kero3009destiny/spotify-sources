import _toConsumableArray from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_ALGO_PROPS = {
  isPlaceholder: true
};
/**
 * Don't know if the BE will be ordered correctly...
 * Pull the orderedDefault to the top,
 * include the rest of the returned playlists after
 * then the defaulted  playlists at the end.
 * See state/index.test.js for example
 */

export var createAlgoPlaylistDefaulter = function createAlgoPlaylistDefaulter(orderedDefault) {
  return function (rawPlaylists) {
    var found = orderedDefault.filter(function (defaultAlgo) {
      return rawPlaylists.find(function (raw) {
        return raw.title === defaultAlgo.title;
      });
    });
    var missingDefault = orderedDefault.filter(function (defaultAlgo) {
      return !rawPlaylists.find(function (raw) {
        return raw.title === defaultAlgo.title;
      });
    }).map(function (da) {
      return _objectSpread(_objectSpread({}, da), DEFAULT_ALGO_PROPS);
    });
    /**
     * mutableRaw contains the remaining algo playlists
     * after picking out the found defaultable algo playlists
     */

    var mutableRaw = _toConsumableArray(rawPlaylists);

    var ordered = found.map(function (defaultAlgo) {
      var playlistIdx = mutableRaw.findIndex(function (mr) {
        return mr.title === defaultAlgo.title;
      });
      return mutableRaw.splice(playlistIdx, 1)[0];
    });
    return ordered.concat(mutableRaw).concat(missingDefault);
  };
};
/**
 * Sets the order of the algorithmic playlists.
 * @param  {Array} orderedAlgo
 * @param  {Object} response
 * @return {Object}
 */

export var setPlaylistOverviewOrder = function setPlaylistOverviewOrder(orderedAlgo, response) {
  var playlistDefaulter = createAlgoPlaylistDefaulter(orderedAlgo);
  return _objectSpread(_objectSpread({}, response), {}, {
    algorithmic: {
      playlists: playlistDefaulter(_toConsumableArray(response.algorithmic.playlists))
    }
  });
};