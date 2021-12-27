import React from 'react';
import { Trans } from 'react-i18next';
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import i18n from 'i18next';
import moment from 'moment';

import { plum } from '@spotify-internal/encore-advertising-web/cjs/styles/colors';
import { black, gray30, gray50, gray80 } from '@spotify-internal/encore-web';

import { Account } from 'ducks/account/types';

import advertisingLogo from './advertisingLogo.png';

import { ChangeLog } from 'types/common/state/api/bulksheets';

Font.register({
  family: 'spotify-circular',
  fonts: [
    { src: 'https://open.scdn.co/fonts/CircularSpUIv3T-Book.ttf' },
    {
      fontWeight: 700,
      src: 'https://open.scdn.co/fonts/CircularSpUIv3T-Bold.ttf',
    },
  ],
});
const termsAndConditionsLink =
  'https://www.spotify.com/us/brands/legal/advertiser-terms-and-conditions/';
const largeFont = '10pt';
const smallFont = '8pt';
const styles = StyleSheet.create({
  base: {
    padding: '32pt',
    fontFamily: 'spotify-circular',
    lineHeight: '2pt',
  },
  logo: {
    marginBottom: '24pt',
    width: '110pt',
  },
  subHeading: {
    fontWeight: 700,
    fontSize: largeFont,
    color: black,
    margin: '8pt 0',
  },
  columns: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexShrink: 0,
  },
  leftColumn: { flex: 1, marginRight: '16pt' },
  rightColumn: { flex: 1, marginLeft: '16pt' },
  property: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    fontSize: smallFont,
    flexShrink: 0,
  },
  propertyType: {
    fontWeight: 700,
    color: black,
  },
  propertyValue: {
    fontWeight: 'normal',
    color: gray30,
  },
  divider: {
    margin: '16pt 0 8pt',
    borderBottom: `1pt solid ${gray80}`,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  entitySection: {
    margin: '8pt 0',
  },
  entityHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    margin: '8pt 0',
  },
  entityName: {
    fontSize: largeFont,
    color: plum,
    fontWeight: 700,
    marginRight: '4pt',
  },
  entityAction: {
    color: gray30,
    fontSize: largeFont,
  },
  footer: {
    color: gray50,
    fontSize: smallFont,
  },
  termsLink: {
    color: plum,
    textDecoration: 'underline',
  },
});

interface PdfProps {
  bulkSheetId: string;
  account: Account;
  changeLog: ChangeLog;
  isInvoiceUser: boolean;
}

export const buildPdf = ({
  bulkSheetId,
  account,
  changeLog,
  isInvoiceUser,
}: PdfProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.base}>
        <View style={styles.logo}>
          <Image src={advertisingLogo} />
        </View>

        <View style={styles.subHeading}>
          <Text>
            {i18n.t('I18N_BULKSHEETS_PDF_BULK_CHANGES_FOR', {
              defaultValue: `Bulk changes for ${account.businessName}`,
              accountName: account.businessName,
            })}
          </Text>
        </View>

        <View style={styles.columns}>
          <View style={styles.leftColumn}>
            <View style={styles.property}>
              <Text style={styles.propertyType}>
                {i18n.t('I18N_BULKSHEETS_PDF_ORDER_NUMBER', 'Order number')}
              </Text>
              <Text style={styles.propertyValue}>{bulkSheetId}</Text>
            </View>
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.property}>
              <Text style={styles.propertyType}>
                {i18n.t(
                  'I18N_BULKSHEETS_PDF_DATE_OF_CHANGES',
                  'Date of changes',
                )}
              </Text>
              <Text style={styles.propertyValue}>{moment().format('ll')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.subHeading}>
          <Text>
            {i18n.t(
              'I18N_BULKSHEETS_PDF_BILLING_INFORMATION',
              'Billing Information',
            )}
          </Text>
        </View>

        <View style={styles.columns}>
          <View style={styles.leftColumn}>
            <View style={styles.property}>
              <Text style={styles.propertyType}>
                {i18n.t('I18N_BULKSHEETS_PDF_PAYMENT_TERMS', 'Payment terms')}
              </Text>
              <Text style={styles.propertyValue}>
                {isInvoiceUser
                  ? i18n.t('I18N_FORTY_FIVE_DAYS', '45 days')
                  : i18n.t('I18N_NA', 'N/A')}
              </Text>
            </View>
            <View style={styles.property}>
              <Text style={styles.propertyType}>
                {i18n.t('I18N_BULKSHEETS_PDF_BILLING_EMAIL', 'Billing email')}
              </Text>
              <Text style={styles.propertyValue}>{account.businessEmail}</Text>
            </View>
            <View style={styles.property}>
              <Text style={styles.propertyType}>
                {i18n.t('I18N_BULKSHEETS_PDF_BILLING_STREET', 'Billing street')}
              </Text>
              <Text style={styles.propertyValue}>
                {account.businessAddress?.street}
              </Text>
            </View>
            <View style={styles.property}>
              <Text style={styles.propertyType}>
                {i18n.t('I18N_BULKSHEETS_PDF_BILLING_CITY', 'Billing city')}
              </Text>
              <Text style={styles.propertyValue}>
                {account.businessAddress?.city}
              </Text>
            </View>
          </View>
          <View style={styles.rightColumn}>
            <View style={styles.property}>
              <Text style={styles.propertyType}>
                {i18n.t('I18N_BULKSHEETS_PDF_BILLING_STATE', 'Billing state')}
              </Text>
              <Text style={styles.propertyValue}>
                {account.businessAddress?.region}
              </Text>
            </View>
            <View style={styles.property}>
              <Text style={styles.propertyType}>
                {i18n.t('I18N_BULKSHEETS_PDF_BILLING_POSTAL', 'Billing postal')}
              </Text>
              <Text style={styles.propertyValue}>
                {account.businessAddress?.postalCode}
              </Text>
            </View>
            <View style={styles.property}>
              <Text style={styles.propertyType}>
                {i18n.t(
                  'I18N_BULKSHEETS_PDF_BILLING_COUNTRY',
                  'Billing country',
                )}
              </Text>
              <Text style={styles.propertyValue}>{account.country}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {changeLog.diffMessages.map((diffMessage, idx) => (
          <View style={styles.entitySection} key={`bulksheet-pdf-${idx}`}>
            <View style={styles.entityHeading}>
              <Text style={styles.entityName}>{diffMessage.name!}:</Text>
              <Text style={styles.entityAction}>
                {diffMessage.action === 'EDIT'
                  ? i18n.t('I18N_BULKSHEETS_PDF_EDITED_ACTION', 'Edited')
                  : i18n.t('I18N_BULKSHEETS_PDF_NEW_ACTION', 'New')}
              </Text>
            </View>

            <View style={styles.columns}>
              <View style={styles.leftColumn}>
                {diffMessage.diffList.map(diff => (
                  <View style={styles.property}>
                    <Text style={styles.propertyType}>{diff.fieldName}</Text>
                    <Text style={styles.propertyValue}>{diff.newValue}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.rightColumn} />
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text>
            <Trans i18nKey="I18N_BULKSHEETS_PDF_LEGAL_FOOTER">
              Your order is subject to the Spotify Ad Studio Terms and
              Conditions as such terms now exist or may be updated in the
              future. All purchases are final and non-refundable.
            </Trans>{' '}
            <Text style={styles.termsLink}>{termsAndConditionsLink}</Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
};
