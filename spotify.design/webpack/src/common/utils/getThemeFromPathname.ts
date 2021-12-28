import { THEME_CLASSES } from '../constants/colour-combinations';
import { ROUTE } from '../constants/routes';

const {
  design,
  inspiration,
  noted,
  process,
  listen,
  tools,
  team,
  blank,
  fourohfour,
  undetermined,
} = THEME_CLASSES;
const { STORIES, TOOLS, TEAM } = ROUTE;

export function getThemeFromPathname(pathname: string) {
  let theme = undetermined;

  if (pathname) {
    if (pathname === '/') {
      theme = undetermined;
    } else if (pathname.includes(`/${STORIES}/design`)) {
      theme = design;
    } else if (pathname === `/${STORIES}/` || pathname === `/${STORIES}`) {
      theme = blank;
    } else if (pathname.includes(`/${STORIES}/inspiration`)) {
      theme = inspiration;
    } else if (pathname.includes(`/${STORIES}/noted`)) {
      theme = noted;
    } else if (pathname.includes(`/${STORIES}/listen`)) {
      theme = listen;
    } else if (pathname.includes(`/${STORIES}/process`)) {
      theme = process;
    } else if (pathname.includes(`/${STORIES}/listen`)) {
      theme = listen;
    } else if (pathname.includes(`/${TOOLS}/`)) {
      theme = tools;
    } else if (pathname.includes(`/${TEAM}/`)) {
      theme = team;
    } else if (pathname.includes('/404')) {
      theme = fourohfour;
    }
  }

  return theme;
}
