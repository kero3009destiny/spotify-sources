// ignore-string-externalization
import {
  StorylinesCreationBool,
  useRemoteProperty,
} from '@mrkt/features/RemoteConfig';

export function useStorylinesCreation() {
  return useRemoteProperty(StorylinesCreationBool);
}
