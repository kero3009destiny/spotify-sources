import { useEffect } from 'react';
import { currentUserLoader } from '../../../../../features/currentUser';
export var useSetCurrentUserBackgroundTask = function useSetCurrentUserBackgroundTask(_ref) {
  var setCurrentUser = _ref.setCurrentUser;
  useEffect(function () {
    currentUserLoader.load(0).then(function (currentUser) {
      setCurrentUser(currentUser);
    });
  }, [setCurrentUser]);
};