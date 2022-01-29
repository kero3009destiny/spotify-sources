// ignore-string-externalization
import { applyMiddleware, compose as defaultCompose, createStore } from 'redux';
import { reducer } from './reducers';
import { promiseMiddleware } from './promiseMiddleware'; // If Redux DevTools Extension is installed use it, otherwise use Redux compose

var compose = true && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  name: 'shared/store'
}) // eslint-disable-line no-underscore-dangle
: defaultCompose;
export var configureStore = function configureStore() {
  return createStore(reducer, undefined, compose(applyMiddleware(promiseMiddleware)));
};