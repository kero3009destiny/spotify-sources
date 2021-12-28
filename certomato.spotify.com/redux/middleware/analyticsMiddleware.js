import {UPDATE_TEST_RESULTS} from '../actions/types';

const gtagEvent = (id, status) => {
  if (window.gtag) {
    window.gtag('event', id, {
      'event_category': 'RunTests',
      'event_label': status,
      'value': (status === 'FAIL') ? 0 : 1,
    });
  }
};

const analyticsMiddleware = () => next => action => {
  if (action.type === UPDATE_TEST_RESULTS) {
    const json = action.payload;
    if (json.event === 'TEST_END' && json.testResult.status !== 'PROMPT') {
      gtagEvent(json.id, json.testResult.status);
    }
  }
  return next(action);
};

export default analyticsMiddleware;
