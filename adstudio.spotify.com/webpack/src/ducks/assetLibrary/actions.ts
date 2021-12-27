import {
  FETCH_ASSET_LIBRARY,
  FETCH_ASSET_LIBRARY_FAILED,
  FETCH_ASSET_LIBRARY_SUCCEEDED,
  FetchAssetLibraryErrorAction,
  FetchAssetLibraryStartAction,
  FetchAssetLibrarySuccessAction,
} from './types';
import {
  AssetLibraryQueryParams,
  GetAssetLibraryResponse,
} from 'types/common/state/api/assetLibrary';

export const getAssetLibrary = ({
  limit,
  offset,
  adAccountId,
}: AssetLibraryQueryParams): FetchAssetLibraryStartAction => ({
  type: FETCH_ASSET_LIBRARY,
  payload: {
    limit,
    offset,
    adAccountId,
  },
});

export const getAssetLibrarySuccess = (
  payload: GetAssetLibraryResponse,
): FetchAssetLibrarySuccessAction => ({
  type: FETCH_ASSET_LIBRARY_SUCCEEDED,
  payload,
});

export const getAssetLibraryFailed = (
  error: Response,
): FetchAssetLibraryErrorAction => ({
  type: FETCH_ASSET_LIBRARY_FAILED,
  error,
  meta: {
    response: error,
  },
});
