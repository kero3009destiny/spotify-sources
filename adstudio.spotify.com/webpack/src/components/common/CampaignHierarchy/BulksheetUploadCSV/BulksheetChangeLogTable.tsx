import React from 'react';
import i18n from 'i18next';

import {
  Table,
  TableContainer,
  TableHeaderCell,
  Type,
} from '@spotify-internal/encore-web';

import {
  CategoryTableCell,
  ChangeLogUpdatedValue,
  StyledTableRow,
  ValueTableCell,
} from './styles';

import { CHANGE_LOG_SECTION } from './constants';

import { Action, DiffEntity } from 'types/common/state/api/bulksheets';

interface BulksheetChangeLogTableProps {
  entityId: string;
  action: Action;
  diffList: DiffEntity[];
}

export const BulksheetChangeLogTable = ({
  entityId,
  action,
  diffList,
}: BulksheetChangeLogTableProps) => {
  return (
    <TableContainer data-test={CHANGE_LOG_SECTION}>
      <Table>
        <thead>
          <TableHeaderCell>
            {i18n.t('I18N_CHANGE_LOG_TYPE_HEADER', 'Type')}
          </TableHeaderCell>
          {action === 'EDIT' ? (
            <>
              <TableHeaderCell>
                {i18n.t('I18N_CHANGE_LOG_ORIGINAL_HEADER', 'Original')}
              </TableHeaderCell>
              <TableHeaderCell>
                {i18n.t('I18N_CHANGE_LOG_CHANGE_HEADER', 'Change')}
              </TableHeaderCell>
            </>
          ) : (
            <TableHeaderCell>
              {i18n.t('I18N_CHANGE_LOG_DETAILS_HEADER', 'Details')}
            </TableHeaderCell>
          )}
        </thead>
        <tbody>
          {diffList.map(diff => (
            <StyledTableRow key={`diff-message-${diff.fieldName}-${entityId!}`}>
              {/* TODO: i18n-ize the field names */}
              <CategoryTableCell>{diff.fieldName}</CategoryTableCell>
              {action === 'EDIT' ? (
                <>
                  <ValueTableCell>
                    <Type as="p" condensed variant={Type.body2}>
                      {diff.oldValue}
                    </Type>
                  </ValueTableCell>
                  <ValueTableCell>
                    <ChangeLogUpdatedValue>
                      <Type as="p" condensed variant={Type.body2}>
                        {diff.newValue}
                      </Type>
                    </ChangeLogUpdatedValue>
                  </ValueTableCell>
                </>
              ) : (
                <ValueTableCell>
                  <Type as="p" condensed variant={Type.body2}>
                    {diff.newValue}
                  </Type>
                </ValueTableCell>
              )}
            </StyledTableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};
