import React from 'react';
import { Trans } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from 'i18next';
import styled from 'styled-components';

import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import {
  addColorSet,
  Backdrop,
  DialogConfirmation,
  gray70,
  gray95,
  IconExclamationAlt,
  semanticColors,
  spacer4,
  spacer8,
  spacer16,
  spacer20,
  spacer32,
  Table,
  TableCell,
  TableContainer,
  TableHeaderCell,
  TableRow,
  Type,
} from '@spotify-internal/encore-web';
import { IconCreditCard } from '@spotify-internal/encore-web/advertising/icons/IconCreditCard';

import {
  accountIsGreylisted as accountIsGreylistedSelector,
  getAccount,
} from 'ducks/account/selectors';

import ConditionalRedirect from 'components/Redirects/ConditionalRedirect';

import {
  EXTERNAL_FAQ_ADDRESS,
  routeFragmentLiterals,
  routes,
} from 'config/routes';

const Centered = styled.section`
  text-align: center;
  width: 100%;
`;

const SkeletonContainer = styled.div`
  padding: ${spacer32};
`;

const StyledP = styled(Type.p)`
  margin: ${spacer8} 0 ${spacer16} 0;
  padding-bottom: ${spacer4};
`;

const StyledH2 = styled(Type.h2)`
  margin: ${spacer8} 0 ${spacer16} 0;
  padding-bottom: ${spacer4};
`;

const StyledH4 = styled(Type.h4)`
  margin: ${spacer4} 0;
`;

const GreyLink = styled.a`
  color: ${gray70};
  text-decoration: underline;
`;

const StyledButton = styled(ButtonPrimary)`
  margin-left: 0 !important;
`;

const StyledCreditCard = styled(IconCreditCard)`
  margin-top: ${spacer20};
`;

const FillerRectangle = styled.div`
  background-color: ${gray95};
  height: 36px;
  margin-right: 36px;
  margin-top: 5px;
  width: 100%;
`;

const WideTableCell = styled(TableCell)`
  width: 375px;
`;

const FAQ =
  EXTERNAL_FAQ_ADDRESS[i18n.language]?.BILLING ||
  EXTERNAL_FAQ_ADDRESS.en_US.BILLING;

const SkeletonComponent = () => {
  return (
    <SkeletonContainer>
      <StyledH2
        variant={Type.heading2}
        semanticColor={semanticColors.textSubdued}
      >
        {i18n.t('I18N_YOUR_ADS1', 'Your Ads')}
      </StyledH2>
      <TableContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeaderCell>
                {i18n.t('I18N_AD_NAME1', 'Ad Name')}
              </TableHeaderCell>
              <TableHeaderCell>
                {i18n.t('I18N_STATUS', 'Status')}
              </TableHeaderCell>
              <TableHeaderCell>
                {i18n.t('I18N_BUDGET', 'Budget')}
              </TableHeaderCell>
              <TableHeaderCell>
                {i18n.t('I18N_ADS_SERVED1', 'Ads Served')}
              </TableHeaderCell>
              <TableHeaderCell>{i18n.t('I18N_REACH', 'Reach')}</TableHeaderCell>
              <TableHeaderCell>
                {i18n.t('I18N_START_DATE2', 'Start Date')}
              </TableHeaderCell>
              <TableHeaderCell>
                {i18n.t('I18N_END_DATE2', 'End Date')}
              </TableHeaderCell>
            </TableRow>
          </thead>
          <tbody>
            {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).map(row => (
              <TableRow key={`table-row-${row}`}>
                {Array.of(1, 2, 3, 4, 5, 6, 7).map(col => {
                  if (col === 1) {
                    return (
                      <WideTableCell key={`table-cell-${col}`}>
                        <FillerRectangle />
                      </WideTableCell>
                    );
                  }
                  return (
                    <TableCell key={`table-cell-${col}`}>
                      <FillerRectangle />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </SkeletonContainer>
  );
};

export const GreylistedPage = () => {
  const adAccount = useSelector(getAccount);
  const accountIsGreylisted = useSelector(accountIsGreylistedSelector);

  return (
    <ConditionalRedirect
      redirectUrl={routes.CAMPAIGN_CATALOGUE.replace(
        routeFragmentLiterals.ACCOUNT_ID,
        adAccount.id,
      )}
      shouldRedirect={!accountIsGreylisted}
    >
      <SkeletonComponent />
      <Backdrop center>
        <DialogConfirmation
          className={addColorSet('base')}
          body={
            <Centered>
              {adAccount.adAccountStatus.reason === 'FAILED_PAYMENT' && (
                <>
                  <StyledCreditCard
                    iconSize={64}
                    semanticColor={semanticColors.textBase}
                  />
                  <StyledH4 variant={Type.heading4} condensed>
                    {i18n.t(
                      'I18N_THERE_WAS_A_PROBLEM_WITH',
                      'There was a problem with your payment',
                    )}
                  </StyledH4>
                  <StyledP
                    semanticColor={semanticColors.textSubdued}
                    variant={Type.body2}
                  >
                    {i18n.t(
                      'I18N_YOUR_ADS_HAVE_BEEN_PAUSED',
                      'Your ads have been paused due to a failed payment. To continue using Ad Studio, please update your payment details. It will take up to two days for us to review your updated information.',
                    )}{' '}
                    <br />
                    {i18n.t(
                      'I18N_AS_A_FIRST_STEP_WE_SUGGE',
                      'As a first step, we suggest contacting your bank to inquire about your failed payment.',
                    )}
                  </StyledP>
                  <StyledP
                    semanticColor={semanticColors.textSubdued}
                    variant={Type.body2}
                  >
                    <Trans i18nKey="I18N_TO_LEARN_MORE_VISIT_OUR1">
                      To learn more,{' '}
                      <GreyLink href={FAQ}>visit our FAQ</GreyLink>.
                    </Trans>
                  </StyledP>
                </>
              )}

              {adAccount.adAccountStatus.reason !== 'FAILED_PAYMENT' && (
                <>
                  <IconExclamationAlt
                    iconSize={64}
                    semanticColor={semanticColors.textBase}
                  />
                  <StyledH4 variant={Type.heading4} condensed>
                    {i18n.t(
                      'I18N_THERE_WAS_A_PROBLEM_WITH1',
                      'There was a problem with your account',
                    )}
                  </StyledH4>
                  <StyledP
                    semanticColor={semanticColors.textSubdued}
                    variant={Type.body2}
                  >
                    {i18n.t(
                      'I18N_YOUR_ADS_HAVE_BEEN_STOPPE',
                      'Your ads have been stopped.',
                    )}
                    <br />
                    {i18n.t(
                      'I18N_PLEASE_REACH_OUT_TO_OUR_S',
                      'Please reach out to our support team.',
                    )}
                  </StyledP>
                </>
              )}
            </Centered>
          }
          footer={
            <Centered>
              {adAccount.adAccountStatus.reason === 'FAILED_PAYMENT' && (
                <StyledButton
                  href={routes.ACCOUNT_SETTINGS_ADACCOUNT.replace(
                    routeFragmentLiterals.ACCOUNT_ID,
                    adAccount.id,
                  )}
                  buttonLegacy
                >
                  {i18n.t(
                    'I18N_UPDATE_PAYMENT_DETAILS',
                    'Update Payment Details',
                  )}
                </StyledButton>
              )}

              {adAccount.adAccountStatus.reason !== 'FAILED_PAYMENT' && (
                <StyledButton
                  href="https://adstudio.spotify.com/contact-us"
                  buttonLegacy
                >
                  {i18n.t('I18N_CONTACT_SUPPORT', 'Contact Support')}
                </StyledButton>
              )}
            </Centered>
          }
        />
      </Backdrop>
    </ConditionalRedirect>
  );
};

export default GreylistedPage;
