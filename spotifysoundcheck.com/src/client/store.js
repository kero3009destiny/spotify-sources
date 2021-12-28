import { createStore, applyMiddleware, compose } from 'redux';
import combinedDefault from './reducers';
import thunk from 'redux-thunk';
import { history } from './app';

const AUTH_ERRORS = ['Invalid token', 401];

// Redux middleware to redirect a user to the login page if an invalid token
// error happens, suggesting that the user is now logged out.
const authRedirectMiddleware = store => next => action => {
  const { payload } = action;
  if (
    payload != undefined &&
    AUTH_ERRORS.includes(payload.error) &&
    !["/", "/privacy", "/register", "/newuser"].includes(
      window.location.pathname
    )
  ) {
    store.dispatch({ type: 'AUTHENTICATION_FAILED_REDIRECT' });
    history.push('/');
  }

  return next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combinedDefault,
  composeEnhancers(applyMiddleware(thunk, authRedirectMiddleware))
);

export default store;
