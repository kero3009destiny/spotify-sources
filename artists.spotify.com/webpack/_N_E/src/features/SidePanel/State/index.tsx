import _defineProperty from "/var/jenkins_home/workspace/tingle.1d9bbf01-b030-4b00-bcd2-ebd3bbb0c725/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
var initialState = {
  shouldShowSidePanel: false,
  shouldShowSearch: false,
  shouldShowUserControls: false,
  searchValue: '',
  sidePanelOpening: false
};
var Context = /*#__PURE__*/React.createContext([initialState, function (action) {
  return action;
}]);
var SHOW_SIDE_PANEL = 'SHOW_SIDE_PANEL';
var HIDE_SIDE_PANEL = 'HIDE_SIDE_PANEL';
var SET_SIDE_PANEL_OPENING = 'SET_SIDE_PANEL_OPENING';
var SHOW_SEARCH = 'SHOW_SEARCH';
var HIDE_SEARCH = 'HIDE_SEARCH';
var SHOW_USER_CONTROLS = 'SHOW_USER_CONTROLS';
var HIDE_USER_CONTROLS = 'HIDE_USER_CONTROLS';
var SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SHOW_SIDE_PANEL:
      return _objectSpread(_objectSpread({}, state), {}, {
        shouldShowSidePanel: true
      });

    case HIDE_SIDE_PANEL:
      return initialState;

    case SET_SIDE_PANEL_OPENING:
      return _objectSpread(_objectSpread({}, state), {}, {
        sidePanelOpening: action.value
      });

    case SHOW_SEARCH:
      return _objectSpread(_objectSpread({}, state), {}, {
        shouldShowSearch: true
      });

    case HIDE_SEARCH:
      return _objectSpread(_objectSpread({}, state), {}, {
        shouldShowSearch: false,
        searchValue: ''
      });

    case SHOW_USER_CONTROLS:
      return _objectSpread(_objectSpread({}, state), {}, {
        shouldShowUserControls: true
      });

    case HIDE_USER_CONTROLS:
      return _objectSpread(_objectSpread({}, state), {}, {
        shouldShowUserControls: false
      });

    case SET_SEARCH_VALUE:
      return _objectSpread(_objectSpread({}, state), {}, {
        searchValue: action.payload
      });

    default:
      return state;
  }
}

export function showSidePanel() {
  return {
    type: SHOW_SIDE_PANEL
  };
}
export function hideSidePanel() {
  return {
    type: HIDE_SIDE_PANEL
  };
}
export function setSidePanelOpening(value) {
  return {
    type: SET_SIDE_PANEL_OPENING,
    value: value
  };
}
export function showSearch() {
  return {
    type: SHOW_SEARCH
  };
}
export function hideSearch() {
  return {
    type: HIDE_SEARCH
  };
}
export function showUserControls() {
  return {
    type: SHOW_USER_CONTROLS
  };
}
export function hideUserControls() {
  return {
    type: HIDE_USER_CONTROLS
  };
}
export function setSearchValue() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    type: SET_SEARCH_VALUE,
    payload: payload
  };
}
export function useSidePanel() {
  return React.useContext(Context);
}
export function SidePanelState(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === void 0 ? null : _ref$children;
  var sidePanel = React.useReducer(reducer, initialState);
  return /*#__PURE__*/_jsx(Context.Provider, {
    value: sidePanel,
    children: children
  });
}