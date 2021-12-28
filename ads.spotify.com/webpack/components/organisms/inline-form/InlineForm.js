import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';

import get from 'lodash/get';

import { Form, RTE } from 'components/molecules';
import { colors } from 'styles/variables';
import { ICONS } from 'constants/icons';
import { CAPTCHA_VALIDATE } from 'constants/urls';

import { objectToFormData } from 'utils/object-to-form-data';
import {
  getUtmInfo,
  getGaInfo,
  eventTrack,
  INLINE_FORM_SUCCESS,
  INLINE_FORM_ERROR,
} from 'utils/google-tag-manager';

import * as Styled from './InlineForm.styled';

const { publicRuntimeConfig } = getConfig() || {};
const reCaptchaReady = () =>
  new Promise(resolve => window.grecaptcha.ready(resolve));

/**
 * InlineForm component
 * @param {string} title - The form title
 * @param {string} action - The form submission URL.
 * @param {string} ctaText - The form cta text
 * @param {string} disclaimer - The form legal disclaimer
 * @param {string} failureMessage - The form failure message
 * @param {string} successMessage - The form success message
 * @param {Array} fields - The form fields
 * @returns {ReactElement}
 */
const InlineForm = ({
  name,
  title,
  action,
  ctaText,
  disclaimer,
  failureMessage,
  successMessage,
  fields = [],
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const onSubmit = (event, data) => {
    event.preventDefault();

    const utmInfo = getUtmInfo();
    const gaInfo = getGaInfo();

    setSubmitError(false);

    reCaptchaReady()
      .then(() =>
        window.grecaptcha.execute(publicRuntimeConfig.RECAPTCHA_KEY, {
          action: 'submit',
        }),
      )
      .then(token =>
        fetch(`${window.location.origin}${CAPTCHA_VALIDATE}`, {
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: objectToFormData({ token }),
        }),
      )
      .then(response => {
        if (!response.ok) throw new Error(response);
        return response.json();
      })
      .then(({ validCaptcha }) =>
        fetch(action, {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: objectToFormData({
            ...data,
            ...utmInfo,
            ...gaInfo,
            Potential_Bot: !validCaptcha,
          }),
        }),
      )
      .then(() => {
        setSubmitted(true);
        eventTrack(INLINE_FORM_SUCCESS, { name, title });
      })
      .catch(error => {
        setSubmitError(true);
        eventTrack(INLINE_FORM_ERROR, {
          name,
          title,
          error: `Submit error - ${get(error, 'message', '')}`,
        });
      });
  };

  const onFieldError = fieldName => {
    eventTrack(INLINE_FORM_ERROR, {
      name,
      title,
      error: fieldName,
    });
  };

  return (
    <Styled.Root>
      <Styled.Container>
        {!submitted && (
          <>
            <Styled.Title>{title}</Styled.Title>
            <Form
              textColor={colors.black}
              onSubmit={onSubmit}
              onFieldError={onFieldError}
              error={submitError}
            >
              {fields.map(({ fieldName, label, type, required }) => (
                <Styled.Field
                  key={fieldName}
                  fieldName={fieldName}
                  label={label}
                  type={type}
                  required={required}
                  placeHolderColor={colors.grey300}
                />
              ))}
              <Styled.ReCaptchaText />
              <Styled.CtaContainer>
                <Styled.Field type="submit" label={ctaText} />
              </Styled.CtaContainer>
            </Form>
            {disclaimer && <Styled.Disclaimer>{disclaimer}</Styled.Disclaimer>}
          </>
        )}
        {submitted && <RTE body={successMessage.body} />}
        {submitError && (
          <Styled.Error>
            <Styled.ErrorIcon name={ICONS.FORM_ERROR} />
            <Styled.ErrorCopy>{failureMessage}</Styled.ErrorCopy>
          </Styled.Error>
        )}
      </Styled.Container>
    </Styled.Root>
  );
};

InlineForm.propTypes = {
  /**
   * The form title
   */
  title: PropTypes.string.isRequired,
  /**
   * The form submission URL.
   */
  action: PropTypes.string.isRequired,
  /**
   * The form cta text
   */
  ctaText: PropTypes.string.isRequired,
  /**
   * The form legal disclaimer
   */
  disclaimer: PropTypes.string.isRequired,
  /**
   * The form failure message
   */
  failureMessage: PropTypes.string.isRequired,
  /**
   * The form success message
   */
  successMessage: PropTypes.shape({}).isRequired,
  /**
   * The form fields
   */
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string,
      label: PropTypes.string,
      type: PropTypes.string,
      required: PropTypes.bool,
    }),
  ),
};

export default InlineForm;
