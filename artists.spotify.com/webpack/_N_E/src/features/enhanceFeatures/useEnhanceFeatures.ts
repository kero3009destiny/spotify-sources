// ignore-string-externalization
import { useStorylinesCreation } from '@mrkt/features/storylines/lib/useStorylinesCreation';
import { useCurrentArtistCanvasAccess } from '../artists';
export function useEnhanceFeatures() {
  // Canvas features
  var hasCanvasAccess = useCurrentArtistCanvasAccess(); // Storyline features

  var hasStorylineAccess = useStorylinesCreation();
  return {
    hasCanvasAccess: hasCanvasAccess,
    hasStorylineAccess: hasStorylineAccess
  };
}