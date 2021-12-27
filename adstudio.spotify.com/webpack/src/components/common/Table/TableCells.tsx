import styled from 'styled-components';

import { spacer16 } from '@spotify-internal/encore-foundation';
import { TableCell } from '@spotify-internal/encore-web';

export const NoWrapTableCell = styled(TableCell)`
  font-size: ${spacer16};
  white-space: nowrap;
  padding: 12px 32px;
`;

export const PaddedTableCell = styled(TableCell)`
  padding: 12px 32px;
`;
