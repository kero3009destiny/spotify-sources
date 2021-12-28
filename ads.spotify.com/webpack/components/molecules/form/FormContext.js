import { createContext, useContext, useCallback, useMemo } from 'react';

export const FormStateContext = createContext();
export const FormActionsContext = createContext();

export const FORM_ACTIONS = {
  SET_FIELD_VALUE: 'SET_FIELD_VALUE',
  SET_FIELD_ERROR: 'SET_FIELD_ERROR',
  FIELD_INIT: 'FIELD_INIT',
  SET_SUBMITTING: 'SET_SUBMITTING',
};

export const useFormState = () => {
  const state = useContext(FormStateContext);

  if (state === undefined) {
    throw new Error('useFormState must be used within FormProvider');
  }

  return state;
};

export const useField = ({
  fieldName,
  defaultValue = '',
  required = false,
}) => {
  const dispatch = useContext(FormActionsContext);

  if (dispatch === undefined) {
    throw new Error('useField must be used within FormProvider');
  }

  const setFieldValue = useCallback(
    value => dispatch({ type: FORM_ACTIONS.SET_FIELD_VALUE, fieldName, value }),
    [],
  );
  const setFieldDirty = useCallback(
    () => dispatch({ type: FORM_ACTIONS.SET_FIELD_DIRTY, fieldName }),
    [],
  );
  const setFieldError = useCallback(
    error => dispatch({ type: FORM_ACTIONS.SET_FIELD_ERROR, fieldName, error }),
    [],
  );

  useMemo(() => {
    dispatch({
      type: FORM_ACTIONS.FIELD_INIT,
      fieldName,
      defaultValue,
      required,
    });
  }, []);

  return { setFieldValue, setFieldError, setFieldDirty };
};

export const initialState = {
  values: {},
  errors: {},
  dirty: {},
  latestFieldError: '',
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.SET_FIELD_VALUE: {
      return {
        ...state,
        values: { ...state.values, [action.fieldName]: action.value },
      };
    }
    case FORM_ACTIONS.SET_FIELD_ERROR: {
      return {
        ...state,
        errors: { ...state.errors, [action.fieldName]: action.error },
        latestFieldError:
          action.error && state.dirty[action.fieldName] ? action.fieldName : '',
      };
    }
    case FORM_ACTIONS.SET_FIELD_DIRTY: {
      return {
        ...state,
        dirty: { ...state.dirty, [action.fieldName]: true },
      };
    }
    case FORM_ACTIONS.FIELD_INIT: {
      return {
        ...state,
        values: { ...state.values, [action.fieldName]: action.defaultValue },
        dirty: { ...state.dirty, [action.fieldName]: false },
        errors: { ...state.errors, [action.fieldName]: action.required },
      };
    }
    case FORM_ACTIONS.SET_SUBMITTING: {
      return {
        ...state,
        submitting: action.submitting,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
