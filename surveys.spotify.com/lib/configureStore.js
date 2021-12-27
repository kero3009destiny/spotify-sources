import {applyMiddleware, compose, createStore} from 'redux';

import {createEpicMiddleware} from 'redux-observable';
import createHistory from './createHistory';
import externalRedirectUrl from '../lib/externalRedirectUrl';
import rootEpic from '../epics';
import rootReducer from '../reducers';
import {routerMiddleware} from 'react-router-redux';

const composeEnhancers = typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    {
      trace: true,
    }
  )
  : compose;

export default function(initialState = {}) {
  const enhancer = composeEnhancers(
    applyMiddleware(
      createEpicMiddleware(rootEpic),
      routerMiddleware(createHistory()),
      externalRedirectUrl
    )
  );
  return createStore(rootReducer, initialState, enhancer);
}



// WEBPACK FOOTER //
// ./src/lib/configureStore.js