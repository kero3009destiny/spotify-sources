import { createGlobalStyle } from 'styled-components';
import { GlobalStyles as EncoreGlobalStyles, black, gray30 } from '@spotify-internal/encore-web';
import 'styles/fonts.scss';

// Using this css helper because tooling (vs code, prettier) can't reformat or highlight
// injectGlobal at the moment.
const GlobalStyles = createGlobalStyle`
  body {
    a:not([class]) {
      color: ${black};

      &:not([href]) {
        color: ${gray30};
        cursor: default;
      }

      &[href] {
        text-decoration: none;

        &:hover,
        &:focus {
          color: ${black};
          text-decoration: underline;
        }
      }
    }
  }
`;

export default function CombinedGlobalStyles() {
  return (
    <>
      <EncoreGlobalStyles />
      <GlobalStyles />
    </>
  );
}
