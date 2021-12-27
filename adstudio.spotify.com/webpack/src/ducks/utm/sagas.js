import { window } from 'global';
import { pickBy } from 'lodash';
import { parse, stringify } from 'query-string';
import { all, put } from 'redux-saga/effects';

import * as actions from './actions';

export function* setUtmStringOnStartup() {
  const params = parse(window.location.search);
  const filteredParams = pickBy(
    params,
    (value, key) => key.indexOf('utm') !== -1,
  );

  const stringfiedUtm = stringify(filteredParams);

  if (stringfiedUtm) {
    yield put(actions.setUtmString(stringfiedUtm));
  }
}

export default function* utmSaga() {
  yield all([setUtmStringOnStartup()]);
}
