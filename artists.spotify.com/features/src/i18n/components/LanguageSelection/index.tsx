import React, { useReducer, createContext, useContext } from 'react';
import { LanguageSelectionDialog } from './Dialog';

type Props = {
  children: React.ReactNode;
};

type Action =
  | {
      type: 'open';
    }
  | {
      type: 'close';
    };

const DispatchContext = createContext<React.Dispatch<Action>>(() => {});

const intialState = { isOpen: false };

function reducer(state = intialState, action: Action) {
  if (action.type === 'open') return { isOpen: true };
  if (action.type === 'close') return { isOpen: false };
  return state;
}

export function LanguageSelection({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      {children}
      {state.isOpen && (
        <LanguageSelectionDialog onClose={() => dispatch({ type: 'close' })} />
      )}
    </DispatchContext.Provider>
  );
}

export function useLanguageSelectionDispatch() {
  return useContext(DispatchContext);
}
