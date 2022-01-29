// ignore-string-externalization
import { sendSLOCounter, logError } from '@mrkt/features/Platform';
var ROSTER_SLO_NAME = 'roster-view';
var ROSTER_PRIMER_NAME = 'roster-view-primer';
export function sendRosterSLOError() {
  sendSLOCounter(ROSTER_SLO_NAME, true);
}
export function sendRosterSLOSuccess() {
  sendSLOCounter(ROSTER_SLO_NAME, false);
}
export function logRosterPrimerFailure(error) {
  sendRosterSLOError();
  logError(error, {
    logger: ROSTER_PRIMER_NAME
  });
}