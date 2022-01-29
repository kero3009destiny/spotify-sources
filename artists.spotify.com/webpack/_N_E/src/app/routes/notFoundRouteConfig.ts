// ignore-string-externalization
import { NotFound } from '../../features/NotFound';
import { PageId } from '../../features/PlatformEvents/PageId';
export var notFoundRouteConfig = {
  pageId: PageId.NotFound,
  path: '/',
  body: NotFound,
  allowUnauthenticated: true
};