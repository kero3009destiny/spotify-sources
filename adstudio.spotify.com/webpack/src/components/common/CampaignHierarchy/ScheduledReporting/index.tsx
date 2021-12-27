import React, { useState } from 'react';
import i18n from 'i18next';

import { IconClock } from '@spotify-internal/encore-web';

import { FilterBarButton } from '../Filters/ButtonIcon';
import { ScheduledReportingModal } from './ScheduledReportingModal';

export const scheduledReportingTestId = 'scheduledReportingBtn';

export const ScheduledReportingButton = () => {
  const [showScheduledReporting, setShowScheduledReporting] = useState(false);

  const closeModal = () => {
    setShowScheduledReporting(false);
  };

  return (
    <>
      <FilterBarButton
        data-test={scheduledReportingTestId}
        onClick={() => {
          setShowScheduledReporting(true);
        }}
        tooltipText={i18n.t(
          'I18N_AUTOMATED_REPORTING_BUTTON_TEXT',
          'Schedule report',
        )}
      >
        <IconClock />
      </FilterBarButton>

      {showScheduledReporting && (
        <ScheduledReportingModal onClose={closeModal} />
      )}
    </>
  );
};
