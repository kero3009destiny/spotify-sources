// ignore-string-externalization
import { createAction } from 'redux-actions';
import { useDispatch } from 'react-redux';
import { SET_ALERT, CLEAR_ALERT } from '../actionTypes';
export var setAlert = createAction(SET_ALERT, function (_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle,
      _ref$error = _ref.error,
      error = _ref$error === void 0 ? false : _ref$error,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? null : _ref$variant;
  return {
    title: title,
    subtitle: subtitle,
    error: error,
    variant: variant
  };
});
export var clearAlert = createAction(CLEAR_ALERT);
export function useAlertDispatch() {
  var dispatch = useDispatch(); // @ts-ignore

  return function () {
    return dispatch(setAlert.apply(void 0, arguments));
  };
}