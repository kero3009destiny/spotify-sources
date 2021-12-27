import { navigator } from 'global';

import { NETWORK_STATUS } from 'ducks/network/types';

export default function network(state = navigator.onLine, action) {
  switch (action.type) {
    case NETWORK_STATUS:
      return action.payload;
    default:
      return state;
  }
}
