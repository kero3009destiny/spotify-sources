import { matchPath } from 'react-router-dom';
import { window } from 'global';
import { get } from 'lodash';

import { routeFragmentLiterals, routeTokens } from 'config/routes';
/**
 * this method takes a function that returns the import promise,
 * and returns a function to be used as a <Route />'s getComponent prop.
 *
 *   <Route getComponent={getComponentForImport(() => import('whatever'))} />
 *
 * this is written this way to make defining import functions
 * with chunk comments easier, providing a simple way to configure
 * chunk groupings. below this function, you'll see some predefined
 * import functions grouped by chunk.
 **/
export function getComponentForImport(promiseFn) {
  // the return value should be used as the getComponent function
  return (location, cb) =>
    promiseFn()
      .then(module => cb(null, module.default))
      .catch(error => cb(error));
}

/**
 * use with recompose.withProps to normalize props passed from a react-router route
 * and props directly passed to a component.
 *
 * <MyComponent a="1" />
 * <Route path="/your-route" component={MyComponent} a="1" />
 *
 * usage:
 *   withProps(ownProps => mapPropsFromRoute(ownProps, ['a']))(MyComponent);
 */
export function mapPropsFromRoute(ownProps, propNames) {
  return propNames.reduce(
    (result, propName) => ({
      ...result,
      [propName]: get(ownProps, propName) || get(ownProps, `route.${propName}`),
    }),
    {},
  );
}

/**
 * parses the ad account ID from the path if a user is
 * on any path matching `/account/:adAccountId`
 */
export function getRouteAccountId() {
  const match = matchPath(window.location.pathname, {
    path: `/account/${routeFragmentLiterals.ACCOUNT_ID}`,
  });

  return get(match, `params[${routeTokens.ACCOUNT_ID}]`);
}
