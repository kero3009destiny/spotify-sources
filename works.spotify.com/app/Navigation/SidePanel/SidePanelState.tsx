// ignore-string-externalization
import { Team } from 'libs/services/s4pTypes';
import React from 'react';

type State = {
  shouldShowSidePanel: boolean;
  shouldShowSearch: boolean;
  shouldShowUserControls: boolean;
  searchValue: string;
  sidePanelOpening: boolean;
  searchResults: Team[];
};
const initialState: State = {
  shouldShowSidePanel: false,
  shouldShowSearch: false,
  shouldShowUserControls: false,
  searchValue: '',
  sidePanelOpening: false,
  searchResults: [],
};

type ContextType = [State, React.Dispatch<Action>];

const Context = React.createContext<ContextType>([initialState, (action) => action]);

const SHOW_SIDE_PANEL = 'SHOW_SIDE_PANEL';
const HIDE_SIDE_PANEL = 'HIDE_SIDE_PANEL';
const SET_SIDE_PANEL_OPENING = 'SET_SIDE_PANEL_OPENING';
const SHOW_SEARCH = 'SHOW_SEARCH';
const HIDE_SEARCH = 'HIDE_SEARCH';
const SHOW_USER_CONTROLS = 'SHOW_USER_CONTROLS';
const HIDE_USER_CONTROLS = 'HIDE_USER_CONTROLS';
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case SHOW_SIDE_PANEL:
      return { ...state, shouldShowSidePanel: true };
    case HIDE_SIDE_PANEL:
      return initialState;
    case SET_SIDE_PANEL_OPENING:
      return { ...state, sidePanelOpening: action.value };
    case SHOW_SEARCH:
      return { ...state, shouldShowSearch: true };
    case HIDE_SEARCH:
      return { ...state, shouldShowSearch: false, searchValue: '' };
    case SHOW_USER_CONTROLS:
      return { ...state, shouldShowUserControls: true };
    case HIDE_USER_CONTROLS:
      return { ...state, shouldShowUserControls: false };
    case SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
}

export function showSidePanel(): showSidePanelAction {
  return { type: SHOW_SIDE_PANEL };
}

export function hideSidePanel(): hideSidePanelAction {
  return { type: HIDE_SIDE_PANEL };
}

export function setSidePanelOpening(value: boolean): setSidePanelOpeningAction {
  return { type: SET_SIDE_PANEL_OPENING, value };
}

export function showSearch(): showSearchAction {
  return { type: SHOW_SEARCH };
}

export function hideSearch(): hideSearchAction {
  return { type: HIDE_SEARCH };
}

export function showUserControls(): showUserControlsAction {
  return { type: SHOW_USER_CONTROLS };
}

export function hideUserControls(): hideUserControlsAction {
  return { type: HIDE_USER_CONTROLS };
}

export function setSearchValue(payload = ''): setSearchValueAction {
  return { type: SET_SEARCH_VALUE, payload };
}

export function setSearchResults(payload: Team[]): setSearchResultsAction {
  return { type: SET_SEARCH_RESULTS, payload };
}

export function useSidePanel() {
  return React.useContext(Context);
}

export function SidePanelState({ children = null }: Props) {
  const sidePanel = React.useReducer(reducer, initialState);
  return <Context.Provider value={sidePanel}>{children}</Context.Provider>;
}

type showSidePanelAction = {
  type: typeof SHOW_SIDE_PANEL;
};

type hideSidePanelAction = {
  type: typeof HIDE_SIDE_PANEL;
};

type setSidePanelOpeningAction = {
  type: typeof SET_SIDE_PANEL_OPENING;
  value: boolean;
};

type showSearchAction = {
  type: typeof SHOW_SEARCH;
};

type hideSearchAction = {
  type: typeof HIDE_SEARCH;
};

type showUserControlsAction = {
  type: typeof SHOW_USER_CONTROLS;
};

type hideUserControlsAction = {
  type: typeof HIDE_USER_CONTROLS;
};

type setSearchValueAction = {
  type: typeof SET_SEARCH_VALUE;
  payload: string;
};

type setSearchResultsAction = {
  type: typeof SET_SEARCH_RESULTS;
  payload: Team[];
};

type Action =
  | showSidePanelAction
  | hideSidePanelAction
  | setSidePanelOpeningAction
  | showSearchAction
  | hideSearchAction
  | showUserControlsAction
  | hideUserControlsAction
  | setSearchValueAction
  | setSearchResultsAction;

type Props = {
  children?: React.ReactNode;
};
