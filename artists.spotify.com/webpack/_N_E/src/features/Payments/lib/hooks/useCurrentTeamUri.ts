import { useCurrentTeamOrNull } from '../../../Team/hooks';
export var useCurrentTeamUri = function useCurrentTeamUri() {
  var _useCurrentTeamOrNull;

  var teamUri = (_useCurrentTeamOrNull = useCurrentTeamOrNull()) === null || _useCurrentTeamOrNull === void 0 ? void 0 : _useCurrentTeamOrNull.uri;

  if (!teamUri) {
    throw new Error('Expected current team.');
  }

  return teamUri;
};