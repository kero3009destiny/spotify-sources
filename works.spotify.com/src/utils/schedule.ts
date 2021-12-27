var NOOP = function () { };
var ScheduledTask = /** @class */ (function () {
    function ScheduledTask(task, schedule, onerror) {
        if (schedule === void 0) { schedule = null; }
        if (onerror === void 0) { onerror = NOOP; }
        this.task = task;
        this.schedule = schedule;
        this.onerror = onerror;
        if (schedule)
            this.reschedule(schedule);
    }
    ScheduledTask.prototype.reschedule = function (p) {
        var _this = this;
        p.then(function (value) {
            if (_this.schedule === p) {
                _this.schedule = null;
                try {
                    _this.task.call(null, value);
                }
                catch (e) {
                    _this.onerror.call(null, e);
                }
            }
        }, this.onerror);
        this.schedule = p;
    };
    ScheduledTask.prototype.cancel = function () {
        this.schedule = null;
    };
    return ScheduledTask;
}());
export { ScheduledTask };
//# sourceMappingURL=schedule.js.map