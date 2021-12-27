import i18n from 'i18next';

import { Paging } from 'types/common/state/api';

export const paginationDisplayString = (
  rangeStart: number,
  rangeEnd: number,
  total?: number,
) =>
  total !== undefined
    ? i18n.t('I18N_PAGINATION_RANGE_OF_TOTAL', { rangeStart, rangeEnd, total })
    : i18n.t('I18N_PAGINATION_RANGE_UNKNOWN_TOTAL', { rangeStart, rangeEnd });

// Transform pagination response from BFF to be compatible with Pagination component
// (API always returns a value 'total', and -1 is interpreted as undefined)
export const mapPaginationResponse = (pagingResponse: Paging): Paging => ({
  ...pagingResponse,
  total: pagingResponse.total === -1 ? undefined : pagingResponse.total,
});
