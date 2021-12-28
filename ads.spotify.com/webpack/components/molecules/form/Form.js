import React, { useReducer, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  FORM_ACTIONS,
  FormStateContext,
  FormActionsContext,
  formReducer,
  initialState,
} from './FormContext';

import * as Styled from './Form.styled';

/**
 * Form component
 * @param {string|null} className The component class name.
 * @param {string|null} textColor - The text color
 * @param {Function} onSubmit - The on submit event listener
 * @param {Function} onFieldError - The on field error event listener
 * @param {boolean} error - if submit event has failed when handled from upper parent
 * @returns {ReactElement}
 */
const Form = ({
  className,
  textColor = null,
  onSubmit,
  onFieldError,
  error,
  children,
}) => {
  const [state, dispatch] = useReducer(formReducer, {
    ...initialState,
    textColor,
  });

  const onFormSubmit = useCallback(
    event => {
      dispatch({ type: FORM_ACTIONS.SET_SUBMITTING, submitting: true });
      onSubmit(event, state.values);
    },
    [onSubmit, state],
  );

  useEffect(() => {
    if (error) {
      dispatch({ type: FORM_ACTIONS.SET_SUBMITTING, submitting: false });
    }
  }, [error]);

  useEffect(() => {
    if (state.latestFieldError && typeof onFieldError === 'function') {
      onFieldError(state.latestFieldError);
    }
  }, [state.latestFieldError]);

  return (
    <FormStateContext.Provider value={state}>
      <FormActionsContext.Provider value={dispatch}>
        <Styled.Form
          className={className}
          textColor={textColor}
          onSubmit={onFormSubmit}
        >
          <fieldset>{children}</fieldset>
        </Styled.Form>
      </FormActionsContext.Provider>
    </FormStateContext.Provider>
  );
};

Form.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * Default className prop
   */
  children: PropTypes.node,
};

export default Form;
