import i18n from 'i18next';

export const MIN_BUDGET = 250;
export const MIN_PODCAST_BUDGET = MIN_BUDGET * 2;
export const MAX_BUDGET = 25000;
export const INVOICE_MAX_BUDGET = 500000;
export const TOTAL_BUDGETS = [1000, 2500, 5000];
export const INITIAL_BUDGET = 1000;

export const DEFAULT_BUDGET_THRESHOLDS = {
  invoiceBudget: INVOICE_MAX_BUDGET,
  minBudget: MIN_BUDGET,
  minPodcastBudget: MIN_PODCAST_BUDGET,
  maxBudget: MAX_BUDGET,
  premiumBudget: MAX_BUDGET,
};

// Useful for production testing so that we don't have to get charged large amounts
// Note: String to avoid float representation issues
export const EASTER_EGG_BUDGET = '0.03';

export const DEFAULT_ERROR_MESSAGE = i18n.t(
  'I18N_CONTACT_ADSTUDIO_SPOTIFY',
  "Contact adstudio@spotify.com if you're having trouble.",
);

export {
  DETAILS_CARD,
  DETAILS_INVOICE,
  DETAILS_TYPES,
} from '@spotify-internal/adstudio-tape/lib/components/PaymentDetails/constants';

export const CHECKOUT_ID_URL_PARAM = 'checkoutId';
export const CHECKOUT_RETURN_STATUS_PARAM = 'returnStatus';
export const CHECKOUT_RETURN_STATUS_SUCCESS = 'SUCCESS';

export const DEFAULT_CREATE_CHECKOUT_ERROR = i18n.t(
  'I18N_WE_WEREN_T_ABLE_TO_REDIRE',
  "We weren't able to redirect you to our payment system.",
);

export const DEFAULT_FETCH_DETAILS_ERROR = i18n.t(
  'I18N_WE_WEREN_T_ABLE_TO_RETRIE',
  "We weren't able to retrieve your payment details.",
);

export const DEFAULT_ADD_CARD_TEXT = i18n.t(
  'I18N_ADD_YOUR_CARD_TO_CONT',
  'Add your card to continue.',
);
export const DEFAULT_ADD_CARD_SUBTEXT = i18n.t(
  'I18N_YOU_LL_BE_REDIRECTED',
  "You'll be redirected to a new page. Your work will be saved.",
);
export const DEFAULT_ADD_CARD_CTA_TEXT = i18n.t('I18N_ADD_CARD', 'Add card');
export const DEFAULT_ADD_CARD_DESCRIPTION = i18n.t(
  'I18N_PAYMENT_METHOD_MUST_BE_FR',
  'Payment method must be from the same country as your account.',
);

export const DEFAULT_CARD_CTA_TEXT = i18n.t('I18N_UPDATE', 'Update');

export const DEFAULT_CARD_DESCRIPTION = i18n.t(
  'I18N_WE_LL_CHARGE_YOUR_CREDIT',
  'We’ll charge your credit card at the end of each month or when your ad spend reaches a given [billing threshold](https://adstudio.spotify.com/help/billing-cycle) across all your campaigns.',
);

export const DEFAULT_CARD_DESCRIPTION_SUB = i18n.t(
  'I18N_NOTE_ONLY_ONE_CREDIT_CARD',
  '**Note:** only one credit card can be kept on file for billing.',
);

export const DEFAULT_INVOICE_TEXT = i18n.t(
  'I18N_YOU_HAVE_INVOICING_SET_UP',
  'You have invoicing set up.',
);
export const DEFAULT_INVOICE_DESCRIPTION = i18n.t(
  'I18N_IF_YOU_HAVE_QUESTIONS_ABO',
  'If you have questions about billing, visit our FAQ or please email us at [adstudio@spotify.com](mailto:adstudio@spotify.com)',
);

export const DEFAULT_REDIRECTING_CTA_TEXT = i18n.t(
  'I18N_REDIRECTING',
  'Redirecting',
);
export const DEFAULT_ERROR_HELP_TEXT = i18n.t(
  'I18N_CONTACT_IF_YOU_RE_HAVING',
  "Contact [adstudio@spotify.com](mailto:adstudio@spotify.com) if you're having trouble.",
);

export const DEFAULT_RETRY_TEXT = i18n.t('I18N_RETRY', 'Retry');

export const DEFAULT_CARD_SUCCESS_TEXT = i18n.t(
  'I18N_CARD_SAVED',
  'Card saved',
);

export const DEFAULT_CANNOT_ADD_CARD_SUBTEXT = i18n.t(
  'I18N_VIEWERS_AREN_T_PERMITTED1',
  "Viewers aren't permitted to add a payment method. Please contact your Admin.",
);

export const DEFAULT_NONE_TEXT = i18n.t('I18N_NO_PO_NUMBER', 'none');
export const DEFAULT_PO_NUMBER_TEXT = i18n.t('I18N_PO_NUMBER', 'PO number');

export const PAYMENT_STRINGS = {
  addCardCTAtext: DEFAULT_ADD_CARD_CTA_TEXT,
  addCardDescription: DEFAULT_ADD_CARD_DESCRIPTION,
  addCardSubtext: DEFAULT_ADD_CARD_SUBTEXT,
  addCardText: `**${DEFAULT_ADD_CARD_TEXT}**`, // Markdown
  cardCTAtext: DEFAULT_CARD_CTA_TEXT,
  cardDescription: DEFAULT_CARD_DESCRIPTION,
  cardDescriptionSubtext: DEFAULT_CARD_DESCRIPTION_SUB,
  cardSuccessText: DEFAULT_CARD_SUCCESS_TEXT,
  errorHelpText: DEFAULT_ERROR_HELP_TEXT,
  invoiceDescription: DEFAULT_INVOICE_DESCRIPTION,
  invoiceText: DEFAULT_INVOICE_TEXT,
  noPONumberText: DEFAULT_NONE_TEXT,
  poNumberText: DEFAULT_PO_NUMBER_TEXT,
  retryText: DEFAULT_RETRY_TEXT,
  redirectingCTAtext: DEFAULT_REDIRECTING_CTA_TEXT,
  viewOnlySubText: DEFAULT_CANNOT_ADD_CARD_SUBTEXT,
};
