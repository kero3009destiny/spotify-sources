import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import { usePDF } from '@react-pdf/renderer';
import i18n from 'i18next';

import Can from '@spotify-internal/adstudio-shared/lib/components/CanWrapper';
import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import {
  Banner,
  ButtonPrimary,
  ButtonTertiary,
  DialogFullScreen,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import { submitBulkCSV } from 'ducks/bulksheets/actions';
import { displayNotification } from 'ducks/notifications/actions';
import { fetchPaymentDetails } from 'ducks/payments/actions';
import {
  getAccount,
  getAccountId,
  getBusinessName,
  getRole,
  isImpersonating as getIsImpersonating,
} from 'ducks/account/selectors';
import {
  getBulksheetChangeLog,
  getCSVSubmissionFailed,
  getCSVSubmissionStarted,
  getCSVSubmissionSucceeded,
  getCurrentBulkSheetId,
  getImportedCampaignCount,
  getImportedCreativeCount,
  getImportedFlightCount,
} from 'ducks/bulksheets/selectors';
import { getPaymentDetails } from 'ducks/payments/selectors';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import { AuthContextConsumer } from 'components/common/AuthorizationContext';

import { buildPdf } from './BulksheetChangeLogPdf';
import { BulksheetChangeLogSectionHeader } from './BulksheetChangeLogSectionHeader';
import { BulksheetChangeLogTable } from './BulksheetChangeLogTable';
import { BulksheetDiscardChangesWarning } from './BulksheetDiscardChangesWarning';
import {
  ChangeLogContainer,
  ChangeLogDialogTitle,
  ChangeLogFooter,
  ChangeLogHeader,
  ChangeLogSection,
} from './styles';

import {
  CANCEL_BTN_TEST_ID,
  READ_ONLY_PERMISSION_CLOSE_BTN,
  SUBMISSION_ERROR_BANNER,
  SUBMIT_BTN_TEST_ID,
} from './constants';
import { ROLE_LABELS } from 'config/account';
import { DETAILS_INVOICE } from 'config/payments';

export interface BulksheetChangeLogProps {
  onClose: () => void;
}

export const BulksheetChangeLog = ({ onClose }: BulksheetChangeLogProps) => {
  const [showDiscardChangesWarning, setShowDiscardChangesWarning] = useState(
    false,
  );
  const [stickyHeaderText, setStickyHeaderText] = useState(false);
  const dispatch = useDispatch();
  const adAccountName = useSelector(getBusinessName);
  const adAccountRole = useSelector(getRole);
  const adAccountId = useSelector(getAccountId);
  const campaignCount = useSelector(getImportedCampaignCount);
  const flightCount = useSelector(getImportedFlightCount);
  const creativeCount = useSelector(getImportedCreativeCount);
  const changeLog = useSelector(getBulksheetChangeLog);
  const bulkSheetId = useSelector(getCurrentBulkSheetId);
  const isSubmitting = useSelector(getCSVSubmissionStarted);
  const submissionSucceeded = useSelector(getCSVSubmissionSucceeded);
  const submissionFailed = useSelector(getCSVSubmissionFailed);
  const account = useSelector(getAccount);
  const paymentDetails = useSelector(getPaymentDetails);
  const isImpersonating = useSelector(getIsImpersonating);
  const isInvoiceUser = paymentDetails?.type === DETAILS_INVOICE;
  const [pdfInstance] = usePDF({
    document: buildPdf({
      bulkSheetId: bulkSheetId!,
      account,
      changeLog: changeLog!,
      isInvoiceUser,
    }),
  });
  const disableSubmission =
    isSubmitting || pdfInstance.loading || !!pdfInstance.error;
  const showErrorBanner = submissionFailed || !!pdfInstance.error;

  useEffect(() => {
    if (submissionSucceeded) {
      dispatch(
        displayNotification(
          i18n.t(
            'I18N_YOUR_UPDATES_WERE_SAVED',
            'Your updates were successfully submitted.',
          ),
          'positive',
        ),
      );
      onClose();
    }
  }, [submissionSucceeded, onClose, dispatch]);

  useEffect(() => {
    dispatch(fetchPaymentDetails(account));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DialogFullScreen
      onClose={() => setShowDiscardChangesWarning(true)}
      banner={
        showErrorBanner && (
          <Banner data-test={SUBMISSION_ERROR_BANNER} colorSet="negative">
            {i18n.t(
              'I18N_BULKSHEETS_PDF_ERROR',
              "Something went wrong and we can't submit your changes right now. Please try again later.",
            )}
          </Banner>
        )
      }
      dialogTitle={
        <ChangeLogDialogTitle>
          <div>
            <Type
              condensed
              as="p"
              variant={Type.body3}
              semanticColor={semanticColors.textBase}
              weight={Type.bold}
            >
              {adAccountName}
            </Type>
            <Type
              condensed
              as="p"
              variant={Type.body4}
              semanticColor={semanticColors.textSubdued}
            >
              {adAccountRole
                ? ROLE_LABELS[adAccountRole]
                : ROLE_LABELS.contributor}
            </Type>
          </div>
          {stickyHeaderText && (
            <Type condensed variant={Type.heading3}>
              {i18n.t('I18N_REVIEW_BULK_CHANGES', 'Preview changes')}
            </Type>
          )}
        </ChangeLogDialogTitle>
      }
      body={
        <>
          <ChangeLogContainer>
            <ChangeLogHeader>
              <Type condensed as="h1" variant={Type.heading1}>
                {i18n.t('I18N_REVIEW_BULK_CHANGES', 'Preview changes')}
              </Type>
              <Type condensed as="p" variant={Type.body1}>
                {i18n.t('I18N_YOU_HAVE_IMPORTED_ENTITIES', {
                  defaultValue: `If you submit your changes, it will affect ${campaignCount} Campaigns, ${flightCount} Ad sets, and ${creativeCount} Ads.`,
                  campaignCount,
                  flightCount,
                  creativeCount,
                })}
              </Type>
              <Waypoint
                onLeave={() => setStickyHeaderText(true)}
                onEnter={() => setStickyHeaderText(false)}
              />
            </ChangeLogHeader>
            {changeLog?.diffMessages.map((diffMessage, idx) => (
              <ChangeLogSection
                key={`diff-message-${diffMessage.entityType}-${idx}`}
              >
                <BulksheetChangeLogSectionHeader
                  entityType={diffMessage.entityType!}
                  name={diffMessage.name!}
                  action={diffMessage.action}
                />
                <BulksheetChangeLogTable
                  diffList={diffMessage.diffList}
                  entityId={diffMessage.entityId!}
                  action={diffMessage.action}
                />
              </ChangeLogSection>
            ))}
          </ChangeLogContainer>
          {showDiscardChangesWarning && (
            <BulksheetDiscardChangesWarning
              onConfirm={onClose}
              onCancel={() => setShowDiscardChangesWarning(false)}
            />
          )}
        </>
      }
      footer={
        <AnalyticsContextConsumer>
          {({ logUserAction, category }) => (
            <ChangeLogFooter>
              <AuthContextConsumer>
                {permissions => (
                  <Can
                    // if user is imperonating, force the 'no' scenario
                    permissions={isImpersonating ? [] : permissions}
                    perform={[RolePermissions.CAMPAIGN_CREATE]}
                    yes={() => (
                      <>
                        <ButtonTertiary
                          data-test={CANCEL_BTN_TEST_ID}
                          disabled={isSubmitting}
                          onClick={() => {
                            logUserAction({
                              category,
                              label:
                                'Clicked_discard_in_review_bulk_changes_page',
                            });
                            setShowDiscardChangesWarning(true);
                          }}
                          buttonLegacy
                        >
                          {i18n.t('I18N_CANCEL', 'Cancel')}
                        </ButtonTertiary>
                        <ButtonPrimary
                          data-test={SUBMIT_BTN_TEST_ID}
                          disabled={disableSubmission}
                          onClick={() => {
                            logUserAction({
                              category,
                              label:
                                'Clicked_submit_in_review_bulk_changes_page',
                            });
                            dispatch(
                              submitBulkCSV(
                                { adAccountId, bulkSheetId: bulkSheetId! },
                                pdfInstance.blob!,
                              ),
                            );
                          }}
                          buttonLegacy
                        >
                          {i18n.t('I18N_SUBMIT_CHANGES', 'Submit changes')}
                        </ButtonPrimary>
                      </>
                    )}
                    no={() => (
                      <ButtonPrimary
                        data-test={READ_ONLY_PERMISSION_CLOSE_BTN}
                        onClick={onClose}
                        buttonLegacy
                      >
                        {i18n.t('I18N_CLOSE', 'Close')}
                      </ButtonPrimary>
                    )}
                  />
                )}
              </AuthContextConsumer>
            </ChangeLogFooter>
          )}
        </AnalyticsContextConsumer>
      }
    />
  );
};
