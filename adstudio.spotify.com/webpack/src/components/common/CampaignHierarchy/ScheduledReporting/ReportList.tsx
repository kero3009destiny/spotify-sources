import React from 'react';
import { useSelector } from 'react-redux';
import i18n from 'i18next';
import styled from 'styled-components';

import { gray95, Type } from '@spotify-internal/encore-web';

import { getSavedQueries } from 'ducks/savedQueries/selectors';
import { getScheduledReporting } from 'ducks/scheduledReporting/selectors';

export const noSchedulesTestId = 'no-schedules-test-id';
export const noSavedQueriesTestId = 'no-saved-queries-test-id';

const StyledReportList = styled.section`
  max-height: 30rem;
`;

const StyledReportItem = styled.div`
  padding: 0 1rem;
  border-radius: 0.5rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: ${gray95};
  }
`;

const FilterName = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 16rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 3rem;
`;

export const ReportList: React.FC<{}> = () => {
  const { schedules } = useSelector(getScheduledReporting);
  const { currentSelection } = useSelector(getSavedQueries);
  const hasSchedules = schedules && schedules.length > 0;
  const hasSavedQuerySelected = currentSelection.uuid !== '';

  return (
    <>
      {// If there are no schedules but there is a saved query selected
      !hasSchedules && hasSavedQuerySelected && (
        <Type data-test={noSchedulesTestId}>
          {i18n.t(
            'I18N_AUTOMATED_REPORTING_EMPTY_HELP_TEXT2',
            'Email reports to yourself or your team on a regular schedule.',
          )}
        </Type>
      )}

      {// If there are no schedules and there is no saved query selected
      !hasSchedules && !hasSavedQuerySelected && (
        <Type data-test={noSavedQueriesTestId}>
          {i18n.t(
            'I18N_AUTOMATED_REPORTING_EMPTY_HELP_TEXT1',
            'To schedule an email report, create a saved filter based on a search, date range, and status.',
          )}
        </Type>
      )}

      <StyledReportList>
        {schedules?.map(schedule => (
          <StyledReportItem
            data-test={`scheduled-report-${schedule.uuid}`}
            key={schedule.uuid}
          >
            <FilterName>{schedule.name}</FilterName>
          </StyledReportItem>
        ))}
      </StyledReportList>
    </>
  );
};
