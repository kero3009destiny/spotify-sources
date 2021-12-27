import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';
import styled from 'styled-components';

import {
  Backdrop,
  ButtonPrimary,
  ButtonTertiary,
  DialogConfirmation,
  IconExclamationAlt,
  LoadingIndicator,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import { getScheduledReports as fetchScheduledReports } from 'ducks/scheduledReporting/actions';
import { getAccount } from 'ducks/account/selectors';
import { getSavedQueries } from 'ducks/savedQueries/selectors';
import { getScheduledReporting } from 'ducks/scheduledReporting/selectors';

import { DialogBody } from './DialogBody';

import { ViewOptions } from './types';

export const loaderTestId = 'scheduled-reports-loader';
export const errorTestId = 'scheduled-reports-error-msg';
export const cancelBtnTestId = 'scheduled-reports-cancel-btn';
export const saveCurrentFiltersId = 'save-current-filters-btn';
const IconExclamationAltString = 'IconExclamationAlt';

const StyledDialogBody = styled.div`
  min-height: 4rem;
`;

const StyledLoadingIndicator = styled(LoadingIndicator)`
  width: 100%;
  margin: 2rem auto;
`;

const StyledErrorMessageContainer = styled.section`
  text-align: center;
  margin: 2rem auto;
  height: 4rem;
`;

export type ScheduledReportingModalProps = {
  onClose: () => void;
};

export const ScheduledReportingModal: React.FC<ScheduledReportingModalProps> = ({
  onClose,
}) => {
  const { schedules, currentIamDomain, loading, error } = useSelector(
    getScheduledReporting,
  );
  const { currentSelection } = useSelector(getSavedQueries);
  const { iamDomain } = useSelector(getAccount);
  const dispatch = useDispatch();
  const hasSchedules = schedules && schedules.length > 0;
  const hasSavedQuerySelected = currentSelection.uuid !== '';

  useEffect(() => {
    if (iamDomain && iamDomain !== currentIamDomain) {
      dispatch(fetchScheduledReports(iamDomain));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iamDomain]);

  const getTitle = () => {
    // if there are no schedules
    if (!loading && !error && !hasSchedules && hasSavedQuerySelected) {
      return i18n.t(
        'I18N_AUTOMATED_REPORTING_EMPTY_TITLE2',
        "You haven't scheduled any reports yet",
      );
    }

    // if there are no schedules and no saved query selected
    if (!loading && !error && !hasSchedules && !hasSavedQuerySelected) {
      return i18n.t(
        'I18N_AUTOMATED_REPORTING_EMPTY_TITLE1',
        'No scheduled reports yet',
      );
    }

    // if loading or error state
    if (loading || error) {
      return i18n.t(
        'I18N_AUTOMATED_REPORTING_LOADING_TITLE',
        'Schedule email report',
      );
    }

    // if schedules are loaded
    return i18n.t('I18N_AUTOMATED_REPORTING_TITLE', 'Scheduled reports');
  };

  return (
    <Backdrop center>
      <DialogConfirmation
        dialogTitle={getTitle()}
        aria-label={getTitle()}
        aria-describedby="dialogBody"
        body={
          <StyledDialogBody id="dialogBody">
            {loading && !error && (
              <StyledLoadingIndicator data-test={loaderTestId} />
            )}
            {!loading && error && (
              <StyledErrorMessageContainer>
                <IconExclamationAlt
                  aria-label={IconExclamationAltString}
                  iconSize={32}
                  semanticColor={semanticColors.textNegative}
                />
                <Type
                  as="p"
                  semanticColor={semanticColors.textNegative}
                  data-test={errorTestId}
                >
                  {i18n.t(
                    'I18N_AUTOMATED_REPORTING_LOAD_ERROR_MSG',
                    "Something went wrong. Your scheduled reports couldn't be loaded",
                  )}
                </Type>
              </StyledErrorMessageContainer>
            )}
            {!loading && !error && (
              <DialogBody currentView={ViewOptions.VIEW} />
            )}
          </StyledDialogBody>
        }
        footer={
          <div>
            <ButtonTertiary
              buttonSize={ButtonTertiary.md}
              condensed
              onClick={onClose}
              data-test={cancelBtnTestId}
            >
              {i18n.t('I18N_CANCEL', 'Cancel')}
            </ButtonTertiary>
            {!loading && !error && !hasSavedQuerySelected && !hasSchedules && (
              <ButtonTertiary
                buttonSize={ButtonTertiary.md}
                condensed
                onClick={() => {}}
                data-test={saveCurrentFiltersId}
              >
                {i18n.t(
                  'I18N_SAVED_FILTERS_SAVE_CURRENT_FILTERS',
                  'Save current filters',
                )}
              </ButtonTertiary>
            )}
            <ButtonPrimary buttonSize={ButtonTertiary.md} disabled>
              {i18n.t(
                'I18N_AUTOMATED_REPORTING_BUTTON_TEXT',
                'Schedule report',
              )}
            </ButtonPrimary>
          </div>
        }
      />
    </Backdrop>
  );
};
