// ignore-string-externalization
import {
  CanvasInMaintenanceBool,
  useRemoteProperty,
} from '@mrkt/features/RemoteConfig';

/** check if canvas should placed be under maintenance */
export function useIsCanvasInMaintenance() {
  return useRemoteProperty(CanvasInMaintenanceBool);
}
