import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
export var getNames = function getNames(fullName) {
  var match = fullName && fullName.match(/^(.+)\s(\S+)$/);

  if (!match) {
    return {
      firstName: fullName,
      lastName: ''
    };
  }

  var _match = _slicedToArray(match, 3),
      firstName = _match[1],
      lastName = _match[2];

  return {
    firstName: firstName,
    lastName: lastName
  };
};
export var toFullName = function toFullName(firstName, lastName) {
  return "".concat(firstName, " ").concat(lastName).trim();
};