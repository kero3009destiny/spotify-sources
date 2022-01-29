// ignore-string-externalization
import { AccessLevel } from '../../lib/model/AccessLevel';
export var isTeamMemberDetails = function isTeamMemberDetails(candidate) {
  return typeof candidate === 'object' && typeof candidate.businessEmail === 'string' && typeof candidate.firstName === 'string' && typeof candidate.lastName === 'string' && typeof candidate.role === 'string' && typeof candidate.company === 'string' && typeof candidate.accessLevel === typeof AccessLevel;
};
export var OTHER_ROLE = '!!OTHER_ROLE!!';
export var SPOTIFY_SYNTHETIC_TESTER_ROLE = '!!SPOTIFY_SYNTHETIC_TESTER_ROLE!!';