// ignore-string-externalization
import React, { useReducer, Reducer, useContext } from 'react';
import { Action, ActionType } from './actions';

const initialState = { snackbars: [] };

type State = {
  snackbars: {
    id: string;
    message: string | React.ReactElement;
    theme?: { snackbar?: 'dark' };
  }[];
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.Add: {
      const { id, message, theme } = action;
      return {
        snackbars: [...state.snackbars, { id, message, theme }],
      };
    }
    case ActionType.Remove:
      return {
        snackbars: state.snackbars.filter(snack => snack.id !== action.id),
      };
    default:
      return state;
  }
};

const SnackbarContext = React.createContext<[State, React.Dispatch<Action>]>([
  initialState,
  action => action,
]);

export const SnackbarState: React.FunctionComponent<{}> = ({ children }) => (
  <SnackbarContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </SnackbarContext.Provider>
);

export const useSnackbarState = () => useContext(SnackbarContext);
