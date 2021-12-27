import { Action } from 'redux';

export enum DialogEvents {
  isVisible = 'IS_VISIBLE',
  setContent = 'SET_CONTENT',
}

export interface IDialogContent {
  title?: string;
  body: string;
  actionLabel: string;
  actionURL: string;
}

export interface SetGlobalDialogStatus extends Action {
  type: typeof DialogEvents.isVisible;
  payload: boolean;
}

export interface SetGlobalDialogContent extends Action {
  type: typeof DialogEvents.setContent;
  payload: IDialogContent;
}

export type GlobalDialogTypes = SetGlobalDialogStatus | SetGlobalDialogContent;
