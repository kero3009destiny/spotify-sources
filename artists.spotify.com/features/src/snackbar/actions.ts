// ignore-string-externalization
import uniqueId from 'lodash/uniqueId';

export enum ActionType {
  Add = 'ADD',
  Remove = 'REMOVE',
}

export type AddAction = {
  type: ActionType.Add;
  id: string;
  message: string | React.ReactElement;
  theme?: { snackbar?: 'dark' };
};

export type RemoveAction = {
  type: ActionType.Remove;
  id: string;
};

export type Action = AddAction | RemoveAction;

export const addSnackbar = (
  message: string | React.ReactElement,
  theme?: { snackbar?: 'dark' },
): AddAction => ({
  type: ActionType.Add,
  id: uniqueId('snack-'),
  message,
  theme,
});

export const removeSnackbar = (id: string): RemoveAction => ({
  type: ActionType.Remove,
  id,
});
