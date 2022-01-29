// ignore-string-externalization
import { usePageViewLogger } from './usePageViewLogger';
import { useNavigationLogger } from './useNavigationLogger';
import { useCurrentArtistIdOrNull } from '../../artists';
export function PageEvents(_ref) {
  var _ref$pageId = _ref.pageId,
      pageId = _ref$pageId === void 0 ? null : _ref$pageId;
  var creatorUri = useCreatorUri();
  var organizationUri = useOrganizationUri();
  usePageViewLogger({
    pageId: pageId,
    creatorUri: creatorUri,
    organizationUri: organizationUri
  });
  useNavigationLogger({
    pageId: pageId,
    creatorUri: creatorUri,
    organizationUri: organizationUri
  });
  return null;
}

function useCreatorUri() {
  var artistId = useCurrentArtistIdOrNull();
  if (artistId) return "spotify:artist:".concat(artistId);
  return null;
}

function useOrganizationUri() {
  // todo figure out which routes define org in it
  return null;
}