// ignore-string-externalization
import { createLocation, createPath } from 'history';
import SingletonRouter from 'next/router';
import memoizeOne from 'memoize-one';
import { getBasename } from './utils';
/** Creates a history object that wraps the next.js router. For use with react-router. */

export function createNextRouterHistory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$router = _ref.router,
      router = _ref$router === void 0 ? SingletonRouter : _ref$router;

  var action = 'POP';
  var getLocation = memoizeOne(function (asPath) {
    return createLocation(asPath);
  });
  window.addEventListener('popstate', function () {
    action = 'POP';
  });
  var history = {
    get length() {
      return window.history.length;
    },

    get action() {
      return action;
    },

    get location() {
      return getLocation(router.asPath);
    },

    go: function go(n) {
      window.history.go(n);
    },
    goBack: function goBack() {
      window.history.go(-1);
    },
    goForward: function goForward() {
      window.history.go(1);
    },
    block: function block() {
      if (false) {
        // eslint-disable-next-line no-console
        console.warn('nextRouterHistory.block is not supported');
      }

      return function () {};
    },
    listen: function listen(listener) {
      function handler() {
        listener(history.location, history.action);
      }

      router.events.on('routeChangeComplete', handler);
      return function () {
        return router.events.off('routeChangeComplete', handler);
      };
    },
    push: function push(path, state) {
      var location = createLocation(path, state, undefined, history.location);

      if (false) {
        if (location.state) {
          // eslint-disable-next-line no-console
          console.warn('nextRouterHistory does not support location.state. Put state in a search param or localStorage.');
        }
      }

      action = 'PUSH';
      router.push(createPath(location));
    },
    replace: function replace(path, state) {
      var location = createLocation(path, state, undefined, history.location);

      if (false) {
        if (location.state) {
          // eslint-disable-next-line no-console
          console.warn('nextRouterHistory does not support location.state. Put state in a search param or localStorage.');
        }
      }

      action = 'REPLACE';
      router.replace(createPath(location));
    },
    createHref: function createHref(location) {
      return getBasename(router) + createPath(location);
    }
  };
  return history;
}