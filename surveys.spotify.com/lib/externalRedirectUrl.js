import ActionTypes from '../actions/ActionTypes';

export default () => next => action => {
  if (action.type === ActionTypes.REDIRECT_TO_EXTERNAL_URL) {
    window.location = action.payload;
    return;
  }
  next(action);
};



// WEBPACK FOOTER //
// ./src/lib/externalRedirectUrl.js