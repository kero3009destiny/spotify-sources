// ignore-string-externalization
import { AccessLevel } from './AccessLevel';
export var TeamType;

(function (TeamType) {
  TeamType["artist"] = "artist";
  TeamType["label"] = "label";
})(TeamType || (TeamType = {}));

export var isTeamType = function isTeamType(type) {
  return type in TeamType;
};
export var assertTeamType = function assertTeamType(type) {
  if (isTeamType(type)) {
    return type;
  }

  throw new Error("Unexpected team type: ".concat(type));
};
export var assertAccessLevel = function assertAccessLevel(accessLevel) {
  switch (accessLevel) {
    case 'Full Access':
      return AccessLevel.Admin;

    case 'Edit Access':
      return AccessLevel.Editor;

    case 'View-only Access':
      return AccessLevel.Reader;
  }

  throw new Error("Unexpected access level: ".concat(accessLevel));
};