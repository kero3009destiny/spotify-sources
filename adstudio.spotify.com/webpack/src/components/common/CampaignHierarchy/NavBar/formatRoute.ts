import { Params } from 'react-router/lib/Router';

import { stripNavBarQueryParams } from 'utils/campaignHierarchy/catalogueFilters';

import {
  getRouteFragmentLiteralFromToken,
  RouteToken,
  routeTokens,
} from 'config/routes';

export const formatRoute = (
  route: string,
  params?: Params,
  search?: string,
  tokensToReplace: RouteToken[] = [routeTokens.ACCOUNT_ID],
): string => {
  const formattedRoute = tokensToReplace.reduce((currentRoute, token) => {
    const routeFragmentLiteral = getRouteFragmentLiteralFromToken(token);
    return currentRoute.replace(routeFragmentLiteral, params![token]);
  }, route);

  const queryParamString = stripNavBarQueryParams(search);

  return `${formattedRoute}${queryParamString}`;
};
