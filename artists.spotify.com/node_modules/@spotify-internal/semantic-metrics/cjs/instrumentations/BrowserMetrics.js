"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserMetrics = void 0;
const SemanticMetrics_1 = require("../SemanticMetrics");
const Time_1 = require("../utils/Time");
function getNavigationTiming() {
    const [navigationTiming] = window.performance.getEntriesByType('navigation');
    return navigationTiming;
}
function getResourceTiming() {
    return window.performance.getEntriesByType('resource');
}
function getPageLoadTime() {
    return new Promise((resolve, reject) => {
        if (!window.performance ||
            typeof performance.getEntriesByType !== 'function') {
            return reject('window.performance api is not supported in this browser');
        }
        if (typeof getNavigationTiming() === 'undefined') {
            return reject('navigationTiming api is not supported in this browser');
        }
        const { loadEventEnd, } = getNavigationTiming();
        if (loadEventEnd > 0) {
            return resolve(loadEventEnd);
        }
        return window.addEventListener('load', () => {
            setTimeout(() => {
                const { loadEventEnd: nextLoadEventEnd, } = getNavigationTiming();
                return resolve(nextLoadEventEnd);
            }, 0);
        });
    });
}
function getPaintMetric(paintMetricName) {
    return new Promise((resolve, reject) => {
        if (!window.performance ||
            typeof performance.getEntriesByType !== 'function') {
            return reject('window.performance api is not supported in this browser');
        }
        return window.addEventListener('load', () => {
            const paintMetrics = performance.getEntriesByType('paint');
            const timeToPaintMetric = paintMetrics.find(({ name }) => name === paintMetricName);
            if (paintMetrics !== undefined && timeToPaintMetric) {
                return resolve(timeToPaintMetric.startTime);
            }
            return reject('Time to paint api is not supported on this browser');
        });
    });
}
function getTimeToFirstPaint() {
    return getPaintMetric('first-paint');
}
function getTimeToFirstContentfulPaint() {
    return getPaintMetric('first-contentful-paint');
}
function sendWebVitalsMetric(metric, tags) {
    return SemanticMetrics_1.sendMetric(getWebVitalsMetric(metric, tags));
}
function getWebVitalsMetric({ name, label, value: vitalValue }, tags) {
    let metric;
    if (name.toLowerCase() === 'cls') {
        metric = {
            metric_type: 'gauge',
            value: vitalValue,
        };
    }
    else {
        metric = {
            metric_type: 'timer',
            value: Time_1.Time.fromMillis(Math.round(vitalValue)).asNanos(),
        };
    }
    return Object.assign(Object.assign({ what: `web_vitals_${name.toLowerCase()}` }, metric), { tags: Object.assign({ name,
            label }, tags) });
}
const BrowserMetrics = {
    getPageLoadTime,
    getResourceTiming,
    getTimeToFirstPaint,
    getTimeToFirstContentfulPaint,
    sendWebVitalsMetric,
    getWebVitalsMetric,
};
exports.BrowserMetrics = BrowserMetrics;
//# sourceMappingURL=BrowserMetrics.js.map