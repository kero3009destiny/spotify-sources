import { FetchErrorAction } from 'utils/asyncDucksHelpers';

import {
  AssetLibraryQueryParams,
  GetAssetLibraryResponse,
} from 'types/common/state/api/assetLibrary';

export const FETCH_ASSET_LIBRARY = 'FETCH_ASSET_LIBRARY';
export const FETCH_ASSET_LIBRARY_SUCCEEDED = 'FETCH_ASSET_LIBRARY_SUCCEEDED';
export const FETCH_ASSET_LIBRARY_FAILED = 'FETCH_ASSET_LIBRARY_FAILED';

export interface FetchAssetLibraryStartAction {
  type: typeof FETCH_ASSET_LIBRARY;
  payload: AssetLibraryQueryParams;
}

export interface FetchAssetLibrarySuccessAction {
  type: typeof FETCH_ASSET_LIBRARY_SUCCEEDED;
  payload: GetAssetLibraryResponse;
}

export interface FetchAssetLibraryErrorAction extends FetchErrorAction {
  type: typeof FETCH_ASSET_LIBRARY_FAILED;
}

export type FetchAssetLibraryAction =
  | FetchAssetLibraryStartAction
  | FetchAssetLibrarySuccessAction
  | FetchAssetLibraryErrorAction;
