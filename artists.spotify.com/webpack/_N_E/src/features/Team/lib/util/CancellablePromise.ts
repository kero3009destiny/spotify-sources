import _toConsumableArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _inherits from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _wrapNativeSuper from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
export var PromiseCancelledError = /*#__PURE__*/function (_Error) {
  _inherits(PromiseCancelledError, _Error);

  var _super = _createSuper(PromiseCancelledError);

  function PromiseCancelledError() {
    _classCallCheck(this, PromiseCancelledError);

    return _super.apply(this, arguments);
  }

  return PromiseCancelledError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 * Takes a "generator" function that returns a Promise, and wraps it in a function that returns a
 * Promise and cancel function that will halt operations when called.
 *
 * The generator function receives a "stopIfCancelled" function as its first param which can be
 * called at any point in its code to prevent further execution when the cancel() method has been
 * called. The promise will also not resolve/reject if cancelled.
 *
 * Parameters passed to the wrapper function are passed through as additional parameters to
 * the generator.
 *
 * CancellablePromises are useful for tasks that should only have a single instance running at once,
 * e.g. the lookup for an autocomplete field - if the promise isn't canceled, there's
 * a potential race condition where typing "fo" will see the "f" result resolve after
 * the "fo" result comes in, showing the incorrect results.
 *
 * Usage:
 *   const cancellableFetch = makeCancellable(async (stopIfCancelled, url) => {
 *     const response = await fetch(url);
 *
 *     // Calling this will halt operation here if the promise was cancelled during
 *     // the fetch
 *     stopIfCancelled();
 *
 *     if (!response.ok) {
 *       showErrorMessage('Something went wrong!');
 *     }
 *
 *     const body = await response.json();
 *     // It's good practice to call this after every async pause
 *     stopIfCancelled();
 *
 *     showSuccessMessage('Got the thing!');
 *     return response;
 *   });
 *
 *   useEffect(() => {
 *     const {promise, cancel} = cancellableFetch('http://example.com/api');
 *   }, [...]);
 *
 *   return <button onClick={() => cancel()}>Cancel request</button>;
 */
export var makeCancellable = function makeCancellable(promiseGenerator) {
  return function () {
    var isCancelled = false;
    var isFinished = false;
    var cancelHandlers = [];

    var stopIfCancelled = function stopIfCancelled() {
      if (isCancelled) {
        throw new PromiseCancelledError();
      }
    };

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var promise = promiseGenerator.apply(void 0, [stopIfCancelled].concat(args)).then(function (result) {
      return new Promise(function (resolve) {
        if (!isCancelled) {
          isFinished = true;
          resolve(result);
        }
      });
    }, function (error) {
      return new Promise(function (_, reject) {
        // Technically this is redundant since isCancelled should be true, but added for clarity and
        // the edge case where an async function wishes to cancel internally via a throw.
        if (error instanceof PromiseCancelledError) {
          return;
        }

        if (!isCancelled) {
          isFinished = true;
          reject(error);
        }
      });
    });
    return {
      cancel: function cancel() {
        if (isFinished || isCancelled) {
          return false;
        }

        isCancelled = true;
        cancelHandlers.forEach(function (cb) {
          return cb();
        }); // We've no need for them any more, ditch references so they can be collected

        cancelHandlers = [];
        return true;
      },
      onCancel: function onCancel(handler) {
        return cancelHandlers = [].concat(_toConsumableArray(cancelHandlers), [handler]);
      },
      offCancel: function offCancel(handler) {
        return cancelHandlers = cancelHandlers.filter(function (cb) {
          return cb !== handler;
        });
      },
      promise: promise
    };
  };
};
export var isCancellablePromise = function isCancellablePromise(task) {
  return 'promise' in task;
};