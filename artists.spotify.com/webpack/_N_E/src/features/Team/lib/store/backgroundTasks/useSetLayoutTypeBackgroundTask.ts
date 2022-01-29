// ignore-string-externalization
import { useEffect } from 'react';
import { useViewport, Viewport } from '../../../../../shared/lib/useViewport';
export var useSetLayoutTypeBackgroundTask = function useSetLayoutTypeBackgroundTask(_ref) {
  var setLayoutType = _ref.setLayoutType;
  var viewport = useViewport();
  var layoutType = viewport === Viewport.XS ? 'compact' : 'full';
  useEffect(function () {
    return setLayoutType(layoutType);
  }, [layoutType, setLayoutType]);
};