import styled from 'styled-components';

import { spacer8 } from '@spotify-internal/encore-foundation';
import {
  cssColorValue,
  semanticColors,
  TableRow,
} from '@spotify-internal/encore-web';

export const SelectableTableRow = styled(TableRow)<{ isSelected: boolean }>`
  & > :first-child {
    position: relative;
  }

  ${props =>
    props.isSelected &&
    `
    & > :first-child:after {
      content: '';
      display: block;
      position: absolute;
      height: calc(100% - ${spacer8});
      width: 1px;
      border-left: 4px solid ${cssColorValue(semanticColors.textBrightAccent)};
      left: 0;
      top: 4px;
    }
  `}
`;
