import { combineReducers } from 'redux';

import { mapPaginationResponse } from 'utils/campaignHierarchy/paginationHelpers';

import {
  FETCH_ASSET_LIBRARY,
  FETCH_ASSET_LIBRARY_FAILED,
  FETCH_ASSET_LIBRARY_SUCCEEDED,
  FetchAssetLibraryAction,
} from './types';
import { Paging } from 'types/common/state/api';
import { AssetLibraryResponseRow } from 'types/common/state/api/assetLibrary';

export interface AssetLibraryState {
  assetLibraryTable: AssetLibraryTableState;
}

export interface AssetLibraryTableState {
  items: AssetLibraryResponseRow[];
  loading: boolean;
  paging: Paging;
  error?: Response | Error;
}

export const assetLibraryDefaultTableState: AssetLibraryTableState = {
  items: [],
  loading: false,
  paging: {
    limit: 20,
    offset: 0,
    total: 0,
  },
};

export const assetLibraryTableReducer = (
  state = assetLibraryDefaultTableState,
  action: FetchAssetLibraryAction,
) => {
  switch (action.type) {
    case FETCH_ASSET_LIBRARY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error as Response,
      };

    case FETCH_ASSET_LIBRARY:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ASSET_LIBRARY_SUCCEEDED:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        paging: mapPaginationResponse(action.payload.paging),
      };

    default:
      return state;
  }
};

// This will likely include other reducers as more actions are
// available in the asset library, like archive, edit
export default combineReducers<AssetLibraryState>({
  assetLibraryTable: assetLibraryTableReducer,
});
