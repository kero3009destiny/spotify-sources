import { getEnvironmentConfig } from 'config/environment';

export async function getAdminAlert(): Promise<string> {
  const env = await getEnvironmentConfig('env');
  const ALERT_URL_PROD =
    'https://storage.googleapis.com/adstudio-ui-alerts/alert.json';
  const ALERT_URL_STAGING =
    'https://storage.googleapis.com/adstudio-ui-alerts-staging/alert.json';
  const ALERT_URL = env !== 'production' ? ALERT_URL_STAGING : ALERT_URL_PROD;

  return fetch(ALERT_URL, { mode: 'cors' }).then((res: Response) => {
    if (!res.ok) return Promise.reject(res.statusText);
    return res.json();
  });
}
