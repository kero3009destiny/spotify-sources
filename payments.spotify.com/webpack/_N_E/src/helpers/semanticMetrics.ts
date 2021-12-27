import { createUniversalReporter, createSemanticMetrics } from '@spotify-internal/semantic-metrics';
import { createRouteMetrics } from '@spotify-internal/next-router-metrics';

const { sendMetric } = createSemanticMetrics({
  key: 'hosted-commerce-flows',
  reporter: createUniversalReporter(),
  // uncomment if the key is not the same as your component_id
  // component_id: 'hosted-commerce-flows',
});

const withRouteMetrics = createRouteMetrics(sendMetric);

export { sendMetric, withRouteMetrics };
