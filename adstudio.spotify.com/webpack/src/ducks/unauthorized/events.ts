import { eventChannel } from 'redux-saga';

import { unauthorizedResponseListener } from 'utils/unauthorizedEvents';

export default () => {
  return eventChannel(emit => {
    const removeListener = unauthorizedResponseListener(event => {
      emit(event);
    });
    return () => {
      removeListener();
    };
  });
};
