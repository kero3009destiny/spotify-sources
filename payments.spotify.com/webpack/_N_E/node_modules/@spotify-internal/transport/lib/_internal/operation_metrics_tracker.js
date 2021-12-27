/**
 * A class that deals with operation metrics such as the time it takes to
 * perform an operation.
 */
export class OperationMetricsTracker {
    constructor() {
        this._startTime = null;
        this._endTime = null;
    }
    /**
     * Create a new OperationMetricsTracker.
     *
     * @returns OperationMetricsTracker
     */
    static create() {
        return new OperationMetricsTracker();
    }
    /**
     * Start a time measurement.
     */
    start() {
        if (this._startTime !== null) {
            throw new Error('Measurement is already in progress.');
        }
        this._startTime = Date.now();
    }
    /**
     * End a time measurement.
     */
    end() {
        if (this._startTime === null || this._endTime !== null) {
            throw new Error('Measurement is not in progress.');
        }
        this._endTime = Date.now();
    }
    /**
     * Get the resulting metrics after a measurement has ended.
     *
     * @returns Formatted metrics.
     */
    getMetrics() {
        if (this._startTime === null || this._endTime === null) {
            throw new Error('Measurement is not done.');
        }
        return {
            start_time: this._startTime,
            end_time: this._endTime,
        };
    }
}
//# sourceMappingURL=operation_metrics_tracker.js.map