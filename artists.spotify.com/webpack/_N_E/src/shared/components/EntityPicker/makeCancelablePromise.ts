/* eslint-disable prefer-promise-reject-errors */

/**
 * makeCancelablePromise
 *
 * Make a (wrapped) canceable Promise
 *
 */
export function makeCancelablePromise(promise) {
  var hasBeenCanceled = false;
  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasBeenCanceled ? reject({
        isCanceled: true
      }) : resolve(val);
    }).catch(function (error) {
      return hasBeenCanceled ? reject({
        isCanceled: true
      }) : reject(error);
    });
  });
  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      hasBeenCanceled = true;
    }
  };
}