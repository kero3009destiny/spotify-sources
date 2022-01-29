// ignore-string-externalization
import { MetricTypes, Tags } from '@spotify-internal/semantic-metrics';
import { sendMetric } from '@mrkt/features/metrics';

export function logCount(what: string, tags: Tags) {
  sendMetric({
    metric_type: MetricTypes.COUNTER,
    what,
    value: 1,
    tags,
  });
}

export function logError(what: string) {
  logCount(what, { status: 'error' });
}

export function logSuccess(what: string) {
  logCount(what, { status: 'success' });
}

export function sendSLOCounter(featureName: string, isError: boolean) {
  if (isError) {
    logError(featureName);
  } else {
    logSuccess(featureName);
  }
}

export function logFetchConnectionState() {
  logCount('fetch_connection', { online: String(navigator.onLine) });
}
