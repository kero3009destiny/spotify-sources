import { ColumnSelection } from 'ducks/columns/types';

import { BffHierarchyColumns } from 'types/common/state/api/hierarchycolumns';

export function mapColumnSelectionToExportableColumns<
  EnumType extends keyof ColumnSelection
>(
  columnSelection: ColumnSelection,
  exportColumns: Record<EnumType, BffHierarchyColumns | undefined>,
): BffHierarchyColumns[] {
  return (Object.keys(exportColumns) as Array<EnumType>).reduce(
    (accum, nextValue) => {
      if (columnSelection[nextValue] && !!exportColumns[nextValue]) {
        const hierarchyColumn: BffHierarchyColumns = exportColumns[nextValue]!;
        accum.push(hierarchyColumn);
      }
      return accum;
    },
    [] as BffHierarchyColumns[],
  );
}
