// ignore-string-externalization
import { useLocation } from 'react-router';
import { useCurrentOrgOrNull } from './useCurrentOrgOrNull';
export var useCurrentOrg = function useCurrentOrg() {
  var orgOrNull = useCurrentOrgOrNull();
  var location = useLocation();

  if (!orgOrNull) {
    throw new Error("Can't extract org details from ".concat(location.pathname));
  }

  return orgOrNull;
};