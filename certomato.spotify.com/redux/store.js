import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import analyticsMiddleware from './middleware/analyticsMiddleware';


const initialState = {};

const middleware = [thunk, analyticsMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)),
);

export default store;
