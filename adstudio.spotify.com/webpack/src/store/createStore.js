import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { window } from 'global';
import {
  applyMiddleware,
  compose,
  createStore as reduxCreateStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer, rootSaga } from 'ducks';
import { batchDispatchMiddleware } from 'redux-batched-actions';

import unhandledErrorMiddleware from 'middleware/unhandledError';

import devDebug from 'config/debug';
import { getEnvironmentConfig } from 'config/environment';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => noop => noop);

async function createStore(inTest = false, initialState) {
  const debug = await getEnvironmentConfig('debug');
  return createStoreSync(debug, inTest, initialState);
}

export function createStoreSync(debug = false, inTest = false, initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    unhandledErrorMiddleware,
    routerMiddleware(browserHistory),
    batchDispatchMiddleware,
    sagaMiddleware,
  ];

  const enhancers = [applyMiddleware(...middleware)];

  if (debug) {
    enhancers.push(devTools());
  }

  const store = reduxCreateStore(
    rootReducer,
    initialState,
    compose(...enhancers),
  );

  // must be run after middleware has been applied
  sagaMiddleware.run(rootSaga);

  // attach ag to the window
  if (!inTest) {
    window.ag = devDebug(store, window);
  }
  return store;
}

export default createStore;
