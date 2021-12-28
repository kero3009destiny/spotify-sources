import { ROUTE } from '../constants/routes';

export function getTrackingLabelFromPathname(pathname: string): string {
  switch (true) {
    case pathname === ROUTE.HOME:
      return 'homepage';
    case pathname.startsWith(`/${ROUTE.LISTEN}`):
      return 'listen';
    case pathname.startsWith(`/${ROUTE.STORIES}`):
      return 'stories';
    case pathname.startsWith(`/${ROUTE.TEAM}`):
      return 'team';
    case pathname.startsWith(`/${ROUTE.TOOLS}`):
      return 'tools';
    case pathname.startsWith(`/${ROUTE.ARTICLE}`):
      return 'article';
  }
}
