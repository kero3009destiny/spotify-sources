"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
class Time {
    constructor(nanos = 0) {
        this.nanos = nanos;
    }
    static fromNanos(nanos) {
        return new Time(nanos);
    }
    static fromMicros(micros) {
        return new Time(micros * 1000);
    }
    static fromMillis(ms) {
        return new Time(ms * 1e6);
    }
    static fromSeconds(seconds) {
        return new Time(seconds * 1e9);
    }
    static from(time) {
        return new Time(time.asNanos());
    }
    asSeconds() {
        return this.nanos / 1e9;
    }
    asMillis() {
        return this.nanos / 1e6;
    }
    asMicros() {
        return this.nanos / 1000;
    }
    asNanos() {
        return Math.round(this.nanos);
    }
}
exports.Time = Time;
Time.ZERO = new Time(0);
//# sourceMappingURL=Time.js.map