// ignore-string-externalization
import { useCollator } from '@mrkt/features/i18n';

type NonEmptyDataTypes = string | number | Date;

type NormalizedOriginalSorter = {
  [key: string]: any;
};

type SetSort = {
  hasDateObjects: boolean;
  aValue: any;
  bValue: any;
};

export type NormalizedData = {
  originalValues: NormalizedOriginalSorter;
};

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

const isDate = (value: NonEmptyDataTypes) =>
  Object.prototype.toString.call(value) === '[object Date]';

export const useSortTableData = () => {
  const collator = useCollator({
    numeric: true,
  });

  const setAscendingSort = ({ hasDateObjects, aValue, bValue }: SetSort) => {
    if (hasDateObjects) {
      return aValue < bValue ? -1 : 1;
    }

    return collator.compare(aValue.toString(), bValue.toString());
  };

  const setDescendingSort = ({ hasDateObjects, aValue, bValue }: SetSort) => {
    if (hasDateObjects) {
      return aValue < bValue ? 1 : -1;
    }

    return collator.compare(bValue.toString(), aValue.toString());
  };

  return function sortTableData<T extends NormalizedData>(
    // the original payload
    data: T[],
    // the key in the data to sort by
    sortKey: string,
    // either 'asc' or 'desc', defaults to 'asc'
    sortOrder: string = SortOrder.ASC,
  ): T[] {
    if (!sortKey) {
      // eslint-disable-next-line no-console
      console.warn('This hook needs a sortKey to rearrange the data.');
      return data;
    }

    // a function to access values to sort by, if nested in another object
    const sortAccessorFunction = (datum: T) => datum?.originalValues ?? {};

    return data.slice().sort((a: T, b: T) => {
      const sortA: { [key: string]: any } = sortAccessorFunction(a) ?? {};
      const sortB: { [key: string]: any } = sortAccessorFunction(b) ?? {};
      const aValue = sortA[sortKey] ?? 0;
      const bValue = sortB[sortKey] ?? 0;
      const hasSortableValues =
        aValue != null &&
        aValue !== undefined &&
        bValue != null &&
        bValue !== undefined &&
        aValue !== bValue;

      if (hasSortableValues) {
        // the collator can't sort date objects
        const hasDateObjects = isDate(aValue) && isDate(bValue);

        if (sortOrder === SortOrder.DESC) {
          return setDescendingSort({ hasDateObjects, aValue, bValue });
        }

        return setAscendingSort({ hasDateObjects, aValue, bValue });
      }

      return 0;
    });
  };
};
