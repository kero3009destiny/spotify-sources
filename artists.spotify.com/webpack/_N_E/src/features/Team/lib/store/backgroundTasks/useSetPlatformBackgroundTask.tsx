import { useContext, useEffect } from 'react';
import { Context } from '../../../../../shared/platform/src/withPlatform';
export var useSetPlatformBackgroundTask = function useSetPlatformBackgroundTask(_ref) {
  var setPlatform = _ref.setPlatform;
  var platformContext = useContext(Context);
  useEffect(function () {
    setPlatform(platformContext);
  }, [platformContext, setPlatform]);
};