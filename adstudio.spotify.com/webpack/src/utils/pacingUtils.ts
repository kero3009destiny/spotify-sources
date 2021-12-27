import { PacingInfo } from 'types/common/state/api/flights';

/*
 * Convert pacing fields from flight to props needed for PacingMeter component.
 */
export function pacingMeterProps(pacingInfo?: PacingInfo) {
  const deliveryPercentage: number = pacingInfo?.deliveryPercentage || 0;
  const progressPercentage: number = pacingInfo?.progressPercentage || 0;

  const pacingPercentage = deliveryPercentage / progressPercentage;
  const status = pacingStatus(pacingPercentage);

  // PacingMeter uses different names from API response, so confusingly, the definition
  // of progressPercentage is flipped
  return {
    progressPercentage: deliveryPercentage,
    expectedProgressPercentage: progressPercentage,
    status,
  };
}

/*
 * 'status' determines the color of the pacing meter, and should match the values
 * in adstudio-admin PacingBar/PacingSection components.
 */
export function pacingStatus(pacingPercentage: number): string {
  if (pacingPercentage < 0.8) {
    return 'failure';
  } else if (pacingPercentage < 0.9) {
    return 'warning';
  }

  return 'success';
}
