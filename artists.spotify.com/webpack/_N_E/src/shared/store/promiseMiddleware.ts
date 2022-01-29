import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import has from 'lodash/has';

var isPromise = function isPromise(obj) {
  return obj && typeof obj.then === 'function';
};

export function promiseMiddleware(_ref) {
  var dispatch = _ref.dispatch;
  var lastTransactionId = 0;
  return function (next) {
    return function (action) {
      if (!isPromise(action.payload)) {
        if (typeof action === 'function') {
          return action(dispatch);
        }

        return next(action);
      }

      var type = action.type,
          payload = action.payload,
          _action$meta = action.meta,
          meta = _action$meta === void 0 ? {} : _action$meta;
      lastTransactionId += 1;
      var transactionId = lastTransactionId;

      if (has(meta, 'request') || has(meta, 'transactionId')) {
        throw new Error('middleware: action.meta.request and action.meta.transactionId are protected');
      }

      dispatch({
        type: type,
        meta: _objectSpread(_objectSpread({}, meta), {}, {
          request: true,
          transactionId: transactionId
        })
      });
      return payload.catch(function (error) {
        return error;
      }).then(function (result) {
        var finalAction = {
          type: type,
          payload: result,
          meta: _objectSpread(_objectSpread({}, meta), {}, {
            request: false,
            transactionId: transactionId
          })
        };

        if (finalAction.payload instanceof Error) {
          finalAction.error = true;
        }

        return dispatch(finalAction);
      });
    };
  };
}