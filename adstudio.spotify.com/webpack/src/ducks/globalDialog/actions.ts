import {
  DialogEvents,
  SetGlobalDialogContent,
  SetGlobalDialogStatus,
} from './types';

export const setGlobalDialogStatus = (
  status: boolean,
): SetGlobalDialogStatus => ({
  type: DialogEvents.isVisible,
  payload: status,
});

export const setDialogContent = (
  body: string,
  actionLabel: string,
  actionURL: string,
  title?: string,
): SetGlobalDialogContent => ({
  type: DialogEvents.setContent,
  payload: {
    title,
    body,
    actionLabel,
    actionURL,
  },
});
