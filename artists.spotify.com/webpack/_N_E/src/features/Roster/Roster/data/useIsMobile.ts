import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
export function useIsMobile() {
  var viewport = useViewport();
  return viewport === Viewport.XS;
}