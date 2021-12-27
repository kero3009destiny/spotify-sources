import { get } from 'lodash';

import { GlobalDialogState } from './reducer';

export const getGlobalDialog = (state: TSFixMe): GlobalDialogState =>
  get(state, 'globalDialog');

export const getGlobalDialogVisibility = (state: TSFixMe) =>
  getGlobalDialog(state).visible;
