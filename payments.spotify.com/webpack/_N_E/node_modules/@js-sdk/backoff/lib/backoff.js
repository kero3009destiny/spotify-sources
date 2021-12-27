import { Counter } from './counter';
import { defer } from './_internal/defer';
/**
 * A backoff module that handles retries and backoff with different timings
 *     depending on configuration.
 *     Expects a "thenable" function to retry.
 *
 * Usage:
 *     function getData(url) {
 *       return getRequest(url); // pretend function that returns ajax promise
 *     }
 *
 *     function successHandler(data) {
 *       console.log('great success!', data);
 *     }
 *
 *     Backoff.init(getData.bind(null, 'https://httpbin.org/get'))
 *       .then(successHandler)
 *       .catch(function() {
 *         console.log('you're out of luck!');
 *       });
 */
function backoffDestroyed() {
    return Promise.reject(new Error('Backoff already consumed'));
}
/**
 * The default options used when initializing a Backoff instance. Values in
 *     this object are overridden if supplied to the constructor.
 */
const backoffDefaults = {
    backoffInitial: false,
    baseTime: 200,
    ceiling: 0,
    curve: 'linear',
    maxDuration: Infinity,
    maxRetries: Infinity,
    maxTime: Infinity,
    retryPredicate: () => true,
};
export class Backoff {
    /**
     * Backoff, handles backoff retries for async functions.
     *
     * @constructor
     * @export module:spotify-backoff
     * @param fn - Thenable function to use the backoff with.
     * @param opts - Initialization
     * options, extends/overrides defaults.
     */
    constructor(fn, opts) {
        /**
         * Promise to resolve/reject when successful/failed.
         */
        this._resolver = defer();
        /**
         * Epoch timestamp, will be set when the backoff starts.
         */
        this._ts = 0;
        /**
         * Number of executed retries.
         */
        this._callCount = 0;
        /**
         * Timeout that holds the sleep until next retry.
         */
        this._tickInterval = 0;
        /**
         * True when the backoff is running.
         */
        this._isRunning = false;
        const options = opts || {};
        this._fn = fn;
        this._maxDuration = options.maxDuration || backoffDefaults.maxDuration;
        this._maxRetries =
            'maxRetries' in options
                ? options.maxRetries
                : backoffDefaults.maxRetries;
        this._maxTime = options.maxTime || backoffDefaults.maxTime;
        this._retryPredicate =
            options.retryPredicate || backoffDefaults.retryPredicate;
        this._backoffInitial = !!options.backoffInitial;
        this._counter = new Counter({
            curve: options.curve,
            baseTime: options.baseTime,
            ceiling: options.ceiling,
        });
        if (this._backoffInitial) {
            // To get the correct timings from the counter instance, max retries needs
            // to be incremented by one if backoffInitial is set.
            this._maxRetries += 1;
        }
    }
    /**
     * Initializes and starts a new backoff.
     *
     * @param fn - Thenable function to use the backoff with.
     * @param opts - Initialization options.
     * @return A new backoff instance.
     */
    static init(fn, opts = {}) {
        return new Backoff(fn, opts).start();
    }
    /**
     * Destroys a backoff instance.
     */
    _destroy() {
        this._fn = backoffDestroyed;
        this._resolver = defer();
    }
    /**
     * Failure handler, will reset the timeout to the next point in the future.
     *
     * @param err - The error from the failure that might cause a retry.
     */
    _failure(err) {
        if (err && 'retryAfter' in err) {
            this._retryAfter(err);
        }
        else {
            const time = this._counter.getTime(this._callCount);
            const shouldRetry = this._shouldRetry(time, err);
            if (shouldRetry) {
                this._callCount++;
                this._tickInterval = setTimeout(() => this._tick(), time);
            }
            else {
                this._resolver.reject(err);
                this._destroy();
            }
        }
    }
    /**
   * Failure handler for errors with the `retryAfter` property set, will retry
  once that amount of milliseconds have passed.
   *
   * @param err - The error from the failure that caused the retry.
   */
    _retryAfter(err) {
        this._callCount++;
        this._tickInterval = setTimeout(() => this._tick(), err.retryAfter);
    }
    /**
     * Success handler, resolves the resolver promise and makes the backoff
     * self-destruct.
     *
     * @param args - The arguments to the resolver.
     */
    _success(...args) {
        this._resolver.resolve(...args);
        this._destroy();
    }
    /**
     * Test if backoff should retry.
     *
     * @param time - The time for the next tick timeout.
     * @param err - The error from the failure that possibly might cause a retry.
     * @return True if the backoff should be retried, false otherwise.
     */
    _shouldRetry(time, err) {
        const duration = Date.now() - this._ts + time;
        return (this._callCount < this._maxRetries &&
            time < this._maxTime &&
            duration < this._maxDuration &&
            this._retryPredicate(err));
    }
    /**
     * Tick, timed-out function that initializes the next retry.
     */
    _tick() {
        this._fn()
            .then((...args) => this._success(...args))
            .catch((e) => this._failure(e));
    }
    /**
     * Returns the resolver promise for a backoff instance.
     *
     * @return The resolver promise.
     */
    getResolver() {
        return this._resolver.promise;
    }
    /**
     * Starts the backoff, returns it's resolver promise.
     *
     * @param fn - The function to start retrying.
     * @return The result of the resolver promise.
     */
    start(fn) {
        if (!this._fn && fn) {
            this._fn = fn;
        }
        if (!this._isRunning) {
            this._ts = Date.now();
            this._isRunning = true;
            if (this._backoffInitial) {
                this._callCount = 1;
                this._tickInterval = setTimeout(() => this._tick(), this._counter.getTime(0));
            }
            else {
                this._tick();
            }
        }
        return this._resolver.promise;
    }
    /**
     * Stops a backoff instance, and destroys it.
     *
     */
    stop() {
        clearTimeout(this._tickInterval);
        this._isRunning = false;
        this._destroy();
    }
    /**
     * Get the number of retries.
     *
     * @return The number of retries.
     */
    getRetryCount() {
        return this._callCount;
    }
}
//# sourceMappingURL=backoff.js.map