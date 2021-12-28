import { css } from 'styled-components';
import {
  Heading1Styles,
  Heading2Styles,
  Heading3Styles,
  Heading4Styles,
} from './heading'

export const RichTextStyles = css`
  h1 {
    ${Heading1Styles};
  }

  h2 {
    ${Heading2Styles};
  }

  h3 {
    ${Heading3Styles};
  }

  h4 {
    ${Heading4Styles};
  }
`

export default RichTextStyles
