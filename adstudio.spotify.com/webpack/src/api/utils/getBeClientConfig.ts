import { HttpServiceConfigOptions } from '@spotify-internal/adstudio-bff-clients/clients/HttpServiceConfigOptions';
import { getWebgateToken } from '@spotify-internal/adstudio-webgate-fetch';

import { getEnvironmentConfig } from 'config/environment';

export const BE_CLIENT_CONFIG = {
  EDGE_PROXY_HOST: 'https://adstudio-app-api-sandbox.spotify.net',
  WEBGATE_HOST: 'https://exp.wg.spotify.com',
  BASE_URL: 'proto',
  VERSION: 'v1',
};

type HttpServiceConfigOptionsType = typeof HttpServiceConfigOptions;

export async function getEdgeProxyClientConfig(): Promise<
  InstanceType<HttpServiceConfigOptionsType>
> {
  const edgeProxyHost = await getEnvironmentConfig('edgeProxyHost');
  return getGenericClientConfig(
    edgeProxyHost || BE_CLIENT_CONFIG.EDGE_PROXY_HOST,
  );
}

export async function getBffWegbateClientConfig(): Promise<
  InstanceType<HttpServiceConfigOptionsType>
> {
  const webgateHost = await getEnvironmentConfig('webgateHost');
  return getGenericClientConfig(
    (webgateHost || BE_CLIENT_CONFIG.WEBGATE_HOST) + '/adstudio-bff',
  );
}

// https://ghe.spotify.net/messaging/webgate-exp-deploy/pull/2831
export function getEffectiveHost(
  env: string,
  edgeProxyHost: string,
  host: string,
) {
  // dont override edge proxy clients
  if (host.includes(edgeProxyHost)) {
    return host;
  }
  return env === 'production' ? host : host + '-sandbox';
}

export async function getGenericClientConfig(
  host: string,
): Promise<InstanceType<HttpServiceConfigOptionsType>> {
  const localHeaders = new Headers();
  if (process.env.NODE_ENV === 'local-bff') {
    localHeaders.append('isLocal', 'true');
    localHeaders.append('userId', await getEnvironmentConfig('userId'));
  }
  const config: InstanceType<HttpServiceConfigOptionsType> = new HttpServiceConfigOptions()
    .setBaseUrl(BE_CLIENT_CONFIG.BASE_URL)
    .setHost(
      getEffectiveHost(
        await getEnvironmentConfig('env'),
        await getEnvironmentConfig('edgeProxyHost'),
        host,
      ),
    )
    .setVersion(BE_CLIENT_CONFIG.VERSION)
    .setHeaders(localHeaders);
  return config;
}

export async function getGrpcClientMetadata(): Promise<{
  Authorization: string;
  deadline: string;
}> {
  const token = await getWebgateToken();
  const deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 10);
  return {
    Authorization: `Bearer ${token}`,
    deadline: deadline.getTime().toString(),
  };
}
