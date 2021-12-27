import { change } from 'redux-form';

import { batchActions } from 'redux-batched-actions';

// an alias action to create a batch action triggering a change() on every
// field in the provided object.
export const replaceFormValues = (formName, values) =>
  batchActions(
    Object.keys(values).map(fieldName =>
      change(formName, fieldName, values[fieldName]),
    ),
  );
