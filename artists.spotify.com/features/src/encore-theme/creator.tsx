import '@spotify-internal/encore-web/css/encore-creator-light-theme.css';
import '@spotify-internal/encore-web/css/encore-creator-dark-theme.css';
import { createAppTheme } from '.';

export const AppTheme = createAppTheme({
  light: 'encore-creator-light-theme',
  dark: 'encore-creator-dark-theme',
});
