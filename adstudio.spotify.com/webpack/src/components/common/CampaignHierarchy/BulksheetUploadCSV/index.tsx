import React, { forwardRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';

import { IconUploadAlt } from '@spotify-internal/encore-web';

import { resetBulksheets } from 'ducks/bulksheets/actions';
import { getShouldShowReviewScreen } from 'ducks/bulksheets/selectors';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';

import { FilterBarButton } from '../Filters/ButtonIcon';
import { BulksheetChangeLog } from './BulksheetChangeLog';
import { BulksheetUploadModal } from './BulksheetUploadModal';

import { UPLOAD_BTN_TEST_ID } from './constants';

export const BulksheetUpload = forwardRef<HTMLButtonElement>((_, ref) => {
  const dispatch = useDispatch();
  const [
    showBulksheetSubmissionFlow,
    setShowBulksheetSubmissionFlow,
  ] = useState(false);
  const shouldShowReviewScreen = useSelector(getShouldShowReviewScreen);
  const onClose = useCallback(() => {
    setShowBulksheetSubmissionFlow(false);
    dispatch(resetBulksheets());
  }, [setShowBulksheetSubmissionFlow, dispatch]);

  return (
    <>
      <AnalyticsContextConsumer>
        {({ logUserAction, category }) => (
          <FilterBarButton
            ref={ref}
            data-test={UPLOAD_BTN_TEST_ID}
            onClick={() => {
              logUserAction({
                category,
                label: 'Clicked_upload_bulksheet_toolbar_button',
              });
              setShowBulksheetSubmissionFlow(true);
            }}
            tooltipText={i18n.t('I18N_BULK_UPLOAD', 'Upload CSV')}
          >
            <IconUploadAlt />
          </FilterBarButton>
        )}
      </AnalyticsContextConsumer>

      {showBulksheetSubmissionFlow && !shouldShowReviewScreen && (
        <BulksheetUploadModal onClose={onClose} />
      )}

      {showBulksheetSubmissionFlow && shouldShowReviewScreen && (
        <BulksheetChangeLog onClose={onClose} />
      )}
    </>
  );
});
