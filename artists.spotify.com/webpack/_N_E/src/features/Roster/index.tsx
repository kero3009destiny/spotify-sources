// ignore-string-externalization
import React from 'react';
export var LazyRosterHeader = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackChunkName: "roster-header" */
  './header/RosterHeader');
});
export var LazyRosterRoute = /*#__PURE__*/React.lazy(function () {
  return import(
  /* webpackChunkName: "roster-route" */
  './route/RosterRoute');
});
export { primeInitialPage } from './Roster/data/useRosterSearch';