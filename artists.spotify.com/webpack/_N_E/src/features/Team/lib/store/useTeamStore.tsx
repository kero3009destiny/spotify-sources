import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { createTeamActionDispatchers } from './TeamAction';
import { defaultTeamState } from './TeamState';
import { useTeamReducer } from './useTeamReducer';
import { useTeamBackgroundTasks } from './backgroundTasks';
import { useTeamTaskDispatchers } from './tasks'; // Task and Action dispatchers are separated so TaskDispatchers can

import { jsx as _jsx } from "react/jsx-runtime";
var teamContext = /*#__PURE__*/createContext(null);
export var ProvideTeamStore = function ProvideTeamStore(_ref) {
  var children = _ref.children,
      initialState = _ref.initialState;
  var reducer = useTeamReducer();

  var _useReducer = useReducer(reducer, initialState || defaultTeamState),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var actionDispatchers = useMemo(function () {
    return createTeamActionDispatchers(dispatch);
  }, [dispatch]);
  var taskDispatchers = useTeamTaskDispatchers(actionDispatchers);
  var dispatchers = useMemo(function () {
    return _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers);
  }, [actionDispatchers, taskDispatchers]);
  useTeamBackgroundTasks(state, dispatchers);
  return /*#__PURE__*/_jsx(teamContext.Provider, {
    value: {
      state: state,
      dispatch: dispatch,
      dispatchers: dispatchers
    },
    children: children
  });
};
export var ProvideMockTeamStore = function ProvideMockTeamStore(_ref2) {
  var children = _ref2.children,
      mockState = _ref2.mockState,
      _ref2$mockDispatch = _ref2.mockDispatch,
      mockDispatch = _ref2$mockDispatch === void 0 ? function () {} : _ref2$mockDispatch;
  var actionDispatchers = createTeamActionDispatchers(mockDispatch);
  var taskDispatchers = useTeamTaskDispatchers(actionDispatchers);
  var dispatchers = useMemo(function () {
    return _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers);
  }, [actionDispatchers, taskDispatchers]);
  return /*#__PURE__*/_jsx(teamContext.Provider, {
    value: {
      state: mockState,
      dispatch: mockDispatch,
      dispatchers: dispatchers
    },
    children: children
  });
};
export var useTeamStore = function useTeamStore() {
  var maybeTeamContext = useContext(teamContext);

  if (!maybeTeamContext) {
    throw new Error('No store found. Did you use ProvideTeamStore?');
  }

  var state = maybeTeamContext.state,
      dispatch = maybeTeamContext.dispatch,
      dispatchers = maybeTeamContext.dispatchers;
  return _objectSpread(_objectSpread(_objectSpread({}, state), dispatchers), {}, {
    /* For testing */
    dispatch: dispatch,
    state: state
  });
};