// ignore-string-externalization
import { useCurrentUser } from '../../currentUser';
import { useLocalOverrides } from './useLocalOverrides';
export var useShouldShowTerms = function useShouldShowTerms() {
  var overrides = useLocalOverrides();
  var currentUser = useCurrentUser();
  var shouldShowTerms = currentUser && currentUser.hasAccess && currentUser.needsToAcceptTerms;
  return overrides.showTerms || shouldShowTerms;
};