const MAX_SAFE_BACKOFF = 4294967296;
/**
 * Takes a number and returns it with +/-10% jitter.
 *
 * @param n - The value to apply jitter to.
 * @return The jitter amount.
 */
function jitter(n) {
    const diff = n / 5;
    return Math.floor(n - diff / 2 + Math.random() * diff);
}
const counterDefaults = {
    baseTime: 200,
    ceiling: 0,
    curve: 'linear',
    jitter: true,
};
export class Counter {
    /**
     * @param options - Settings for the counter instance.
     */
    constructor(options = {}) {
        this._curve = options.curve || counterDefaults.curve;
        this._baseTime = options.baseTime || counterDefaults.baseTime;
        this._ceiling = options.ceiling || counterDefaults.ceiling;
        this._jitter =
            'jitter' in options ? !!options.jitter : counterDefaults.jitter;
    }
    getTime(retries) {
        let time;
        switch (this._curve) {
            case 'static':
                time = 1;
                break;
            case 'logarithmic':
                time = Math.log(retries);
                break;
            case 'exponential':
                time = Math.pow(Math.E, retries);
                break;
            case 'linear':
            default:
                time = retries + 1;
                break;
        }
        let ret = Math.min(MAX_SAFE_BACKOFF, Math.floor(time * this._baseTime));
        if (this._ceiling) {
            ret = Math.min(ret, this._ceiling);
        }
        return this._jitter ? jitter(ret) : ret;
    }
}
//# sourceMappingURL=counter.js.map