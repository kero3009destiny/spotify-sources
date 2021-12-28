import {
  THEME_CLASSES,
  ThemeIdentifiers,
} from '../constants/colour-combinations';

export function getArticleTheme(parentCategory: string | undefined): string {
  const themeID = parentCategory || 'blank';

  return THEME_CLASSES[themeID as ThemeIdentifiers];
}
