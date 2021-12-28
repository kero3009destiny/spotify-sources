import React, { useState, useEffect, useMemo, useRef } from 'react';
import getConfig from 'next/config';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import kebabCase from 'lodash/kebabCase';

import { useAppContext } from 'contexts/app-context';
import { Dropdown } from 'components/atoms';
import { CountryField } from 'components/molecules';
import { ICONS } from 'constants/icons';
import { CAPTCHA_VALIDATE } from 'constants/urls';
import { locales } from 'i18n/config';
import { useTranslation } from 'i18n/nexti18n';
import { validationNames } from 'utils/form-validation';
import { objectToFormData } from 'utils/object-to-form-data';
import {
  eventTrack,
  getUtmInfo,
  getGaInfo,
  CONTACT_FORM_SUCCESS,
  CONTACT_FORM_ERROR,
} from 'utils/google-tag-manager';
import { sanitizeUserInput } from 'utils/sanitize-user-input';
import DNBVisitorIntelligenceFormFill from 'utils/dnb-visitor-intelligence-form-fill';

import LOCALE_COUNTRIES from 'constants/localeCountries';
import * as Styled from './ContactForm.styled';
import { dropdownsData } from './ContactForm.data';

const { publicRuntimeConfig } = getConfig() || {};

const FORM_ENPOINT = 'https://go.pardot.com/l/52662/2020-03-09/kp4w1h';

/**
 * Creates the payload needed for the endpoint using the form data
 * @param {Array} dropdowns Form dropdowns
 * @param {object} inputs Form inputs
 * @param {boolean} visibleState Flag to add state value
 * @param {boolean} validCaptcha Flag to check submissions from a human source
 * @returns {string} String payload
 */
const getPayload = (dropdowns, inputs, visibleState, validCaptcha, dnbData) => {
  const [iamDropdown, lookingToDropdown] = dropdowns;
  const utmInfo = getUtmInfo();
  const gaInfo = getGaInfo();
  const dataMap = {
    email: inputs.email.value,
    'First Name': inputs.firstName.value,
    'Last Name': inputs.lastName.value,
    'Company Name': inputs.company.value,
    'Customer Type': iamDropdown.value,
    Potential_Bot: !validCaptcha,
    Country: inputs.country.value,
    'I want to receive Spotify for brands updates': inputs.newsletter.checked,
    State: visibleState ? inputs.state.value : '',
    KPI: lookingToDropdown.value,
    ...utmInfo,
    ...gaInfo,
    ...dnbData,
  };

  return objectToFormData(dataMap);
};

const INPUT_MODIFIERS = {
  firstName: sanitizeUserInput,
  lastName: sanitizeUserInput,
  default: text => text,
};
const REGULAR_NAME_ORDER = ['firstName', 'lastName'];
const REVERSED_NAME_ORDER = [...REGULAR_NAME_ORDER].reverse();
const ARIA_LIVE_PREFIX = 'contact-form-aria-live';

/**
 * Renders the contact form
 * @param {string} modifier A modifier to use for style overrides.
 * @param {function} onSubmitCallback A callback which will be called after the form is submitted.
 * @param {string} formName used to track analytics events.
 * @param {number} tabIndex attribute specifies the tab order of an element
 * @returns {ReactElement}
 */
const ContactForm = ({
  modifier = '',
  onSubmitCallback = () => {},
  formName = '',
  tabIndex = 0,
}) => {
  const { t } = useTranslation();
  const [{ locale }] = useAppContext();
  const { formEndPointOverride, flipNameOrder } = useMemo(
    () => locales.find(({ id }) => id === locale),
    [locale],
  );

  // State
  const [dropdowns, setDropdowns] = useState(dropdownsData);
  const [inputs, setInputs] = useState({
    firstName: {
      value: '',
      label: 'contactForm.firstName',
      message: '',
      valid: null,
    },
    lastName: {
      value: '',
      label: 'contactForm.lastName',
      message: '',
      valid: null,
    },
    company: {
      value: '',
      label: 'contactForm.company',
      message: '',
      valid: null,
    },
    email: {
      value: '',
      label: 'contactForm.emailAddress',
      message: '',
      valid: null,
    },
    country: {
      value: '',
      label: 'contactForm.country',
      message: '',
      valid: null,
    },
    state: {
      value: '',
      label: 'contactForm.state',
      message: '',
      valid: null,
    },
    newsletter: {
      label: 'contactForm.signUpNewsletter',
      message: '',
      checked: false,
    },
  });
  const [visibleState, setVisibleState] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const formId = kebabCase(formName);
  const dnbFieldsContainerRef = useRef(null);

  // Validations
  useEffect(() => {
    const isStateFieldVisible =
      inputs.country.value === LOCALE_COUNTRIES.UNITED_STATES;

    setVisibleState(isStateFieldVisible);
  }, [inputs.country.value]);

  useEffect(() => {
    const stateValidation = visibleState ? inputs.state.value : true;
    setDisabled(
      !(
        inputs.firstName.valid &&
        inputs.lastName.valid &&
        inputs.company.valid &&
        inputs.email.valid &&
        inputs.country.value &&
        stateValidation
      ),
    );
  }, [
    inputs.firstName.valid,
    inputs.lastName.valid,
    inputs.company.valid,
    inputs.email.valid,
    inputs.country.value,
    inputs.state.value,
    visibleState,
  ]);

  // Event handlers
  const handleCheckboxChange = ({ target }) =>
    setInputs(prevInputs => ({
      ...prevInputs,
      newsletter: {
        ...prevInputs.newsletter,
        checked: target.checked,
      },
    }));

  const handleDropdownChange = ({ target }) =>
    setDropdowns(prevDropdowns =>
      prevDropdowns.map(dropdown => ({
        ...dropdown,
        value: dropdown.name === target.name ? target.value : dropdown.value,
      })),
    );

  const handleInputChange = ({ target }) => {
    const inputModifier =
      INPUT_MODIFIERS[target.name] || INPUT_MODIFIERS.default;

    setInputs(prevInputs => ({
      ...prevInputs,
      [target.name]: {
        ...prevInputs[target.name],
        value: inputModifier(target.value),
      },
    }));
  };

  const handleInputValidation = ({ name: inputName, valid, message }) => {
    setInputs(prevInputs => {
      return {
        ...prevInputs,
        [inputName]: {
          ...prevInputs[inputName],
          valid,
          message: t(message),
          value: prevInputs[inputName].value,
        },
      };
    });
  };

  const setSeverError = serverError => {
    eventTrack(CONTACT_FORM_ERROR, {
      formName,
      error: serverError,
      newsletterSignup: inputs.newsletter.checked,
    });
    setError(true);
    setDisabled(false);
  };

  useEffect(() => {
    DNBVisitorIntelligenceFormFill.attach({
      formId,
      contactEmailSearchFieldName: 'email',
      companyNameSearchFieldName: 'company',
      companyCountrySearchFieldName: 'country',
      attachChangeListeners: ['company', 'country', 'state'],
      onChange: handleInputChange,
      // Fields to override data after search
      companyNameFieldName: 'company',
      countryFieldName: 'country',
      stateFieldName: 'state',
    });
  }, []);

  const sendForm = validCaptcha => {
    const dnbData = DNBVisitorIntelligenceFormFill.GetHiddenFieldsData(
      dnbFieldsContainerRef.current,
    );
    const payload = getPayload(
      dropdowns,
      inputs,
      visibleState,
      validCaptcha,
      dnbData,
    );

    return fetch(formEndPointOverride || FORM_ENPOINT, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload,
    }).then(() => {
      const [iamDropdown, lookingToDropdown] = dropdowns;

      setSubmitted(true);
      onSubmitCallback({ error: false });
      eventTrack(CONTACT_FORM_SUCCESS, {
        formName,
        newsletterSignup: inputs.newsletter.checked,
        formIAm: iamDropdown.value,
        formTo: lookingToDropdown.value,
        formCountry: inputs.country.value,
      });
    });
  };

  const sendCaptcha = token => {
    const urlValidateCaptcha = `${window.location.origin}${CAPTCHA_VALIDATE}`;

    return fetch(urlValidateCaptcha, {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: objectToFormData({ token }),
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Silent error: Avoid posting invalid data
    if (disabled) {
      eventTrack(CONTACT_FORM_ERROR, {
        formName,
        error: 'user tried to resubmit',
        newsletterSignup: inputs.newsletter.checked,
      });
      console.warn('Form not submited: Invalid data');
      return;
    }

    setDisabled(true);

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(publicRuntimeConfig.RECAPTCHA_KEY, { action: 'submit' })
        .then(token => sendCaptcha(token))
        .then(response => {
          if (!response.ok) throw new Error(response);
          return response.json();
        })
        .then(({ validCaptcha }) => {
          return sendForm(validCaptcha);
        })
        .catch(serverError => {
          console.error(serverError);
          setSeverError(serverError);
        });
    });
  };

  return (
    <ThemeProvider theme={{ modifier }}>
      {!submitted ? (
        <Styled.Form id={formId} onSubmit={handleSubmit}>
          <fieldset
            aria-controls={kebabCase(
              `${ARIA_LIVE_PREFIX}-${formName}-${modifier}`,
            )}
          >
            <Styled.IntroText>
              {dropdowns.map(dropdown => (
                <Dropdown
                  autoComplete="off"
                  key={dropdown.name}
                  labelText={dropdown.labelText}
                  value={dropdown.value}
                  name={dropdown.name}
                  options={dropdown.options}
                  onChange={handleDropdownChange}
                  tabIndex={tabIndex}
                />
              ))}
            </Styled.IntroText>
            {(flipNameOrder ? REVERSED_NAME_ORDER : REGULAR_NAME_ORDER).map(
              inputName => (
                <Styled.TextInput
                  key={inputName}
                  aria-invalid={
                    inputs[inputName].valid !== null && !inputs[inputName].valid
                  }
                  value={inputs[inputName].value}
                  valid={inputs[inputName].valid}
                  name={inputName}
                  onChange={handleInputChange}
                  onValidate={handleInputValidation}
                  validations={[validationNames.required]}
                  aria-label={`${t(inputs[inputName].label)} ${
                    inputs[inputName].message
                  }`}
                  placeholder={t(inputs[inputName].label)}
                  type="text"
                  required
                  tabIndex={tabIndex}
                />
              ),
            )}
            <Styled.TextInput
              aria-invalid={inputs.email.valid !== null && !inputs.email.valid}
              value={inputs.email.value}
              valid={inputs.email.valid}
              name="email"
              onChange={handleInputChange}
              onValidate={handleInputValidation}
              validations={[validationNames.required, validationNames.email]}
              aria-label={`${t(inputs.email.label)} ${inputs.email.message}`}
              placeholder={t(inputs.email.label)}
              type="email"
              required
              tabIndex={tabIndex}
            />
            <Styled.TextInput
              aria-invalid={
                inputs.company.valid !== null && !inputs.company.valid
              }
              value={inputs.company.value}
              valid={inputs.company.valid}
              name="company"
              onChange={handleInputChange}
              onValidate={handleInputValidation}
              validations={[validationNames.required]}
              aria-label={`${t(inputs.company.label)} ${
                inputs.company.message
              }`}
              placeholder={t(inputs.company.label)}
              type="text"
              required
              tabIndex={tabIndex}
              autoComplete="off-off"
            />
            <CountryField
              tabIndex={tabIndex}
              valueCountry={inputs.country.value}
              onChangeField={handleInputChange}
              onValidation={handleInputValidation}
              valueState={inputs.state.value}
              modifier={modifier}
              required
            />
            <Styled.Newsletter
              tabIndex={tabIndex}
              key="newsletter"
              checked={inputs.newsletter.checked}
              text={t(inputs.newsletter.label)}
              onChange={handleCheckboxChange}
              value="newsletter"
            />
            <DNBVisitorIntelligenceFormFill.HiddenFields
              ref={dnbFieldsContainerRef}
            />
            <Styled.ReCaptchaText tabIndex={tabIndex} />
            <Styled.CtaBtn disabled={disabled} tag="button" tabIndex={tabIndex}>
              {t('letsGo')}
            </Styled.CtaBtn>
          </fieldset>
          <Styled.AriaLiveRegion
            id={kebabCase(`${ARIA_LIVE_PREFIX}-${formName}-${modifier}`)}
            role="region"
            aria-live="polite"
          >
            {Object.keys(inputs)
              .map(key =>
                inputs[key].message
                  ? `${inputs[key].label} ${inputs[key].message}.\n`
                  : '',
              )
              .join('')}
          </Styled.AriaLiveRegion>
          {error && (
            <Styled.Error>
              <Styled.ErrorIcon name={ICONS.FORM_ERROR} />
              <Styled.ErrorCopy>{t('formError.message')}</Styled.ErrorCopy>
            </Styled.Error>
          )}
        </Styled.Form>
      ) : (
        <Styled.FormSuccessState modifier={modifier} />
      )}
    </ThemeProvider>
  );
};

ContactForm.propTypes = {
  /**
   * A modifier to use for style overrides.
   */
  modifier: PropTypes.string,
  /**
   * A callback which will be called after the form is submitted.
   */
  onSubmitCallback: PropTypes.func,
  /**
   * string used for analytics purpose.
   */
  formName: PropTypes.string,
  /**
   * The tabindex attribute specifies the tab order of an element
   */
  tabIndex: PropTypes.number,
};

export default ContactForm;
