import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import styled from 'styled-components';

import {
  Table,
  TableCell,
  TableContainer,
  TableHeaderCell,
  TableRow,
  TableThumbnail,
} from '@spotify-internal/encore-web';

import { CreativesCatalogueState } from 'ducks/creatives/reducer';
import { getCreativesForRotationTables } from 'ducks/creatives/selectors';

import { TableBody } from '../common/Table/TableBody';
import { NameCell } from './NameCell';

import { CreativesCatalogueEntity } from 'types/common/state/api/creatives';

export const StyledTableContainer = styled(TableContainer)`
  overflow-y: scroll;
  height: 40vh;
`;

const StyledNameCellContainer = styled.div`
  display: flex;
`;

export interface StateProps {
  creativesCatalogue: CreativesCatalogueState;
}

export type CreativesTableProps = StateProps;

export const CreativesTable: FunctionComponent<CreativesTableProps> = ({
  creativesCatalogue,
}) => {
  return (
    <StyledTableContainer stickyHeader>
      <Table data-test="ad-rotation-creatives-table">
        <thead>
          <TableRow>
            <TableHeaderCell>
              {i18n.t('I18N_AD_NAME', 'Ad name')}
            </TableHeaderCell>
          </TableRow>
        </thead>
        <TableBody
          isLoading={creativesCatalogue.loading}
          empty={creativesCatalogue.items.length === 0}
        >
          {creativesCatalogue.items.map(
            (creativeRow: CreativesCatalogueEntity) => {
              return (
                <TableRow>
                  <TableCell>
                    <StyledNameCellContainer>
                      <TableThumbnail
                        small
                        imgAlt={creativeRow.name}
                        img={creativeRow.imageUrl}
                      />
                      <NameCell
                        keyId={creativeRow.creativeId}
                        name={creativeRow.name}
                      />
                    </StyledNameCellContainer>
                  </TableCell>
                </TableRow>
              );
            },
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export const mapStateToProps = (state: TSFixMe): StateProps => {
  return {
    creativesCatalogue: getCreativesForRotationTables(state),
  };
};

export const ConnectedCreativesTable = connect(mapStateToProps)(CreativesTable);

export default ConnectedCreativesTable;
