import * as types from './types';

export function updateNetworkStatus(status) {
  return {
    type: types.NETWORK_STATUS,
    payload: status,
  };
}
