import { dunderFetchHandler } from './utils/dunder';

const BASE_PATH = 'com.spotify.ads.dunder.v1.ScheduledReports';
const GET_URI = 'GetReportScheduling';

export async function getScheduledReports(iamDomain: string) {
  return dunderFetchHandler(GET_URI, BASE_PATH, {
    params: { iam_domain: iamDomain },
  });
}
