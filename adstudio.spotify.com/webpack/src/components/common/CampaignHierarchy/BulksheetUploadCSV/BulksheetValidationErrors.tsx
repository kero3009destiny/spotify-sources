import React from 'react';
import i18n from 'i18next';

import {
  semanticColors,
  Table,
  TableCell,
  TableContainer,
  TableHeaderCell,
  Type,
} from '@spotify-internal/encore-web';

import { MinWidthTableHeader, StyledTableRow } from './styles';

import { EntityType, ErrorRow } from 'types/common/state/api/bulksheets';

export interface BulksheetValidationErrorsProps {
  errorRows: ErrorRow[];
}

const getLabelForEntityType = (entityType: EntityType) => {
  if (entityType === 'CAMPAIGN') {
    return i18n.t('I18N_CAMPAIGN', 'Campaign');
  }

  if (entityType === 'AD_SET') {
    return i18n.t('I18N_AD_SET_SENTENCE_CASE', 'Ad set');
  }

  if (entityType === 'AD') {
    return i18n.t('I18N_AD', 'Ad');
  }

  return i18n.t('I18N_ENTITY_STATE_UNKNOWN', 'Unknown');
};

export const BulksheetValidationErrors = ({
  errorRows,
}: BulksheetValidationErrorsProps) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <MinWidthTableHeader minWidth={200}>
            {i18n.t('I18N_NAME', 'Name')}
          </MinWidthTableHeader>
          <MinWidthTableHeader minWidth={85}>
            {i18n.t('I18N_TYPE', 'Type')}
          </MinWidthTableHeader>
          <MinWidthTableHeader minWidth={85}>
            {i18n.t('I18N_ROW', 'Row')}
          </MinWidthTableHeader>
          <TableHeaderCell>
            {i18n.t('I18N_AD_DETAILS_HEADER_TEXT', 'Details')}
          </TableHeaderCell>
        </thead>
        <tbody>
          {errorRows.map((errorRow, idx) => (
            <StyledTableRow
              key={`bulksheet-validation-error-${errorRow.rowNumber}-${idx}`}
            >
              <TableCell>
                <Type
                  semanticColor={semanticColors.textBase}
                  variant={Type.body2}
                  weight={Type.bold}
                >
                  {errorRow.name}
                </Type>
              </TableCell>
              <TableCell>
                <Type
                  semanticColor={semanticColors.textSubdued}
                  variant={Type.body2}
                >
                  {getLabelForEntityType(errorRow.entityType!)}
                </Type>
              </TableCell>
              <TableCell>
                <Type
                  semanticColor={semanticColors.textSubdued}
                  variant={Type.body2}
                >
                  {errorRow.rowNumber}
                </Type>
              </TableCell>
              <TableCell>
                <Type
                  semanticColor={semanticColors.textSubdued}
                  variant={Type.body2}
                >
                  {errorRow.error}
                </Type>
              </TableCell>
            </StyledTableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
