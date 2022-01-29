// ignore-string-externalization
import { PageId } from '../../features/PlatformEvents/PageId';
import { LazyArtistFooter } from '../Artist/LazyArtistFooter';
import { LazyRosterHeader, LazyRosterRoute } from '../../features/Roster';
export var rosterRouteConfig = {
  header: LazyRosterHeader,
  body: LazyRosterRoute,
  footer: LazyArtistFooter,
  pageId: PageId.Roster,
  path: '/roster',
  exact: true
};