import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

import style from './mailchimp-form.module.css';
import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';
import { getPathname } from '../../common/utils/getPathname';
import { getTrackingLabelFromPathname } from '../../common/utils/getTrackingLabelFromPathname';

export const MailchimpForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setLoading(false);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const addMailchimp = await addToMailchimp(email);
      setLoading(false);

      const pathname = getPathname();
      const category = getTrackingLabelFromPathname(pathname) || 'newsletter';

      if (addMailchimp.result === 'success') {
        sendTrackingEvent(category, 'click', 'newsletter: success');
        setSuccess(true);
      } else {
        sendTrackingEvent(category, 'click', 'newsletter: error');
        setError(
          'There was a problem adding your email, you may have previously already subscribed'
        );
      }
    } catch (error) {
      console.warn(error);
      setLoading(true);
      setError('There was a problem submitting your request');
    }
  };

  if (success) {
    return (
      <h4 className={`${style.success} t-subhead-1`}>
        Thank you for subscribing
      </h4>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.container}>
        <label htmlFor="email" className="a11y-visually-hidden">
          Email
        </label>
        <input
          placeholder="We saved a spot for your email"
          name="email"
          type="email"
          id="email"
          required
          disabled={loading}
          className={`${style.input} t-subhead-2`}
          onChange={handleEmailChange}
        />
        <button
          type="submit"
          disabled={loading}
          className={`${style.submit} t-ui-4`}
        >
          Send
        </button>
      </div>
      {error && <span className={`${style.error} t-body-4`}>{error}</span>}
    </form>
  );
};
