import { AdstudioConfiguration } from '@spotify-internal/adstudio-config/proto/config_pb';
import { ConfigurationServicePromiseClient } from '@spotify-internal/adstudio-config/proto/service_grpc_web_pb';
import { ConfigurationRequest } from '@spotify-internal/adstudio-config/proto/service_pb';
import { enableGrpcDevConsole } from '@spotify-internal/adstudio-shared/lib/utilities';

import { getWebgateToken } from './webgate';

import { getEnvironmentConfig } from 'config/environment';

export async function getAdStudioConfig(): Promise<AdstudioConfiguration> {
  const token = await getWebgateToken();
  const edgeGrpcHost = await getEnvironmentConfig('edgeGrpcHost');
  const client = new ConfigurationServicePromiseClient(edgeGrpcHost);
  enableGrpcDevConsole([client]);
  const deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 10);
  return await client.getConfiguration(new ConfigurationRequest(), {
    Authorization: `Bearer ${token}`,
    deadline: deadline.getTime().toString(),
  });
}
