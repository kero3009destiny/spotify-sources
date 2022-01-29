// ignore-string-externalization
import styled from 'styled-components';
import {
  TableThumbnail,
  Table,
  spacer8,
  spacer12,
} from '@spotify-internal/encore-web';

import { DialogConfirmation } from '@mrkt/features/Dialog';

export const StyledTableThumbnail = styled(TableThumbnail)`
  margin: ${spacer12} 0;
`;

export const StyledTable = styled(Table)`
  margin-bottom: ${spacer8};
`;

export const StyledDialogConfirmation = styled(DialogConfirmation)`
  width: 596px;
`;
