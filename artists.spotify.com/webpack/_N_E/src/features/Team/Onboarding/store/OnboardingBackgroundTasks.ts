import { useSetSelectedArtistAndRequestIdFromRouteBackgroundTask } from './backgroundTasks/useSetSelectedArtistAndRequestIdFromRouteBackgroundTask';
export var useOnboardingBackgroundTasks = function useOnboardingBackgroundTasks(_ref, dispatchers) {
  var onboarding = _ref.onboarding;
  useSetSelectedArtistAndRequestIdFromRouteBackgroundTask(dispatchers, onboarding);
};