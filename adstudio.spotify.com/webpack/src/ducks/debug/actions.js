import * as types from './types';

export function extendStartDate(id, newStartDate) {
  return {
    type: types.EXTEND_START_DATE,
    payload: {
      id,
      newStartDate,
    },
  };
}

export function extendEndDate(id, newEndDate) {
  return {
    type: types.EXTEND_END_DATE,
    payload: {
      id,
      newEndDate,
    },
  };
}
