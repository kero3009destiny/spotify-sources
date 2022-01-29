// ignore-string-externalization
import { createSelector } from 'reselect';
export var selectAlert = createSelector(function (state) {
  return state.alert;
}, function (alert) {
  return !alert ? undefined : {
    title: alert.title,
    subtitle: alert.subtitle,
    error: alert.error,
    variant: alert.variant
  };
});