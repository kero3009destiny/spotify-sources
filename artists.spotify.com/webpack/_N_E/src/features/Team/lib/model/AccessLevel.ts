import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

var _Object$seal;

// ignore-string-externalization
import { assertUnreachable } from '../util/assertUnreachable';
export var AccessLevel;

(function (AccessLevel) {
  AccessLevel["Admin"] = "Full Access";
  AccessLevel["Editor"] = "Edit Access";
  AccessLevel["Reader"] = "View-only Access";
})(AccessLevel || (AccessLevel = {}));

export var AccessLevelDisplayName = Object.seal((_Object$seal = {}, _defineProperty(_Object$seal, AccessLevel.Admin, 'Admin'), _defineProperty(_Object$seal, AccessLevel.Editor, 'Editor'), _defineProperty(_Object$seal, AccessLevel.Reader, 'Reader'), _Object$seal));
export var accessLevelName = function accessLevelName(accessLevel, t) {
  switch (accessLevel) {
    case AccessLevel.Admin:
      return t('ACCESS_LEVEL_ADMIN_TITLE', 'Admin', 'Admin access level title');

    case AccessLevel.Editor:
      return t('ACCESS_LEVEL_EDITOR_TITLE', 'Editor', 'Editor access level title');

    case AccessLevel.Reader:
      return t('ACCESS_LEVEL_READER_TITLE', 'Reader', 'Reader access level title');

    case null:
      return t('ACCESS_LEVEL_READER_TITLE', 'Reader', 'Reader access level title');

    case undefined:
      return t('ACCESS_LEVEL_READER_TITLE', 'Reader', 'Reader access level title');

    default:
      return assertUnreachable(accessLevel);
  }
};

var isAccessLevel = function isAccessLevel(value) {
  return Object.values(AccessLevel).includes(value);
};

export var toAccessLevel = function toAccessLevel(value) {
  if (isAccessLevel(value)) {
    return value;
  }

  return AccessLevel.Reader;
};
export var groupsToAccessLevel = function groupsToAccessLevel(groups) {
  var levels = new Set();
  groups.forEach(function (g) {
    return levels.add(toAccessLevel(g));
  });
  var accessLevelPritorities = [AccessLevel.Admin, AccessLevel.Editor, AccessLevel.Reader];

  for (var _i = 0, _accessLevelPritoriti = accessLevelPritorities; _i < _accessLevelPritoriti.length; _i++) {
    var level = _accessLevelPritoriti[_i];

    if (levels.has(level)) {
      return level;
    }
  } // eslint-disable-next-line no-console


  console.warn('Could not extract an AccessLevel:', groups);
  return AccessLevel.Reader;
};
export var exhaustiveAccessLevelSwitch = function exhaustiveAccessLevelSwitch(accessLevel, options) {
  if (!(accessLevel in options)) {
    throw new Error("Encountered unhandled access level: ".concat(accessLevel, "."));
  }

  return options[accessLevel];
};