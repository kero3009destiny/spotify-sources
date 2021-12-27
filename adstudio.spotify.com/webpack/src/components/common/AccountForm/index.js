import React from 'react';
import { Trans } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import debug from 'debug';
import i18n from 'i18next';
import { get, uniq } from 'lodash';
import { compose, withHandlers } from 'recompose';
import { Field, getFormMeta, getFormValues, reduxForm } from 'redux-form';
import styled from 'styled-components';
import { lengthIsLessThanOrEqualTo, withCustomMessage } from 'validators';
import { i18nRequired } from 'validators/i18nRequired';

import { ReduxFormSelectDropdown } from '@spotify-internal/adstudio-shared';
import { industryCategories } from '@spotify-internal/adstudio-shared/lib/config/industries';
import { FormGroup, TooltipInfo } from '@spotify-internal/adstudio-tape';
import { buildErrorObject } from '@spotify-internal/adstudio-web-utils/lib/asyncValidators/errorHelpers';
import { trim } from '@spotify-internal/adstudio-web-utils/lib/normalizers';
import { FormCheckbox, Type } from '@spotify-internal/encore-web';
import { Panel } from '@spotify-internal/encore-web/advertising/components/Panel';

import {
  getById,
  getCountriesByCountryCode,
  getExtendedCountry,
  getGAMarkets,
} from 'ducks/config/selectors';
import {
  getUserEmail,
  getUserFullName,
  getUserImg,
} from 'ducks/user/selectors';
import { getUtm } from 'ducks/utm/selectors';

import Passthrough from 'components/common/Passthrough';
import NormalizeOnBlurInput from 'components/form-common/NormalizeOnBlurInput';
import { TAB_NAMES } from 'components/Signup/constants';

import { validateEmail } from 'api/signup';

import { mapI18N, mapI18Ns } from 'utils/i18nHelpers';
import {
  assignBrowsersCountry,
  buildAllCountryOptions,
  buildCountryOptions,
} from 'utils/regionHelpers';

import ThemedLink from '../ThemedLink';
import AccountFormGlobalStyles from './AccountFormGlobalStyles';

import { ACCOUNT_REDUX_FORM_ID, WORKING_FOR_OPTIONS } from 'config/account';
import {
  DEFAULT_COUNTRY,
  VAT_INFO_MESSAGES,
  VAT_VALIDATORS,
} from 'config/config';
import { routes } from 'config/routes';

import PropTypes from 'prop-types';

const SubscribeStyler = styled.div`
  div:first-child {
    float: left;
  }

  span {
    position: absolute;
    top: 0;
  }
`;

// import UserImage from 'components/common/UserImage';

const log = debug('AccountForm');

/* Constants */
export const COUNTRY_FORM_INPUT_NAME = 'country';
export const FIRST_NAME_FORM_INPUT_NAME = 'firstName';
export const LAST_NAME_FORM_INPUT_NAME = 'lastName';
export const BUSINESS_EMAIL_FORM_INPUT_NAME = 'businessEmail';
export const BUSINESS_NAME_FORM_INPUT_NAME = 'businessName';
export const INDUSTRY_FORM_INPUT_NAME = 'industry';
export const EMAIL_SUBSCRIBE_INPUT_NAME = 'emailSubscribe';
export const VAT_FORM_INPUT_NAME = 'vat';
export const BUSINESS_TYPE_FORM_INPUT_NAME = 'businessType';
export const UTM_FORM_INPUT_NAME = 'utm';
export const INPUTS = [
  COUNTRY_FORM_INPUT_NAME,
  FIRST_NAME_FORM_INPUT_NAME,
  LAST_NAME_FORM_INPUT_NAME,
  BUSINESS_EMAIL_FORM_INPUT_NAME,
  BUSINESS_NAME_FORM_INPUT_NAME,
  INDUSTRY_FORM_INPUT_NAME,
  EMAIL_SUBSCRIBE_INPUT_NAME,
  VAT_FORM_INPUT_NAME,
  BUSINESS_TYPE_FORM_INPUT_NAME,
  UTM_FORM_INPUT_NAME,
];

export const COUNTRY_INPUT_TOOLTIP_CREATE_TEXT = `
  ${i18n.t(
    'I18N_THE_COUNTRY_YOU_CHOOSE_MU',
    "The country you choose must match your billing address. You’ll be billed in this country's currency.",
  )}
`;
export const COUNTRY_INPUT_DESCRIPTION_CREATE_TEXT = `
  ${i18n.t(
    'I18N_YOU_WILL_BE_BILLED_IN_THE',
    'You will be billed in the currency of the country you select. Your billing address must match the country you select.',
  )}
`;

export const COUNTRY_INPUT_TOOLTIP_UPDATE_TEXT = `
  ${i18n.t(
    'I18N_YOU_CANNOT_CHANGE_YOUR_CO',
    'You cannot change your country for your Ad Studio account.',
  )}
`;
export const BUSINESS_EMAIL_FORM_INPUT_TOOLTIP_TEXT = `
  ${i18n.t(
    'I18N_WE_LL_USE_THIS_TO_CONTACT',
    'We’ll use this to contact you about your Ad Studio account.',
  )}
`;
export function getCreateTooltipText(taxName) {
  return i18n.t('I18N_AFTER_YOU_CREATE_YOUR_ACC', {
    taxName,
    defaultValue: `After you create your account, you won't be able to change your ${taxName}.`,
  });
}
export function getEditTooltipText(taxName) {
  return i18n.t('I18N_IF_YOU_NEED_TO_CHANGE_YOU', {
    taxName,
    defaultValue: `If you need to change your ${taxName}, please contact adstudio@spotify.com.`,
  });
}
export const BUSINESS_NAME_FORM_INPUT_CREATE_TOOLTIP_TEXT = `
  ${i18n.t(
    'I18N_ONCE_YOU_CREATE_YOUR_ACCO',
    'Once you create your account, you won’t be able to change your business name.',
  )}
`;
export const INDUSTRY_NAME_FORM_INPUT_CREATE_TOOLTIP_TEXT = `
  ${i18n.t(
    'I18N_AFTER_YOU_CREATE_YOUR_ACC1',
    'After you create your account, you won’t be able to change your industry.',
  )}
`;
export const INDUSTRY_NAME_FORM_INPUT_UPDATE_TOOLTIP_TEXT = `
  ${i18n.t(
    'I18N_IF_YOU_NEED_TO_CHANGE_YOU1',
    'If you need to change your industry, please contact adstudio@spotify.com.',
  )}
`;
const FIRST_NAME_MAX_LENGTH = 30;
const LAST_NAME_MAX_LENGTH = 30;
const BUSINESS_EMAIL_MAX_LENGTH = 254;

// salesforce / finance limitation
const BUSINESS_NAME_MAX_LENGTH = 95;

const VAT_MAX_LENGTH = 100;
const INDUSTRY_MAX_LENGTH = 50;

// Format array of stirngs into array of i18n-ized strings
const bizTypeI18nKey = 'I18N_INDUSTRY_TYPE';
const arrayToOptions = arr =>
  arr.map(v => ({ key: v, value: mapI18N(v, v, bizTypeI18nKey) }));

const businessNameRequired = withCustomMessage(
  i18nRequired,
  i18n.t('I18N_BUSINESS_NAME_REQUIRED', 'Your business name is required.'),
);

const businessTypeRequired = withCustomMessage(
  i18nRequired,
  i18n.t('I18N_BUSINESS_TYPE_REQUIRED', 'Your business type is required.'),
);

const businessEmailRequired = withCustomMessage(
  i18nRequired,
  i18n.t('I18N_BUSINESS_EMAIL_REQUIRED', 'Your business email is required.'),
);

const industryRequired = withCustomMessage(
  i18nRequired,
  i18n.t('I18N_INDUSTRY_REQUIRED', 'Your industry is required.'),
);

const firstNameRequired = withCustomMessage(
  i18nRequired,
  i18n.t('I18N_FIRST_NAME_REQUIRED', 'Your first name is required.'),
);

const lastNameRequired = withCustomMessage(
  i18nRequired,
  i18n.t('I18N_LAST_NAME_REQUIRED', 'Your last name is required.'),
);

const countryRequired = withCustomMessage(
  i18nRequired,
  i18n.t('I18N_COUNTRY_REQUIRED', 'Your country is required.'),
);

/* Main Component */
export const AccountForm = ({
  allowAllCountries,
  showNameFields,
  businessTypeOptions,
  businessEmailInputValue,
  countriesByCountryCode,
  countryList,
  currentCountry,
  countryTermsCode,
  editMode,
  emailSubscribeLabel,
  features,
  onCountryChange,
  onUseSpotifyEmailInputChange,
  regionTaxConfig,
  unsupportedCountrySelected,
  userEmail,
  activeTab,
  hasTabs,
}) => {
  let countrySubDescription;
  let countryOptions;

  const taxCreateTooltip =
    features.vat && getCreateTooltipText(regionTaxConfig.shortName);
  const taxEditTooltip =
    features.vat && getEditTooltipText(regionTaxConfig.shortName);

  if (allowAllCountries) {
    countryOptions = buildAllCountryOptions(
      countryList,
      countriesByCountryCode,
    );
  } else {
    countryOptions = buildCountryOptions(countryList, countriesByCountryCode);
    countrySubDescription = !editMode
      ? COUNTRY_INPUT_DESCRIPTION_CREATE_TEXT
      : null;
  }
  countryOptions = countryOptions.map(({ disabled, key, value }) => {
    return {
      disabled: !!disabled,
      key,
      value: mapI18N(key, value, 'I18N_COUNTRY_NAME'),
    };
  });

  const termsLink = routes.BETA_TERMS;

  let SHOW_LOGIN_INFO;
  let SHOW_BUSINESS_INFO;

  if (!hasTabs) {
    SHOW_LOGIN_INFO = true;
    SHOW_BUSINESS_INFO = true;
  } else {
    SHOW_LOGIN_INFO = activeTab === TAB_NAMES.LOGIN_INFO;
    SHOW_BUSINESS_INFO = activeTab === TAB_NAMES.BUSINESS_INFO;
  }

  const InfoText = regionTaxConfig.infoText; // Capitalize to become a proper JSX element (if available)

  const mappedIndustryCategories = mapI18Ns(
    industryCategories.map(category => {
      return {
        id: category.key,
        value: category.value,
      };
    }),
    'I18N_INDUSTRY_ENTRY',
  );

  // Format array of i18n-ized strings into options array (key: value pairs)
  const bizTypeOptions = arrayToOptions(businessTypeOptions);

  return (
    <>
      <AccountFormGlobalStyles />
      <div className="account-form">
        {SHOW_LOGIN_INFO && (
          <>
            {showNameFields && (
              <div className="row">
                <div className="first-name-input col-sm-6">
                  <Field
                    name={FIRST_NAME_FORM_INPUT_NAME}
                    data-test={`account-${FIRST_NAME_FORM_INPUT_NAME}`}
                    component={NormalizeOnBlurInput}
                    label={i18n.t('I18N_FIRST_NAME', 'First name')}
                    validate={[
                      firstNameRequired,
                      lengthIsLessThanOrEqualTo(FIRST_NAME_MAX_LENGTH),
                    ]}
                    normalizeFunction={trim}
                  />
                </div>
                <div className="last-name-input col-sm-6">
                  <Field
                    name={LAST_NAME_FORM_INPUT_NAME}
                    data-test={`account-${LAST_NAME_FORM_INPUT_NAME}`}
                    component={NormalizeOnBlurInput}
                    label={i18n.t('I18N_LAST_NAME', 'Last name')}
                    validate={[
                      lastNameRequired,
                      lengthIsLessThanOrEqualTo(LAST_NAME_MAX_LENGTH),
                    ]}
                    normalizeFunction={trim}
                  />
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-sm-12">
                <Field
                  type="email"
                  name={BUSINESS_EMAIL_FORM_INPUT_NAME}
                  data-test={`account-${BUSINESS_EMAIL_FORM_INPUT_NAME}`}
                  component={NormalizeOnBlurInput}
                  label={i18n.t('I18N_BUSINESS_EMAIL1', 'Business email')}
                  validate={[
                    businessEmailRequired,
                    lengthIsLessThanOrEqualTo(BUSINESS_EMAIL_MAX_LENGTH),
                  ]}
                  normalizeFunction={trim}
                  subDescription={BUSINESS_EMAIL_FORM_INPUT_TOOLTIP_TEXT}
                />
                {userEmail && (
                  <div className="use-spotify-email checkbox">
                    <label className="use-spotify-email-input-label">
                      <input
                        checked={businessEmailInputValue === userEmail}
                        id="use-spotify-email"
                        data-test="account-useSpotifyEmail"
                        name="useSpotifyEmail"
                        type="checkbox"
                        onChange={onUseSpotifyEmailInputChange}
                      />
                      {i18n.t(
                        'I18N_SAME_AS_MY_SPOTIFY_ACCOUN',
                        'Same as my Spotify Account',
                      )}
                      <span className="control-indicator" />
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Field
                  disabled={editMode || countryList.length <= 1}
                  name={COUNTRY_FORM_INPUT_NAME}
                  data-test={`account-${COUNTRY_FORM_INPUT_NAME}`}
                  label={
                    <TooltipInfo
                      placement="right"
                      tooltipText={
                        editMode
                          ? COUNTRY_INPUT_TOOLTIP_UPDATE_TEXT
                          : COUNTRY_INPUT_TOOLTIP_CREATE_TEXT
                      }
                    >
                      {i18n.t('I18N_COUNTRY', 'Country')}
                    </TooltipInfo>
                  }
                  component={ReduxFormSelectDropdown}
                  options={countryOptions}
                  placeholder={i18n.t('I18N_CHOOSE', 'Choose')}
                  validate={[countryRequired]}
                  subDescription={countrySubDescription}
                  onChange={!editMode ? onCountryChange : null}
                />
              </div>
            </div>
            {currentCountry && !unsupportedCountrySelected && (
              <div className="row">
                <div className="col-sm-12 email-option-label-container">
                  <FormGroup>
                    <label htmlFor={EMAIL_SUBSCRIBE_INPUT_NAME}>
                      <SubscribeStyler>
                        <Field
                          id={EMAIL_SUBSCRIBE_INPUT_NAME}
                          name={EMAIL_SUBSCRIBE_INPUT_NAME}
                          data-test={`account-${EMAIL_SUBSCRIBE_INPUT_NAME}`}
                          component={FormCheckbox}
                          type="checkbox"
                          className="email-option-checkbox"
                        />
                        <ReactMarkdown
                          className="email-option-label"
                          source={emailSubscribeLabel}
                          /* eslint-disable react/prop-types */
                          renderers={{
                            paragraph: ({ children }) => (
                              <Passthrough>
                                <Type.p variant={Type.body3} weight={Type.book}>
                                  {children}
                                </Type.p>
                              </Passthrough>
                            ),
                          }}

                          /* eslint-enable react/prop-types */
                        />
                      </SubscribeStyler>
                    </label>
                  </FormGroup>
                </div>
              </div>
            )}
            {unsupportedCountrySelected && (
              <Panel className="legal-panel" flush>
                <Type.p variant={Type.body3} weight={Type.book} condensed>
                  <Trans i18nKey="I18N_WE_MAY_USE_THIS_INFORMATI">
                    We may use this information to communicate with you about Ad
                    Studio. See our
                    <ThemedLink href={termsLink} target="_blank">
                      Privacy Policy
                    </ThemedLink>{' '}
                    for more information about Spotify's collection and use of
                    personal data.
                  </Trans>
                </Type.p>
              </Panel>
            )}
          </>
        )}
        {SHOW_BUSINESS_INFO && (
          <>
            <div className="row">
              <div className="col-sm-12">
                <Field
                  name={BUSINESS_NAME_FORM_INPUT_NAME}
                  data-test={`account-${BUSINESS_NAME_FORM_INPUT_NAME}`}
                  component={NormalizeOnBlurInput}
                  label={
                    editMode ? (
                      i18n.t('I18N_BUSINESS_NAME', 'Business name')
                    ) : (
                      <TooltipInfo
                        placement="right"
                        tooltipText={
                          BUSINESS_NAME_FORM_INPUT_CREATE_TOOLTIP_TEXT
                        }
                      >
                        {i18n.t('I18N_BUSINESS_NAME', 'Business name')}
                      </TooltipInfo>
                    )
                  }
                  validate={[
                    businessNameRequired,
                    lengthIsLessThanOrEqualTo(BUSINESS_NAME_MAX_LENGTH),
                  ]}
                  disabled={editMode}
                  normalizeFunction={trim}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <Field
                  border={false}
                  disabled={editMode}
                  component={ReduxFormSelectDropdown}
                  data-test={`account-${BUSINESS_TYPE_FORM_INPUT_NAME}`}
                  label={i18n.t('I18N_BUSINESS_TYPE', 'Business type')}
                  name={BUSINESS_TYPE_FORM_INPUT_NAME}
                  options={bizTypeOptions}
                  placeholder={i18n.t('I18N_CHOOSE', 'Choose')}
                  responsePlaceholder={i18n.t(
                    'I18N_ENTER_BUSINESS_TYPE',
                    'Enter business type',
                  )}
                  validate={[businessTypeRequired]}
                  normalize={trim}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <Field
                  disabled={editMode}
                  name={INDUSTRY_FORM_INPUT_NAME}
                  data-test={`account-${INDUSTRY_FORM_INPUT_NAME}`}
                  component={ReduxFormSelectDropdown}
                  label={
                    <TooltipInfo
                      placement="right"
                      tooltipText={
                        editMode
                          ? INDUSTRY_NAME_FORM_INPUT_UPDATE_TOOLTIP_TEXT
                          : INDUSTRY_NAME_FORM_INPUT_CREATE_TOOLTIP_TEXT
                      }
                    >
                      {i18n.t('I18N_INDUSTRY', 'Industry')}
                    </TooltipInfo>
                  }
                  placeholder={i18n.t('I18N_CHOOSE', 'Choose')}
                  responsePlaceholder={i18n.t(
                    'I18N_ENTER_INDUSTRY',
                    'Enter industry',
                  )}
                  options={mappedIndustryCategories}
                  validate={[
                    industryRequired,
                    lengthIsLessThanOrEqualTo(INDUSTRY_MAX_LENGTH),
                  ]}
                  normalize={trim}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

AccountForm.defaultProps = {
  allowAllCountries: false,
  userEmail: '',
};

AccountForm.propTypes = {
  allowAllCountries: PropTypes.bool,
  showNameFields: PropTypes.bool,
  businessTypeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  businessEmailInputValue: PropTypes.string,
  children: PropTypes.array.isRequired,
  change: PropTypes.func.isRequired,
  countriesByCountryCode: PropTypes.object,
  countryList: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentCountry: PropTypes.string.isRequired,
  countryTermsCode: PropTypes.string,
  editMode: PropTypes.bool,
  emailSubscribeLabel: PropTypes.string,
  features: PropTypes.objectOf(PropTypes.bool),
  isCountrySelectedCheckedByDefault: PropTypes.func,
  meta: PropTypes.objectOf(PropTypes.object),
  onCountryChange: PropTypes.func.isRequired,
  onUseSpotifyEmailInputChange: PropTypes.func.isRequired,
  regionTaxConfig: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    shortName: PropTypes.string.isRequired,
    validator: PropTypes.func,
    infoText: PropTypes.component,
  }),
  activeTab: PropTypes.string,
  unsupportedCountrySelected: PropTypes.bool,
  userEmail: PropTypes.string,
  hasTabs: PropTypes.bool,
  shouldShowVatInfo: PropTypes.function,
  shouldShowBusinessEmailInfo: PropTypes.function,
};

const getAccountFormValues = getFormValues(ACCOUNT_REDUX_FORM_ID);
const getAccountFormMeta = getFormMeta(ACCOUNT_REDUX_FORM_ID);

export const handlers = {
  onCountryChange: props => event => {
    const { change, meta = {} } = props;
    const hasEmailSubscribeBeenTouched = get(
      meta,
      `${EMAIL_SUBSCRIBE_INPUT_NAME}.touched`,
      false,
    );

    if (!hasEmailSubscribeBeenTouched) {
      change(
        EMAIL_SUBSCRIBE_INPUT_NAME,
        props.isCountrySelectedCheckedByDefault(event.target.value),
      );
    }
  },
  onUseSpotifyEmailInputChange: props => event => {
    const { userEmail, change } = props;
    const emailInputValue = event.target.checked ? userEmail : '';
    change(BUSINESS_EMAIL_FORM_INPUT_NAME, emailInputValue);
  },
};

function mapStateToProps(state, ownProps) {
  const initialValues = {
    [UTM_FORM_INPUT_NAME]: getUtm(state),
    ...ownProps.initialValues,
  };

  const countriesByCountryCode = getCountriesByCountryCode(state);
  const ALL_COUNTRY_CODES = Object.keys(countriesByCountryCode);

  // try and guess the browser's country, unless we are in editMode (on the account details page)
  if (!initialValues[COUNTRY_FORM_INPUT_NAME] && !ownProps.editMode) {
    initialValues[COUNTRY_FORM_INPUT_NAME] = assignBrowsersCountry();
  }
  // drop the country initial value if it is not supported.
  const initialCountry = initialValues[COUNTRY_FORM_INPUT_NAME];
  if (initialCountry && !ALL_COUNTRY_CODES.includes(initialCountry)) {
    initialValues[COUNTRY_FORM_INPUT_NAME] = DEFAULT_COUNTRY;
  }

  const currentCountry = (getAccountFormValues(state) || {})[
    COUNTRY_FORM_INPUT_NAME
  ];

  const currentCountryConfig = getExtendedCountry(state, currentCountry);

  const countryTermsCode = get(
    currentCountryConfig,
    'rules.terms',
    DEFAULT_COUNTRY,
  ).toLowerCase();

  let countryList = getGAMarkets(state).map(country => country.id);
  if (initialValues[COUNTRY_FORM_INPUT_NAME]) {
    countryList = uniq(
      countryList.concat([initialValues[COUNTRY_FORM_INPUT_NAME]]),
    );
  }
  if (countryList.length === 0) {
    countryList = [DEFAULT_COUNTRY];
  }

  let businessTypeOptions = WORKING_FOR_OPTIONS;
  if (initialValues[BUSINESS_TYPE_FORM_INPUT_NAME]) {
    businessTypeOptions = uniq(
      businessTypeOptions.concat([
        initialValues[BUSINESS_TYPE_FORM_INPUT_NAME],
      ]),
    );
  }

  const hasRegionTax = !!get(currentCountryConfig, 'rules.validatorVAT', false);
  const configI18Ns = {
    displayName: get(currentCountryConfig, 'strings.displayNameVAT'),
    emailSubscribe: get(currentCountryConfig, 'strings.emailSubscribe'),
    shortName: get(currentCountryConfig, 'strings.shortNameVAT'),
  };
  const regionTaxConfig = {
    displayName: i18n.t(
      get(configI18Ns, 'displayName.key'),
      get(configI18Ns, 'displayName.defaultValue'),
    ),
    shortName: i18n.t(
      get(configI18Ns, 'shortName.key'),
      get(configI18Ns, 'shortName.defaultValue'),
    ),
    require: get(currentCountryConfig, 'vatNumberRequired', false),
    validator:
      VAT_VALIDATORS[get(currentCountryConfig, 'rules.validatorVAT')] ||
      (() => {}),
    infoText:
      VAT_INFO_MESSAGES[get(currentCountryConfig, 'rules.infoVAT')] ||
      (() => <></>),
  };

  const isCountrySelectedCheckedByDefault = countryValue =>
    get(getById(state, countryValue), 'rules.selectByDefault', false);

  const emailSubscribeLabel = i18n.t(
    get(configI18Ns, 'emailSubscribe.key'),
    get(configI18Ns, 'emailSubscribe.defaultValue'),
  );

  return {
    businessTypeOptions,
    currentCountry,
    countriesByCountryCode,
    countryList,
    emailSubscribeLabel,
    features: {
      vat: hasRegionTax,
    },
    countryTermsCode,
    initialValues,
    isCountrySelectedCheckedByDefault,
    meta: getAccountFormMeta(state),
    regionTaxConfig,
    unsupportedCountrySelected:
      currentCountry && !countryList.includes(currentCountry),
    userImg: getUserImg(state),
    userFullName: getUserFullName(state),
    userEmail: getUserEmail(state),
  };
}

export async function asyncValidate(values) {
  const email = values[BUSINESS_EMAIL_FORM_INPUT_NAME];
  if (!!email) {
    let resp;
    try {
      resp = await validateEmail(email);
    } catch (err) {
      log('failed to validate email. marking email as valid');
      return;
    }

    const { isValid } = resp;
    if (!isValid) {
      throw buildErrorObject(
        BUSINESS_EMAIL_FORM_INPUT_NAME,
        undefined,
        i18n.t(
          'I18N_PLEASE_ENTER_A_VALID_EMAI',
          'Please enter a valid email address.',
        ),
      );
    }
  }
}

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: ACCOUNT_REDUX_FORM_ID,
    asyncBlurFields: [BUSINESS_EMAIL_FORM_INPUT_NAME],
    asyncValidate,
    normalizeOnBlur: true,
  }),

  withHandlers(handlers),
)(AccountForm);
