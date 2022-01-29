// ignore-string-externalization
import { useSetBillingContactIdBackgroundTask } from '../backgroundTasks/useSetBillingContactIdBackgroundTask';
export var useBillingContactBackgroundTasks = function useBillingContactBackgroundTasks(teamState, dispatchers) {
  useSetBillingContactIdBackgroundTask(dispatchers, teamState);
};