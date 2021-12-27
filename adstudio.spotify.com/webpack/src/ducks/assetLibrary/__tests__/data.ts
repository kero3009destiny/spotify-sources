import { AssetLibraryState } from '../reducer';

import {
  AssetLibraryFormatTypes,
  AssetLibraryQueryParams,
  AssetLibraryStatus,
  GetAssetLibraryResponse,
} from 'types/common/state/api/assetLibrary';

export const testRequestPayload: AssetLibraryQueryParams = {
  adAccountId: 'test-ad-account-id',
  limit: '20',
  offset: '0',
};

export const testGetAssetLibraryResponse: GetAssetLibraryResponse = {
  items: [
    {
      assetId: 'test-asset-id-1',
      created: '2021-04-29T04:01:00Z',
      updated: '2021-05-29T04:01:00Z',
      userUpdated: '2021-06-29T04:01:00Z',
      name: 'Test-Audio-Asset',
      formatType: AssetLibraryFormatTypes.AUDIO,
      assetLibraryStatus: AssetLibraryStatus.ACTIVE,
      assetUrl:
        'https://storage.googleapis.com/adstudio-inbox/b5b8b753-d46d-42dd-a5ce-5d3eeff9bc9c',
    },
    {
      assetId: 'test-asset-id-2',
      created: '2021-04-29T04:01:00Z',
      updated: '2021-05-29T04:01:00Z',
      userUpdated: '2021-06-29T04:01:00Z',
      name: 'Test-Video-Asset-Vertical',
      formatType: AssetLibraryFormatTypes.VERTICAL_VIDEO,
      assetLibraryStatus: AssetLibraryStatus.ACTIVE,
      assetUrl:
        'https://storage.cloud.google.com/adstudio-inbox/1f19fef68933460a8c5c7dd343ae7aee',
    },
    {
      assetId: 'test-asset-id-3',
      created: '2021-04-29T04:01:00Z',
      updated: '2021-05-29T04:01:00Z',
      userUpdated: '2021-06-29T04:01:00Z',
      name: 'Test-Video-Asset-Horizontal',
      formatType: AssetLibraryFormatTypes.HORIZONTAL_VIDEO,
      assetLibraryStatus: AssetLibraryStatus.ACTIVE,
      assetUrl:
        'https://storage.googleapis.com/adstudio-inbox/29a58838-eae6-47f6-8165-7696bbf620d7',
    },
    {
      assetId: 'test-asset-id-3',
      created: '2021-04-29T04:01:00Z',
      updated: '2021-05-29T04:01:00Z',
      userUpdated: '2021-06-29T04:01:00Z',
      name: 'Test-Image-Asset',
      formatType: AssetLibraryFormatTypes.IMAGE,
      assetLibraryStatus: AssetLibraryStatus.ACTIVE,
      assetUrl:
        'https://storage.googleapis.com/adstudio-inbox/29a58838-eae6-47f6-8165-7696bbf620d7',
    },
  ],
  loading: false,
  paging: {
    limit: 20,
    offset: 0,
    total: 20,
  },
};

export const testAssetLibraryState: AssetLibraryState = {
  assetLibraryTable: {
    ...testGetAssetLibraryResponse,
  },
};
