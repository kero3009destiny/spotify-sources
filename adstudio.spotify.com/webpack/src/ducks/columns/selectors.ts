import get from 'lodash/get';

import { getAccountPreference } from 'ducks/account/selectors';

import { ColumnOptionType, ColumnSelection } from './types';

export function getSelectedColumns(
  state: TSFixMe,
  columnOptionType: ColumnOptionType,
): ColumnSelection {
  return get(state, `columns.${columnOptionType}`, {});
}

export const getSavedColumns = (
  state: TSFixMe,
  columnOptionType: ColumnOptionType,
): ColumnSelection =>
  getAccountPreference(state, columnOptionType) as ColumnSelection;
