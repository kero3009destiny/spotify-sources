import React from 'react';
import { Link } from 'react-router';
import i18n from 'i18next';
import { omit } from 'lodash';
import styled from 'styled-components';

import {
  Banner,
  spacer4,
  TableCell,
  TableRow,
  Type,
} from '@spotify-internal/encore-web';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';

import { DATE_RANGE_KEYS } from 'utils/campaignHierarchy/catalogueFilters';

import { CampaignsQueryParams } from 'types/common/state/api/campaigns';
import { CreativesQueryParams } from 'types/common/state/api/creatives';
import { FlightsQueryParams } from 'types/common/state/api/flights';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledTableCell = styled(TableCell)`
  padding: ${spacer4} 0;
`;

type TableFilterParams =
  | Partial<CampaignsQueryParams>
  | Partial<FlightsQueryParams>
  | Partial<CreativesQueryParams>;

export interface DateFilterRowProps {
  message: string;
  colSpan: number;
  queryParams: TableFilterParams;
}

export const generateClearDateFilterParams = (
  queryParams: TableFilterParams,
) => {
  const filteredQueryParams = omit(queryParams, DATE_RANGE_KEYS) as Record<
    string,
    string
  >;
  const newQueryString = new URLSearchParams(filteredQueryParams).toString();
  return {
    pathname: window.location.pathname,
    search: `?${newQueryString}`,
  };
};

export const DateFilterMessageRow = (props: DateFilterRowProps) => (
  <TableRow key="date-filter-message">
    <StyledTableCell colSpan={props.colSpan}>
      <Banner>
        {props.message}{' '}
        <AnalyticsContextConsumer>
          {({ category, logUserAction }) => (
            <StyledLink
              to={generateClearDateFilterParams(props.queryParams)}
              onClick={() => {
                logUserAction({
                  category,
                  label: 'reset_to_lifetime',
                });
              }}
            >
              <Type variant="cta3">
                {i18n.t(
                  'I18N_DATE_PICKER_RESET_MESSAGE',
                  'Reset view to lifetime',
                )}
              </Type>
            </StyledLink>
          )}
        </AnalyticsContextConsumer>
      </Banner>
    </StyledTableCell>
  </TableRow>
);
