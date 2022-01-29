import { useViewport, Viewport } from '../../../shared/lib/useViewport';
export function useIsXSmallScreen() {
  var viewport = useViewport();
  return viewport === Viewport.XS;
}