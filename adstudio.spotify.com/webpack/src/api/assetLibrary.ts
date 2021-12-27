import { testGetAssetLibraryResponse } from 'ducks/assetLibrary/__tests__/data';

import {
  AssetLibraryQueryParams,
  GetAssetLibraryResponse,
} from 'types/common/state/api/assetLibrary';

// TODO: This is a stub for a yet to be implemented endpoint
export async function fetchAssetLibrary(
  _params: AssetLibraryQueryParams,
): Promise<GetAssetLibraryResponse> {
  return Promise.resolve(testGetAssetLibraryResponse);
}
