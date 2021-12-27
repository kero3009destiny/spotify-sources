import { get } from 'lodash';

export const getCurrentRouteLocation = state =>
  get(state, 'routing.locationBeforeTransitions.pathname');
export const getCurrentRouteQuery = state =>
  get(state, 'routing.locationBeforeTransitions.query');
export const getPrevRoute = state => state.routes.prevRoute;
export const getPreviousLocation = state => state.routes.previousLocation;
export const getCurrentRouteKey = state =>
  get(state, 'routing.locationBeforeTransitions.key');
export const getCurrentRouteSearch = state =>
  get(state, 'routing.locationBeforeTransitions.search');
