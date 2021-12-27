import { AdstudioConfiguration } from '@spotify-internal/adstudio-config/proto/config_pb';

import * as types from './types';

export function fetchAdStudioConfig() {
  return {
    type: types.AD_STUDIO_CONFIG_REQUESTED,
  };
}

export function fetchAdStudioConfigSuccess(config: AdstudioConfiguration) {
  return {
    type: types.AD_STUDIO_CONFIG_SUCCESS,
    payload: config,
  };
}

export function fetchAdStudioConfigFailed(err = {}) {
  return {
    type: types.AD_STUDIO_CONFIG_FAILED,
    error: true,
    payload: err,
  };
}
