import { AdStudioBffAudienceSegmentsService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffAudienceSegmentsService';
import { GetAudienceSegmentsResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetAudienceSegmentsResponse';
import { Empty } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Empty';
import { enableGrpcDevConsole } from '@spotify-internal/adstudio-shared/lib/utilities';
import { AdstudioAssetServicePromiseClient } from '@spotify-internal/adstudioasset/proto/com/spotify/adstudioasset/service_grpc_web_pb';
import { KeyValue } from '@spotify-internal/adstudioasset/proto/com/spotify/adstudioasset/service_pb';
import { Empty as GoogleEmpty } from '@spotify-internal/adstudioasset/proto/google/protobuf/empty_pb';
import { TargetingServicePromiseClient } from '@spotify-internal/targetingservice/proto/com/spotify/targetingservice/proto/service_grpc_web_pb';

import { apiPartnerWebgateFetch, protoFetchWithLogging } from 'api/webgate';

import {
  getEdgeProxyClientConfig,
  getGrpcClientMetadata,
} from './utils/getBeClientConfig';

import { SampleTrackType } from '../components/CreativeForm/VoiceoverSamples/Modal';

import { getEnvironmentConfig } from 'config/environment';

type GetAudienceSegmentsResponseType = typeof GetAudienceSegmentsResponse;

export async function getAudienceSegments(): Promise<
  GetAudienceSegmentsResponseType[] | string
> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAudienceSegmentsService(
    protoFetchWithLogging,
    config,
  );
  return client
    .getAudienceSegments(new Empty())
    .catch((r: Response) => Promise.reject(r));
}

export async function getAdstudioAssetClient(): Promise<
  AdstudioAssetServicePromiseClient
> {
  const edgeGrpcHost = await getEnvironmentConfig('edgeGrpcHost');
  const client = new AdstudioAssetServicePromiseClient(edgeGrpcHost);
  enableGrpcDevConsole([client]);
  return client;
}

function convertKeyValueToObject(list: KeyValue[]): BaseOptions[] {
  return list.map((item: KeyValue) => item.toObject());
}

export async function getCtaOptions(): Promise<CtaOptions | string> {
  const client = await getAdstudioAssetClient();
  const metadata = await getGrpcClientMetadata();

  try {
    const response = await client.getCallToActionOptions(
      new GoogleEmpty(),
      metadata,
    );
    return {
      ctaOptions: convertKeyValueToObject(response.getCtaOptionsList()),
    };
  } catch (e) {
    return e;
  }
}

export async function getVoiceoverOptions(): Promise<
  VoiceoverOptions | string
> {
  const client = await getAdstudioAssetClient();
  const metadata = await getGrpcClientMetadata();
  try {
    const response = await client.getVoiceoverOptions(
      new GoogleEmpty(),
      metadata,
    );
    return {
      languageLocales: convertKeyValueToObject(
        response.getLanguageLocalesList(),
      ),
      voiceTypes: convertKeyValueToObject(response.getVoiceTypesList()),
    };
  } catch (e) {
    return e;
  }
}

export async function getVoiceoverSamples(): Promise<Array<SampleTrackType>> {
  const client = await getAdstudioAssetClient();
  const metadata = await getGrpcClientMetadata();
  try {
    const response = await client.getVoiceoverSamples(
      new GoogleEmpty(),
      metadata,
    );
    return response.getAssetsList().map(asset => {
      return {
        id: asset.getId() || '',
        name: asset.getName(),
        category: asset.getGender(),
        language: asset.getLanguage(),
        uri: asset.getUrl(),
      } as SampleTrackType;
    });
  } catch (e) {
    return e;
  }
}

export async function getMomentOptions(): Promise<MomentOptions | string> {
  const url = 'ads/v1/targets/playlist';
  return apiPartnerWebgateFetch(url)
    .then(r => r.json())
    .catch(e => Promise.reject(e));
}

export async function getStockCompanionImages(): Promise<StockImageOptions> {
  const client = await getAdstudioAssetClient();
  const metadata = await getGrpcClientMetadata();
  try {
    const response = await client.getAllStockImages(
      new GoogleEmpty(),
      metadata,
    );
    return {
      images: response.getAssetsList().map(image => ({
        id: image.getAssetId(),
        value: image.getAssetId(),
        assetUrl: image.getJpegUrl(),
      })),
    };
  } catch (e) {
    return e;
  }
}

export async function getTargetingServiceClient(): Promise<
  TargetingServicePromiseClient
> {
  const edgeGrpcHost = await getEnvironmentConfig('edgeGrpcHost');
  const client = new TargetingServicePromiseClient(edgeGrpcHost);
  enableGrpcDevConsole([client]);
  return client;
}

export async function getContextualTargetingCategories(): Promise<any> {
  const client = await getTargetingServiceClient();
  const metadata = await getGrpcClientMetadata();

  try {
    const response = await client.getCategories(new GoogleEmpty(), metadata);
    return response.toObject();
  } catch (e) {
    return e;
  }
}
