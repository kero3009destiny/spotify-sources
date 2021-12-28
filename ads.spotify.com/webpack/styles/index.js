import { createGlobalStyle } from 'styled-components';

import reset from './reset';
import globalTypographyStyles from './typography';
import animationKeyFrames from './animations';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${globalTypographyStyles}
  ${animationKeyFrames}
`;

export default GlobalStyle;
