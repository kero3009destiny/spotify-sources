import { ComponentProps } from 'react';
import styled from 'styled-components';

import { Table } from '@spotify-internal/encore-web';

type DashboardTableProps = ComponentProps<typeof Table> & {
  isLoading: boolean;
};

export const DashboardTable = styled(Table)<DashboardTableProps>`
  ${props => (props.isLoading ? 'min-height: 160px;' : '')}
`;
