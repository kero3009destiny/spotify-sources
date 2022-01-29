// ignore-string-externalization
import { EmployeeBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
/** check if current user is an employee */

export function useIsEmployee() {
  return useRemoteProperty(EmployeeBool);
}